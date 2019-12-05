import React from 'react';
import MaterialTable from 'material-table';

export default function ActivityList({ transactions }) {
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

    const mappedTransactions = transactions.map(transaction => ({
        ...transaction,
        transactionAmount: parseFloat(transaction.transactionAmount).toFixed(2),
        roundupAmount: parseFloat((Math.ceil(transaction.transactionAmount) - transaction.transactionAmount)).toFixed(2)
    }));

    const totalRoundup = () => {
        if (mappedTransactions && mappedTransactions.length) {
            return mappedTransactions
                .map(transaction => parseFloat(transaction.roundupAmount))
                .reduce((prev, curr) => prev + curr)
                .toFixed(2);
        }
        return 0;
    }

    return (
        <MaterialTable
            title={`Transactions - Total Roundup ($${totalRoundup()})`}
            columns={columns}
            data={mappedTransactions}
        />
    );
}
