import { Fragment, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {ToastContainer} from "react-toastify"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadUser } from './actions/authAction'
import './App.css'
import Header from './component/layout/Header'
import Footer from './component/layout/Footer'
import Home from './component/layout/Home'

import ProductDetail from './component/product/productDetail'
import Search from './component/layout/search'
import Login from './component/user/Login'
import Register from './component/user/Register'
import Profile from './component/user/profile'
import ProfileUpdate from './component/user/profileUpdate'
import PasswordChange from './component/user/passwordChange'
import ForgotPassword from './component/user/forgotPassword'
import ResetPassword from './component/user/resetPassword'
import ProtectedRoute from "./component/route/productedRoute"
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Cart from './component/cart/cart'
import Shipping from './component/cart/shipping'
import ConfirmOrder from './component/cart/confirmOrder'
import Payment from './component/cart/payment'
import PaymentSuccess from './component/cart/orderSucess'
import axios from 'axios'
import MyOrder from './component/order/myOrder'
import OrderDetail from './component/order/orderDetail'
import DashBoard from './component/admin/dashboard'
import ProductList from './component/admin/productList'
import CreateProduct from './component/admin/createProduct'
import UpdateProduct from './component/admin/updateProduct'
import AdminOrder from './component/admin/adminOrder'
import UpdateOrder from './component/admin/updateOrder'
import UserAdmin from './component/admin/userAdmin'
import UpdateUser from './component/admin/updateUser'

function App() {
  const dispatch=useDispatch()
  
  const [stripeApi,setStripeApi]= useState('')
  const stripeKey=async()=>{
    const {data}=await axios.get('/api/v1/payment/api')
    setStripeApi(data.stripApiKey)
  }
  useEffect(()=>{
    dispatch(loadUser)
    stripeKey()

  },[dispatch])
  
  return (
    <Router>
      <Header />
      <ToastContainer theme="dark"/>
      <Routes>
        <Route path='/' element={<Home />} />
        
          
          
        <Route path='/product/:id' element={<ProductDetail/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/password/change' element={<ProtectedRoute><PasswordChange/></ProtectedRoute>} />
        <Route path='/password/forgot' element={<ForgotPassword/>} />
        <Route path='/password/reset/:token' element={<ResetPassword/>} />
        <Route path='/profile/update' element={<ProtectedRoute><ProfileUpdate/></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute>} />
        <Route path='/confirm/order' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>} />
        {
          stripeApi&&

        <Route path='/payment/process' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApi)}><Payment/></Elements></ProtectedRoute>} />
        }
        <Route path='/order/success' element={<ProtectedRoute><PaymentSuccess/></ProtectedRoute>} />
        <Route path='/myorder' element={<ProtectedRoute><MyOrder/></ProtectedRoute>} />
        <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute>} />
        <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><DashBoard /></ProtectedRoute>} />
        <Route path='/admin/product' element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} />
        <Route path='/admin/product/create' element={<ProtectedRoute isAdmin={true}><CreateProduct/></ProtectedRoute>} />
        <Route path='/admin/product/update/:id' element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>} />
        <Route path='/admin/order' element={<ProtectedRoute isAdmin={true}><AdminOrder/></ProtectedRoute>} />
        <Route path='/admin/order/update/:id' element={<ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute>} />
        <Route path='/admin/user' element={<ProtectedRoute isAdmin={true}><UserAdmin/></ProtectedRoute>} />
        <Route path='/admin/user/update/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>} />
        
          
        
      </Routes>
      <Footer />
    </Router>

  )
}

export default App
