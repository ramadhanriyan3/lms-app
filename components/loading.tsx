import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <Image
        src={"/logo.svg"}
        width={100}
        height={100}
        alt="logo"
        priority
        className=" animate-pulse "
      />
    </div>
  );
};

export default Loading;
