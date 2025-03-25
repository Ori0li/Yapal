"use client";

import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { useAlbumStore } from "@/common/store/albumStore";
import SongList from "../playList/SongList";
import AlbumProfileBox from "../detail/subcomponents/AlbumProfileBox";

// ✅ 세로 스크롤에 맞게 마스크 애니메이션 수정
const top = `0%`;
const bottom = `100%`;
const topInset = `20%`;
const bottomInset = `80%`;
const transparent = `#0000`;
const opaque = `#000`;

const useScrollOverflowMask = (scrollYProgress: MotionValue<number>) => {
  const maskImage = useMotionValue(
    `linear-gradient(180deg, ${opaque}, ${opaque} ${top}, ${opaque} ${bottomInset}, ${transparent})`
  );

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(180deg, ${opaque}, ${opaque} ${top}, ${opaque} ${bottomInset}, ${transparent})`
      );
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(180deg, ${transparent}, ${opaque} ${topInset}, ${opaque} ${bottom}, ${opaque})`
      );
    } else if (
      scrollYProgress.getPrevious() === 0 ||
      scrollYProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(180deg, ${transparent}, ${opaque} ${topInset}, ${opaque} ${bottomInset}, ${transparent})`
      );
    }
  });

  return maskImage;
};

const TrackList = ({ trackName }: { trackName: string }) => {
  const { albums, getAlbums } = useAlbumStore();

  useEffect(() => {
    getAlbums();
  }, [getAlbums]);

  const cleanedTrackName = decodeURIComponent(trackName).toLowerCase();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });

  const maskImage = useScrollOverflowMask(scrollYProgress);

  // 해당 trackName을 가진 앨범들
  const albumTracks = albums.filter(
    (album) =>
      decodeURIComponent(album.albumsName).toLowerCase() === cleanedTrackName
  );

  // 해당 트랙이 포함된 앨범 이름
  const currentAlbumName = albumTracks[0]?.albumsName;

  // 해당 앨범 이름으로 고유 앨범 하나 찾기
  const albumInfo = albums.find(
    (album) => album.albumsName === currentAlbumName
  );

  if (albumTracks.length === 0 || !albumInfo) {
    return <div>해당 트랙을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <AlbumProfileBox
        name={albumInfo.albumsName}
        image={albumInfo.albumImageUrl}
      />
      <div className="w-full max-w-[1200px] relative m-auto">
        {/* Progress Circle */}
        <svg
          className="absolute -top-16 right-13 -rotate-90 w-20 h-20"
          width="80"
          height="80"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="16"
            pathLength="1"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="16"
            className="stroke-emerald-500"
            strokeWidth="6"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>

        {/* Scrollable List */}
        <motion.ul
          ref={ref}
          className="flex flex-col gap-6 max-h-[400px] mt-[60px] overflow-y-scroll p-5
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-transparent"
          style={{ maskImage }}
        >
          {albumTracks.map((v, i) => (
            <SongList
              key={v.trackName}
              number={i}
              image={""}
              name={v.trackName}
              duration={v.trackDuration}
            />
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default TrackList;
