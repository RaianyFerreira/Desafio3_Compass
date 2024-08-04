import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from "../home/products/ProductItem";
import axios from 'axios';
import Hero from "../global/Hero";

const ShopProducts = () => {
    const [show, setShow] = useState(4);
    const [showing, setShowing] = useState(4);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [toFilter, setToFilter] = useState(false);
    const [toShort, setToShort] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [shortOption, setShortOption] = useState('default');
    const [selectedCategory, setSelectedCategory] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/products');
                const products = response.data;

                setAllProducts(products);
                setFilteredProducts(products);

                window.scrollTo(0, 0);

                const uniqueCategories = Array.from(new Set(products.map((product: any) => product.category)));
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        setShowing(page * show);
    }, [page, show]);

    useEffect(() => {
        applyFilters();
    }, [search, allProducts, shortOption, selectedCategory]);

    const applyFilters = () => {
        const regex = new RegExp(search.toLowerCase());
        let filtered = allProducts.filter((product) =>
            product.title.toLowerCase().match(regex)
        );

        if (selectedCategory) {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }

        if (shortOption === 'price') {
            filtered = filtered.sort((a, b) => a.salePrice - b.salePrice);
        }

        setFilteredProducts(filtered);
    };

    const filterCategory = (category: string) => {
        setSelectedCategory(category);
        setToFilter(false);
    };

    const nextProducts = (nextPage: number) => {
        setPage(nextPage);
        window.scrollTo({
            top: 420,
            behavior: 'smooth',
        });
    };

    return (
        <div>
            <Hero title='Shop'
                  firstPath='Home'
                  secondPath='Shop'
            />
            <section>
                <div className="bg-[#F9F1E7] p-6 md:mb-[50px] flex justify-between items-center">
                    <div className="flex items-center gap-8 md:ml-[100px] relative">
                        <p className="flex items-center gap-3 text-lg font-medium text-black cursor-pointer transition-transform transform hover:scale-110" onClick={() => setToFilter(!toFilter)}>
                            <img src="/img/icon_filter.svg" alt="Filter" className="w-6 h-6" /> Filter</p>
                        <img src="/img/icon_4_pontinhos.png" alt="4 pontinhos" className="w-6 h-6" />
                        <img src="/img/icon_forma.png" alt="Forma" className="w-7 h-7" />
                        <hr className="h-[35px] border border-gray-400"></hr>
                        <span className="text-base font-medium text-black ">Showing {showing - show} - {showing} of {filteredProducts.length} results</span>
                        {toFilter && (
                            <div className="absolute border border-[#b88e2f] bg-[#F9F1E7] p-6 mt-2 rounded-lg shadow-lg flex flex-col gap-4 top-8 z-10 transition-opacity opacity-100">
                                <p className="text-lg font-normal text-black cursor-pointer hover:underline" onClick={() => filterCategory('')}>All</p>
                                {categories.map((category) => (
                                    <p
                                        key={category}
                                        className="text-lg font-normal text-black cursor-pointer hover:underline"
                                        onClick={() => filterCategory(category)}
                                    >
                                        {category}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-12 items-center mr-[105px]">
                        <div className="flex items-center gap-4">
                            <label htmlFor="show" className="text-lg font-medium text-black md:ml-0 ml-[70px]">Show</label>
                            <input
                                type="number"
                                name="show"
                                id="show"
                                value={show}
                                onChange={(e) => setShow(Number(e.target.value))}
                                className="w-14 h-14 bg-white text-gray-500 text-lg font-medium text-center border border-gray-300 rounded p-2 outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-4 relative">
                            <label htmlFor="short" className="text-lg font-medium text-black">Short by</label>
                            <p
                                className="pl-[20px] ml-[4px] bg-white w-[150px] h-[50px] flex items-center gap-3 text-lg font-medium text-gray-400 cursor-pointer"
                                onClick={() => setToShort(!toShort)}>
                                {shortOption.charAt(0).toUpperCase() + shortOption.slice(1)}
                            </p>
                            {toShort && (
                                <div className="absolute bg-[#F9F1E7] border border-[#b88e2f] p-6 mt-2 rounded-lg shadow-lg flex flex-col gap-4 top-[50px] z-10 transition-opacity opacity-100 ml-[135px]">
                                    <p className="text-lg font-normal text-black cursor-pointer hover:underline" onClick={() => { setShortOption('default'); setToShort(false); }}>Default</p>
                                    <p className="text-lg font-normal text-black cursor-pointer hover:underline" onClick={() => { setShortOption('price'); setToShort(false); }}>Price</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="container mx-auto">
                    {filteredProducts.length > 0 ? (
                        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                            {filteredProducts.map((product, index) => {
                                if (index < showing && index + 1 > showing - show && product.images && product.images.mainImage) {
                                    return (
                                        <ProductItem
                                            key={product.id}
                                            id={product.id}
                                            name={product.title}
                                            description={product.description}
                                            image={product.images}
                                            price={product.salePrice}
                                            normalPrice={product.normalPrice}
                                            onClick={() => navigate(`/product/${product.id}`)}
                                            colors={product.hex}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    ) : (
                        <div className="text-center py-4">No products found</div>
                    )}
                </div>
                <div className="container mx-auto mt-4 flex justify-center gap-4 flex-wrap">
                    {filteredProducts.length > 0 && (
                        <>
                            {Array.from({ length: Math.ceil(filteredProducts.length / show) }, (_, i) => (
                                <span
                                    key={i}
                                    onClick={() => nextProducts(i + 1)}
                                    className={`cursor-pointer w-[40px] h-15 bg-[#F9F1E7] text-black text-lg font-medium rounded-lg flex justify-center items-center transition-colors ${page === i + 1 ? 'bg-[#b88e2f] text-white' : 'hover:bg-[#b88e2f] hover:text-white'}`}
                                >
                                    {i + 1}
                                </span>
                            ))}
                            <span
                                onClick={() => nextProducts(page + 1)}
                                className="cursor-pointer w-[60px] h-[40px] bg-[#F9F1E7] text-black text-lg font-medium rounded-lg flex items-center justify-center transition-colors hover:bg-[#b88e2f] hover:text-white"
                            >Next</span>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ShopProducts;
