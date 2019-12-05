import React from 'react';
import Grid from '@material-ui/core/Grid';
import CharityCard from './CharityCard';
import SettingsForm from './SettingsForm';

export default function Settings() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <SettingsForm />
            </Grid>
            <Grid item xs={12}>
                <CharityCard />
            </Grid>
        </Grid>
    )
}