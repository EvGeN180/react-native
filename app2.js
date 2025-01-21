import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';


const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('ProductList');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Помилка при завантаженні продуктів:', error));
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  const changeQuantity = (productId, action) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId) {
        const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        if (newQuantity <= 0) {
          removeFromCart(productId);
          return null;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item !== null));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const ProductDetailsScreen = () => (
    <View style={styles.screen}>
      <Image source={{ uri: selectedProduct?.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{selectedProduct?.title}</Text>
      <Text style={styles.productDescription}>{selectedProduct?.description}</Text>
      <Text style={styles.price}>${selectedProduct?.price}</Text>
      <TouchableOpacity style={styles.button} onPress={() => addToCart(selectedProduct)}>
        <Text style={styles.buttonText}>Додати в кошик</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSecondary} onPress={() => setCurrentScreen('ProductList')}>
        <Text style={styles.buttonText}>Назад до продуктів</Text>
      </TouchableOpacity>
    </View>
  );

  const ProductListScreen = () => (
    <View style={styles.screen}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() => {
              setSelectedProduct(item);
              setCurrentScreen('ProductDetails');
            }}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const CartScreen = () => (
    <View style={styles.screen}>
      <Text style={styles.cartTitle}>Ваш кошик</Text>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.cartItemTitle}>{item.title}</Text>
            <Text style={styles.cartItemText}>Кількість: {item.quantity}</Text>
            <Text style={styles.cartItemText}>${(item.price * item.quantity).toFixed(2)}</Text>
            <View style={styles.cartActions}>
              <TouchableOpacity style={styles.cartButton} onPress={() => changeQuantity(item.id, 'decrease')}>
                <Text style={styles.cartButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cartButton} onPress={() => changeQuantity(item.id, 'increase')}>
                <Text style={styles.cartButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cartButton} onPress={() => removeFromCart(item.id)}>
                <Text style={styles.cartButtonText}>Видалити</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Text style={styles.total}>Загальна сума: ${calculateTotal()}</Text>
      <TouchableOpacity style={styles.buttonSecondary} onPress={() => setCurrentScreen('ProductList')}>
        <Text style={styles.buttonText}>Назад до продуктів</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {currentScreen === 'ProductList' && <ProductListScreen />}
      {currentScreen === 'Cart' && <CartScreen />}
      {currentScreen === 'ProductDetails' && <ProductDetailsScreen />}
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('ProductList')}>
          <Text style={styles.navButtonText}>Продукти</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('Cart')}>
          <Text style={styles.navButtonText}>Кошик</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
  },
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 10,
    elevation: 5,
  },
  productItem: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#777',
    marginVertical: 10,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#f8f8f8',
    marginBottom: 15,
    elevation: 3,
  },
  cartItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemText: {
    fontSize: 16,
    color: '#555',
  },
  cartActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cartButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  total: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },

  buttonText: {
    color: '#fff',  
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
