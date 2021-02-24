import React from "react";

type imageProps = {
  url: string;
  id: number;
  isFlip: boolean;
  isCanFlip: boolean;
  handleClick(id: number): void;
};

export default function Image({ url, isFlip, handleClick, id, isCanFlip }: imageProps) {
  
  let classList = "card-item";
  if (!isFlip) {
    classList += " front";
    return (
      <img
        className={classList}
        src={"./images/back3.jpg"}
        onClick={() => isCanFlip ? handleClick(id) : null}
      />
    );
  }
  classList += " back";
  return <img className={classList} src={url} />;
}
