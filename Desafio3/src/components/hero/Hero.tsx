import React from 'react';

type HeroProps = {
    title: string;
    firstPath: string;
    secondPath: string;
}

const Hero = ({
      title,
      firstPath,
      secondPath
    }: HeroProps) => {
    return (
        <section className="bg-cover bg-no-repeat h-[316px] flex flex-col items-center justify-center mt-[28px] bg-[url('/img/hero_image.png')]">
            <h1 className="text-5xl text-black mb-[2px]">{title}</h1>
            <p className="text-base text-black font-medium mt-[10px]">
                <span className="font-bold"> {firstPath} </span> {'>'} <span className="text-base font-normal">{secondPath}</span>
            </p>
        </section>
    );
}

export default Hero;
