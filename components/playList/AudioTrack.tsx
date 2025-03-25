"use client";

import { Album } from "@/common/Type/type";
import React, { useRef, useState, useEffect } from "react";
import { BiSolidPlaylist } from "react-icons/bi";
import { FaPauseCircle } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import {
  IoPlaySkipBackCircleSharp,
  IoPlaySkipForwardCircleSharp,
} from "react-icons/io5";

type AudioTrackProps = {
  track: {
    trackName: string;
    trackDuration: string;
    albumImageUrl: string;
    artistName: string;
  };
};

const AudioTrack = ({ track }: AudioTrackProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null); // 오디오 요소 참조
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태 추적
  const [volume, setVolume] = useState(1); // 볼륨 상태 (0 ~ 1)
  const [currentTime, setCurrentTime] = useState<number>(0); // 현재 시간, 명시적으로 number 타입
  const [duration, setDuration] = useState<number>(0); // 재생 시간

  const parseDuration = (duration: string): number => {
    const parts = duration.split(":");
    if (parts.length === 2) {
      const minutes = parseInt(parts[0], 10);
      const seconds = parseInt(parts[1], 10);
      return minutes * 60 + seconds;
    }
    return parseFloat(duration);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const parsedTrackDuration: number =
    typeof track.trackDuration === "string"
      ? parseDuration(track.trackDuration)
      : track.trackDuration || 0;

  // 오디오 재생/일시정지 토글 함수
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // 볼륨 조절 함수
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  // 현재 시간 및 진행 바 업데이트
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // 오디오 파일이 로드될 때
  const handleLoadedMetadata = () => {
    if (audioRef.current && !track.trackDuration) {
      setDuration(audioRef.current.duration); // trackDuration이 없으면 오디오의 duration을 사용
    }
  };

  // 진행 바를 클릭하여 시간 이동하기
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const progressBar = e.target as HTMLElement;
      const clickedPosition = e.nativeEvent.offsetX;
      const newTime = (clickedPosition / progressBar.offsetWidth) * duration;
      audioRef.current.currentTime = newTime;
    }
  };

  const buttonCss = {
    normal:
      "text-xl text-white bg-blue-500 p-2 rounded-full hover:bg-blue-600 focus:outline-none",
    big: "text-5xl text-white bg-blue-500 p-2 rounded-full hover:bg-blue-600 focus:outline-none",
  };

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 필요한 초기 설정을 할 수 있습니다.
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, [duration]);

  return (
    <div className="w-full bg-zinc-900 text-white shadow-xl rounded-2xl p-16 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-10">
      {/* 왼쪽: 앨범 이미지 */}
      <img
        className="w-[140px] h-[140px] rounded-xl object-cover shadow-md"
        src={track.albumImageUrl}
        alt="Album Cover"
      />

      {/* 중앙: 트랙 제목 + 진행 바 */}
      <div className="flex flex-col items-center justify-center gap-4 flex-1 text-center">
        {/* 트랙 이름 (제목처럼 크게) */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          {track.trackName}
        </h2>

        {/* 아티스트명 작게 아래에 표시 (선택적) */}
        <h3 className="text-sm text-zinc-400">{track.artistName}</h3>

        {/* 진행 바 */}
        <div className="flex items-center gap-3 w-full max-w-[500px]">
          <span className="text-xs font-mono w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <div
            className="flex-1 h-2 bg-zinc-700 rounded-full cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{
                width: `${
                  parsedTrackDuration
                    ? (currentTime / parsedTrackDuration) * 100
                    : 0
                }%`,
              }}
            />
          </div>
          <span className="text-xs font-mono w-10 text-left">
            {formatTime(parsedTrackDuration)}
          </span>
        </div>
      </div>

      {/* 오른쪽: 버튼들 */}
      <div className="flex flex-col items-center justify-center gap-4">
        {/* 오디오 */}
        <audio ref={audioRef} src="/test-audio.mp3" preload="auto" />

        {/* 버튼 그룹 */}
        <div className="flex items-center gap-4">
          <button className="hover:scale-110 transition-transform">
            <IoPlaySkipBackCircleSharp size={28} />
          </button>
          <button
            onClick={togglePlayPause}
            className="hover:scale-110 transition-transform"
          >
            {isPlaying ? (
              <FaPauseCircle size={32} />
            ) : (
              <FaCirclePlay size={32} />
            )}
          </button>
          <button className="hover:scale-110 transition-transform">
            <IoPlaySkipForwardCircleSharp size={28} />
          </button>
        </div>

        {/* 볼륨 */}
        <div className="flex items-center gap-2 w-full justify-center">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-[120px] accent-blue-500"
          />
          <span className="text-sm text-zinc-300">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioTrack;
