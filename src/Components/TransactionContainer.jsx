import React from 'react';
import { AppContext } from '../AppContext';
import ActivityList from './ActivityList';

export default function TransactionContainer() {
    let { state, dispatch } = React.useContext(AppContext);

    React.useEffect(
        () => {
            if (state.transactions || state.transactionsLoading || !state.fromAccount || !state.fromAccount.accountId || !state.submitted) return;
            let getTransactions = async () => {
                const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
                const targetUrl = `http://save-socially-api.herokuapp.com/transactions?consumerId=${state.consumerId}&accountId=${state.fromAccount.accountId}`
                return await fetch(proxyUrl + targetUrl)
                    .then(blob => blob.json())
                    .then(data => {
                        const transactions = data.map(transaction => {
                            const {
                                accountId,
                                transactionDate,
                                transactionAmount,
                                description,
                            } = transaction;

                            return {
                                accountId,
                                transactionDate,
                                transactionAmount,
                                description,
                            }
                        });
                        dispatch({
                            type: 'set-transactions',
                            payload: transactions,
                        })
                    })
                    .catch(e => {
                        console.log(e);
                        return e;
                    });
            }
            getTransactions();
        },
        [state.transactions, state.transactionsLoading, state.consumerId, state.fromAccount, state.fromAccount.accountId, state.submitted, dispatch]
    );

    return (
        <ActivityList transactions={state.transactions} />
    );
}