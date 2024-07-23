import { useEffect, useState } from "react";
import { ShoeCard } from "./ShoeCard";


export default function ShopPage(){

    const [searchVal, setSearchVal] = useState('');
    const [shoes, setShoes] = useState([]);

    //by default, when the page is first loaded, fetch all shoes
    useEffect(()=>{
        fetch("http://localhost:4000/api/products").then(response =>{
            response.json().then(shoesFromServer =>{
                setShoes(shoesFromServer);
            });
        });
    }, []);

    // const shoes = [
    //     {
    //         id: 1,
    //         name: 'Nike Phantom G6',
    //         price: 13599,
    //         photo: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/56a172c2-57e7-45e7-8687-016947f5459d/custom-phantom-luna-academy-2-by-you.png',
    //     },
    //     {
    //         id: 2,
    //         name: 'Nike Phantom G6',
    //         price: 13599,
    //         photo: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e3d72728-4900-4e71-a4ea-1f323bb570d8/custom-nike-air-force-1-high-by-you-shoes.png',
    //     },
    //     {
    //         id: 3,
    //         name: 'Nike Phantom G6',
    //         price: 13599,
    //         photo: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fdded470-0ac5-4bd7-b41b-1bb63e161438/custom-nike-air-force-1-mid-by-you-shoes.png',
    //     },
    //     {
    //         id: 4,
    //         name: 'Nike Phantom G6',
    //         price: 13599,
    //         photo: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/451b4531-1090-4044-ad0f-fa9e2b6cd902/streakfly-road-racing-shoes-V17qZm.png',
    //     },
    //     {
    //         id: 5,
    //         name: 'Nike Phantom G6',
    //         price: 13599,
    //         photo: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/56a172c2-57e7-45e7-8687-016947f5459d/custom-phantom-luna-academy-2-by-you.png',
    //     },
    //     {
    //         id: 6,
    //         name: 'Nike Phantom G6',
    //         price: 13599,
    //         photo: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/56a172c2-57e7-45e7-8687-016947f5459d/custom-phantom-luna-academy-2-by-you.png',
    //     },
    //     {
    //         id: 7,
    //         name: 'Nike Phantom G6',
    //         price: 13599,
    //         photo: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/56a172c2-57e7-45e7-8687-016947f5459d/custom-phantom-luna-academy-2-by-you.png',
    //     },
    //     {
    //         id: 8,
    //         name: 'Nike Phantom G6',
    //         price: 13599,
    //         photo: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/56a172c2-57e7-45e7-8687-016947f5459d/custom-phantom-luna-academy-2-by-you.png',
    //     },
    //     {
    //         id: 9,
    //         name: 'Nike Phantom G6',
    //         price: 13599,
    //         photo: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/56a172c2-57e7-45e7-8687-016947f5459d/custom-phantom-luna-academy-2-by-you.png',
    //     },
    // ];

    useEffect(()=>{
        if (searchVal.length>=1)
            fetch(`http://localhost:4000/api/products/search/${searchVal}`).then(response=>{
                response.json().then(shoesFromServer =>{
                    setShoes(shoesFromServer);
                });
            });
        else
            fetch("http://localhost:4000/api/products").then(response =>{
                response.json().then(shoesFromServer =>{
                    setShoes(shoesFromServer);
                });
            });
    }, [searchVal]);

    return (
        <>
            <div className="search-shoe">
                <div style={{fontFamily:'nike-font', textAlign:'center', marginBottom:'15px', marginTop:'100px'}}>SEARCH FOR YOUR FAVORITE SHOES</div>

                <input 
                    type="text"
                    placeholder="Search.."
                    value={searchVal}
                    style={{
                        all: 'unset',
                        width: '100%',
                        height: '38px',
                        borderRadius: '22px',
                        padding: '5px 15px',
                        boxSizing: 'border-box',
                        border: '1px solid #ccc',
                        outline: 'none',
                        backgroundColor:'rgb(212, 212, 212)',
                        fontWeight:'bold'
                    }}
                    onChange={(ev)=>{setSearchVal(ev.target.value)}}
                />
            </div>
            
            <div className="shoe-card-container-2">
                {shoes.length > 0? (shoes.map(shoe =>
                    <ShoeCard key={shoe.id} shoe={shoe} />
                ))
                    : (
                        <div className="empty-cart">
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png" alt="Empty Cart" />
                            <div style={{textAlign:'center', fontFamily:'regular-font'}}>Couldn't Find Item</div>
                        </div>
                    )}
            </div>
        </>
    );
}