import {useState, useContext} from "react";
import {Navigate} from "react-router-dom";
import { UserContext } from "../App";
// import { Bounce, Slide, toast } from 'react-toastify';
import toast from "react-hot-toast";
import { LoadingSpinner } from "../components/LoadingSpinner";


export default function LoginPage(){

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const {userInfo, setUserInfo} = useContext(UserContext);

    async function login(ev){
        ev.preventDefault();
        setIsLoading(true);
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
                    name: data.name,
                    email: email,
                    password: password,
                    phone: data.phone,
                    cart: data.cart,
                    favorites: data.favorites,
                    selectedSize: data.selectedSize,
                    quantity: data.quantity
            });
            toast.success("Logged In!");
            setIsLoading(false);
            console.log(userInfo);
            setRedirect(true);
        }
        else{
            // toast.error('Wrong Credentials', {
            //     position: "top-center",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: 0,
            //     theme: "dark",
            //     transition: Bounce,
            //     });
            toast.error('Wrong Credentials');
            setIsLoading(false);
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
                placeholder="username"
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
            {isLoading && <LoadingSpinner/>}

        </form>
    );
}