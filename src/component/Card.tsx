import React from "react";

type imageProps = {
  url: string;
  id: number;
  isFlip: boolean;
  isCanFlip: boolean;
  handleClick(id: number, url: string): void;
  selectedBacksideColor: number;
};

export default function Image({
  selectedBacksideColor,
  url,
  isFlip,
  handleClick,
  id,
  isCanFlip,
}: imageProps) {
  let classList = "card-item";
  if (!isFlip) {
    classList += " front";
    return (
      <img
        className={classList}
        src={`./images/back${selectedBacksideColor}.jpg`}
        onClick={() => (isCanFlip ? handleClick(id, url) : null)}
      />
    );
  }
  classList += " back";
  return <img className={classList} src={url} />;
}
