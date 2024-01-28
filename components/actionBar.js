import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ActionBar = ({ appName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{appName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#3498db',
    paddingTop: 5,
    marginTop:45,
    marginBottom:0,
    paddingBottom:0
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  
});

export default ActionBar;
