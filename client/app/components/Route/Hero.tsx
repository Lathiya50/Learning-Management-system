import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";
import img1 from "../../assests/client-1.png";
import img2 from "../../assests/client-2.png";
import img3 from "../../assests/client-3.png";
import banner from "../../assests/img-1.png";

type Props = {};

const Hero: FC<Props> = (props) => {
  return (
    <div className="w-full 1000px:flex items-center">
      <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-14">
        <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
          <Image
            src={banner}
            alt=""
            className="object-contain 1000px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
