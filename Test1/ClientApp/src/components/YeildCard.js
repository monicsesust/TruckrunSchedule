import React, { Component } from 'react';
import './YeildStyles.css';


const COLOR_MAP = { manual: '#001AFF77', robot1: '#FF6B0077', robot2: '#5200FF77', robot3: '#94949477', robot4: '#FA00FF77', robot5: '#FFF50077', diptest: '#127E0077' }
export class YeildCard extends Component {

    render() {


        return (

            <div className='cardstyle' style={{
                backgroundColor: COLOR_MAP[this.props.yeild.machineName],

            }}>
                <span><h3 className='cardtitle' >{this.props.yeild.machineName}</h3></span>
                <div >
                    <span><p className='yeildCount'>{this.props.yeild.yeildNumber}</p></span>
                </div>
            </div>

        );
    }

}