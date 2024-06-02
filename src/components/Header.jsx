import React from "react";
import Image from "next/image";
import { THEME_BG_COLOR } from "@/lib/constants";

const Header = () => {
  return (
    <div className={`flex justify-center items-center bg-[${THEME_BG_COLOR}]`}>
      <Image
        src={"/rockPaperScissorMain.svg"}
        width="500"
        height="500"
        priority
        alt="Rock, Paper And Scissors"
      />
    </div>
  );
};

export default Header;
