import React from "react";
import { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "@/store/authStore";
import { AiFillHeart } from "react-icons/ai";

interface Iprops {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({ handleLike, handleDislike, likes }: Iprops) => {
  const [liked, setliked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);
  useEffect(() => {
    if (filterLikes?.length > 0) {
      setliked(true);
    } else {
      setliked(false);
    }
  }, [likes, filterLikes]);
  return (
    <div className=" flex gap-6 ">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {liked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#FC4F00]"
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-4 "
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold"> {likes?.length | 0} </p>
      </div>
    </div>
  );
};

export default LikeButton;
