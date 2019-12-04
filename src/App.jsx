import * as React from "react";

import CharityCallout from "./Components/CharityCallout";
import Settings from "./Components/Settings";
import ActivityList from './Components/ActivityList';
import MainLayout from './Components/MainLayout';
import Container from '@material-ui/core/Container';

import './App.css';
import TransactionRoundUpCalculator from "./Components/TransactionRoundUpCalculator";

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
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <MainLayout>
                    <Container>
                        <CharityCallout />
                        <TransactionRoundUpCalculator/>
                        <ActivityList />
                        <Settings />
                    </Container>
                </MainLayout>
            </ThemeProvider>
        </div>
    );
}
