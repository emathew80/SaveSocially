import * as React from "react";
import transactions from "../assets/transactions.js"
import { AppContext } from "../AppContext";

function TransactionRoundUpCalculator() {
    let { state, dispatch } = React.useContext(AppContext);


    React.useEffect(()=>{
        let roundUpTotal=0
        transactions.forEach(transaction => {
            var roundedUpTransactionAmount = Math.ceil(transaction.transactionAmount)
            roundUpTotal = roundUpTotal + (roundedUpTransactionAmount - transaction.transactionAmount)
        });

        dispatch({
            type: 'set-totalRoundUpAmount',
            payload: roundUpTotal.toFixed(2)
        })
    }, [])
    return(
         <div>Transaction Roundup To Transfer To Savings Account : {state.totalRoundUpAmount}</div>
    )
}

export default TransactionRoundUpCalculator
