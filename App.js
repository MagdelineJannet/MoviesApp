import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/tabNavigation';
import { SafeAreaView, Platform, StatusBar, StyleSheet, View} from 'react-native';
import ActionBar from './components/actionBar';

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>        
        <SafeAreaView style={styles.safeAreaView}>
        <ActionBar appName="Movies App" />
          <TabNavigator />
        </SafeAreaView>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeAreaView: {
    flex: 1,
  },
});

export default App;


