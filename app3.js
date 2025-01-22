import React, { useState, useContext, createContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const UserContext = createContext();
const TaskContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  
  const addTask = (title, description) => {
    setTasks([...tasks, { id: Date.now(), title, description, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

const Input = ({ label, value, onChangeText, secureTextEntry = false }) => (
  <View style={{ marginBottom: 15 }}>
    <Text>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUser } = useContext(UserContext);

  const handleSignup = () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Invalid email format');
      return;
    }
    setUser({ email });
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <Input label="Email" value={email} onChangeText={setEmail} />
      <Input label="Password" value={password} secureTextEntry onChangeText={setPassword} />
      <Input label="Confirm Password" value={confirmPassword} secureTextEntry onChangeText={setConfirmPassword} />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);

  const handleLogin = () => {
    if (email === user?.email) {
      setUser({ email });
      navigation.navigate('TaskList');
    } else {
      Alert.alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <Input label="Email" value={email} onChangeText={setEmail} />
      <Input label="Password" value={password} secureTextEntry onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const TaskListScreen = ({ navigation }) => {
  const { tasks, addTask, toggleTask, deleteTask } = useContext(TaskContext);
  const { user, setUser } = useContext(UserContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    if (!taskTitle) {
      Alert.alert('Task title is required');
      return;
    }
    addTask(taskTitle, taskDescription);
    setTaskTitle('');
    setTaskDescription('');
  };

  const handleToggleTask = (id) => {
    toggleTask(id);
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  const handleLogout = () => {
    setUser(null);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task List</Text>
      <Text style={styles.subheading}>Welcome, {user?.email}</Text>
      <Text>Tasks Remaining: {tasks.filter(task => !task.completed).length}</Text>

      <View style={{ width: '100%' }}>
        <Input label="Task Title" value={taskTitle} onChangeText={setTaskTitle} />
        <Input label="Task Description" value={taskDescription} onChangeText={setTaskDescription} />
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={[styles.task, item.completed && styles.completedBackground]}>
            <Text style={item.completed && styles.completed}>{item.title}</Text>
            <Text>{item.description}</Text>
            <View style={styles.taskButtons}>
              <TouchableOpacity style={styles.taskButton} onPress={() => handleToggleTask(item.id)}>
                <Text style={styles.buttonText}>{item.completed ? 'Mark Incomplete' : 'Mark Complete'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.taskButton} onPress={() => handleDeleteTask(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => (
  <UserProvider>
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Signup">
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="TaskList" component={TaskListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  </UserProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  task: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  taskButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  taskButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'green',
  },
  completedBackground: {
    backgroundColor: '#d4edda',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default App;
