import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  const plus = () => {
    if (count < 100) setCount(count + 1);
  };
  const minus = () => {
    if (count > 0) setCount(count - 1);
  };

// ==========================================================
  const [text, setText] = useState('');

  // ===================================================
    const [color, setColor] = useState('white');
    const changeBack = () => {
      if (color === 'white') {
        setColor('blue');
      } 
      else if (color === 'blue') {
        setColor('red');
      } 
      else if (color === 'red') {
        setColor('yellow');
      } 
      else if (color === 'yellow') {
        setColor('green');
      } 
      else {
        setColor('white');
      }
    };
    // ==========================================================
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([]);
  const addEl = () => {
    if (inputText) {
      setItems([...items, inputText]);
      setInputText('');
    }
  };

  //===================================================
  const [imageUrl, setImageUrl] = useState('');
  const [loadedImage, setLoadedImage] = useState(null);
  const loadImage = () => setLoadedImage(imageUrl);



  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.section}>
        <Text style={styles.text}>Counter: {count}</Text>
        <View style={styles.buttons}>
          <Button title="plus" onPress={plus} />
          <Button title="minus" onPress={minus} />
        </View>
      </View>

      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Enter text"
          onChangeText={setText}
          value={text}
        />
        <Text style={styles.text}>
          {text.length > 0 ? text : 'Enter text'}
        </Text>
      </View>

      <View style={styles.section}>
        <Button title="Change background" onPress={changeBack} />
      </View>

      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Enter el"
          onChangeText={setInputText}
          value={inputText}
        />
        <Button title="Add" onPress={addEl} />
        <FlatList
          data={items}
          key={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        />
      </View>

      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Enter img URL"
          onChangeText={setImageUrl}
          value={imageUrl}
        />
        <Button title="Download" onPress={loadImage} />
        {loadedImage ? (
          <Image source={{ uri: loadedImage }} style={styles.image} />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  section: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: 'purple',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    fontSize: 18,
    padding: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom:30,
  },
});

export default App;