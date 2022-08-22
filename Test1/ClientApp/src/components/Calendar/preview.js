import React, { useState, Fragment } from 'react';
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Helpers from "../../Helpers";
import './Calendar.css';
import DatePicker from 'react-date-picker'
import moment from "moment"; 
import Previewcomponent from './PreviewComponent';

/*import morningSearch from './MorningSearch';*/
const defaultTask = {
    productName: '', receiveBy: '', fromLocation: '', toLocation: '', time:'', receiveDate:new Date()}

const Preview = ({ todaysdate }) => {
    const [show, setShow] = useState(false) 
    //const [data, setData] = useState({})
    //const [fromDate, setfromDate] = useState(null);
    const [toDate, setendDate] = useState(null);

    const handleShow = () => {
        console.log("Show");
        setShow(true)
    }

    const handleClose = () => setShow(false)
   
   
    //const searchBtn = async (e) => {
    //    try {
    //        Helpers.fetchRequest('Cal/searchData/' + moment(fromDate).format('MMM DD, YYYY').toString() + '/' + moment(toDate).format('MMM DD, YYYY').toString(), 'GET')
    //            .then(res => {
    //                setData(res)
    //            })
    //        // window.location.reload();
    //    } catch (error) {
    //        console.log(error.toString())
    //    }
  /*  }*/

    //const onChangeStartDate = ({ target }) =>  {
    //    const newDate = moment(target.value.timeStamp).format('YYYY-MM-DD');
    //    setfromDate(newDate);
    //    console.log(newDate); 
    //};
    //const onChangeEndDate = ({ target }) => {
    //    const newDate = moment(target.value.timeStamp).format('YYYY-MM-DD');
    //    setendDate(newDate);
    //    console.log(newDate);
    //};

    return (

        <div className="MainDivFrontpage">
            <button className="EditMainPageData" onClick={() => handleShow()}>Preview</button>
            <Modal show={show} onHide={handleClose} className="EditTaskModal">
                <Modal.Header closeButton>
                    <Modal.Title>Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Previewcomponent  />



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}
export default Preview