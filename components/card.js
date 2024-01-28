//movie/tv shows cards
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Card = ({ title, imageUrl, popularity, releaseDate, id ,type}) => {
  const navigation = useNavigation();
  const handleButtonPress = () => {
    navigation.navigate('Details',{mid:id,mtype:type});
  };
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text>{popularity}</Text>
        <Text>{releaseDate}</Text>
        <Pressable style={styles.actionButton} onPress={handleButtonPress}>
          <Text style={styles.actionButtonText}>More Details</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    elevation: 2, // For Android
    shadowColor: '#000', // For iOS
    shadowOpacity: 0.2, // For iOS
    shadowRadius: 2, // For iOS
  },
  cardImage: {
    width: 150,
    height: 170,
    resizeMode: 'cover'
  },
  cardDetails: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#3498db',
    marginTop: 10,
  },
  actionButtonText: {
    color: '#fff',
    textAlign: 'center',
    padding:10
  },
});

export default Card;
