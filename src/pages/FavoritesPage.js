import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../App.js";
import { useNavigate } from "react-router-dom";
import { ShoeCard } from "./ShoeCard.js";
import { Navigate } from "react-router-dom";

export default function FavoritesPage(){
    const [favShoes, setFavShoes] = useState([]);
    const {userInfo, setUserInfo} = useContext(UserContext);
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);


    useEffect(()=>{
        if (!userInfo || !userInfo.email) {
            setRedirect(true);
            return;
        }
        fetch("http://localhost:4000/api/customer/getfavorites",{
            method: 'POST',
            body: JSON.stringify(userInfo.favorites),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }).then(response =>{
            response.json().then(FavShoes => {
                setFavShoes(FavShoes);
            });
        })
    }, [userInfo]);

    
    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <>
        <h1 style={{fontFamily:'nike-font', marginTop:'100px', textAlign:'center'}}>FAVORITES</h1>
        <div className="shoe-card-container">
                {favShoes.length>0 ? favShoes.map(shoe =>
                    <ShoeCard key={shoe._id} shoe={shoe} />
                ) : (
                    <div className="empty-cart">
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png" alt="No Favorites" />
                        <div style={{textAlign:'center', fontFamily:'regular-font'}}>Add Items to Favorites</div>
                    </div>
                )}
        </div>
        </>
    );
}