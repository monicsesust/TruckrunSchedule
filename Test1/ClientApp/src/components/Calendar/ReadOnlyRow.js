import React from "react";
import { format, parseISO } from 'date-fns'

const ReadOnlyRow = ({ product, handleEditClick, handleDeleteClick }) => {
    return (

        <tr>
            <td>{product.productName}</td>
            <td>{product.receiveBy}</td>
            <td>{product.fromLocation}</td>
            <td>{product.toLocation}</td>           
            <td>{product.time}</td>
            <td>{format(parseISO(product.receiveDate, 'yyyy-MM-dd', new Date()), "do MMM yyy")} </td>

            <td>
                <button
                    type="button"
                    onClick={(event) => handleEditClick(event, product)}
                >
                    Edit
                </button>
                <button type="button" onClick={() => handleDeleteClick(product.id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ReadOnlyRow;
