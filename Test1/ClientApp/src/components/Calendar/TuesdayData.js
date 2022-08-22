import React, { useState, Component } from "react";
import Linkify from 'react-linkify';
/*import { Anchorme, LinkComponentProps } from 'react-anchorme'*/
import './Calendar.css';
import EditTaskIn from './Edit';
//function linkify(inputText) {
//    var replacedText, replacePattern1, replacePattern2, replacePattern3;

//    //URLs starting with http://, https://, or ftp://
//    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
//    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

//    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
//    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
//    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

//    //Change email addresses to mailto:: links.
//    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
//    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

//    return replacedText;
//}
export class TuesdayData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tuesdaydata: this.props.tuesdaydata,
            date: this.props.date,
            time: this.props.time,
            userType: this.props.userType,
            isOpen: false
        }
    }
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    
    render() {
       
        return (
            <div >
                <table>
                    <tr>
                        <th>Product Name</th>
                        <th>From</th>
                        <th>To</th>

                    </tr>
                </table>

                {Object.entries(this.props.tuesdaydata)
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
export default TuesdayData