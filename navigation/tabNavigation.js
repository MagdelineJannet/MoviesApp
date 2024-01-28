import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MoviesScreen from '../components/movies';
import TVShowsScreen from '../components/tvShows';
import SearchScreen from '../components/searchMedia';
import Details from '../components/viewDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';  

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  const MovieStack = createNativeStackNavigator();
  const SearchStack = createNativeStackNavigator();
  const TVStack = createNativeStackNavigator();

  const MovieStackScreen = () => (
    <MovieStack.Navigator>
      <MovieStack.Screen name="Movie" component={MoviesScreen} options={{ headerShown: false}} />
      <MovieStack.Screen name="Details" component={Details}/>
    </MovieStack.Navigator>
  );

  const SearchStackScreen = () => (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
      <SearchStack.Screen name="Details" component={Details}/>
    </SearchStack.Navigator>
  );

  const TvStackScreen = () => (
    <TVStack.Navigator>
      <TVStack.Screen name="Tv" component={TVShowsScreen} options={{ headerShown: false }}/>
      <TVStack.Screen name="Details" component={Details}/>
    </TVStack.Navigator>
  );

  return (   
    <Tab.Navigator>         
      <Tab.Screen name="Movies" component={MovieStackScreen} />
      <Tab.Screen name="Search Results" component={SearchStackScreen} />
      <Tab.Screen name="TV Shows" component={TvStackScreen} />  
    </Tab.Navigator>
  );
};

export default TabNavigator;
