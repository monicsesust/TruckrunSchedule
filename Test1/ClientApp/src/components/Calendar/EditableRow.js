import React from "react";

const EditableRow = ({
    product,
    editFormData,
    handleEditFormChange,
    handleSaveClick,
    handleCancelClick,
}) => {
    return (

        <tr>
           {/* <td>*/}
                <td width="400px">
                    <textarea type="text"
                        required="required"
                        placeholder="Enter Product Name..."
                        name="productName"
                        value={editFormData.productName}
                        onChange={handleEditFormChange} className="form-control " ></textarea>
                </td>
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        required="required"*/}
            {/*        placeholder="Enter Product Name..."*/}
            {/*        name="productName"*/}
            {/*        value={editFormData.productName}*/}
            {/*        onChange={handleEditFormChange}*/}
            {/*    ></input>*/}
            {/*</td>*/}
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter Receiver Name..."
                    name="receiveBy"
                    value={editFormData.receiveBy}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <select id="fromLocation" name="fromLocation" value={editFormData.fromLocation} onChange={handleEditFormChange}>
                    <option value="NA">Select  Location</option>
                    <option value="Riverside">Riverside</option>
                    <option value="North Andover">North Andover</option>
                    <option value="Canal St">Canal St</option>
                    <option value="Glenn St">Glenn St</option>
                    <option value="Lawrence">Lawrence</option>
                    <option value="Other">Other</option>
                </select>


            </td>
            <td>
                <select id="toLocation" name="toLocation" value={editFormData.toLocation} onChange={handleEditFormChange}>
                    <option value="NA">Select  Location</option>
                    <option value="Riverside">Riverside</option>
                    <option value="North Andover">North Andover</option>
                    <option value="Canal St">Canal St</option>
                    <option value="Glenn St">Glenn St</option>
                    <option value="Lawrence">Lawrence</option>
                    <option value="Other">Other</option>
                </select>
                {/*<input*/}
                {/*    type="select"*/}
                {/*    required="required"*/}
                {/*    placeholder="Select Run Type..."*/}
                {/*    name="runType"*/}
                {/*    value={editFormData.runType}*/}
                {/*    onChange={handleEditFormChange}*/}

                {/*>*/}

                {/*</input>*/}
            </td>
            <td>
                <select id="time" name="time" value={editFormData.time} onChange={handleEditFormChange}>
                    <option value="NA">Select Time</option>
                    <option value="10-10:30 AM">10-10:30 AM</option>
                    <option value="02-02:30 PM">02-02:30 PM </option>

                </select>
               
            </td>
            <td>
                <input
                    type="date"
                    required="required"
                    placeholder=" Date..."
                    name="receiveDate"
                    value={editFormData.receiveDate}
                    onChange={handleEditFormChange}

                ></input>
                {/*<input*/}
                {/*    type="select"*/}
                {/*    required="required"*/}
                {/*    placeholder="Select Time..."*/}
                {/*    name="time"*/}
                {/*    value={editFormData.time}*/}
                {/*    onChange={handleEditFormChange}*/}
                {/*></input>*/}
            </td>

            <td>
                <button type="submit" onClick={() => handleSaveClick(product.id)}  > Save </button>
                <button type="button" onClick={handleCancelClick}> Cancel </button>
            </td>
        </tr>

    );
};

export default EditableRow;
