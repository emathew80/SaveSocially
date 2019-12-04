import * as React from "react";
import transactions from "../assets/transactions.js"

class TransactionRoundUpCalculator extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            allTransactions:[],
            transactionAmounts:[],
            totalRoundUpAmount:0
        }
    }
    componentDidMount(){
        var roundUpTotal= 0
        transactions.forEach(element => {
            var roundedUpTransactionAmount = Math.ceil(element.transactionAmount)
            roundUpTotal = roundUpTotal + (roundedUpTransactionAmount - element.transactionAmount)
        });
        this.setState({totalRoundUpAmount:  roundUpTotal.toFixed(2)})
    }

    render(){
        return(
        <div>Roundup To Transfer To Savings Account : ${this.state.totalRoundUpAmount}</div>
        )
    }
}

export default TransactionRoundUpCalculator
