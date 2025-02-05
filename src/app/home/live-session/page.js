"use client";
import React, { useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { RiLiveLine } from "react-icons/ri";
import { useAuth } from "@/components/data/authProvider";
import { useRouter } from "next/navigation";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = process.env.NEXT_PUBLIC_CHAR,
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

const LiveSession = () => {
  const [start, setStart] = useState(false);
  const {user} = useAuth()

  const roomID = user?.uid
  const router = useRouter()

const myMeeting = (element) => {
  if (!element) return; 
  if (typeof window === "undefined") return;

  // Generate Kit Token
  const appID = process.env.NEXT_PUBLIC_APP_ID;
  const serverSecret = process.env.NEXT_PUBLIC_SERVER_SECRET;
  const userID = randomID(5);
  const userName = user?.displayName;
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    userID,
    userName
  );

  const zp = ZegoUIKitPrebuilt.create(kitToken);
  
  // Start the call
  zp.joinRoom({
    container: element,
    scenario: {
      mode: ZegoUIKitPrebuilt.VideoConference,
    },
    sharedLinks: [
      {
        url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}`,
      },
    ],
    showRoomTimer: true,
    showLeavingView: true,
    onLeaveRoom: () => {
      router.push("/home");
    },
  });
};


  return (
    <div className="flex flex-col gap-8 relative">
      <div className="flex w-full justify-end">
        <button
          onClick={()=>setStart(true)}
          className="bg-[#5145cd] dark:bg-indigo-500 py-2 rounded-md px-4 text-sm text-white"
        >
          Start Live Session
        </button>
      </div>
      <div className="w-full md:w-3/4 mx-auto ">
        <div
          className="w-full mx-auto rounded-md h-auto p-4 bg-gray-100"
          ref={start ? myMeeting : null}
          id="live-class"
        >
          <div className="w-1/2 text-lg text-gray-400 flex flex-col gap-5 items-center mx-auto text-center">
            <RiLiveLine size={40} />
            <span>No session currently going on. Start a Session</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSession;
