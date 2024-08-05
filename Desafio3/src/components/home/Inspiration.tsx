import React, { useEffect, useRef, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

interface ImageData {
    id: number;
    category: string;
    images: {
        mainImage: string;
    };
}

const Inspiration: React.FC = () => {
    const [position, setPosition] = useState(0);
    const [active, setActive] = useState(0);
    const [images, setImages] = useState<string[]>([]);

    const navigate = useNavigate();
    const ulRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await fetch('http://localhost:3000/products');
                const data: ImageData[] = await response.json();

                const armariosData = data.filter(item => item.category === 'Armarios');

                function getRandomIds(array: number[], count: number): number[] {
                    const shuffled = array.sort(() => 0.5 - Math.random());
                    return shuffled.slice(0, count);
                }

                const ids = getRandomIds(armariosData.map(item => item.id), 4);
                const filteredImages = ids.map(id => {
                    const imageData = armariosData.find(item => item.id === id);
                    return imageData ? imageData.images.mainImage : '';
                });

                setImages(filteredImages);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }

        fetchImages();
    }, []);

    const media = window.matchMedia('(max-width: 800px)');

    function moveSlide(active: number) {
        if (ulRef.current) {
            setActive(active);
            media.matches
                ? setPosition(-((400 * active) - (24 * active)))
                : setPosition(-((ulRef.current.clientWidth / 4) * active));
        }
    }

    useEffect(() => {
        function verifyMedia() {
            setPosition(0);
            setActive(0);
        }
        window.addEventListener('resize', verifyMedia);

        return () => {
            window.removeEventListener('resize', verifyMedia);
        };
    }, []);

    return (
        <section className="flex items-center gap-10 pt-7 mt-[70px] pb-7 overflow-hidden mx-auto bg-[#FCF8F3]">
            <div className="max-w-[422px] md:ml-[90px] md:mr-[100px] ml-[130px] mr-[100px]">
                <h2 className="text-[40px] text-gray-800 font-bold mb-2">50+ Beautiful rooms inspiration</h2>
                <p className="text-gray-600 text-base font-medium leading-relaxed mb-6">Our designer already made a lot of beautiful prototypes of rooms that inspire you</p>
                <Link to='/shop' className="bg-[#B88E2F] text-white px-8 py-3 font-bold">
                    Explore More
                </Link>
            </div>

            <div className="flex gap-7 max-w-[600px]">
                <div className="relative bg-cover bg-center bg-no-repeat p-[180px] bg-[url('/img/inspiration.png')]"></div>
                <div className="flex flex-col gap-4">
                    <ul
                        style={{ transform: `translateX(${position}px)` }}
                        ref={ulRef}
                        className="flex gap-6 relative overflow-hidden transition-transform duration-300"
                    >
                        {images.map((src, index) => (
                            <li key={index} className="relative">
                                <img
                                    className={`transition-opacity duration-200 ${active === index ? 'opacity-100 visible' : 'opacity-50 invisible'}`}
                                    src={src}
                                    alt={`Inspiration ${index + 1}`}
                                    style={{ maxWidth: '380px', height: '486px' }}
                                />
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-4">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${active === index ? 'bg-yellow-600 border-yellow-600' : 'bg-gray-300 border-transparent'} border-2`}
                                onClick={() => moveSlide(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Inspiration;
