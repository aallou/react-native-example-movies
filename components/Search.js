import React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import FilmItem from "./FilmItem";
import { getMoviesByText } from "../api/themoviedb";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      isLoading: false
    };
    this.searchedText = "";
    this.page = 0; // Compteur pour connaître la page courante
    this.totalPages = 0; // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
  }

  _loadMovies() {
    if (this.searchedText) {
      this.setState({ isLoading: true });
      getMoviesByText(this.searchedText, this.page + 1)
        .then(data => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false
          });
        })
        .catch(error => {
          this.setState({ isLoading: false });
          console.log("Error..", error);
        });
    }
  }

  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState({
      films: []
    });

    this._loadMovies();
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }
  }

  _displayDetailForFilm = idFilm => {
    console.log("Display film with id " + idFilm);
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm });
  };

  render() {
    return (
      <View style={styles.main}>
        <TextInput
          style={styles.textinput}
          placeholder="Titre du film"
          onChangeText={text => (this.searchedText = text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button title="Rechercher" onPress={() => this._searchFilms()} />
        <FlatList
          data={this.state.films}
          keyExtrator={item => item.id.toString()}
          renderItem={({ item }) => (
            <FilmItem
              film={item}
              displayDetailForFilm={this._displayDetailForFilm}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
              this._loadMovies();
            }
          }}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    color: "#00ff00"
  }
});

export default Search;
