import { useNavigate } from "react-router-dom";

export function MainPage(){
    const navigate=useNavigate();
    const navallcust=()=>{
        navigate("/all-cust");
    };
    const navallord=()=>{
        navigate("/all-orders");
    };
    function navadditem(){
        navigate("/add-item");
    }
    function navdelitem(){
        navigate("/del-item");
    }


    return (


        <div className="adminbuttoncontainer">
                <button className="allcust" onClick={navallcust} style={{backgroundColor:"white", fontFamily:"nike-font",fontSize:"2rem",borderRadius:"19px", margin:'0', padding:'0', boxShadow:'0 0 20px rgba(0, 0, 0, 0.3)', border:'none', cursor:'pointer'}}>View Customers</button>
                <button className="allord" onClick={navallord} style={{backgroundColor:"white", fontFamily:"nike-font",fontSize:"2rem",borderRadius:"19px", margin:'0', padding:'0', boxShadow:'0 0 20px rgba(0, 0, 0, 0.3)', border:'none', cursor:'pointer'}}>View Orders</button>
                <button className="additem" onClick={navadditem} style={{backgroundColor:"white", fontFamily:"nike-font",fontSize:"2rem",borderRadius:"19px", margin:'0', padding:'0', boxShadow:'0 0 20px rgba(0, 0, 0, 0.3)', border:'none', cursor:'pointer'}}>Add Item</button>
                <button className="delitem" onClick={navdelitem} style={{backgroundColor:"white", fontFamily:"nike-font",fontSize:"2rem",borderRadius:"19px", margin:'0', padding:'0', boxShadow:'0 0 20px rgba(0, 0, 0, 0.3)', border:'none', cursor:'pointer'}}>Delete Item</button>
        </div>
    );


}

