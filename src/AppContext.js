import * as React from "react";

let AppContext = React.createContext();

let initialState = {
    count: 10,
    currentColor: "#bada55",
    labelToWidth: 0,
    labelFromWidth: 0,
    donationPercentage: 0.05,
    submitted: false,
    edit: true,
    error: false,
    proxyUrl: 'https://cors-anywhere.herokuapp.com/',
    baseProPublicaUrl: 'https://projects.propublica.org/nonprofits/api/v2/',
    fromAccount: '',
    toAccount: '',
    consumerId: '833',
    allOrgsHashTable: [],
    totalRoundUpAmount: 0,
    selectedOrganizationDetails: [],
    transactions: [],
    mappedTransactions: [],
    transactionsLoading: false,
    fromAccounts:
        [
            {
                "accountId": "10098",
                "accountType": "CHK",
                "nickname": "My account",
                "formattedAccountNumber": "(...6001)"
            },
            {
                "accountId": "10044",
                "accountType": "CHK",
                "nickname": "Golden State Checking",
                "formattedAccountNumber": "(...9587)"
            },
            {
                "accountId": "10022",
                "accountType": "CHK",
                "nickname": "Golden State Checking",
                "formattedAccountNumber": "(...0094)"
            },

        ]
    ,
    toAccounts: [
        {
            "accountId": "10101",
            "accountType": "SAV",
            "nickname": "Developer Lines of Credit",
            "formattedAccountNumber": "(...1210)"
        },
        {
            "accountId": "10024",
            "accountType": "SAV",
            "nickname": "Commercial Land",
            "formattedAccountNumber": "(...8899)"
        },
        {
            "accountId": "10025",
            "accountType": "SAV",
            "nickname": "Overdraft Protection",
            "formattedAccountNumber": "(...6001)"
        }
    ]
};

let reducer = (state, action) => {
    switch (action.type) {
        case "set-from-account":
            return { ...state, fromAccount: action.payload };
        case "set-to-account":
            return { ...state, toAccount: action.payload };
        case "set-fromlabel-width":
            return { ...state, labelFromWidth: action.payload };
        case "set-tolabel-width":
            return { ...state, labelToWidth: action.payload };
        case "set-donation-percentage":
            return { ...state, donationPercentage: action.payload };
        case "set-allOrgsHashTable":
            return { ...state, allOrgsHashTable: action.payload };
        case "set-proxyUrl":
            return { ...state, proxyUrl: action.payload };
        case "set-baseProPublicaUrl":
            return { ...state, baseProPublicaUrl: action.payload };
        case "set-transactions":
            return { ...state, transactions: action.payload };
        case "set-mappedTransactions":
            return { ...state, mappedTransactions: action.payload };
        case "set-transactionsLoading":
            return { ...state, transactionsLoading: action.payload };
        case "set-selectedOrganizationDetails":
            return { ...state, selectedOrganizationDetails: action.payload };
        case "set-submit":
            return { ...state, submitted: action.payload, edit: !action.payload };
        case "set-edit":
            return { ...state, edit: action.payload, submitted: !action.payload };
        case "set-totalRoundUpAmount":
            return { ...state, totalRoundUpAmount: action.payload, submitted: !action.payload };
        case "set-form-error":
            return { ...state, error: action.payload };
        default:
            return;
    }
};

function AppContextProvider(props) {
    let [state, dispatch] = React.useReducer(reducer, initialState);
    let value = { state, dispatch };

    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
