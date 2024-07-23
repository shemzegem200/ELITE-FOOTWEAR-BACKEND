import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {UserContext} from "../App.js";


export function ShoePage(){
    const {id} = useParams();

    //used to navigate which shoe thumbnail to see
    const [index, setIndex] = useState(0);

    const {userInfo, setUserInfo} = useContext(UserContext);

    function incrementImg(){
        setIndex((index+1)%shoe.photos.length);
    }
    function decrementImg(){
        if (index===0) setIndex(shoe.photos.length-1);
        else setIndex(index-1);
    }
    function handleMouseHover(e){
        setIndex((isNaN(parseInt(e.target.id)) ? 0 : parseInt(e.target.id)));
    }

    //state variable to store size of selection
    const [shoeSize, setShoeSize] = useState("");

    function setShoeSizeHelper(ev,size){
        setShoeSize(size);
        ev.target.style.backgroundColor = '#f0f0f0';
        const buttons = document.querySelectorAll('.size-card button');
        buttons.forEach(button =>{
            if (button !== ev.target){
                button.style.backgroundColor = 'white';
                button.style.color = 'black';
            }
        });
    }



    function addToCartOnClick(ev){
        if (!userInfo || userInfo==='' || !userInfo.email|| userInfo.email==="") alert('You must sign in first!');
        else if (shoeSize==="") alert('Choose a Shoe Size');
        else{
            let tempCart = [...userInfo.cart];
            let tempSize = [...userInfo.selectedSize];
            tempCart.push(id);
            tempSize.push(shoeSize);
            setUserInfo({
                name: userInfo.name,
                phone: userInfo.phone,
                email: userInfo.email,
                password: userInfo.password,
                cart: tempCart,
                favorites: userInfo.favorites,
                selectedSize: tempSize
            });
            console.log('after adding to cart...');
            console.log(userInfo);
        }
    }
    function addToFavoritesOnClick(ev){
        if (!userInfo || userInfo==='' || !userInfo.email|| userInfo.email==="") alert('You must sign in first!');
        else{
            if (ev.target.innerText==='Remove from Favorites'){
                ev.target.innerText = 'Add to Favorites';
                let tempFav = [...userInfo.favorites];
                tempFav.splice(tempFav.indexOf(id), 1);
                setUserInfo({
                    name: userInfo.name,
                    phone: userInfo.phone,
                    email: userInfo.email,
                    password: userInfo.password,
                    cart: userInfo.cart,
                    favorites: tempFav,
                    selectedSize: userInfo.selectedSize
                });
                console.log('after removing to favorites...');
                console.log(userInfo);
            }
            else{
                ev.target.innerText = 'Remove from Favorites';
                let tempFav = (userInfo.favorites && userInfo.favorites.length>0)? [...userInfo.favorites] : [];
                tempFav.push(id);
                setUserInfo({
                    name: userInfo.name,
                    phone: userInfo.phone,
                    email: userInfo.email,
                    password: userInfo.password,
                    cart: userInfo.cart,
                    favorites: tempFav,
                    selectedSize: userInfo.selectedSize
                });
                console.log('after adding to favorites...');
                console.log(userInfo);
            }
            
        }
    }
    

    const [shoe, setShoe] = useState(null);

    // this is done to find the shoe by id from server
    useEffect(() => {
        fetch(`http://localhost:4000/api/product/${id}`)
            .then(response => {
                response.json().then(shoeInfo => {
                    setShoe(shoeInfo);
                    console.log(shoe);
                });
            });
    }, [id]);

    // const shoe = {
    //     id: 1,
    //     name: 'Nike Phantom G6',
    //     price: 13599,
    //     photos: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/fd65ffd7-77b6-4510-a034-d058aa979947/air-jordan-1-low-og-black-gorge-green-shoes-6rSxZv.png',
    //                  'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/3e52ac88-4ada-4bd5-85cb-9cfe248e3c3e/air-jordan-1-low-og-black-gorge-green-shoes-6rSxZv.png',
    //                  'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/04310ffb-5715-4f8f-9957-57715b2f2e2b/air-jordan-1-low-og-black-gorge-green-shoes-6rSxZv.png'],
    //     category: "Men's Shoes",
    //     sizes: ['US W 5 / M 3.5', 'US W 5.5 / M 4', 'US W 6 / M 4.5', 'US W 6.5 / M 5', 'US W 7 / M 5.5', 'US W 7.5 / M 6', 'US W 8 / M 6.5' , 'US W 8.5 / M 7'],
    //     description: 'Step into greatness with the Nike Phantom G6. Updated colour and texture gives the all-time favourite a fresh identity while staying true to the original design.'
    // }

    if (!shoe){
        return(
            <>Loading...</>
        );
    }

    return (
        <>
            <div className="shoe-page-outer-grid">

                <div className="shoe-page-photos">
                    {shoe.photos.length>0 && shoe.photos.map(shoeImgPath => 
                        <img key={shoeImgPath} className="shoe-thumbnail" id={`${shoe.photos.indexOf(shoeImgPath)}`} onMouseOver={handleMouseHover} src={shoeImgPath} alt='shoe-thumbnail'/>
                    )}
                </div>

                <div className="shoe-page-left">
                        <img className="shoe-large-thumbnail" src={shoe.photos[index]} alt="large-shoe-thumbnail" />
                        <button style={{width:'30px', height:'30px', borderRadius:'50%', zIndex:'1', position:'absolute', bottom: '25px', right: '70px', backgroundColor:'white', border:'none',fontWeight:'bold', cursor:'pointer', textAlign:'center'}} onClick={decrementImg}>{`<`}</button>
                        <button style={{width:'30px', height:'30px', borderRadius:'50%', zIndex:'2', position:'absolute', bottom: '25px', right:'35px', backgroundColor:'white', border:'none',fontWeight:'bold', cursor:'pointer', textAlign:'center'}} onClick={incrementImg}>{`>`}</button>
                </div>

                <div className="shoe-page-right">
                    <div className="topdiv">
                        <div style={{fontWeight:'bold', fontSize:'1.5rem'}}>{shoe.name}<br/></div>
                        <>{shoe.category}<br/></>
                        {(userInfo.email==='admin@gmail.com') && <div style={{color:'##FF033E'}}>shoe id: {shoe._id}<br/></div>}
                        <div style={{marginTop:'30px'}}> ₹{shoe.price}<br/></div>
                        <div style={{marginTop:'30px'}}>Select Size</div>
                        <div className="size-cards-divs">
                        {shoe.sizes.length>0 && shoe.sizes.map((size, idx) =>
                            <div className="size-card" key={idx}>
                                <button onClick={(ev)=>{setShoeSizeHelper(ev,size)}}>
                                    {size}
                                </button>
                            </div>
                        )}
                        </div>
                    </div>

                    <br/>
                    <div className="bottomdiv">
                        <>{shoe.description}</>
                    </div>
                    
                    <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'black', borderRadius:'15px', color:'white', border:'none', height:'45px', marginTop:'30px', fontFamily:'regular-font', fontSize:'1rem', cursor:'pointer'}} onClick={(ev)=>{addToCartOnClick(ev)}}>
                        <>Add to Cart</>
                    </div>
                    {userInfo &&
                        <button style={{width:'100%', backgroundColor:(!userInfo.favorites.includes(id))?'white':'#FF033E', borderRadius:'15px', outline:'none', color:'black', borderColor:'rgb(212, 212, 212)', margin:'0', padding:'0', height:'45px', marginTop:'30px', fontFamily:'regular-font', fontSize:'1rem', cursor:'pointer'}} onClick={(ev)=>{addToFavoritesOnClick(ev)}}>
                            {!userInfo.favorites.includes(id)? <>Add to Favorites</> : <>Remove from Favorites</>}
                        </button>
                    }

                </div>

            </div>
        </>

    );
}