"use client";

import Album from "@/components/artist/subcomponents/Album";
import SongList from "../playList/SongList";
import ArtistDescription from "../artist/subcomponents/ArtistDescription";
import Link from "next/link";
import ArtistProfileBox from "./subcomponents/ArtistProfileBox";
import { useEffect } from "react";
import { useAlbumStore } from "@/common/store/albumStore";

const DetailList = ({ artistName }: { artistName: string }) => {
  const { albums, getAlbums } = useAlbumStore();

  useEffect(() => {
    getAlbums();
  }, [getAlbums]);

  const cleanedArtistName = decodeURIComponent(artistName).toLowerCase();
  const artistAlbums = albums.filter(
    (album) =>
      decodeURIComponent(album.artistName).toLowerCase() === cleanedArtistName
  );

  const uniqueAlbums = artistAlbums.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.albumsName === value.albumsName)
  );

  const album = uniqueAlbums.length > 0 ? uniqueAlbums[0] : null;

  if (!album) {
    return <div>앨범을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <ArtistProfileBox image={album.artistsImageUrl} name={album.artistName} />
      <div className="p-11 ">
        <div className="max-w-full flex flex-col sm:flex-row sm:w-full justify-between mb-20">
          <div
            className="flex-2 w-full max-h-[300px] overflow-y-auto 
      flex flex-col gap-4
      [&::-webkit-scrollbar]:w-1.5
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-white"
          >
            {artistAlbums.map((v, i) => (
              <div key={i} className="flex-shrink-0">
                <SongList
                  key={v.id}
                  number={i}
                  name={v.trackName}
                  image={v.albumImageUrl}
                  duration={v.trackDuration}
                />
              </div>
            ))}
          </div>
          <div
            key={album.id}
            className="flex-1 w-full m-auto sm:max-w-[300px] mt-8 sm:mt-0"
          >
            <ArtistDescription
              popularity={album.popularity}
              genre={album.genres}
              follower={album.followers}
            />
          </div>
        </div>

        <h2 className="text-white text-2xl py-5">아티스트의 다른 엘범들</h2>
        <div className="grid grid-cols-3 sm:flex gap-10">
          {uniqueAlbums.map((v, i) => (
            <Link key={i} href={`/musicchart/${v.albumsName}`}>
              <div>
                <Album name={v.albumsName} image={v.albumImageUrl} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailList;
