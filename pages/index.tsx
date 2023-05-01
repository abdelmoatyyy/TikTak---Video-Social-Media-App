import Image from "next/image";
import { Inter } from "next/font/google";
import App from "next/app";
import React from "react";
import axios from "axios";
import { Video } from "@/types";
import VideoCard from "@/components/VideoCard";
import NoResult from "@/components/NoResult";
interface Iprops {
  videos: Video[];
}
export default function Home({ videos }: Iprops) {
  console.log(videos);
  return (
    <>
      <div className="flex flex-col gap-10 videos h-full">
        {videos.length ? (
          videos.map((video: Video) => (
            <VideoCard post={video} key={video._id} />
          ))
        ) : (
          <NoResult text="No Result" />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);
  return {
    props: {
      videos: data,
    },
  };
};
