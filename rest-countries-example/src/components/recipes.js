import React from "react";
import Image from "next/image";
import sunset from "../img/sunset.png";

export function Recipes({ label, flag, capital }) {
  // console.log(label);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image
        src={flag}
        alt="Sunset in the mountains"
        width={3200}
        height={100}
      />
      <p className="text-gray-900 text-xl">{label}</p>
      <p className="text-gray-700"> Capital: {capital}</p>
    </div>
  );
}
