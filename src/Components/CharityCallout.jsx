import * as React from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AppContext } from "../AppContext";

export default function CharityCallout() {
    let { state, dispatch } = React.useContext(AppContext);
    const charitySearch = (event) => {
       var targetUrl = state.baseProPublicaUrl + `search.json?q=${event.target.value}`

        fetch(state.proxyUrl + targetUrl)
            .then(blob => blob.json())
            .then(data => {
                const prevHashTable = state.allOrgsHashTable
                const orgHashTable = {}
                data.organizations.forEach(element => {
                    orgHashTable[element.name] = element.ein
                });
                const combinedHashTable = Object.assign({}, prevHashTable, orgHashTable)
                dispatch({
                    type: 'set-allOrgsHashTable',
                    payload: combinedHashTable,
                })
                return data;
            })
            .catch(e => {
                console.log(e);
                return e;
            });
    }

    const autoCompleteOnChangeHandler = (_, value) => {
        const targetUrl = state.baseProPublicaUrl + `organizations/${state.allOrgsHashTable[value]}.json`
        fetch(state.proxyUrl + targetUrl)
            .then(blob => blob.json())
            .then(data => {
                dispatch({
                    type: 'set-selectedOrganizationDetails',
                    payload: data.organization,
                })
                return data;
            })
            .catch(e => {
                console.log(e);
                return e;
            });
    }

    return (
        <React.Fragment>
            <Autocomplete
                id="free-solo-2-demo"
                disableClearable
                options={Object.keys(state.allOrgsHashTable).map(orgName => orgName)}
                onChange={autoCompleteOnChangeHandler}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Search a charity"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange={charitySearch}
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
            />
        </React.Fragment>
    )
}

