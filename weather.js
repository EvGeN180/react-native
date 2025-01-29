import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import axios from 'axios';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const weatherReducer = (state = { weatherData: [], loading: false }, action) => {
  switch (action.type) {
    case 'FETCH_WEATHER':
      return { ...state, weatherData: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: true };
    default:
      return state;
  }
};

const fetchWeather = (data) => ({
  type: 'FETCH_WEATHER',
  payload: data,
});

const setLoading = () => ({
  type: 'SET_LOADING',
});

const store = createStore(weatherReducer);

// WeatherScreen component
const WeatherScreen = ({ navigation }) => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weatherData);
  const loading = useSelector((state) => state.loading);

  const getWeather = async () => {
    dispatch(setLoading());
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a533b1fc4696512a4ff63f489f0e7151&units=metric`
      );
      dispatch(fetchWeather(response.data));
    } catch (error) {
      console.error(error);
      dispatch(fetchWeather([]));
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://c02.purpledshub.com/uploads/sites/41/2018/12/GettyImages-tree2-6684a9b.jpg?w=1029&webp=1' }}  // Replace with your desired 
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
        />
        <Button title="Get Weather" onPress={getWeather} color="#007bff" />
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          weatherData.main && (
            <View style={styles.weatherInfo}>
              <Text style={styles.text}>
                Temperature: {weatherData.main.temp}°C
              </Text>
              <Text style={styles.text}>
                Weather: {weatherData.weather[0].description}
              </Text>
              <Text style={styles.text}>
                Humidity: {weatherData.main.humidity}%
              </Text>
              <Button title="View Details" onPress={() => navigation.navigate('Details')} color="#28a745" />
            </View>
          )
        )}
      </View>
    </ImageBackground>
  );
};


const DetailsScreen = () => {
  const weatherData = useSelector((state) => state.weatherData);

  return (
    <ScrollView contentContainerStyle={styles.detailsContainer}>
      <Text style={styles.detailsHeader}>Weather Details</Text>
      <Text style={styles.detailsText}>Location: {weatherData.name}</Text>
      <Text style={styles.detailsText}>Country: {weatherData.sys.country}</Text>
      <Text style={styles.detailsText}>Temperature: {weatherData.main.temp}°C</Text>
      <Text style={styles.detailsText}>Feels Like: {weatherData.main.feels_like}°C</Text>
      <Text style={styles.detailsText}>Weather: {weatherData.weather[0].description}</Text>
      <Text style={styles.detailsText}>Humidity: {weatherData.main.humidity}%</Text>
      <Text style={styles.detailsText}>Pressure: {weatherData.main.pressure} hPa</Text>
      <Text style={styles.detailsText}>Wind Speed: {weatherData.wind.speed} m/s</Text>
    </ScrollView>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={WeatherScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    margin: 16,
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 16,
    width: '80%',
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#000',
  },
  weatherInfo: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    padding: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
    color: '#fff',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  detailsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  detailsText: {
    fontSize: 18,
    marginBottom: 12,
    color: '#495057',
  },
});

export default App;
