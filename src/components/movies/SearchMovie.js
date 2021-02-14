import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';


export class SearchMovie extends Component {

    state = {
        title: '',
        clear: false,
    };

    searchMovie = (e) => {
        e.preventDefault();
        if(!this.state.clear){
            this.props.getMovies(this.state);
        }
        
    }

    filter = (e) => {
        if(e.target.value === ''){
            this.setState({
                clear : true
            });
        }else{
            this.setState({
                title: e.target.value,
                clear: false
            });
        }
        
       
    };

    render() {
        const classes = (theme) => ({
            paper: {
              padding: theme.spacing(2),
              textAlign: 'center',
              color: theme.palette.text.secondary,
              borderRadius: '100%'
            },
            header: {
              backgroundColor: theme.palette.info.light,
              borderRadius: '100%'
            },
          })
        // const classes = this.classesObject;
        return (
            <div>
                <Grid container 
                    className={classes.header} 
                    spacing={3}>
                <Grid item 
                sm={12}
                >
                <Paper className={classes.paper}>
                    <form onSubmit={this.searchMovie} noValidate autoComplete="off">
                    <FormControl fullWidth>
                    <Input
                        fullWidth
                        onChange={this.filter}  
                        id="standard-required" 
                        label={<SearchIcon/>}
                        style={{ borderRadius: 25 }}
                        startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                        endAdornment = {
                            (this.state.title !== '') ? (
                                <InputAdornment position="end"><Button onClick={ () => {
                                    this.setState({
                                        title: '',
                                        clear: true
                                    });
                                    document.querySelector("#standard-required").value = '';  
                                    this.props.fetchMovies();                          
                            }}><ClearIcon/></Button></InputAdornment>
                            ): ''
                        }
                        />
                    </FormControl>
                    </form>
                </Paper>
                </Grid>
            </Grid>
            </div>
        )
    }
}

export default SearchMovie
