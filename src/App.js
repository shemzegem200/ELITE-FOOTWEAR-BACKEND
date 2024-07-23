import { Routes, Route } from 'react-router-dom';
import React, {useEffect} from 'react';
import './App.css';
import { Layout } from './Layout.js';
import { IndexPage } from './pages/IndexPage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import { ShoePage } from './pages/ShoePage.js';
import ShopPage from './pages/ShopPage.js';
import { createContext, useState } from 'react';
import AboutPage from './pages/AboutPage.js';
import ContactPage from './pages/ContactPage.js';
import CartPage from './pages/CartPage.js';
import FavoritesPage from './pages/FavoritesPage.js';
import { MainPage } from './AdminPages/MainPage.js';
import { AllCustomers } from './AdminPages/AllCustomers.js';
import { AllOrders } from './AdminPages/AllOrders.js';
import { AddItemPage } from './AdminPages/AddItemPage.js';
import { DelItemPage } from './AdminPages/DelItemPage.js';


export const UserContext = createContext();


function App() {

  //function to obtain cookie value
  function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if this cookie starts with the provided cookieName
      if (cookie.startsWith(cookieName + '=')) {
        // Return the value of the cookie
        return cookie.substring(cookieName.length + 1);
      }
    }
    // Return null if cookie not found
    return null;
  }

  //this happens whenever the page is loaded
  useEffect(() => {
      const myCookieValue = getCookie('token');
      if (myCookieValue===null || myCookieValue==='') return;

      console.log('im here');
      fetch("http://localhost:4000/api/profile", {
        credentials: 'include'
      })
      .then((response) => {
        response.json().then( userInfo => {
          setUserInfo(userInfo);
        })
      });
  }, []);

  const [userInfo, setUserInfo] = useState({});

  return (
    <>
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/shoe-page/:id' element={<ShoePage />} />
          <Route path='/shop' element={<ShopPage/>} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/contactus' element={<ContactPage/>} />
          <Route path='/viewcart' element={<CartPage/>} />
          <Route path='/favorites' element={<FavoritesPage/>} />
          <Route path='/admin' element={<MainPage/>} />
          { userInfo.email==='admin@gmail.com' &&
          <>
            <Route path='/all-cust' element={<AllCustomers/>} />
            <Route path='/all-orders' element={<AllOrders/>} />
            <Route path='/add-item' element={<AddItemPage/>} />
            <Route path='/del-item' element={<DelItemPage/>} />
          </>
          }
        </Route>
      </Routes>
    </UserContext.Provider>
    </>
  );
}

export default App;
