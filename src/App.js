
import React, { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';


import SearchMovie from './components/movies/SearchMovie';
import MovieList from './components/movies/MovieList';
import MovieDetails from './components/movies/MovieDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  header: {
    backgroundColor: theme.palette.info.light,
  },
  info: {
    backgroundColor: theme.palette.success.light,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  searchInput: {
    borderRadius: '80%',
    width: '120px',
    
  },
  imgMovie: {
    width: '200px',
    height: '250px'
  },
}));

function App() {

  const classes = useStyles();
  const [gridxs, setXs] = useState(12);
  const [opened, setOpened] = useState({});
  const [movies, setMovies] = useState([]);
  const [loaded, isLoaded] = useState(false);

  const fetchMovies = async () => {
    isLoaded(false)
    await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2f55bbab35f48a5c5b136c21249ff8a1&language=en-US&page=1`)
            .then(res => res.json())
            .then(data => data.results)
            .then(movies => setMovies(movies))
            .then(() => isLoaded(true))
  }
  const searchMoviebyTitle = async (data) => {
    const {title, clear} = data;

    if(title !== ''){
      isLoaded(false);
       await fetch(`https://api.themoviedb.org/3/search/movie?api_key=2f55bbab35f48a5c5b136c21249ff8a1&query=${title}`)
              .then(res => res.json())
              .then(data => data.results)
              .then(movie => setMovies([...movie]))
              .then(() => isLoaded(true));
    } else if(clear){
      fetchMovies();
    }
    else{
      fetchMovies();
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);
  
  return (
    <Container className={classes.root} component="main" maxWidth="md">
      
      { /* Search Bar */}
      <SearchMovie fetchMovies={fetchMovies} getMovies={searchMoviebyTitle}/>
      { /* Movies List */}
      <Grid container spacing={3}>
        <Grid item xs={gridxs}>
          <Box borderColor="grey.500" border={1}>
            <Paper className={classes.paper}>
              {
                !loaded 
                ? (<CircularProgress />)
                : <MovieList  data={{movies, setOpened, setXs}} />
              }
            </Paper>
          </Box>
        </Grid>

        { /* Movie Details */}
        {
          Object.keys(opened).length !== 0 
          ? (<MovieDetails moviedata = {{setXs, setOpened, classes, opened} } />)
          : (null)
        }
      </Grid>
    </Container>
  );
}

export default App;
