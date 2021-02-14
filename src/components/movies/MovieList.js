import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function MovieList(props) {
    const {movies, setOpened, setXs} = props.data;
    return (
        <div>
            <List>
              {
                  movies.length > 0 ? (
                    movies.map( (movie) => 
                      <ListItem onClick= { () => {
                        setXs(6);
                        setOpened(movie)
                      }} 
                      key={movie.id}>
                        <ListItemText primary={movie.title} secondary={movie.release_date} />
                      </ListItem>
                    )
                  ) 
                  : (<h1> not found</h1>)
              }
            </List>
        </div>
    )
}
