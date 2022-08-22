import React, { useState, Component } from "react";
import { YeildCard } from './YeildCard';
import { Container, Row, Col } from 'react-bootstrap';


export class YeildList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yeilds: this.props.yeilds
        }
    }


    render() {
        var yeilds = this.props.yeilds
        const yeilds_list = []
        for (const yeild of yeilds) {
            yeilds_list.push(
                <YeildCard key={yeild.machineName} yeild={yeild} />
            )
        }
        return (
            <div>

                <div className='list'>
                    <Container style={{
                        columns: 2,
                        flexDirection: `column`,
                        flexFlow: `column nowrap`,

                        flexWrap: `nowrap`,
                        alignContent: `stretch`,

                    }}>
                        {yeilds_list.length > 0 && yeilds_list}
                        {yeilds_list.length === 0 &&
                            <div style={{ textAlign: 'center' }}>
                                <br />
                                <p>No Tasks</p>
                            </div>
                        }
                    </Container>
                </div>
            </div>
        )
    }
}
