import React, { Component } from 'react';
import Helpers from "../../Helpers";
import AddButton from './AddButton';
import MondayData from './MondayData';
import TuesdayData from './TuesdayData';
import WednesdayData from './WednesDayData';
import ThursdayData from './ThursdayData';
import FridayData from './FridayData';

import MondayNoon from './MondayNoon';
import TuesdayNoon from './TuesdayNoon';
import WednesdayNoon from './WednesdayNoon';
import ThursdayNoon from './ThursdayNoon';
import FridaydayNoon from './FridayNoon';
import Preivew from './preview'
 


export class truckinfo extends Component {
    static displayName = truckinfo.name;

    constructor(props) {
        super(props);
        this.state = {
            weekdates: {}, Mondaydata: {}, Tuesdaydata: {}, Wednesdaydata: {}, Thursdaydata: {}, Fridaydaydata: {},
            MondaydataNoon: {}, TuesdaydataNoon: {}, WednesdaydataNoon: {}, ThursdaydataNoon: {}, FridaydayNoon: {},
            MondaydataNoon: {}, TuesdaydataNoon: {}, WednesdaydataNoon: {}, ThursdaydataNoon: {}, FridaydayNoon: {}, isOpen: false, startDate:new Date()
        }
        this.startDate = Date.now();
      /*  this.dataUpdate = this.dataUpdate.bind(this);*/
    }
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    weekdayDates() {
        this.setState({ ...this.state });
        Helpers.fetchRequest('Cal/getDictionary', 'GET')
            .then(res => {
                console.log(res);
                this.setState({ ...this.state, weekdates: res });
            })            
    }
    MondayData() {
        this.setState({ ...this.state });
        Helpers.fetchRequest('Cal/getMondayDataDic', 'GET')
            .then(res => {
                console.log(res);
                this.setState({ ...this.state, Mondaydata: res });
            })
    }
    TuesdayData() {
        this.setState({ ...this.state });
        Helpers.fetchRequest('Cal/getTuesdayDataDic', 'GET')
            .then(res => {
                console.log(res);
                this.setState({ ...this.state, Tuesdaydata: res });
            })
    }
    WednesdayData() {
        this.setState({ ...this.state });
        Helpers.fetchRequest('Cal/getWednesdayDataDic', 'GET')
            .then(res => {
                console.log(res);
                this.setState({ ...this.state, Wednesdaydata: res });
            })
    }

    ThursdayData() {
        this.setState({ ...this.state });
        Helpers.fetchRequest('Cal/getThursdayDataDic', 'GET')
            .then(res => {
                console.log(res);
                this.setState({ ...this.state, Thursdaydata: res });
            })
    }

    FridayData() {
        this.setState({ ...this.state });
        Helpers.fetchRequest('Cal/getFridayDataDic', 'GET')
            .then(res => {
                console.log(res);
                this.setState({ ...this.state, Fridaydaydata: res });
            })
    }

    MondayDatanoon() {
        this.setState({ ...this.state });
        Helpers.fetchRequest('Cal/getMondayNoonDataDic', 'GET')
            .then(res => {
                console.log(res);
                this.setState({ ...this.state, MondaydataNoon: res });
            })
    }

    TuesdayDatanoon() {
        this.setState({ ...this.state });
        Helpers.fetchRequest('Cal/getTuesdayNooDataDic', 'GET')
            .then(res => {
                console.log(res);
                this.setState({ ...this.state, TuesdaydataNoon: res });
            })
    }

    WednesdayDatanoon() {
        this.setState({ ...this.state });
        Helpers.fetchRequest('Cal/getWednesdayNoonDataDic', 'GET')
            .then(res => {
                console.log(res);
                this.setState({ ...this.state, WednesdaydataNoon: res });
            })
    }

    ThursdayDatanoon() {
        this.setState({ ...this.state });
        Helpers.fetchRequest('Cal/getThursdayNoonDataDic', 'GET')
            .then(res => {
                console.log(res);
                this.setState({ ...this.state, ThursdaydataNoon: res });
            })
    }

    FridayDatanoon() {
        this.setState({ ...this.state });
        Helpers.fetchRequest('Cal/getFridayNoonDatanDic', 'GET')
            .then(res => {
                console.log(res);
                this.setState({ ...this.state, FridaydayNoon: res });
            })
    }
 
    
    componentDidMount() {
        document.title = "Truck Run Schedule"
        this.weekdayDates();
        this.MondayData();
        this.TuesdayData();
        this.WednesdayData();
        this.ThursdayData();
        this.FridayData();
        this.MondayDatanoon();
        this.TuesdayDatanoon();
        this.WednesdayDatanoon();
        this.ThursdayDatanoon();
        this.FridayDatanoon();
        this.timer = setInterval(() => this.weekdayDates(), 5000);
        this.timer = setInterval(() => this.MondayData(), 5000);
        this.timer = setInterval(() => this.TuesdayData(), 5000);
        this.timer = setInterval(() => this.WednesdayData(), 5000);
        this.timer = setInterval(() => this.ThursdayData(), 5000);
        this.timer = setInterval(() => this.FridayData(), 5000);

        this.timer = setInterval(() => this.MondayDatanoon(), 5000);
        this.timer = setInterval(() => this.TuesdayDatanoon(), 5000);
        this.timer = setInterval(() => this.WednesdayDatanoon(), 5000);
        this.timer = setInterval(() => this.ThursdayDatanoon(), 5000);
        this.timer = setInterval(() => this.FridayDatanoon(), 5000);
        clearInterval(this.timer);
        this.timer = null;


    }
    //async componentDidMount() {
    //    document.title = "Truck Run Schedule"
    //    this.weekdayDates();
    //    this.dataUpdate();
    //    this.timer = setInterval(() => this.weekdayDates(), 5000);
    //    this.timer = setInterval(() => this.dataUpdate(), 5000);
    //    clearInterval(this.timer);
    //    this.timer = null;
    //    try {
    //        await Helpers.connectLive();
    //    } catch (error) {
    //        console.warn('SignalR connection error home');
    //        console.log(error);
    //    }

    //    Helpers.liveConnection.on('OnlineCalendarUpdate', () => {
    //        console.log("Successfully Received Update Signal")
    //        this.dataUpdate();
    //    });
    //}

    render() {
        let object = this.state.weekdates;
        let MondayKey = Object.keys(object)[0];  
        let MondayValue = Object.values(object)[0];
        let TuesdayKey = Object.keys(object)[1];
        let TuesdayValue = Object.values(object)[1];
        let WednesdayKey = Object.keys(object)[2];
        let WednesdayValue = Object.values(object)[2];
        let ThursdayKey = Object.keys(object)[3];
        let ThursdayValue = Object.values(object)[3];
        let FridayKey = Object.keys(object)[4];
        let FridayValue = Object.values(object)[4];

        let mondayobject = this.state.Mondaydata;
        let tuesdayobject = this.state.Tuesdaydata;
        let wednesdayobject = this.state.Wednesdaydata;
        let thursdayobject = this.state.Thursdaydata;
        let fridayobject = this.state.Fridaydaydata;
        
        let mondayNoonobject = this.state.MondaydataNoon;
        let tuesdayNoonobject = this.state.TuesdaydataNoon;
        let wednesdayNoonobject = this.state.WednesdaydataNoon;
        let thursdayNoonobject = this.state.ThursdaydataNoon;
        let fridayNoonobject = this.state.FridaydayNoon;
        return (
            <div id="MainDivFrontpage">
                {/*<div className="truckrunCal" >*/}
                {/*    <h1>Truck Run Online Calendar</h1>*/}
                {/*</div>*/}
                <div>
                   <AddButton/>
                </div>
                <div >
                    <table width="100%" border="1px" >
                        <tbody>
                            <tr>
                                <Preivew todaysdate={ this.startDate}/>
                            </tr>
                            <tr>
                                <th style={{ width: 20 }}></th>
                                <th className="mainTable">{MondayKey}-{MondayValue}</th>
                                <th className="mainTable">{TuesdayKey}-{TuesdayValue}</th>
                                <th className="mainTable">{WednesdayKey}-{WednesdayValue}</th>
                                <th className="mainTable">{ThursdayKey}-{ThursdayValue }</th>
                                <th className="mainTable">{FridayKey}-{FridayValue}</th>
                            </tr>
                            <tr>
                                <td style={{ width: 20, fontSize: 14}}>10 - 10:30 AM</td>
                                <td className="mainTable">
                                    <MondayData mondaydata={mondayobject} date={MondayValue} time={"10-10:30 AM"} userType={"AdminUser"} />
                                </td>

                                <td className="mainTable">
                                    <TuesdayData tuesdaydata={tuesdayobject} date={TuesdayValue} time={"10-10:30 AM"} userType={"AdminUser"} />
                                </td>

                                <td className="mainTable"> <WednesdayData wednesdaydata={wednesdayobject} date={WednesdayValue} time={"10-10:30 AM"} userType={"AdminUser"} />
                                </td>

                                <td className="mainTable"> <ThursdayData thursdaydata={thursdayobject} date={ThursdayValue} time={"10-10:30 AM"} userType={"AdminUser"} />
                                </td>

                                <td className="mainTable"> <FridayData fridaydata={fridayobject} date={FridayValue} time={"10-10:30 AM"} userType={"AdminUser"} />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: 20, fontSize: 14 }}>02- 02:30 PM</td>
                                <td className="mainTable">
                                    <MondayNoon mondaynoon={mondayNoonobject} date={MondayValue} time={"02-02:30 PM"} userType={"AdminUser"} />
                                </td>

                                <td className="mainTable">
                                    <TuesdayNoon tuesdaynoon={tuesdayNoonobject} date={TuesdayValue} time={"02-02:30 PM"} userType={"AdminUser"} />
                                </td>

                                <td className="mainTable"> <WednesdayNoon wednesdaynoon={wednesdayNoonobject} date={WednesdayValue} time={"02-02:30 PM"} userType={"AdminUser"} />
                                </td>

                                <td className="mainTable"> <ThursdayNoon thursnoon={thursdayNoonobject} date={ThursdayValue} time={"02-02:30 PM"} userType={"AdminUser"} />
                                </td>

                                <td className="mainTable"> <FridaydayNoon fridaynoon={fridayNoonobject} date={FridayValue} time={"02-02:30 PM"} userType={"AdminUser"} />
                                </td>
                            </tr>
                           
                        </tbody>
                    </table>
                       
                    <div>
                    </div>
                    
                </div>
                <br />
                <br />
                <br />
            </div>
        );
    }
}

