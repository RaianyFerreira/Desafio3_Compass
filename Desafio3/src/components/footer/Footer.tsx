import { Link } from 'react-router-dom';
import FacebookIcon from '/img/facebook_footer.png';
import LinkedInIcon from '/img/linkedin_footer.png';
import TwitterIcon from '/img/x_footer.png';
import InstagramIcon from '/img/instagram_footer.png';

const Footer = () => {
    return (
        <footer className="mt-[20px] border-t border-gray-400">
            <section className="flex flex-col md:flex-row justify-between items-start max-w-[1000px] mx-auto mt-14 mb-20">
                <div className="mb-8 md:mb-0">
                    <h2 className="text-2xl text-left font-sans font-semibold md:mb-[50px] ml-[10px] md:ml-0">Funiro.</h2>
                    <p className="text-gray-500 text-base text-left max-w-xs font-sans ml-[10px] md:ml-0">
                        400 University Drive Suite 200 Coral Gables, <br/> FL 33134 USA
                    </p>
                    <div className="mt-[18px] flex flex-row">
                        <a href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                            <img src={FacebookIcon} alt="Share on Facebook" className="w-18 h-18 cursor-pointer" />
                        </a>
                        <a href={`https://www.instagram.com`} target="_blank" rel="noopener noreferrer">
                            <img src={InstagramIcon} alt="Share on Instagram" className="w-18 h-18 cursor-pointer" />
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                            <img src={TwitterIcon} alt="Share on Twitter" className="w-18 h-18 cursor-pointer" />
                        </a>
                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                            <img src={LinkedInIcon} alt="Share on LinkedIn" className="w-18 h-18 cursor-pointer" />
                        </a>
                    </div>
                </div>
                <div className="mb-8 md:mb-0">
                    <h3 className="font-medium text-gray-500 text-base mb-12 text-left ml-[10px] md:ml-0">Links</h3>
                    <ul className="flex flex-row md:flex-col gap-6 md:gap-12 font-sans ml-[10px] md:ml-0">
                        <li><Link to='/' className="hover:underline">Home</Link></li>
                        <li><Link to='/shop' className="hover:underline">Shop</Link></li>
                        <li><Link to='/about' className="hover:underline">About</Link></li>
                        <li><Link to='/contact' className="hover:underline">Contact</Link></li>
                    </ul>
                </div>
                <div className="mb-8 md:mb-0 ml-[10px] md:ml-0">
                    <h3 className="font-medium text-gray-500 text-base mb-12 text-left font-sans">Help</h3>
                    <ul className="flex flex-row md:flex-col gap-6 md:gap-12 font-sans">
                        <li><Link to='/shop/cart' className="hover:underline">Payment Options</Link></li>
                        <li><Link to='/' className="hover:underline">Returns</Link></li>
                        <li><Link to='/policies' className="hover:underline">Privacy Policies</Link></li>
                    </ul>
                </div>
                <div className="md:mb-0 ml-[10px] md:ml-0">
                    <h3 className="font-sans font-medium text-gray-500 text-base mb-12 text-left">Newsletter</h3>
                    <input type="text" placeholder='Enter Your email address' className="border-b border-black text-gray-500 text-sm pb-2 outline-none transition duration-500 focus:border-gray-500 focus:rounded-md hover:border-gray-500 hover:rounded-md font-sans" />
                    <button className="font-sans text-sm border-b border-black ml-3 cursor-pointer p-2 bg-transparent transition duration-300 hover:bg-black hover:text-white hover:rounded-md">SUBSCRIBE</button>
                </div>
            </section>
            <section className="font-sans text-left max-w-[1000px] mx-auto border-t border-gray-400 pt-5 pb-4">
                <p>2023 furino. All rights reserved</p>
            </section>
        </footer>
    );
};

export default Footer;
