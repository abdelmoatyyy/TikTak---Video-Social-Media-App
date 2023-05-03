import React from "react";
import { NextPage } from "next";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";
interface Iprops {
  text: string;
}

const NoResult = ({ text }: Iprops) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl ">
        {text === "No comments yet! " ? (
          <BiCommentX />
        ) : (
          <MdOutlineVideocamOff />
        )}
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResult;
