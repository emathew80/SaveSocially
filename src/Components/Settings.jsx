import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  Typography,
  Slider
} from '@material-ui/core';
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
    {
      value: 1,
      label: '1%',
    },
    {
      value: 25,
      label: '25%',
    },
    {
      value: 50,
      label: '50%',
    },
    {
      value: 75,
      label: '75%',
    },
    {
      value: 100,
      label: '100%',
    },
  ];

  let setFromAccount = accountId => () => dispatch({
    type: "set-from-account",
    payload:  state.fromAccounts.find(obj => obj.accountId === accountId)
  });

  let setToAccount = accountId => () => dispatch({
    type: "set-to-account",
    payload:  state.toAccounts.find(obj => obj.accountId === accountId)
  });

  let setLabelWidth = () => {
    return (dispatch({
    type: 'set-tolabel-width',
    payload: inputLabelTo.current.offsetWidth
  }), dispatch({
    type: 'set-fromlabel-width',
    payload: inputLabelFrom.current.offsetWidth
  }))}

  const inputLabelFrom = React.useRef(null);
  const inputLabelTo = React.useRef(null);

  React.useEffect(() => {
    setLabelWidth()
  }, []);

  const valueLabelFormat = (value) => {
    return `${value}%`;
  }

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
          value={state.fromAccount}
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
          label='To Account'
          labelId="simple-select-label"
          id="simple-select"
          labelWidth={state.labelToWidth}
          value={state.toAccount}
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
          Donation Percentage
        </Typography>
        <div className={classes.margin} />
        <Slider
          defaultValue={5}
          getAriaValueText={valueLabelFormat}
          aria-labelledby="discrete-slider-small-steps"
          step={1}
          marks={marks}
          min={1}
          max={100}
          valueLabelFormat={valueLabelFormat}
          valueLabelDisplay="auto"
        />
      </FormControl>
    </div>
  );
}

export default Settings;
