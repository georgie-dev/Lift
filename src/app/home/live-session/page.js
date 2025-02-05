"use client";
import React, { useState, useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { RiLiveLine } from "react-icons/ri";
import { useAuth } from "@/components/data/authProvider";
import { useRouter } from "next/navigation";

function randomID(len = 5) {
  let result = "";
  const chars =
    process.env.NEXT_PUBLIC_CHAR || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Fallback
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

const LiveSession = () => {
  const [start, setStart] = useState(false);
  const { user } = useAuth();
  const roomID = user?.uid;
  const router = useRouter();
  const meetingContainerRef = useRef(null);

  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (start && meetingContainerRef.current && typeof window !== "undefined") {
      const appID = process.env.NEXT_PUBLIC_APP_ID;
      const serverSecret = process.env.NEXT_PUBLIC_SERVER_SECRET;
      if (!appID || !serverSecret) {
        console.error("Missing ZegoCloud credentials in environment variables.");
        return;
      }

      const userID = randomID(5);
      const userName = user?.displayName || "Guest";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        parseInt(appID), 
        serverSecret, 
        roomID, 
        userID, 
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: meetingContainerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        sharedLinks: [
          {
            url: `${fullUrl}?roomID=${roomID}`,
          },
        ],
        showRoomTimer: true,
        showLeavingView: true,
        onLeaveRoom: () => {
          router.push("/home");
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, user, roomID, fullUrl]);

  return (
    <div className="flex flex-col gap-8 relative">
      <div className="flex w-full justify-end">
        <button
          onClick={() => setStart(true)}
          className="bg-[#5145cd] dark:bg-indigo-500 py-2 rounded-md px-4 text-sm text-white"
        >
          Start Live Session
        </button>
      </div>
      <div className="w-full md:w-3/4 mx-auto">
        <div
          className="w-full mx-auto rounded-md h-auto p-4 bg-gray-100"
          ref={meetingContainerRef}
          id="live-class"
        >
          {!start && (
            <div className="w-1/2 text-lg text-gray-400 flex flex-col gap-5 items-center mx-auto text-center">
              <RiLiveLine size={40} />
              <span>No session currently going on. Start a Session</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveSession;
