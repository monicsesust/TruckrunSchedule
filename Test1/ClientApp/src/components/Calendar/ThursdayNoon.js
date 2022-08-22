import React, { useState, Component } from "react";
import './Calendar.css';
import EditTaskIn from './Edit';
import Linkify from 'react-linkify';

export class ThursdayNoon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thursnoon: this.props.thursnoon,
            date: this.props.date,
            time: this.props.time,
            userType: this.props.userType,
            isOpen: false,
        }
    }
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    render() {
        const { time, date, mondaydata } = this.state;
        return (

            <div >
                <table>
                    <tr>
                        <th>Product Name</th>
                        <th>From</th>
                        <th>To</th>

                    </tr>
                </table>

                {Object.entries(this.props.thursnoon)
                    .map(([key, value]) => (
                        <div class="ProductsLocation">

                            <div>


                                {value.map((el) => {

                                    return (<table>
                                        <tr key={el.id}>
                                            <td >

                                                {/* {el.productName}-({el.receiveBy})*/}
                                                <Linkify>{el.productName}</Linkify>-({el.receiveBy})

                                            </td>
                                            <td>{el.fromLocation}</td>
                                            <td>{el.toLocation}</td>

                                        </tr>
                                    </table>)



                                })}

                                {/*<div>*/}
                                {/*    {this.props.userType === 'AdminUser' && <EditTaskIn location={key} time={this.state.time} receiveDate={this.props.date} daylocdata={value} />}*/}
                                {/*</div>*/}
                                {/*  <EditTaskIn location={key} time={this.state.time} receiveDate={this.props.date} daylocdata={value} />*/}
                            </div>
                            <div>
                                {
                                    value.length > 0 && <EditTaskIn location={key} time={this.state.time} receiveDate={this.props.date} daylocdata={value} />
                                }
                            </div>
                        </div>
                    )

                    )}

            </div>
        )
    }
}
export default ThursdayNoon