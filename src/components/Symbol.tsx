import React from "react";
import Image from "next/image";
import { ISymbol } from "@/types/type";

const SymbolIcon = ({ symbol, width, height }: ISymbol) => {
  const renderSymbol = (symbol: string) => {
    switch (symbol) {
      case "X":
        return (
          <Image
            src={"/x-mark.png"}
            alt="X-icon"
            width={width}
            height={height}
          />
        );
      case "O":
        return (
          <Image
            src={"/blue-o.png"}
            alt="O-icon"
            width={width}
            height={height}
          />
        );
      case "Xavatar":
        return (
          <Image
            src={"https://api.multiavatar.com/Broomhilda.svg"}
            alt="avatar"
            width={width}
            height={height}
          />
        );
      case "Oavatar":
        return (
          <Image
            src={"https://api.multiavatar.com/Skeleto.svg"}
            alt="bot"
            width={width}
            height={height}
          />
        );
      default:
        return null;
    }
  };
  return <div>{renderSymbol(symbol)}</div>;
};

export default SymbolIcon;