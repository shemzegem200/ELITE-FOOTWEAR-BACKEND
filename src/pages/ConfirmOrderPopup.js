import React, {useState} from "react";

export function ConfirmOrderPopup({onClose}){

    return (
            <div className="popup-content" /*style={{width:'40%', height:'30%', position:'fixed', marginLeft:'30%',  marginTop:'35%', position:'fixed', boxShadow:'0 0 10px rgba(0, 0, 0, 0.3)',display:'flex', flexDirection:'column', border:'1px, #ccc, solid', borderRadius:'14px'}}*/>
                <h2>Order Placed Successfully!</h2>
                {/* <p>The ID of the order: <span>{boardId}</span></p> */}
                <button style={{width:'45%',height:'35px', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', fontFamily:'nike-font', borderRadius:'17px', border:'none', padding:'none', cursor:'pointer', background:'black', color:'white'}} onClick={onClose}>CLOSE</button>
            </div>
    );
}