import base64 from 'base-64';
import ls from 'local-storage'
import * as signalR from '@microsoft/signalr';
import ReactDOM from "react-dom";

export default class Helpers {
    static get apiAddress() {
        return `${window.location.origin}/api/Main`;
    }
    static get apiAddress_nopath() {
        return `${window.location.origin}`;
    }
    static fetchRequest(path, method, body) {
        // TODO: fetch this from local storage or sumting
        const userId = JSON.parse(localStorage.getItem('userID'));
        const password = JSON.parse(localStorage.getItem('password'));
        const credentials = { userId, password };

        if (method === "GET" && body) console.warn("Cannot HTTP GET with body params!");
        let base64 = require('base-64');
        let auth = "Basic " + base64.encode(credentials.userId + ':' + credentials.password);
        let headers = {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": auth
        }
        let options = {
            method: method,
            headers: headers
        }
        if (body) {
            options['body'] = JSON.stringify(body)
        }
        return fetch(Helpers.apiAddress + path, options)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                if (json.error) {
                    console.log("Error of some sort during 'fetch'")
                    console.log(json.error)
                    return Promise.reject(json.error)
                } else {
                    return json
                }
            })
    }

    static async saveCredentials(userID, password) {
        if (userID) {
            await ls.set('userID', userID.toString());
        }
        await ls.set('password', password);
    }

    static async deleteCredentials() {
        //await ls.removeItem('userID');
        //await ls.removeItem('password');
        localStorage.clear();
    }

    static formatEpoch(epoch) {
        const date = new Date(epoch * 1000);

        const year = date.getFullYear() + "";
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = ("00" + date.getHours()).slice(-2);
        const minutes = ("00" + date.getMinutes()).slice(-2);

        return `${month}/${day}/${year.slice(-2)}`
    }
    static get liveConnection() {
        return liveConnection;
    }

    static async connectLive(connectedCallback) {
        
        if (!liveConnection) {
            console.log('First call to connectLive')
            liveConnection = new signalR.HubConnectionBuilder().withUrl('/liveUpdatesHub', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })               
                .configureLogging(signalR.LogLevel.Critical)
                .build();
            
            liveConnection.onclose((e) => {
                console.warn('SignalR closed, performing exponential reconnect: ', e);
                this.exponentialReconnect(1000, connectedCallback);
            });
        }
        const firstTry = await this.tryConnect();
        if (!firstTry) this.exponentialReconnect(1000, connectedCallback);
    }

    static async exponentialReconnect(time, connectedCallback) {
        const connected = await this.tryConnect();
        if (connected) {
            connectedCallback && connectedCallback();
            return;
        }
        setTimeout(() => this.exponentialReconnect(time * 1.25, connectedCallback), time);
    }

    static async tryConnect() {
        console.warn('Checking if SignalR connected');
        if (liveConnection.connectionState === signalR.HubConnectionState.Connected) {
            console.warn('SignalR already connected not connecting again');
            return true;
        }
        console.warn('SignalR not connected, attempting connection');
        try {
            await liveConnection.start();
            console.warn("SignalR connected");
            return true;
        } catch{
            console.warn('SignalR connect failed');
            return false;
        }
    }

    
}

let liveConnection = null;