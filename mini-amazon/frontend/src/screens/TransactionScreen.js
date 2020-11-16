import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listTransactions } from '../actions/cartActions';
import LineItem from "../components/LineItem";

function TransactionScreen(props) {
    const transactionList = useSelector(state => state.transactionList);
    const { loading, transactions, error } = transactionList;

    const dispatch = useDispatch();

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
        if (!userInfo) {
            props.history.push("/signin", "/transaction");
            return;
        }
        dispatch(listTransactions());
        return () => {
            //
        };
    }, []);

    return loading ? <div>Loading...</div> :
        <div className="content content-margined">
            <div className="transaction-header">
                <h3>Purchase History</h3>
            </div>
            <div className="transaction-list">
                {transactions.reverse().map(t=>(<LineItem key={t._id} transaction={t}/>))}
            </div>
        </div>
}
export default TransactionScreen;