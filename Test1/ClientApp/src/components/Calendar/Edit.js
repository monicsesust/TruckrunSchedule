import React, { useState, Fragment } from 'react';
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Helpers from "../../Helpers";
import './Calendar.css';
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";


const EditTaskIn = ({ receiveDate,daylocdata }) => {
    const [show, setShow] = useState(false)
    const defaultTask = {productName:'', receiveBy:'', fromLocation: '', toLocation: '', time: '', receiveDate: new Date() }
    const [task, setTask] = useState(defaultTask)
    const [products, setProducts] = useState(daylocdata)

    function getParsedDate(dte) {
        var strSplitDate = String(dte).split(' ');
        var date = new Date(strSplitDate[0]);
        // alert(date);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        date = mm + "-" + dd + "-" + yyyy;
        return date.toString();
    }
    const handleShow = () => {
        console.log("Show");
        setShow(true)
    }

    const handleClose = () => setShow(false)

    const onChange = (e) => {
        const copyTask = {}
        copyTask[e.target.name] = e.target.value
        setTask({ ...task, ...copyTask })
        console.log(task);
    }

    const [addFormData, setAddFormData] = useState({       
        productName: "",
        receiveBy: "",
        fromLocation: "",
        toLocation: "",
        time: "",
        receiveDate: receiveDate,
    });


    const [editFormData, setEditFormData] = useState({
        productName: "",
        receiveBy: "",
        fromLocation: "",
        toLocation: "",
        time: "",
        receiveDate: receiveDate,
    });

    const [editId, setEditId] = useState(null);

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };
    const handleEditClick = (event, product) => {
        event.preventDefault();
        setEditId(product.id);

        const formValues = {
            productName: product.productName,
            receiveBy: product.receiveBy,
            fromLocation: product.fromLocation,
            toLocation: product.toLocation,
            time: product.time,
            receiveDate: product.receiveDate,

        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditId(null);
    };
    const handleSaveClick = (productId) => {
        Helpers.fetchRequest('cal/EditSchedule/' + productId, 'POST',
            {
                productName: editFormData.productName,
                receiveBy: editFormData.receiveBy,
                fromLocation: editFormData.fromLocation,
                toLocation: editFormData.toLocation,
                time: editFormData.time,
                receiveDate: editFormData.receiveDate,
               
            }).then((response) => {
                setProducts(products.map((val) => {
                    return val.id == productId ? {
                        productName: val.productName,
                        receiveBy: val.receiveBy,
                        fromLocation: val.fromLocation,
                        toLocation: val.toLocation,
                        time: val.time,
                        receiveDate: val.receiveDate,
                    } : val
                }))
            })

        setEditId(null);
    }
    const handleDeleteClick = (productId) => {
        Helpers.fetchRequest('cal/DeleteSchedule/' + productId, 'POST')
    };
    function getToDate(e) {
        const receiveDate = e.target.value;
    };
    return (

        <div className="MainDivFrontpage">
            <button className="EditMainPageData" onClick={() => handleShow()}>Edit</button>
            <Modal show={show} onHide={handleClose} className="EditTaskModal">
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/*<Row>*/}
                       
                    {/*    <Col sm="20">*/}
                    <table aria-disabled='true' className="InTasklIst" >
                                <tr>
                                    <th>Product Name</th>
                                    <th>Receive By</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>time</th>
                                    <th>Date</th>
                                </tr>
                                <tbody>

                                    {daylocdata.map((product) => {
                                       
                                            return (
                                                <Fragment>
                                                    {editId === product.id ? (
                                                        <EditableRow
                                                            product={product}
                                                            editFormData={editFormData}
                                                            handleEditFormChange={handleEditFormChange}
                                                            handleCancelClick={handleCancelClick}
                                                            handleSaveClick={handleSaveClick}
                                                        />
                                                    ) : (
                                                        <ReadOnlyRow
                                                            product={product}
                                                            handleEditClick={handleEditClick}
                                                            handleDeleteClick={handleDeleteClick}
                                                        />
                                                    )}
                                                </Fragment>
                                            )
                                      

                                    })}
                                </tbody>
                            </table>

                    {/*    </Col>*/}
                    {/*</Row>*/}
                    <br></br>
                    
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
export default EditTaskIn