import React from 'react';
import FormContact from "./FormContact";
import HeroContact from "./HeroContact";
import Infos from "../global/Infos";

const Contact: React.FC = () => {
    return (
      <>
          <HeroContact />
          <FormContact />
          <Infos />
      </>
    );
};

export default Contact;
