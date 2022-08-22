import React from "react"
const TaskList = (props) => {
    return (
        props.taskList.map((val, idx) => {
            let productName = `productName-${idx}`, receiveBy = `receiveBy-${idx}`
            return (
                <tr key={val.index} className="AddnewRowTr">
                    <td width="200px">
                        <input type="text" name="productName" data-id={idx} id={productName} className="form-control " />
                    </td>
                    <td>
                        <input type="text" name="receiveBy" id={receiveBy} data-id={idx} className="form-control " />
                    </td>                    

                    <td className="AddNewRow">
                        {
                            idx === 0 ? <button onClick={() => props.add()} type="button" className="btn btn-primary text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                                : <button className="btn btn-danger" onClick={(() => props.delete(val))} ><i className="fa fa-minus" aria-hidden="true"></i></button>
                        }
                    </td>
                </tr >
            )
        })
    )
}
export default TaskList

