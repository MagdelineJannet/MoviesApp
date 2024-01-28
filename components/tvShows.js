import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getTVShows } from '../services/api';
import Card from './card'; 

const TVShowsScreen = () => {
  const [tvShows, setTvShows] = useState([]);
  const [subtype, setSubtype] = useState('airing_today');
  const baseImageUrl = 'https://image.tmdb.org/t/p/';
  const posterSize = 'original';

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const response = await getTVShows(subtype);
        console.log(response.data.results)
        setTvShows(response.data.results);
      } catch (error) {
        console.error('Error fetching tv shows:', error);
      }
    };

    fetchTVShows();
  }, [subtype]);

  return (
    <View>
        <View style={styles.container}>
        <Picker
            selectedValue={subtype}
            onValueChange={(itemValue) => setSubtype(itemValue)}
            style={styles.picker}
        >
            <Picker.Item label="Airing Today" value="airing_today" />
            <Picker.Item label="On The Air" value="on_the_air" />
            <Picker.Item label="Popular" value="popular" />
            <Picker.Item label="Top Rated" value="top_rated" />
        </Picker>
      </View>
      <FlatList style={styles.cardContainer}
        data={tvShows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Card
            title={item.name}
            imageUrl={`${baseImageUrl}${posterSize}${item.poster_path}`}
            popularity={`Popularity: ${item.popularity}`}
            releaseDate ={`Release Date: ${item.first_air_date}`}
            id={item.id}
            type='tv'
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

export default TVShowsScreen;
