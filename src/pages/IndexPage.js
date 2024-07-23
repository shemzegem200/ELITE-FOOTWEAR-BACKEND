import { useEffect, useState } from "react";
import { ShoeCard } from './ShoeCard.js';
import Carousel from "../components/Carousel.js";

export function IndexPage() {
    const [shoes, setShoes] = useState([]);

    
    useEffect(()=>{
        fetch("http://localhost:4000/api/products").then(response => {
            response.json().then(shoesFromServer => {
                setShoes(shoesFromServer);
            });
        });
    }, []);

    // const myTempImg = 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/56a172c2-57e7-45e7-8687-016947f5459d/custom-phantom-luna-academy-2-by-you.png';

    // const dummyShoes = [
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

    // useEffect(() => {
    //     setShoes(dummyShoes);
    // }, []);

    return (
        <>
            <div className="index-page-top-section">
                {/* <img src={'https://see.fontimg.com/api/renderfont4/8YEA/eyJyIjoiZnMiLCJoIjo5MywidyI6MTI1MCwiZnMiOjc0LCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiIzAwMDAwMCIsInQiOjF9/TkVXIEFSUklWQUwh/wox-striped-triple-demo.png'} className="shoe-text" alt="shoe-text"/> */}
                {/* <img src={'https://see.fontimg.com/api/renderfont4/8YEA/eyJyIjoiZnMiLCJoIjo5MCwidyI6MTI1MCwiZnMiOjcyLCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiIzAwMDAwMCIsInQiOjF9/TEFURVNUIENPTExFQ1RJT04h/wox-striped-triple-demo.png'} className="shoe-text" alt="shoe-text"/> */}
                <img className="index-page-img" src={'https://img.freepik.com/premium-photo/3d-rendering-sports-shoe-gray-background-with-shadow_890746-3302.jpg'} alt='shoe'/>
            </div>

    

            <p style={{ textAlign: 'center' }}>
                <span style={{ fontWeight: 'bold', fontFamily: 'nike-font', fontSize: '3rem' }}>BROWSE THE RANGE</span>
                <br />
                Discover the boundless limits of handcrafted luxury shoes
            </p>
            <div className="shoe-card-container">
                {shoes.length > 0 && shoes.map(shoe =>
                    <ShoeCard key={shoe._id} shoe={shoe} />
                )}
            </div>
        </>
    );
}
