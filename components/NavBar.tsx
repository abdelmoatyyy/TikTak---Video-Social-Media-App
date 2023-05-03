import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import logo from "../utils/tiktik-logo.png";
import { createOrGetUser } from "@/utils";
import useAuthStore from "@/store/authStore";
import removeUser from "@/store/authStore";

const NavBar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  const [searchValue, setsearchValue] = useState("");
  const router = useRouter();
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-grey-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px] ">
          <Image
            className="cursor-pointer"
            src={logo}
            alt="logo"
            layout="responsive"
          />
        </div>
      </Link>
      <>
        <div className="relative hidden md:block ">
          <form
            className="absolute md:static top-10 -left-20 bg-white "
            onSubmit={handleSearch}
          >
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setsearchValue(e.target.value)}
              placeholder="Search Accounts And Videos"
              className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
            />
            <button
              onClick={handleSearch}
              className="absolute md:right-5 right-6 top-4 border-left-2 border-gray-300 pl-4 text-2xl text-gray-400"
            >
              <BiSearch />
            </button>
          </form>
        </div>
        <div>
          {userProfile ? (
            <div className="flex gap-5 md:gap-10 items-center">
              <Link href="/upload">
                <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center justify-center gap-2">
                  <IoMdAdd className="text-xl" />{" "}
                  <span className="hidden md:block">Upload</span>
                </button>
              </Link>
              {userProfile.image && (
                <Link href="/">
                  <>
                    <Image
                      className="rounded-full cursor-pointer"
                      width={40}
                      height={40}
                      src={userProfile.image}
                      alt="photo"
                    />
                  </>
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  googleLogout();
                  removeUser();
                }}
              >
                <AiOutlineLogout color="red" fontSize={21} />
              </button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={(respone) => createOrGetUser(respone, addUser)}
              onError={() => console.log("ERROR")}
            />
          )}
        </div>
      </>
    </div>
  );
};

export default NavBar;
