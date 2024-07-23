import { useState } from 'react';
import {ShopPage} from '../pages/ShopPage';
import { ShoeCard } from '../pages/ShoeCard';
import { useNavigate } from 'react-router-dom';

export function DelItemPage(){
    const [id, setId] = useState('');
    const [shoe, setShoe] = useState(null);
    const [searching, setSearching] = useState(false);
    const [redirect, setRedirect] = useState(false);


    const handleSubmit = async(event) => {
        event.preventDefault();
        // handle form submission
        setSearching(true);
        // Post the formData to the server
        await fetch(`http://localhost:4000/api/product/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setShoe(data);
                setSearching(false);
            })
            .catch((error) => {
                console.log(error);
                setSearching(false);
            });


        setRedirect(true);
    };


    async function deleteShoe(){
        await fetch(`http://localhost:4000/api/product/${id}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Item deleting:', data);
            })
            .catch((error) => {
                console.error('Error adding item:', error);
                setSearching(false);
            });

            
    }
    


    return(
    <>
        <h1 style={{fontFamily:'nike-font', textAlign:'center', marginTop:'100px'}}>DELETE ITEM</h1>
            <form onSubmit={handleSubmit} className='emailform'>
                <div className='email-form-data-input-section'>
                    <label>Shoe ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    {(searching)? (
                        <>Loading...</>) : 
                    (shoe)? (
                            <ShoeCard key={shoe._id} shoe={shoe}/>
                        ) : (
                            <>Not Found</>
                        )
                    }
                </div>

                <button type="submit" className='submit-contact-form' onClick={deleteShoe}>DELETE</button>
            </form>
    </>
    );
}