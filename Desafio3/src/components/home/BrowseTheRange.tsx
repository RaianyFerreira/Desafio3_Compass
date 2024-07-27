const BrowseTheRange = () => {
    return (
        <section className="font-sans mx-auto mt-[56px]">
            <h2 className="text-[#333] text-[2rem] font-bold text-center">Browse The Range</h2>
            <p className="text-[#666] text-[1.15rem] text-center font-normal mb-[62px]">
                Lorem ipsum dolor sit amet, consectetur
                <br className="block md:hidden" /> adipiscing elit.
            </p>
            <ul className="flex flex-col md:flex-row md:gap-6 gap-[1.15rem] w-full items-center md:justify-center">
                <li className="flex flex-col items-center">
                    <img src="/img/Dining.png" alt="Dining" className="md:w-[350px] md:mb-[15px] w-[300px] mb-[20px] transition-transform transform hover:scale-105 hover:shadow-lg"
                    />
                    <span className="text-[#333] md:text-[25px] text-[1.5rem] font-bold text-center">Dining</span>
                </li>
                <li className="flex flex-col items-center">
                    <img src="/img/Living.png" alt="Living" className="md:w-[350px] md:mb-[15px] w-[300px] mb-[20px] transition-transform transform hover:scale-105 hover:shadow-lg"
                    />
                    <span className="text-[#333] md:text-[25px] text-[1.5rem] font-bold text-center">Living</span>
                </li>
                <li className="flex flex-col items-center">
                    <img src="/img/Bedroom.png" alt="Bedroom" className="md:w-[350px] md:mb-[15px] w-[300px] mb-[20px] transition-transform transform hover:scale-105 hover:shadow-lg"
                    />
                    <span className="text-[#333] md:text-[25px] text-[1.5rem] font-bold text-center md:mb-0">Bedroom</span>
                </li>
            </ul>
        </section>
    );
}

export default BrowseTheRange;
