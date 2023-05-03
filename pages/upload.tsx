import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { SanityAssetDocument } from "@sanity/client";
import useAuthStore from "@/store/authStore";
import { client } from "../utils/client";
import { url } from "inspector";
import { topics } from "@/utils/constants";
import { BASE_URL } from "@/utils";
const Upload = () => {
  const [isLoading, setisLoading] = useState(false);
  const [videoAsset, setvideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setwrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setcategory] = useState(topics[0].name);
  const [savingPost, setsavingPost] = useState(false);
  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();
  const uploadVideo = async (event: any) => {
    const selctedFile = event.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (fileTypes.includes(selctedFile.type)) {
      client.assets
        .upload("file", selctedFile, {
          contentType: selctedFile.type,
          filename: selctedFile.name,
        })
        .then((data) => {
          setvideoAsset(data);
          setisLoading(false);
        });
    } else {
      setisLoading(false);
      setwrongFileType(true);
    }
  };
  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setsavingPost(true);
      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };
      await axios.post(`${BASE_URL}/api/post`, document);
      router.push("/");
    }
  };

  return (
    <div className="flex w-full h-full absolute left-0 top-[80px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center">
      <div className="w-[60%] bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center p-14 pt-6 ">
        <div>
          <div>
            <p className="text-2xl font-bold ">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your accunt
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] mt-16 bg-black"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer ">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center ">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl " />
                        </p>
                        <p className="text-xl font-semibold">Upload Video </p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or ogg <br /> 720x1280 or higher <br /> Up
                        to 10 minutes <br /> Less than 2GB
                      </p>
                      <p className="bg-[#f51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Select File
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                Please Select A Video File
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10 ">
          <label className="text-md font-medium">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded outline-none text-md border-2 border-gray-200 p-2"
          />
          <label className="text-md font-medium">Choose A Category</label>
          <select
            onChange={(e) => setcategory(e.target.value)}
            className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300 "
                value={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              onClick={() => {}}
              type="button"
              className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type="button"
              className="bg-[#f51997] text-white border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
