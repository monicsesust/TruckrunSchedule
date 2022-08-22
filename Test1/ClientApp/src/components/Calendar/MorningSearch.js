import React, { useState, Component } from "react";
import Helpers from "../../Helpers";
import './Calendar.css'; 

export class morningSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { searchdata: {}, startDate:this.props.startDate, endDate: this.props.endDate }
    }
    searData() {
        this.setState({ ...this.state });
        Helpers.fetchRequest('Cal/searchData/' + this.props.startDate + '/' + this.props.endDate, 'GET')
            .then(res => {
                console.log(res);
                this.setState({ ...this.state, searchdata: res });
            })
    }
    componentDidMount() {
        document.title = "Truck Run Schedule"
        this.searData();       
        this.timer = setInterval(() => this.searData(), 5000);
        clearInterval(this.timer);
        this.timer = null;
    }
    render() {
       
        return (
           
            <div >
                <p> {this.state.startDate}</p>
                <table width="100%" border="1px" >
                    <tr>
                        <th className="mainTable">10-10:30 AM</th>
                        <th className="mainTable">02-02:30PM</th>
                        <th className="mainTable">Date</th>
                    </tr>
                </table>

                {Object.entries(this.state.searchdata)
                    .map(([key, value]) => {
                        value.map((el) => {
                            return (<table>
                                <tr key={el.id}>
                                    <td >
                                        {el.time === '10-10:30 AM' &&
                                            <table>
                                                <tr>
                                                    <th>Product Name</th>
                                                    <th>From</th>
                                                    <th>To</th>
                                                </tr>
                                                <tr>
                                                    <td>{el.productName}-({el.receiveBy})</td>
                                                    <td>{el.fromLocation}</td>
                                                    <td>{el.toLocation}</td>
                                                </tr>
                                            </table>
                                        }
                                    </td>
                                    <td> {el.time === '02-02:30 PM' &&
                                        <table>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>From</th>
                                                <th>To</th>
                                            </tr>
                                            <tr>
                                                <td>{el.productName}-({el.receiveBy})</td>
                                                <td>{el.fromLocation}</td>
                                                <td>{el.toLocation}</td>
                                            </tr>
                                        </table>
                                    }
                                    </td>
                                       <td>{key}</td>
                                </tr>
                            </table>)
                        }
                        )
                    }
                    )}

            </div>
        )
    }
}
export default morningSearch