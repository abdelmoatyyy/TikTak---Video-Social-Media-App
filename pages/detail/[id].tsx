import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { BASE_URL } from "@/utils";
import { Video } from "@/types";
import useAuthStore from "@/store/authStore";
import LikeButton from "@/components/LikeButton";
import Comments from "@/components/Comments";
import { comment } from "postcss";
interface Iprops {
  postDetails: Video;
}

const Detail = ({ postDetails }: Iprops) => {
  const [post, setpost] = useState(postDetails);
  const [isPlaying, setisPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoMuted, setisVideoMuted] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const { userProfile }: any = useAuthStore();
  const onVideoClick = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setisPlaying(false);
    } else {
      videoRef.current?.play();
      setisPlaying(true);
    }
  };
  useEffect(() => {
    if (videoRef?.current && post) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted, post]);
  const router = useRouter();
  if (!post) return null;
  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setpost({ ...post, likes: data.likes });
    }
  };
  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        });

        setpost({ ...post, comments: res.data.comments });
        setComment("");
        setIsPostingComment(false);
      }
    }
  };

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black bg-no-repeat bg-cover bg-center ">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-index-50">
          <p>
            <MdOutlineCancel
              className="text-white text-[35px] cursor-pointer  "
              onClick={router.back}
            />
          </p>
        </div>
        <div className="relative ">
          <div className="lg:h-[100vh] h-[60vh] ">
            <video
              src={post.video.asset.url}
              ref={videoRef}
              loop
              onClick={onVideoClick}
              className="h-full cursor-pointer"
            ></video>
          </div>
          <div className="absolute top-[45%] left-[45%]">
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="cursor-pointer text-white text-6xl lg:text-8xl " />
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setisVideoMuted(false)}>
              {" "}
              <HiVolumeOff className=" text-white text-2xl lg:text-4xl" />{" "}
            </button>
          ) : (
            <button
              className="text-white text-2xl lg:text-4xl"
              onClick={() => setisVideoMuted(true)}
            >
              {" "}
              <HiVolumeUp />{" "}
            </button>
          )}
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px] ">
        <div className="lg:mt-20 mt-10 ">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
            <div className="md:w-15 md:h-15 w-16 h-16 ml-4">
              <Link href="/">
                <>
                  <Image
                    className="rounded-full "
                    width={50}
                    height={50}
                    src={post.postedBy.image}
                    layout="responsive"
                    alt="photo"
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href="/">
                <div className="flex mt-3 gap-2 flex-col ">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName}{" "}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <p className="px-10 text-lg text-gray-600">{post.caption}</p>
          <div className="mt-10 px-10 ">
            {userProfile && (
              <LikeButton
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
                likes={post.likes}
              />
            )}
          </div>
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
  return {
    props: { postDetails: data },
  };
};

export default Detail;
