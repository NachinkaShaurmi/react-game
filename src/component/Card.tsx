import React from "react";

type imageProps = {
  url: string;
  id: number;
  isFlip: boolean;
  handleClick(id: number): void;
};

export default function Image({ url, isFlip, handleClick, id }: imageProps) {
  let classList = "card-item";
  if (!isFlip) {
    classList += " front";
    return (
      <img
        className={classList}
        src={"./images/back3.jpg"}
        onClick={() => handleClick(id)}
      />
    );
  }
  classList += " back";
  return <img className={classList} src={url} />;
}
