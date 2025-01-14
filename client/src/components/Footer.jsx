import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="container mb-3 px-4 lg:px-20 mx-auto flex items-center justify-center gap-4 py-3 mt-20">
      {/* <img src={assets.logo} alt="" /> */}
      <p className="flex-1 border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hiddem">
        Copyright @GreatStack.dev | All rights reserved
      </p>
      <div className="flex gap-5">
        <img width={38} src={assets.facebook_icon} alt="" />
        <img width={38} src={assets.twitter_icon} alt="" />
        <img width={38} src={assets.instagram_icon} alt="" />
      </div>
    </div>
  );
};

export default Footer;
