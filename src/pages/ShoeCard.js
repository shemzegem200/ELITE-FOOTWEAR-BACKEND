import {useNavigate} from 'react-router-dom'

export function ShoeCard({ shoe }) {
    const navigate = useNavigate();

    function handleClick(shoeId){
        navigate("/shoe-page/"+shoeId);
    }

    return (
        <div className="column" key={shoe._id}>
            <div className="shoe-card" key={shoe._id} onClick={(ev)=>{handleClick(shoe._id)}}>
                <img src={shoe.photos[0]} alt="shoe_pic" />
                <div>{shoe.name}<br /></div>
                <div> ₹{shoe.price}</div>
            </div>
        </div>
    );
}
