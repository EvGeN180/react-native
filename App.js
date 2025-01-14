import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    if (!city) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    try {
      setError(null); 
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a533b1fc4696512a4ff63f489f0e7151&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Forecast</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={getWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      {weather && (
        <View style={styles.weatherInfo}>
          <Text style={styles.temperature}>{weather.main.temp}°C</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png` }}
            style={styles.icon}
          />
          <Text style={styles.details}>Humidity: {weather.main.humidity}%</Text>
          <Text style={styles.details}>Wind Speed: {weather.wind.speed} m/s</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1.5,
    borderRadius: 12,
    marginBottom: 20,
    borderColor: '#d1d8e0',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: '#e74c3c',
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  weatherInfo: {
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 15,
    width: '100%',
    maxWidth: 350,
    alignSelf: 'center',
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  description: {
    fontSize: 18,
    color: '#7f8c8d',
    marginVertical: 12,
    textAlign: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  details: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default App;
