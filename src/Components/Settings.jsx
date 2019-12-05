import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Slider,
  Button,
  Icon,
  Fab
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from "../AppContext";

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center'
    },
    formControl: {
        //margin: theme.spacing(1),
        margin: 5,
        minWidth: 150,
    },
    formControlSlider: {
        //margin: theme.spacing(1),
        margin: 5,
        minWidth: 250,
    },
    margin: {
        //theme.spacing(?)
        height: 20,
    },
}));

function Settings() {
  let { state, dispatch } = React.useContext(AppContext);
  const classes = useStyles();

  const marks = [
    { value: 1, label: '1%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
  ];

  let setFromAccount = e => dispatch({
        type: "set-from-account",
        payload:  state.fromAccounts.find(account => account.accountId === e.target.value)
    })

  let setToAccount = e => dispatch({
        type: "set-to-account",
        payload:  state.toAccounts.find(account => account.accountId === e.target.value)
    });

    let setDonationPercentage = (e, value) => dispatch({
        type: "set-donation-percentage",
        payload: value / Math.pow(10, 2)
    });

    let setLabelWidth = () => {
        return (dispatch({
            type: 'set-tolabel-width',
            payload: inputLabelTo.current.offsetWidth
        }),
            dispatch({
                type: 'set-fromlabel-width',
                payload: inputLabelFrom.current.offsetWidth
            })
        )
    }

  let submitForm = () => dispatch({ type: "set-submit", payload:  true })

  let editForm = () => dispatch({ type: "set-edit", payload:  true })

  const inputLabelFrom = React.useRef(null);
  const inputLabelTo = React.useRef(null);

    React.useEffect(() => {
        setLabelWidth()
    }, []);

  const percentageFormat = (value) => {
    return `${value}%`;
  }

  if (state.submitted) {
      return (
          <div className={classes.form}>
            <Typography gutterBottom>
                Donation Transfer Settings
            </Typography>
            <Typography gutterBottom>
                From Account: {state.fromAccount.formattedAccountNumber}
            </Typography>
            <Typography gutterBottom>
                To Account: {state.toAccount.formattedAccountNumber}
            </Typography>
            <Typography gutterBottom>
                Donation Percentage: {(state.donationPercentage*100).toFixed()}%
            </Typography>
            <Button
             variant="contained"
             color="secondary"
             onClick={editForm}
             className={classes.button}
             startIcon={<EditIcon />}
           />
         </div>
      )
  }

  if (state.edit) {
    return (
        <div className={classes.form}>

         <Typography gutterBottom>
           Donation Transfer Settings
         </Typography>

         <div className={classes.margin} />

         <FormControl variant="outlined"  className={classes.formControl}>
             <InputLabel ref={inputLabelFrom}  id="from-select-label">From Account</InputLabel>
             <Select
               label='From Account'
               labelId="simple-select-label"
               id="simple-select"
               labelWidth={state.labelFromWidth}
               value={state.fromAccount && state.fromAccount.accountId}
               onChange={setFromAccount}
             >
               {state.fromAccounts.map((account, i)=> {
                 return <MenuItem key={i} value={account.accountId}>{account.formattedAccountNumber}</MenuItem>
               })}
             </Select>
           </FormControl>

           <FormControl variant="outlined" className={classes.formControl}>
             <InputLabel ref={inputLabelTo}  id="from-select-label">To Account</InputLabel>
             <Select
                defaultValue={state.toAccount}
               label='To Account'
               labelId="simple-select-label"
               id="simple-select"
               labelWidth={state.labelToWidth}
               value={state.toAccount && state.toAccount.accountId}
               onChange={setToAccount}
             >
               {state.toAccounts.map((account, i) => {
                 return <MenuItem key={i} value={account.accountId}>{account.formattedAccountNumber}</MenuItem>
               })}
             </Select>
           </FormControl>

           <div className={classes.margin} />

           <FormControl className={classes.formControlSlider}>
             <Typography id="discrete-slider-small-steps">
               {`Donation Percentage: ${Math.round(state.donationPercentage * 100)}%`}
             </Typography>

             <div className={classes.margin} />

             <Slider
               onChange={(event, value) => setDonationPercentage(event, value)}
               onChangeCommitted={(event, value) => setDonationPercentage(event, value)}
               defaultValue={5}
               getAriaValueText={percentageFormat}
               aria-labelledby="discrete-slider-small-steps"
               step={1}
               marks={marks}
               min={1}
               max={100}
               value={Math.round(state.donationPercentage * 100)}
               valueLabelFormat={percentageFormat}
               valueLabelDisplay="auto"
             />
           </FormControl>

            <Fab color="secondary"
                aria-label="save"
                onClick={submitForm}
            >
                <Icon color="primary">save</Icon>
            </Fab>

         </div>
       );
  }

}

export default Settings;
