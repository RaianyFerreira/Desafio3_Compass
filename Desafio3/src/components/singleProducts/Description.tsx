import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Description = () => {
    const { id } = useParams<{ id: string }>();
    const [description, setDescription] = useState<string | null>(null);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);

    useEffect(() => {
        async function fetchDescription() {
            try {
                const response = await axios.get(`http://localhost:3000/products/${id}`);
                setDescription(response.data.description.long);
                setGalleryImages(response.data.images.gallery.slice(0, 2)); // Pega as primeiras 2 imagens da galeria
            } catch (error) {
                console.error('Error fetching product description:', error);
            }
        }

        fetchDescription();
    }, [id]);

    if (!description) {
        return <div>Loading...</div>;
    }

    return (
        <section className="mt-[20px]">
            <div className="flex mb-9 justify-center text-center font-sans gap-[130px]">
                <h2 className="text-[30px]  font-semibold">Description</h2>
                <h2 className="text-[30px] text-gray-400">Additional Information</h2>
            </div>
            <p className="justify-center md:w-[1100px] mx-auto text-gray-500">{description}</p>
            <div className="flex mt-12">
                {galleryImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className="object-cover w-[500px] justify-center mx-auto gap-9"
                    />
                ))}
            </div>
        </section>
    );
};

export default Description;
