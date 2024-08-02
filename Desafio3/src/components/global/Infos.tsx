const Infos = () => {
    return (
        <section className="bg-[#FAF3EA] mt-[60px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-12 md:ml-[60px]">
                <div className="flex items-center space-x-4">
                    <span className="block">
                        <img src="/img/trofeu.png" alt="troféu" className="mx-auto" />
                    </span>
                    <div>
                        <h1 className="text-lg font-bold">High Quality</h1>
                        <p className="text-gray-600">crafted from top materials</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="block">
                        <img src="/img/verificado.png" alt="verificado" className="mx-auto" />
                    </span>
                    <div>
                        <h1 className="text-lg font-bold ">Warranty Protection</h1>
                        <p className="text-gray-600">Over 2 years</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="block">
                        <img src="/img/presente.png" alt="presente" className="mx-auto" />
                    </span>
                    <div>
                        <h1 className="text-lg font-bold">Free Shipping</h1>
                        <p className="text-gray-600">Order over 150 $</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="block">
                        <img src="/img/suporte.png" alt="suporte" className="mx-auto" />
                    </span>
                    <div>
                        <h1 className="text-lg font-bold">24 / 7 Support</h1>
                        <p className="text-gray-600">Dedicated support</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Infos;
