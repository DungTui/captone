import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AddProducts } from './components/AddProducts'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { ProductsContextProvider } from './global/ProductsContext'
import { auth, db } from './config/Config'
import { CartContextProvider } from './global/CartContext'
import { Cart } from './components/Cart'
import { Cashout } from './components/Cashout'
import { NotFound } from './components/NotFound'
import { HistoryBuy } from './components/HistoryBuy'
import { HistoryBuyContextProvider } from './global/HistoryBuyContext'
import { OrderStaff } from './components/OrderStaff'
import { OrderStaffContextProvider } from './global/OrderStaffContext'
import { ProductAdmin } from './components/ProductAdmin'
import EditProduct from './components/EditProduct'


export default class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
          this.setState({
            user: snapshot.data().Name
          })
        })
      }
      else {
        this.setState({
          user: null
        })
      }
    })
  }

  render() {
    return (
      <OrderStaffContextProvider>
        <HistoryBuyContextProvider>
          <ProductsContextProvider>
            <CartContextProvider>
              <BrowserRouter>
                <Switch>
                  <Route exact path='/' component={() => <Home user={this.state.user} />} />
                  <Route path='/addproducts' component={AddProducts} />
                  <Route path='/login' component={Login} />
                  <Route path='/signup' component={Signup} />
                  <Route path='/cartproducts' component={() => <Cart user={this.state.user} />} />
                  <Route path='/cashout' component={() => <Cashout user={this.state.user} />} />
                  <Route path='/historybuy' component={HistoryBuy} />
                  <Route path='/productmanager' component={ProductAdmin} />
                  <Route path='/editproduct/:id' component={EditProduct} />
                  <Route path='/stafforder' component={OrderStaff} />
                  <Route component={NotFound} />
                </Switch>
              </BrowserRouter>
            </CartContextProvider>
          </ProductsContextProvider>
        </HistoryBuyContextProvider>
      </OrderStaffContextProvider>
    )
  }
}
