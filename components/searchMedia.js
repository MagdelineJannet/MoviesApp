import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { searchMedia } from '../services/api';
import Card from './card';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchScreen = () => {
  const [movies, setMovies] = useState([]);
  const [subtype, setSubtype] = useState('multi');
  const baseImageUrl = 'https://image.tmdb.org/t/p/';
  const posterSize = 'original';
  const [searchText, setSearchText] = useState('');

  const fetchMovies = async () => {
    try {
      const response = await searchMedia(subtype, searchText);
      console.log(response.data.results);
      setMovies(response.data.results);
      setSearchText('');
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearch = () => {
    console.log('Search:', searchText);
    console.log('SubType:', subtype);
    fetchMovies();
  };

  return (
    <View>
      <View style={styles.verticalStack}>
        <Text>
          Search Movie/TV Show Name{' '}
          <Text style={styles.redText}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="i.e. James Bond, CSI"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          textAlignVertical="top"
        />
        <Text>
          Choose Search Type{' '}
          <Text style={styles.redText}>*</Text>
        </Text>
      </View>
      <View style={styles.horizontalStack}>
        <Picker
          selectedValue={subtype}
          onValueChange={(itemValue) => setSubtype(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Movie" value="movie" />
          <Picker.Item label="Multi" value="multi" />
          <Picker.Item label="TV" value="tv" />
        </Picker>
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Icon name="search" size={20} color="white" />
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        </View>
      {movies.length === 0 && <Text style={styles.message}>Please initiate a search</Text>}
      {movies.length > 0 && (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Card
                title={item.title ? item.title : item.name}
                imageUrl={`${baseImageUrl}${posterSize}${item.poster_path}`}
                popularity={`Popularity: ${item.popularity}`}
                releaseDate={`Release Date: ${item.release_date ? item.release_date : item.first_air_date} `}
                id={item.id}
                type={item.title ? 'movie' : 'tv'}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  picker: {
    width: '50%', 
  },
  cardContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgb(0,191,255)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  horizontalStack: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    alignItems: 'center', 
  },
  verticalStack: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'left',
    paddingHorizontal: 50, 
    paddingTop: 20, 
  },
  input: {
    flexGrow: 1,
    height: 40, 
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16, 
    color: 'black', 
  },
  redText: {
    color: 'red',
  },
  message: {
    fontSize: 20, 
    color: 'black', 
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 200
  }
});

export default SearchScreen;
