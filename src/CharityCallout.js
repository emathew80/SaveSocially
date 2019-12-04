import * as React from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class CharityCallout extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            allOrgsHasTable:[]
        }
        this.charitySearch= this.charitySearch.bind(this)
    }
    componentDidMount(){
    }

    charitySearch(event){
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = `https://projects.propublica.org/nonprofits/api/v2/search.json?q=${event.target.value}`
        fetch(proxyUrl + targetUrl)
        .then(blob => blob.json())
        .then(data => {
            const prevHashTable = this.state.allOrgsHasTable
            const orgHashTable= {}
            data.organizations.forEach(element => {
                orgHashTable[element.name] = element.ein
            });
            const combinedHashTable = Object.assign({},prevHashTable,orgHashTable)
            this.setState({
                allOrgsHasTable: combinedHashTable
            })
            return data;
        })
        .catch(e => {
            console.log(e);
            return e;
        });
    }

    render(){
        console.log(this.state.allOrgsHasTable)
        return (

            <React.Fragment>
                <Autocomplete
                    id="free-solo-2-demo"
                    disableClearable
                    options={Object.keys(this.state.allOrgsHasTable).map(orgName => orgName )}
                    renderInput={params => (
                    <TextField
                        {...params}
                        label="Search a charity"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange={this.charitySearch}
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                />
            </React.Fragment>
        )
    }
}
export default CharityCallout
