// import React, { useState } from 'react';
// import { View, Text, FlatList, Image, TouchableOpacity, Modal, StyleSheet, useWindowDimensions } from 'react-native';

// const App = () => {
//   const photos = [
//     { id: '1', uri: 'https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//     { id: '2', uri: 'https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//     { id: '3', uri: 'https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//     { id: '4', uri: 'https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//     { id: '5', uri: 'https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//     { id: '6', uri: 'https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//     { id: '7', uri: 'https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//     { id: '8', uri: 'https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//   ];

//   const { width } = useWindowDimensions();

//   const numColumns = width > 500 ? 3 : 2;

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const openModal = (uri) => {
//     setSelectedImage(uri);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setSelectedImage(null);
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         key={numColumns} 
//         data={photos}
//         keyExtractor={(item) => item.id}
//         numColumns={numColumns}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => openModal(item.uri)} style={styles.photoContainer}>
//             <Image source={{ uri: item.uri }} style={styles.photo} />
//           </TouchableOpacity>
//         )}
//       />

//       {modalVisible && (
//         <Modal
//           visible={modalVisible}
//           transparent={true}
//           animationType="fade"
//           onRequestClose={closeModal}
//         >
//           <View style={styles.modalBackground}>
//             <TouchableOpacity style={styles.modalClose} onPress={closeModal}>
//               <Text style={styles.closeText}>X</Text>
//             </TouchableOpacity>
//             <Image source={{ uri: selectedImage }} style={styles.modalImage} />
//           </View>
//         </Modal>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   photoContainer: {
//     margin: 5,
//     flex: 1,
//   },
//   photo: {
//     width: '100%',
//     height: 150,
//     borderRadius: 10,
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   },
//   modalImage: {
//     width: '90%',
//     height: '80%',
//     borderRadius: 10,
//   },
//   modalClose: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     padding: 10,
//     borderRadius: 50,
//   },
//   closeText: {
//     color: 'white',
//     fontSize: 20,
//   },
// });

// export default App;


// =======================================

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   useWindowDimensions,
//   Dimensions
// } from 'react-native';

// const App = () => {
//   const { width, height } = useWindowDimensions();
//   const [input, setInput] = useState('');
//   const [result, setResult] = useState('');


//   const buttons = [
//     ['7', '8', '9', '/'],
//     ['4', '5', '6', '*'],
//     ['1', '2', '3', '-'],
//     ['0', '.', '=', '+']
//   ];

//   const numColumns = width > height ? 6 : 4;


//   const handleButtonPress = (value) => {
//     if (value === '=') {
//       try {
//         setResult(eval(input).toString()); 
//       } catch (error) {
//         setResult('Error');
//       }
//       setInput('');
//     } else {
//       setInput(input + value);
//     }
//   };

//   const handleClear = () => {
//     setInput('');
//     setResult('');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.screen}>
//         <Text style={styles.input}>{input}</Text>
//         <Text style={styles.result}>{result}</Text>
//       </View>


//       <FlatList
//         data={buttons}
//         renderItem={({ item }) => (
//           <View style={styles.row}>
//             {item.map((button, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[styles.button, { width: width / numColumns - 10 }]}
//                 onPress={() => handleButtonPress(button)}
//               >
//                 <Text style={styles.buttonText}>{button}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />

    
//       <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
//         <Text style={styles.clearText}>Clear</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   justifyContent: 'flex-start',
//   alignItems: 'center',
//   backgroundColor: '#1e1e1e', 
//   paddingTop: 50,
// },
// screen: {
//   width: '90%',
//   padding: 20,
//   backgroundColor: '#333', 
//   borderRadius: 15, 
//   justifyContent: 'center',
//   alignItems: 'flex-end',
//   marginBottom: 20,
//   marginTop: 20,
// },
// input: {
//   fontSize: 50,
//   color: 'white',
//   marginBottom: 10,
// },
// result: {
//   fontSize: 40,
//   color: 'white',
// },
// row: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   marginBottom: 15,
// },
// button: {
//   backgroundColor: '#444',
//   justifyContent: 'center',
//   alignItems: 'center',
//   paddingVertical: 20,
//   borderRadius: 12, 
//   margin: 5,
// },
// buttonText: {
//   fontSize: 28,
//   color: 'white',
//   fontWeight: 'bold',
// },
// clearButton: {
//   marginTop: 30,
//   backgroundColor: '#ff5733',
//   paddingVertical: 20,
//   paddingHorizontal: 50,
//   borderRadius: 15,
//   marginBottom: 90, 
// },
// clearText: {
//   fontSize: 30,
//   color: 'white',
//   fontWeight: 'bold',
// },
// });

// export default App;


// ==========================================


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';

// const App = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');

//   const addTask = () => {
//     if (newTask.trim()) {
//       setTasks([
//         ...tasks,
//         { id: Date.now().toString(), text: newTask },
//       ]);
//       setNewTask('');
//     }
//   };

//   const deleteTask = (taskId) => {
//     setTasks(tasks.filter((task) => task.id !== taskId));
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.listContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter a new task"
//           value={newTask}
//           onChangeText={setNewTask}
//         />
//         <Button title="Add" onPress={addTask} />

//         <FlatList
//           data={tasks}
//           renderItem={({ item }) => (
//             <View style={styles.task}>
//               <Text style={styles.taskText}>{item.text}</Text>
//               <TouchableOpacity onPress={() => deleteTask(item.id)}>
//                 <Text style={styles.deleteButton}>Delete</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//           keyExtractor={(item) => item.id}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f4f7',
//     padding: 20,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     height: 50,
//     width: '100%',
//     borderColor: '#007bff',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingLeft: 15,
//     fontSize: 16,
//     backgroundColor: '#fff',
//     marginTop:50,
//   },
//   task: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   taskText: {
//     fontSize: 18,
//     flex: 1,
//     color: '#333',
//   },
//   deleteButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     backgroundColor: '#e74c3c',
//     borderRadius: 8,
//   },
//   deleteButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// export default App;


// =========================

// import React, { useState } from 'react';
// import { 
//   View, 
//   FlatList, 
//   Text, 
//   Image, 
//   Modal, 
//   Button, 
//   TouchableOpacity, 
//   StyleSheet, 
//   useWindowDimensions, 
//   Platform 
// } from 'react-native';

// const App = () => {
//   const { width } = useWindowDimensions(); 
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   // Sample product data
//   const products = [
//     { id: '1', name: 'Product 1', price: '100$', image: 'https://appleroom.ua/wa-data/public/shop/products/66/85/18566/images/42200/42200.750.png' },
//     { id: '2', name: 'Product 2', price: '150$', image: 'https://appleroom.ua/wa-data/public/shop/products/66/85/18566/images/42200/42200.750.png' },
//     { id: '3', name: 'Product 3', price: '200$', image: 'https://appleroom.ua/wa-data/public/shop/products/66/85/18566/images/42200/42200.750.png' },
//     { id: '4', name: 'Product 4', price: '250$', image: 'https://appleroom.ua/wa-data/public/shop/products/66/85/18566/images/42200/42200.750.png' },
//     { id: '5', name: 'Product 5', price: '300$',  image: 'https://appleroom.ua/wa-data/public/shop/products/66/85/18566/images/42200/42200.750.png' },
//     { id: '6', name: 'Product 6', price: '350$',  image: 'https://appleroom.ua/wa-data/public/shop/products/66/85/18566/images/42200/42200.750.png' },
//   ];

//   const getColumns = () => {
//     if (width < 600) {
//       return 2;
//     } else if (width < 1000) {
//       return 3;
//     } else {
//       return 4; 
//     }
//   };


//   const numColumns = getColumns();
//   const cardWidth = (width / numColumns) - 16; 

//   const handleSelectProduct = (product) => {
//     setSelectedProduct(product);
//     setModalVisible(true);
//   }
//   const renderItem = ({ item }) => (
//     <TouchableOpacity 
//       style={[styles.card, { width: cardWidth }]} 
//       onPress={() => handleSelectProduct(item)}
//     >
//       <Image source={{ uri: item.image }} style={styles.image} />
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.price}>{item.price}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={products}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         numColumns={numColumns}
//         columnWrapperStyle={styles.columnWrapper}
//         contentContainerStyle={styles.flatListContainer}
//         key={numColumns} 
//       />
//       {selectedProduct && (
//         <Modal
//           visible={modalVisible}
//           animationType="slide"
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalContent}>
//             <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
//             <Text style={styles.modalText}>{selectedProduct.name}</Text>
//             <Text style={styles.modalText}>{selectedProduct.price}</Text>
//             <Button title="Close" onPress={() => setModalVisible(false)} />
//           </View>
//         </Modal>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f7f7f7',
//   },
//   flatListContainer: {
//     paddingBottom: 20,
//   },
//   columnWrapper: {
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   image: {
//     width: '100%',
//     height: 120,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//     color: '#333',
//   },
//   price: {
//     fontSize: 14,
//     color: '#888',
//   },
//   modalContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     padding: 20,
//   },
//   modalImage: {
//     width: 200,
//     height: 200,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 8,
//     textAlign: 'center',
//     color: '#333',
//   },
// });

// export default App;

