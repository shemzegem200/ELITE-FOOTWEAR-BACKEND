import {useState, useContext} from "react";
import {Navigate} from "react-router-dom";
import { UserContext } from "../App";



export default function LoginPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pno, setPno] = useState('');
    const [redirect, setRedirect] = useState(false);

    const {userInfo, setUserInfo} = useContext(UserContext);

    async function login(ev){
        ev.preventDefault();
        // if (email === 'admin@gmail.com' && password==='admin'){
        //     setRedirect(true);
        //     return;
        // }
        const response = await fetch('http://localhost:4000/api/customer/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
        if (response.ok){
            const data = await response.json();
            console.log('displaying the data');
            console.log(data);
            setUserInfo({
                    email: email,
                    password: password,
                    phone: data.phone,
                    cart: data.cart,
                    favorites: data.favorites,
                    selectedSize: data.selectedSize
            });
            console.log(userInfo);
            setRedirect(true);
        }
        else{
            alert("Wrong credentials");
        }
    }


    
    if (redirect){
        return (userInfo.email!=='admin@gmail.com')? (<Navigate to= {"/"} />) : (<Navigate to= {"/admin"} />);
    }
    return (

        <form className="login" onSubmit={login}>
            <h1>LOGIN</h1>
            <input 
                type="text" 
                placeholder="email"
                value = {email}
                onChange= {ev => setEmail(ev.target.value)}
            />
            <input 
                type="password" 
                placeholder="password"
                value = {password}
                onChange= {ev => setPassword(ev.target.value)}
            />
            <button>Login</button>
        </form>
    );
}