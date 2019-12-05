import React from 'react';
import TransactionContainer from './TransactionContainer';
import InternalTransfer from './InternalTransfer';

export default function Deshboard() {
    return (
        <React.Fragment>
            <TransactionContainer />
            <InternalTransfer/>
        </React.Fragment>

    )
}
