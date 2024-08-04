import { useNavigate } from 'react-router-dom';
import Button from "../global/Button";

const Hero = () => {
    const navigate = useNavigate();

    function redirectShop() {
        navigate('/shop');
    }

    return (
        <section className="bg-[url('/img/hero_home.png')] bg-center bg-cover h-[700px] flex items-center justify-start mt-[30px]">
            <div className="container mx-auto px-4 max-w-[1380px] flex items-center justify-end mr-[32px] md:mr-[100px] md:ml-0 ml-[35px]">
                <div className="bg-[#FFF3E3] max-w-[643px] w-full p-[39px_62px_43px_37px] rounded-lg">
                    <span className="block text-[#333] text-[1rem] font-semibold tracking-[3px] mb-[4px]">New Arrival</span>
                    <h1 className="text-[#B88E2F] text-[3.265rem] font-bold leading-[65px] mb-[17px]">Discover Our <br /> New Collection</h1>
                    <p className="text-[#333] text-[1.125rem] leading-[24px] font-medium mb-[46px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
                    <Button onClick={redirectShop} className="bg-[#B88E2F] text-white text-[1rem] font-bold max-w-[222px] w-full h-[74px] border-none cursor-pointer transition-colors duration-400 hover:bg-white hover:text-[#B88E2F] hover:border-[#B88E2F] hover:rounded-md sm:max-w-[150px] sm:h-[50px]">BUY NOW</Button>
                </div>
            </div>
        </section>
    );
}

export default Hero;
