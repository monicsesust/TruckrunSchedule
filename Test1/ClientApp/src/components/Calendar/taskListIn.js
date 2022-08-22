import React from "react"

const TaskListIn = (props) => {
    return (
        props.taskListIn.map((val, idx) => {
            let productNameIn = `productNameIn-${idx}`, receiveByIn = `receiveByIn-${idx}`, fromLocation = `fromLocation-${idx}`, toLocation = `toLocation-${idx}`
            return (
                <tr key={val.index} className="AddnewRowTr">
                    <td width="400px">
                        <textarea type="text" name="productNameIn" data-id={idx} id={productNameIn} className="form-control " ></textarea>

                    </td>
                    <td width="400px">
                        <input type="text" name="receiveByIn" id={receiveByIn} data-id={idx} className="form-control " />
                    </td>
                    <td>
                        <select name="fromLocation" id={fromLocation} data-id={idx} className="form-control" >
                            <option value="NA">--Select--</option>
                            <option value="North Andover">North Andover</option>
                            <option value="Canal St">Canal St</option>
                            <option value="Riverside">Riverside</option>
                            <option value="Glenn St">Glenn St</option>
                            <option value="Lawrence">Lawrence</option>
                            <option value="Other">Other</option>
                        </select>
                    </td>
                    <td>
                        <select name="toLocation" id={toLocation} data-id={idx} className="form-control" >
                            <option value="NA">--Select--</option>
                            <option value="North Andover">North Andover</option>
                            <option value="Canal St">Canal St</option>
                            <option value="Riverside">Riverside</option>
                            <option value="Glenn St">Glenn St</option>
                            <option value="Lawrence">Lawrence</option>
                            <option value="Other">Other</option>
                        </select>
                    </td>

                    
                    <td className="AddNewRow">
                        {
                            idx === 0 ? <button onClick={() => props.add()} type="button" className="btn btn-primary text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                                : <button className="btn btn-danger" onClick={(() => props.delete(val))} ><i className="fa fa-minus" aria-hidden="true"></i></button>
                        }
                    </td>
                </tr>
            )
        })
    )
}
export default TaskListIn