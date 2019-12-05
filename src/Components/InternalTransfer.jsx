import * as React from "react";
import { Button } from '@material-ui/core';
import { AppContext } from "../AppContext";

export default function InternalTransfer() {
    let { state, dispatch } = React.useContext(AppContext);
    const transfer = async () => {
    const rawResponse = await fetch(state.proxyUrl + 'https://save-socially-api.herokuapp.com/internal-transfer', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fromAccountId: state.fromAccount.accountId,
                toAccountId: state.toAccount.accountId,
                consumerId: state.consumerId,
                amount: state.totalRoundUpAmount,
                description: "Save Socially Round Up Transfer",
            })
        });
  const content = await rawResponse.json();

  console.log(content);
}

    return (
    <Button variant="contained" color="primary" size="large" onClick={transfer}>Click To Transfer Roundup</Button>
    )
}

