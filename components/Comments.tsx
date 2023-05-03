import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "@/store/authStore";
import NoResult from "./NoResult";
import { IUser } from "@/types";

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();
  return (
    <div className="border-t-2 border-gray-20 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px] ">
      <div className="overflow-scroll lg:h-[475px] ">
        {comments?.length ? (
          <div className="">
            {comments.map((item, i) => (
              <>
                {allUsers.map(
                  (user: IUser) =>
                    user._id === item.postedBy._id ||
                    (item.postedBy._ref && (
                      <div className="p-2 items-center " key={i}>
                        <Link href={`/profile/${user._id}`}>
                          <div className="flex items-start gap-3 ">
                            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded ">
                              <div className="w-8 h-8">
                                <Image
                                  src={user.image}
                                  width={34}
                                  height={34}
                                  alt=""
                                  className="rounded-full "
                                />
                              </div>
                              <div className="hidden lg:block ">
                                <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                                  {user.userName.replaceAll(" ", "")}{" "}
                                  <GoVerified className="text-blue-400" />
                                </p>
                                <p className="capitalize text-gray-400 text-xs">
                                  {user.userName}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div>
                          <p>{item.comment}</p>
                        </div>
                      </div>
                    ))
                )}
              </>
            ))}
          </div>
        ) : (
          <NoResult text="No comments yet! " />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10 ">
          <form onSubmit={addComment} className="flex gap-4 ">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add Comment"
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg "
            />
            <button
              className="text-md text-white bg-[#f51997] w-[120px] rounded-xl "
              onClick={addComment}
            >
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
