import { useState } from "react";
import { Navigate } from "react-router-dom";


export default  function RegisterPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pno, setPno] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function register(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/api/customers', {
            method: 'POST',
            body: JSON.stringify({
                                    name:'',
                                    email: email,
                                    phone: pno,
                                    password:password,
                                    cart:[],
                                    favorites:[],
                                    selectedSize: []
                                }),
            headers: {'Content-type': 'application/json'}
        });

        if (response.status !== 200){
            alert("Registration Failed!");
        }
        else{
            alert("Registration Successful");
            setRedirect(true);
        }
    }

    if (redirect){
        return (<Navigate to= {"/login"} />);
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>REGISTER</h1>
            <input type="text" 
                   placeholder="username" 
                   value={email}
                   onChange={ev => setEmail(ev.target.value)}/>
            <input type="password" 
                   placeholder="password" 
                   value={password}
                   onChange={ev => {setPassword(ev.target.value)}}/>
            <input 
                type="text" 
                placeholder="phone number"
                value = {pno}
                onChange= {ev => {setPno(ev.target.value)}}
            />
            <button>Register</button>
        </form>
    );
}