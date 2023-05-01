import React from "react";
import { NextPage } from "next";

interface Iprops {
  text: string;
}

const NoResult = ({ text }: Iprops) => {
  return <div>NoResult</div>;
};

export default NoResult;
