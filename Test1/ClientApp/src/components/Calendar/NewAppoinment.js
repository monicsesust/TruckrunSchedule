
import React from "react"
import TaskListIn from "./taskListIn"
import Helpers from "../../Helpers";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import DatePicker from 'react-date-picker'
import './Calendar.css';

class NewAppointment extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { time: '', receiveDate: new Date(), taskListIn: [{ productNameIn: '', receiveByIn: '', fromLocation: '', toLocation: ''}], date_changed: false, productNameIn: '', receiveByIn: '' }
        this.receiveDate = Date.now();
    }
    onChangeDate = receiveDate => this.setState({ receiveDate, date_changed: true })
    
    handleChange = (e) => {
        if (["productNameIn", "receiveByIn", "fromLocation","toLocation"].includes(e.target.name)) {
            let taskListIn = [...this.state.taskListIn]
            taskListIn[e.target.dataset.id][e.target.name] = e.target.value;
        }
        else {
            this.setState({ [e.target.name]: e.target.value })
        }        
    }
    addInNewRow = () => {
        this.setState((prevState) => ({
            taskListIn: [...prevState.taskListIn, { productNameIn: '', receiveByIn: '', fromLocation: '', toLocation: '' }],
        }));
    }
  

    deteteInRow = (index) => {
        this.setState({
            taskListIn: this.state.taskListIn.filter((s, sindex) => index !== sindex),
        });        
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.Date === ''  || this.state.time === '' ) {
            NotificationManager.warning("Please Select Date and Time ");
            return false;
        }
        for (var i = 0; i < this.state.taskListIn.length; i++) {
            if (this.state.taskListIn[i].productNameIn === '' || this.state.taskListIn[i].fromLocation === '' || this.state.taskListIn[i].toLocation === '') {
                NotificationManager.warning("Please Fill up the Product Name, From Location and To Location  Fields.");
                return false;
            }
        }
         
        try {
            /* let receive_date = this.state.receiveDate.getTime();*/           
            let data = { formData: this.state }
            for (var i = 0; i < this.state.taskListIn.length; i++) {
               
                Helpers.fetchRequest('Cal/AddCalendarInfo', 'POST',
                    {                       
                        productName: this.state.taskListIn[i].productNameIn,
                        receiveBy: this.state.taskListIn[i].receiveByIn,
                        fromLocation: this.state.taskListIn[i].fromLocation,
                        toLocation: this.state.taskListIn[i].toLocation,
                        time: this.state.time,
                        receiveDate: this.state.receiveDate,
                        })              
            }            
            console.log(data)
            e.target.reset();
            this.setState({ time: '', receiveDate: new Date(), taskListIn: [{ productNameIn: '', receiveByIn: '', fromLocation: '', toLocation:''}], date_changed: false });
            this.props.update();
        }
        catch (error) {
            console.log(error.toString())
        }
    }
    clickInDelete(record) {
        this.setState({
            taskListIn: this.state.taskListIn.filter(r => r !== record)
        });
    }
   
    render() {
        let { taskListIn} = this.state//let { notes, date, description, taskList } = this.state
        return (
            <div className="TruckRuncontent">
               
                <form onSubmit={this.handleSubmit} onChange={this.handleChange} className="NewScheduleForm" >
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10">
                            <div className="card">
                                <div className="card-header text-center" >Add New Schedule</div>
                                <div className="TruckRun-card-body">
                                    <NotificationContainer className="NotificationContainer"></NotificationContainer>
                                    <div className="TruckRunrow">
                                        <div className="leftDiv">
                                            
                                            <div >
                                                <div className="form-group ">
                                                    <label className="required">Date</label>
                                                    <DatePicker dateFormat="MM/dd/yyyy" name="receiveDate" onChange={this.onChangeDate} value={this.state.receiveDate}
                                                    />
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group ">
                                                    <label className="required">Time</label>
                                                    <select name="time" id="time">
                                                        <option value="NA">--Select--</option>
                                                        <option value="10-10:30 AM">10-10:30 AM</option>
                                                        <option value="02-02:30 PM">02-02:30 PM </option>
                                                    </select>
                                                </div>
                                            </div>
                                           
                                        </div>
                                        <div className="rightDiv">
                                            <table >
                                                <thead>
                                                    <tr>
                                                        <th >Product Name</th>
                                                        <th >Receive BY</th>
                                                        <th >From </th>
                                                        <th >To</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <TaskListIn add={this.addInNewRow} delete={this.clickInDelete.bind(this)} taskListIn={taskListIn} />
                                                </tbody>
                                            </table>
                                        </div>
                                           
                                            
                                        </div>
 
                                    
                                    
                                </div>
                                <div className="card-footer text-center"> <button type="submit" className="btn btn-primary text-center">Submit</button></div>
                            </div>
                        </div>
                        <div className="col-sm-1"></div>
                    </div>
                </form>
            </div>
        )
    }
}
export default NewAppointment
