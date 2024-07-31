import React from 'react';

type ProductProps = {
    id: number;
    name: string;
    description: {
        short: string;
        long: string
    };
    image: {
        mainImage: string;
    };
    price: number;
    normalPrice: number;
    onClick: () => void;
};

const ProductItem = ({
         id,
         name,
         description,
         image,
         price,
         normalPrice,
         onClick
     }: ProductProps) => {
    const [showHover, setShowHover] = React.useState(false);

    return (
        <li
            className="relative border rounded-sm overflow-hidden shadow-md bg-[#F4F5F7] m-[10px] md:w-auto w-[280px]"
            onMouseOver={() => setShowHover(true)}
            onMouseLeave={() => setShowHover(false)}
            onClick={onClick}
        >
            <img src={image.mainImage} alt={name} className="md:w-full md:h-70 object-cover w-[280px]" />
            <div className="p-4">
                <h3 className="text-xl font-semibold truncate">{name}</h3>
                <p className="text-gray-700 text-[14px] mt-[5px] truncate">{description.short}</p>
                <span className="block text-[20px] font-bold mt-2">
                    ${price}
                    {price !== normalPrice && (
                        <span className="text-gray-400 line-through ml-2">${normalPrice}</span>
                    )}
                </span>
            </div>
            {showHover && (
                <div className="absolute inset-0 bg-[#3A3A3A] bg-opacity-80 flex flex-col justify-center items-center">
                    <button className="bg-white text-[#B88E2F] font-bold py-2 px-[25px] mb-2 hover:text-white hover:bg-[#B88E2F]">Add to Cart</button>
                    <ul className="flex justify-around w-full text-white mt-[20px]">
                        <li className="flex flex-row items-center gap-[5px] ml-[5px]">
                            <img src="/img/icon_share.png" alt="Share" className="w-5 h-5 mb-[2px]" />
                            <p className="mr-[10px]">Share</p>
                        </li>
                        <li className="flex flex-row items-center gap-[5px]">
                            <img src="/img/icon_compare.png" alt="Compare" className="w-5 h-5 mb-[2px]" />
                            <p className="mr-[10px]">Compare</p>
                        </li>
                        <li className="flex flex-row items-center gap-[5px]">
                            <img src="/img/icon_like.png" alt="Like" className="w-5 h-5 mb-[2px]" />
                            <p className="mr-[10px]">Like</p>
                        </li>
                    </ul>
                </div>
            )}
        </li>
    );
};

export default ProductItem;
