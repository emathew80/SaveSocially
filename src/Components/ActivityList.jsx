import React from 'react';
import MaterialTable from 'material-table';
import { AppContext } from '../AppContext';

export default function ActivityList({ transactions }) {
    let { state, dispatch } = React.useContext(AppContext);
    const columns = [
        {
            title: 'Date',
            field: 'transactionDate'
        },
        {
            title: 'Account',
            field: 'accountId'
        },
        {
            title: 'Description',
            field: 'description',
        },
        {
            title: 'Amount',
            field: 'transactionAmount',
            type: 'numeric'
        },
        {
            title: 'Roundup Amt',
            field: 'roundupAmount',
            type: 'numeric'
        },
    ]

    React.useEffect(() => {
        const mappedTransactions = transactions.map(transaction => ({
            ...transaction,
            transactionAmount: parseFloat(transaction.transactionAmount).toFixed(2),
            roundupAmount: parseFloat((Math.ceil(transaction.transactionAmount) - transaction.transactionAmount)).toFixed(2)
        }));

        if (mappedTransactions && mappedTransactions.length) {
            const total = mappedTransactions
                .map(transaction => parseFloat(transaction.roundupAmount))
                .reduce((prev, curr) => prev + curr)
                .toFixed(2);
            dispatch({
                type: 'set-totalRoundUpAmount',
                payload: parseFloat(total),
            })
            dispatch({
                type: 'set-mappedTransactions',
                payload: mappedTransactions,
            })
        }
    }, [transactions, dispatch])

    return (
        <MaterialTable
            title={`Transactions - Total Roundup ($${state.totalRoundUpAmount})`}
            columns={columns}
            data={state.mappedTransactions}
        />
    );
}
