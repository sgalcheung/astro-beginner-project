// import { useState } from "react";
import { useStore } from "@nanostores/react";
import { upvoteCountStore } from "../stores/upvote";
import type { PropsWithChildren, ReactNode } from "react";


// the maximum number is upvotes available
const MAX_COUNT = 50;

// export const UpvoteContent = (props: { label:string }) => {
// export const UpvoteContent = (props: PropsWithChildren<{}>) => {
  export const UpvoteContent = (props: any) => {
    // the initial state of the upvote counter
    // const [upvoteCount, setUpvoteCount] = useState(0);
    const upvoteCount = useStore(upvoteCountStore);

    return (
      <>
        {/** Render the content of the children prop**/}
        {/* <div>{props.children}</div> */}
        <div>{props.description}</div>
        <div>{props.socialLinks}</div>

        <div className="m-2 flex items-center rounded-md border border-slate-600 p-2">
          <button
            // update state when a user clicks the counter. check if
            // The maximum count value was reached first.
            onClick={() => {
              // setUpvoteCount((prevCount) =>
              //   prevCount < MAX_COUNT ? prevCount + 1 : prevCount
              // );
              if (upvoteCount < MAX_COUNT) {
                //Update the store via the set method
                upvoteCountStore.set(upvoteCount + 1);
              }
            }}
            className="h-[80px] w-[80px] rounded-full border border-gray-500 bg-slate-900 p-4 text-center text-sm text-green-600 hover:scale-90 active:bg-slate-800"
          >
            {/** Upvote counter SVG icon. **/}
            <svg
              fill="none"
              className="mx-auto w-8"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              ></path>
            </svg>
            Upvote
          </button>

          <div className="ml-3">
            <div className="-300 mt-2 w-14 rounded-md bg-blue-500 px-2 text-sm text-white">
              React
            </div>
            {/** show a growing visual bar based on the upvote count **/}
            <div className="pt-2 text-slate-400">{`${upvoteCount} upvotes`}</div>
            {/** show a warning if the maximum count has been reached**/}
            <div
              className="h-2 bg-green-600"
              style={{
                width: `${upvoteCount}%`,
              }}
            />

            {upvoteCount === MAX_COUNT && (
              <div className="mt-2 rounded-md bg-red-300 px-2 text-sm">
                Max upvote reached
              </div>
            )}
          </div>
        </div>
      </>
    );
  };
