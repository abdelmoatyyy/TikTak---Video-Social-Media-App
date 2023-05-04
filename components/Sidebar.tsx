import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

const Sidebar = () => {
  const [showSidebar, setshowSidebar] = useState(true);
  const userProfile = false;
  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 xl:justify-start cursor-pointer font-semibold text-[#FC4F00] rounded";
  return (
    <div>
      <div>
        <div
          className="block xl:hidden m-2 ml-4 mt-3 text-xl"
          onClick={() => setshowSidebar((prevState) => !prevState)}
        >
          {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
        </div>
      </div>

      {showSidebar && (
        <div className="xl:w-[400px] w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="capitalize text-xl hidden xl:block ">
                  For You
                </span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};
export default Sidebar;
