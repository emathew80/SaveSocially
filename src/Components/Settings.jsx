import React from 'react';
import { Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function Settings() {
const classes = useStyles();
  const [fromAccount, setFromAccount] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setFromAccount(event.target.value);
  };
  return (
   <div>
    <FormControl className={classes.formControl}>
        <Box component="span"><TextField>First</TextField><TextField>Last</TextField></Box>
        <InputLabel id="from-select-label">From</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={fromAccount}
          onChange={handleChange}
        >
          <MenuItem value={'CHK (...0123)'}>CHK (...0123)</MenuItem>
          <MenuItem value={'CHK (...0188)'}>CHK (...0188)</MenuItem>
          <MenuItem value={'CHK (...3445)'}>CHK (...3445)</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Settings;
