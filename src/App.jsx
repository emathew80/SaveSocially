import * as React from "react";

import MainLayout from './Components/MainLayout';

import TransactionContainer from './Components/TransactionContainer';
import { AppContext } from './AppContext';

import './App.css';


import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: { main: blue[200] }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
});

export function App() {
    let { state } = React.useContext(AppContext);
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <MainLayout />
            </ThemeProvider>
        </div>
    );
}
