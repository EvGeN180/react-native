import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";

// Redux slice
const initialState = {
  messages: {
    room1: [],
    room2: [],
  },
  users: {} // Store user details
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { userId, userName } = action.payload;
      state.users[userId] = userName;
    },
    sendMessage: (state, action) => {
      const { roomId, message, userId } = action.payload;
      const userName = state.users[userId] || "Unknown";
      const timestamp = new Date().toISOString();
      state.messages[roomId].push({
        message,
        userId,
        userName,
        timestamp
      });
    }
  }
});

export const { registerUser, sendMessage } = chatSlice.actions;

const store = configureStore({ reducer: chatSlice.reducer });

// Chat Component
const Chat = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [activeRoom, setActiveRoom] = useState("room1");
  
  const messages = useSelector((state) => state.messages[activeRoom]);

  const handleRegister = () => {
    if (userId && userName) {
      dispatch(registerUser({ userId, userName }));
    }
  };

  const handleSendMessage = () => {
    if (message && userId) {
      dispatch(sendMessage({ roomId: activeRoom, message, userId }));
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Application</Text>
      <TextInput
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
        style={styles.input}
      />
      <TextInput
        placeholder="User Name"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} color="#1E90FF" />
      
      <View style={styles.roomSwitchContainer}>
        <TouchableOpacity onPress={() => setActiveRoom("room1")} style={styles.roomButton}>
          <Text style={styles.roomButtonText}>Room 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveRoom("room2")} style={styles.roomButton}>
          <Text style={styles.roomButtonText}>Room 2</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Type a message"
        value={message}
        onChangeText={setMessage}
        style={styles.messageInput}
      />
      <Button title="Send" onPress={handleSendMessage} color="#32CD32" />

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.message}>
            <Text style={styles.userName}>{item.userName}</Text>: {item.message} ({new Date(item.timestamp).toLocaleTimeString()})
          </Text>
        )}
      />
    </View>
  );
};

const App = () => (
  <Provider store={store}>
    <Chat />
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
  },
  messageInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    padding: 8,
  },
  roomSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  roomButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
  },
  roomButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  message: {
    marginBottom: 10,
    fontSize: 16,
  },
  userName: {
    fontWeight: 'bold',
  },
});

export default App;
