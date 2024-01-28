import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getMovies } from '../services/api';
import Card from './card'; 
import { useNavigation } from '@react-navigation/native';

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [subtype, setSubtype] = useState('now_playing');
  const baseImageUrl = 'https://image.tmdb.org/t/p/';
  const posterSize = 'original';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies(subtype);
        console.log(response.data.results);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [subtype]);

  return (
    <View>
      <View style={styles.container}>
        <Picker
          selectedValue={subtype}
          onValueChange={(itemValue) => setSubtype(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Now Playing" value="now_playing" />
          <Picker.Item label="Popular" value="popular" />
          <Picker.Item label="Top Rated" value="top_rated" />
          <Picker.Item label="Upcoming" value="upcoming" />
        </Picker>
      </View>
      <FlatList style={styles.cardContainer}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View >
            <Card
            title={item.title}
            imageUrl={`${baseImageUrl}${posterSize}${item.poster_path}`}
            popularity={`Popularity: ${item.popularity}`}
            releaseDate ={`Release Date: ${item.release_date}`}           
            id={item.id}
            type='movie'
            />
          </View>
        )}
      />
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
    width: '80%', 
    marginBottom: 20,
    marginTop: 80,
  },
  cardContainer: {
    marginTop: 60,
    marginBottom: 20,
  },
});
export default MoviesScreen;
