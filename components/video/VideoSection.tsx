"use client";

import { Colorize } from "@/common/Style/color";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Video play failed:", err);
      });
    }
  }, []);

  return (
    <div className="flex gap-12 border-2 border-b-neutral-600">
      <figure className="w-[500px] h-[330px]">
        <video
          ref={videoRef}
          src="/Spotify.mp4"
          autoPlay
          loop
          muted
          preload="auto"
          playsInline
          poster="./SpotifyBg.jpg"
          className="w-[500px] h-[300px]"
        ></video>
      </figure>
      <figcaption className="flex flex-col gap-6 justify-center">
        <div className="flex items-center gap-5">
          <Image width={100} height={80} src={"/Logo.png"} alt="" priority />
        </div>
        <em style={{ color: Colorize.Secondary_03 }}>
          누구나 어디서나 자신만의 음악을 만들어 공유해보세요!
        </em>
        <span
          className="hover:underline cursor-pointer"
          style={{ color: Colorize.Secondary_03 }}
        >
          Music, Products, and Audiobooks for every moment...
        </span>
        <Link href="https://www.youtube.com/@Spotify">
          <button className="p-3 rounded-full cursor-pointer text-white border-green-700 border-2">
            영상 링크
          </button>
        </Link>
      </figcaption>
    </div>
  );
};

export default VideoSection;
