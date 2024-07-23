import { useEffect, useState, useContext } from "react";
import {UserContext} from "../App.js";
import {formatISO9075} from 'date-fns';
import { Navigate } from "react-router-dom";
import {ConfirmOrderPopup} from "./ConfirmOrderPopup.js";
import { useNavigate } from "react-router-dom";


export default function CartPage(){
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [cartShoes, setCartShoes] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();


    console.log('in cart page');
    console.log(userInfo);
    
    function deleteItem(shoeId){
        const updatedCart = cartShoes.filter(shoe => shoe._id !== shoeId);
        console.log(updatedCart);
        setCartShoes(updatedCart);
        setUserInfo({
            name:userInfo.name,
            email: userInfo.email,
            phone: userInfo.phone,
            password:userInfo.password,
            cart:updatedCart,
            favorites:userInfo.favorites,
            selectedSize: userInfo.selectedSize
        })
    }

    function getCurrentDate(days=5, separator=''){
        let newDate = new Date();
        newDate.setDate(newDate.getDate() + days);
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
    }

    //close the popup
    const handleClosePopup = async() => {
        setShowPopup(false);
        //empty cart

        const message = `Dear ${userInfo.name? userInfo.name : 'Customer'}, \nYou have successfully placed an order at Elite Footwear. \nHere's your order details: \n${cartShoes.map((shoe, index)=>{
            return `${index+1}. ${shoe.name}, size:${userInfo.selectedSize[index]}\n`;
        })}total order amount = ${cartShoes.reduce((total, shoe) => total + shoe.price, 0)} \nRegards, \nTeam Elite Footwear`;
        
        setUserInfo({
            name:userInfo.name,
            email: userInfo.email,
            phone: userInfo.phone,
            password:userInfo.password,
            cart:[],
            favorites:userInfo.favorites,
            selectedSize: userInfo.selectedSize
        });

        // await fetch("http://localhost:4000/api/send-email", {
        //     method:'POST',
        //     body: JSON.stringify({
        //         email: userInfo.email,
        //         subject: 'Order Placed!',
        //         message: message
        //     }),
        //     headers: {'Content-type': 'application/json'}
        // }).then(response =>{
        //     response.json().then(response=>{
        //         console.log(response);
        //     });
        // });

        // Navigate to index page or perform any other action
        navigate("/");// Navigate to the index page
    };


    useEffect(()=>{
        if (!userInfo || !userInfo.email) {
            setRedirect(true);
            return;
        }
        fetch("http://localhost:4000/api/customer/getcart",{
            method: 'POST',
            body: JSON.stringify(userInfo.cart),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }).then(response =>{
            response.json().then(cartShoes => {
                setCartShoes(cartShoes);
            });
        })
    }, [userInfo]);


    if (redirect){
        return <Navigate to="/login" />;
    }
    // console.log(cartShoes);


    async function placeOrder(){
        await fetch("http://localhost:4000/api/placeorder",{
            method:'POST',
            body: JSON.stringify({
                                    name: userInfo.name,
                                    phone: userInfo.phone,
                                    email: userInfo.email,
                                    order_amt : cartShoes.reduce((total, shoe) => total + shoe.price, 0),
                                    order_date: getCurrentDate(0,'-'),
                                    delv_date: getCurrentDate(5,'-')
                                }),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }).then(response=>{
            if (response.ok){
                console.log('placed order successfuly');
                console.log(response);
                setShowPopup(true);
            }
        });
    }


    
    return (
        <>
            <h1 style={{fontFamily:'nike-font', marginTop:'100px', textAlign:'center'}}>YOUR CART</h1>
            
            <div className="cart-container">
                {cartShoes.length>0? (cartShoes.map((shoe,index) => 
                    <div key={shoe._id} className="cart-list-item">
                        <img src={shoe.photos[0]}/>

                        <div style={{borderRadius:'7px', alignItems:'center',justifyContent:'center',display:'flex', flexDirection:'column'/*,textAlign:'center'*/, fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}>
                            <div>Product: {shoe.name}</div>
                            <div style={{fontSize:'0.8rem'}}>Size: {userInfo.selectedSize[index]}</div>
                        </div>

                        <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)'}}> ₹{shoe.price}</div>

                        <div style={{borderRadius:'7px',alignItems:'center',justifyContent:'center',display:'flex',textAlign:'center', fontFamily:'regular-font',background:'linear-gradient(to bottom,#cdcdcdc7, white)', cursor:'pointer'}} onClick={() => {deleteItem(shoe._id)}}>
                            <svg width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </div>


                    </div>
                )) : (
                    <div className="empty-cart">
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png" alt="Empty Cart" />
                        <div style={{textAlign:'center', fontFamily:'regular-font'}}>Your cart is empty</div>
                    </div>
            )}

            </div>

            {cartShoes.length>0 &&
                <div className="cart-amt-details" style={{marginTop:'30px', width:'60%', marginLeft:'20%'}}>
                    <span style={{fontFamily:'nike-font', fontSize:'1.2rem', marginRight:'15px'}}>ORDER DATE:  </span> <span style={{fontFamily:'regular-font'}}>{getCurrentDate(0,'-')}</span><br/><br/>
                    <span style={{fontFamily:'nike-font', fontSize:'1.2rem', marginRight:'15px'}}>DELIVERY DATE:  </span> <span style={{fontFamily:'regular-font'}}>{getCurrentDate(5,'-')}</span><br/><br/>
                    
                    <span style={{fontFamily:'nike-font', fontSize:'1.2rem', marginRight:'15px'}}>TOTAL ORDER AMOUNT:  </span>
                    <span style={{ fontFamily: 'regular-font' }}>
                        ₹{cartShoes.reduce((total, shoe) => total + shoe.price, 0)}
                    </span>

                    <button style={{width:'50%', height:'35px', borderRadius:'14px',padding:'0', border:'none',backgroundColor:'black',color:'white', fontFamily:'nike-font', marginTop:'35px', marginLeft:'25%', display:'flex', alignItems:'center', textAlign:'center', justifyContent:'center', cursor:'pointer'}} onClick={placeOrder}>PLACE ORDER</button>

                </div>
            }

            {showPopup && <ConfirmOrderPopup onClose={handleClosePopup} />}
        </>
    );
}