import React from "react";
import "./LineItem.css"

function LineItem({transaction}) {
    return (
        <div className={"order-box"}>
            <h3>{`Transaction Number: ${transaction._id}`}</h3>
            <p>Order Total: ${transaction.totalPrice.toFixed(2)}</p>
            <p>Time of Transaction: {transaction.createdAt.split("T")[0] + " " + transaction.createdAt.split("T")[1].split(".")[0]}</p>
            {transaction.transactedItems.map(item=> {
                return (<div className={"individual-item"} key={item._id}>
                    <h4><a href={window.location.href.split("/")[0]+"product/"+item.item._id}>{item.item.itemName}</a></h4>
                    <p>{item.item.description}</p>
                    <img className={"order-image"} src={item.item.image}/>
                    <p>Sold By: {item.seller.username}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price}</p>
                    <p>Purchase Subtotal: {(item.quantity * item.price).toFixed(2)}</p>
                </div>)})}
        </div>
    )
}

export default LineItem;