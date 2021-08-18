import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './Screens/HomeScreen'
import { HashRouter as Router, Route } from 'react-router-dom'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import LoginScreens from './Screens/LoginScreens'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import OrderScreen from './Screens/OrderScreen'


function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component= {HomeScreen} exact/>
          <Route path='/:id' component= {ProductScreen} exact />
          <Route path='/product/cart/:id?' component={CartScreen} />
          <Route path='/user/login' component={LoginScreens} />
          <Route path='/user/register' component={RegisterScreen} />
          <Route path='/user/profile' component={ProfileScreen} />
          <Route path='/user/shipping' component={ShippingScreen} />
          <Route path='/user/payment' component={PaymentScreen} />
          <Route path='/user/placeOrder' component={PlaceOrderScreen} />
          <Route path='/user/order/:id?' component={OrderScreen} />
        </Container>
        
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
