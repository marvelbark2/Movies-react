import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';

function MovieDetails(props) {
    const {setXs, setOpened, classes, opened} = props.moviedata;
    return (
        <React.Fragment>
            <CssBaseline/>
                <Grid item xs="6">
                    <Paper className={classes.info}>
                        <Grid container justify="flex-start">
                            <IconButton variant="contained" color="primary" onClick={
                                () => {
                                    setXs(12);
                                    setOpened({})
                                }
                                }>
                                <ClearIcon />
                             </IconButton>
                
                        <Grid container spacing={0}>
                            <img 
                                src={"https://image.tmdb.org/t/p/original/" + opened.backdrop_path} 
                                alt={opened.title}
                                className={classes.imgMovie}
                                />
                            <Grid item sm={6}>
                                {opened.title}
                                <br/>
                                {opened.vote_average} / 10
                            </Grid>
                        </Grid>
                        <br/>
                        {opened.overview}
                        </Grid>
                    </Paper>
                </Grid>
            <CssBaseline/>
        </React.Fragment>
    )
}

export default MovieDetails
