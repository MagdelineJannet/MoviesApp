import React from 'react';
import { View, Text,Image,StyleSheet } from 'react-native';
import { useRoute,useNavigation } from '@react-navigation/native';
import { getMediaDetails } from '../services/api';
import { useState, useEffect, useLayoutEffect } from 'react';


const Details = () => {
  
  const [details, setDetails] = useState([]);
  const route = useRoute();
  const navigation = useNavigation(); // Access the navigation object
  const baseImageUrl = 'https://image.tmdb.org/t/p/';
  const posterSize = 'original';
  const { mid, mtype } = route.params; 
  console.log("id from details: "+mid);
  console.log("type from details: "+mtype);
  useEffect(() => {
    const fetchDetails = async () => {
      getMediaDetails(mid, mtype)
      .then((response) => {
        console.log('Media details:', response.data);
        setDetails(response.data)
      })
      .catch((error) => {
        console.error('Error fetching media details:', error);
      });
    };

    fetchDetails();
  }, []);

    // Update title dynamically once details are fetched
    useLayoutEffect(() => {
      if (details.title || details.name) {
        const title = details.title ? details.title : details.name;
        navigation.setOptions({
          title: title,
          headerTitleStyle: { fontSize: 14 },
          headerTitleAlign: 'center', 
          headerLeft: () => (
            <Text onPress={() => navigation.goBack()} style={styles.backButton}>
              &lt; Back
            </Text>
          ),
          
        });
      }
    }, [details]);
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.item]}>{details.title ? details.title : details.name}</Text>
      {details.poster_path && (
      <Image
        source={{ uri: `${baseImageUrl}${posterSize}${details.poster_path}` }}
        style={[styles.item,{ width: 200, height: 300 }]} // Adjust width and height as needed
      />
    )}
    <Text style={[styles.item,styles.description]}>{details.overview}</Text>
    <Text style={[styles.item,styles.popularity]}>Popularity: {details.popularity} | Release Date: {details.release_date ? details.release_date : details.first_air_date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 5,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10, 
  },
  item: {
    marginTop: 15,
    marginBottom: 15, 
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },  
  backButton: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#3498db',
  },
  description: 
  {
    marginLeft: 20,
    marginRight: 20
  }
});


export default Details;