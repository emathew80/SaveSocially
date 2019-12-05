import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CharityCallout from './CharityCallout';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    gridRoot: {
        marginTop: theme.spacing(1.5),
    },
    orgDetailItem: {
        paddingTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.grey[700],
    },
}));

export default function CharityCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.card}>
            <CardContent>
                <CharityCallout />
                <Grid container spacing={3} className={classes.gridRoot}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    {['Stuff1', 'Stuff2', 'Stuff3', 'Stuff4', 'Stuff5', 'Stuff6'].filter((_, index) => index <= 2).map((item, index) => {
                                        if (index !== 0) {
                                            return (
                                                <Typography align="left" className={classes.orgDetailItem}>
                                                    {item}
                                                </Typography>
                                            )
                                        }
                                        return (
                                            <Typography align="left">
                                                {item}
                                            </Typography>
                                        )
                                    })}
                                </Grid>
                                <Grid item xs={6}>
                                    {['Stuff1', 'Stuff2', 'Stuff3', 'Stuff4', 'Stuff5', 'Stuff6'].filter((_, index) => index > 2).map((item, index) => {
                                        if (index !== 0) {
                                            return (
                                                <Typography align="right" className={classes.orgDetailItem}>
                                                    {item}
                                                </Typography>
                                            )
                                        }
                                        return (
                                            <Typography align="right">
                                                {item}
                                            </Typography>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
