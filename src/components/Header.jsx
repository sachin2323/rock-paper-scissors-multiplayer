"use client";
import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div className={`flex justify-center items-center bg-[#26006E]`}>
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
