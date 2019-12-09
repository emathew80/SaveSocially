import { AppContext } from "../AppContext";
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: '12px'
    }
}));

export default function InternalTransfer() {
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    let { state } = React.useContext(AppContext);
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
        if (!Object.keys(content).length || content.error) {
            setMsg('Error submitting transfer')
        } else {
            setMsg(content.status);
        }
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const classes = useStyles1();

    return (
        <React.Fragment>
            <Button variant="contained" color="primary" size="large" onClick={transfer}>Click To Transfer Roundup</Button>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
            >
                {msg.includes('Error') ? (
                    <MySnackbarContentWrapper
                        onClose={handleClose}
                        variant="error"
                        message={msg}
                    />
                ) : (
                        <MySnackbarContentWrapper
                            onClose={handleClose}
                            variant="success"
                            message={msg}
                        />
                    )}
            </Snackbar>
        </React.Fragment>
    )
}

function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
        />
    );
}

