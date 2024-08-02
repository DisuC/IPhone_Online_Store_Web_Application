import React from 'react';
import ReadMoreButton from "./ReadMoreButton";
import { useNavigate } from 'react-router-dom';

function ProductContainer({ id, Image, ProductName }) {
    const navigate = useNavigate();

    const handleReadMore = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="ProductContainer flex flex-col items-center justify-center rounded-3xl bg-[#d9d9d9] w-[306px] h-[432px] md:w-[500px] md:h-[660px]">
            <div className="Produt-Container-Image-Container flex justify-center w-[214px] h-[274px] md:w-[300px] md:h-[380px]">
                <img src={Image} alt="Product Image" className="image-container rounded-3xl w-full h-full object-cover"/>
            </div>
            <div className="Product-Container-Information flex flex-col items-center text-center mt-5">
                <p className="Product-Title text-xl md:text-4xl font-bold">{ProductName}</p>
                <ReadMoreButton onClick={handleReadMore} />
            </div>
        </div>
    );
}

export default ProductContainer;
