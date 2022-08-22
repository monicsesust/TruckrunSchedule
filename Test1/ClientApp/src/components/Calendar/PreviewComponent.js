import React, { useState, Component } from "react";
import './Calendar.css';
import Helpers from "../../Helpers";
import './Calendar.css';
import DatePicker from 'react-date-picker'
import moment from "moment";
import { format, parseISO } from 'date-fns'
import Linkify from 'react-linkify';


function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
function formatDate(date) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}
export class Previewcomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: {}, fromDate: new Date(), toDate: new Date(), date_changed: false
        }
        this.fromDate = Date.now();
        this.toDate = Date.now();
    }
    getDateFromString(datestring) {
        var d = new Date(datestring);
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        curr_month++;
        var curr_year = d.getFullYear();
        return curr_date + "-" + curr_month + "-" + curr_year;
    }

    searchBtn = (e) => {
        this.setState({ ...this.state });
        Helpers.fetchRequest('Cal/searchData/' + moment(this.state.fromDate).format('MMM DD, YYYY').toString() + '/' + moment(this.state.toDate).format('MMM DD, YYYY').toString(), 'GET')
            .then(res => {
                console.log(res);
                this.setState({ ...this.state, searchData: res });
            })
    }
    getDayName = (dayIndex) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dayIndex];
    }
    onChangeFromdate = fromDate => this.setState({ fromDate, date_changed: true })
    onChangeToDate = toDate => this.setState({ toDate, date_changed: true })

    render() {
        
        let { searchData } = this.state
        return (

            <div >

                <div className="PreviewMainSearchDiv">

                    <div className="previewDate">
                        <div className="form-group ">
                            <label className="required">From</label>
                            <DatePicker
                                dateFormat="MM/dd/yyyy" 
                                name="fromDate"
                                onChange={this.onChangeFromdate} value={this.state.fromDate}
                            />
                        </div>
                    </div>
                    <div className="previewDate">
                        <div className="form-group ">
                            <label className="required">To</label>
                            {/*<input*/}
                            {/*    type="date"*/}
                            {/*    value={toDate}*/}
                            {/*    onChange={(e) => onChangeEndDate(e)}*/}
                            {/*/>*/}
                            <DatePicker                              
                                dateFormat="MM/dd/yyyy"
                                name="toDate"
                                onChange={this.onChangeToDate} value={this.state.toDate}
                            />
                        </div>
                    </div>
                    <button className="PreviewBtn" onClick={this.searchBtn}>Search</button>
                </div>

                <div >
                    <table width="100%" border="1px" >
                        <tr>
                            <th>10-10:30 AM</th>
                            <th>02-02:30PM</th>
                            <th>Date</th>
                        </tr>

                    </table>

                    {Object.entries(this.state.searchData)
                        .map(([key, value]) => (
                            
                                
                            <div>
                                <table className="previewtable" width="100%" >
                                       
                                        <tbody>
                                        <tr>
                                            <td >
                                                    {value.map((el) => {
                                                        if (el.time === "10-10:30 AM") {
                                                            return (<ul className="PreviewUl">
                                                               
                                                                <li key={el.id}>
                                                                   

                                                                        {/* {el.productName}-({el.receiveBy})*/}
                                                                        <Linkify>{el.productName}</Linkify>-({el.receiveBy})- From {el.fromLocation} - To {el.toLocation}

                                                                    </li> 
                                                            </ul>)
                                                        }
                                                    })}
                                                </td>
                                            <td  >
                                                {value.map((el) => {
                                                    if (el.time === "02-02:30 PM") {
                                                        return (<ul className= "PreviewUl">

                                                            <li key={el.id}>


                                                                {/* {el.productName}-({el.receiveBy})*/}
                                                                <Linkify>{el.productName}</Linkify>-({el.receiveBy})- From {el.fromLocation} - To {el.toLocation}

                                                            </li>
                                                        </ul>)
                                                    }
                                                })}
                                            </td>
                                            {/* <td>{format(parseISO(key, 'yyyy-MM-dd', new Date()), "do MMM yyy")} </td>*/}
                                            {/* <td className="dateTd" >format(date, "MMMM do, yyyy H:mma") </td>*/}

                                            <td className="dateTd"> {key} {this.getDayName(new Date({ key }).getDay())} </td>
                                          {/*  <td className="dateTd" >{format({ key }, "MMMM do, yyyy")}</td>*/}
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                    {/*  <EditTaskIn location={key} time={this.state.time} receiveDate={this.props.date} daylocdata={value} />*/}
                            </div> 
                        )
                        )}





                    {/*{Object.entries(this.state.searchData)*/}
                    {/*    .map(([key, value]) => (*/}
                            
                    {/*            <div>*/}


                    {/*                {value.map((el) => {*/}

                    {/*                    return (<table>*/}
                    {/*                        <tr key={el.id}>*/}
                    {/*                            <td >*/}
                    {/*                                {el.time === '10-10:30 AM'} */}
                    {/*                                    <table>*/}
                    {/*                                    <tr>*/}
                    {/*                                        <td>{el.productName}-{el.receiveBy}</td>*/}
                    {/*                                        <td>{el.fromLocation}</td>*/}
                    {/*                                        <td>{el.toLocation}</td>*/}
                    {/*                                    </tr>*/}
                    {/*                                </table> */}
                    {/*                                }*/}

                    {/*                            </td>*/}
                    {/*                            <td> {el.time === '02-02:30 PM'} &&*/}
                    {/*                                <table>*/}
                    {/*                                    <tr>*/}
                    {/*                                        <td>{el.productName}-{el.receiveBy}</td>*/}
                    {/*                                        <td>{el.fromLocation}</td>*/}
                    {/*                                        <td>{el.toLocation}</td>*/}
                    {/*                                    </tr>*/}
                    {/*                                </table>*/}
                    {/*                            }</td>*/}
                    {/*                            <td>{key}</td>*/}

                    {/*                        </tr>*/}
                    {/*                    </table>)*/}
                    {/*                })}*/}
                    {/*        </div>*/}
                    {/*    )*/}
                    {/*    )}*/}

                    {/*{Object.entries(searchData)*/}
                    {/*    .map(([key, value]) => {*/}
                    {/*    <div>*/}

                    {/*        {value.map((el) => {*/}
                    {/*            return (<table>*/}
                    {/*                <tr >*/}
                    {/*                    <td >*/}
                    {/*                        {el.time === '10-10:30 AM' &&*/}
                    {/*                            <table>*/}
                    {/*                                <tr>*/}
                    {/*                                    <th>Product Name</th>*/}
                    {/*                                    <th>From</th>*/}
                    {/*                                    <th>To</th>*/}
                    {/*                                </tr>*/}
                    {/*                                <tr>*/}
                    {/*                                    <td>{el.productName}-({el.receiveBy})</td>*/}
                    {/*                                    <td>{el.fromLocation}</td>*/}
                    {/*                                    <td>{el.toLocation}</td>*/}
                    {/*                                </tr>*/}
                    {/*                            </table>*/}
                    {/*                        }*/}
                    {/*                    </td>*/}
                    {/*                    <td> {el.time === '02-02:30 PM' &&*/}
                    {/*                        <table>*/}
                    {/*                            <tr>*/}
                    {/*                                <th>Product Name</th>*/}
                    {/*                                <th>From</th>*/}
                    {/*                                <th>To</th>*/}
                    {/*                            </tr>*/}
                    {/*                            <tr>*/}
                    {/*                                <td>{el.productName}-({el.receiveBy})</td>*/}
                    {/*                                <td>{el.fromLocation}</td>*/}
                    {/*                                <td>{el.toLocation}</td>*/}

                    {/*                            </tr>*/}
                    {/*                        </table>*/}
                    {/*                    }*/}


                    {/*                    </td>*/}
                    {/*                    <td>{key}</td>*/}

                    {/*                </tr>*/}
                    {/*            </table>)*/}
                    {/*        }*/}
                    {/*        )*/}
                               
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*    }*/}
                    {/*    )}*/}


                    {/*{Object.entries(searchData)*/}
                    {/*    .map(([key, value]) => {*/}
                    {/*        value.map((el) => {*/}
                    {/*            return (<table>*/}
                    {/*                <tr >*/}
                    {/*                    <td >*/}
                    {/*                        {el.time === '10-10:30 AM' &&*/}
                    {/*                            <table>*/}
                    {/*                                <tr>*/}
                    {/*                                    <th>Product Name</th>*/}
                    {/*                                    <th>From</th>*/}
                    {/*                                    <th>To</th>*/}
                    {/*                                </tr>*/}
                    {/*                                <tr>*/}
                    {/*                                    <td>{el.productName}-({el.receiveBy})</td>*/}
                    {/*                                    <td>{el.fromLocation}</td>*/}
                    {/*                                    <td>{el.toLocation}</td>*/}
                    {/*                                </tr>*/}
                    {/*                            </table>*/}
                    {/*                        }*/}
                    {/*                    </td>*/}
                    {/*                    <td> {el.time === '02-02:30 PM' &&*/}
                    {/*                        <table>*/}
                    {/*                            <tr>*/}
                    {/*                                <th>Product Name</th>*/}
                    {/*                                <th>From</th>*/}
                    {/*                                <th>To</th>*/}
                    {/*                            </tr>*/}
                    {/*                            <tr>*/}
                    {/*                                <td>{el.productName}-({el.receiveBy})</td>*/}
                    {/*                                <td>{el.fromLocation}</td>*/}
                    {/*                                <td>{el.toLocation}</td>*/}

                    {/*                            </tr>*/}
                    {/*                        </table>*/}
                    {/*                    }*/}


                    {/*                    </td>*/}
                    {/*                    <td>{key}</td>*/}

                    {/*                </tr>*/}
                    {/*            </table>)*/}
                    {/*        }*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*    )}*/}


                   
                </div>
            </div>
        )
    }
}
export default Previewcomponent