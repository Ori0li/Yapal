"use client";

import { useAlbumStore } from "@/data/albumStore";
import SubHeader from "@/components/header/SubHeader";
import Album from "@/components/artist/Album";
import SongList from "../playList/SongList";
import ArtistDescription from "../artist/ArtistDescription";

const DetailList = ({ artistName }: { artistName: string }) => {
  const { albums } = useAlbumStore();
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
      <SubHeader
        image={album.artistsImageUrl}
        name={album.artistName}
        follower={album.followers}
      />
      <div className="p-11">
        <div className=" w-full flex justify-between mb-20">
          <div
            className="flex-2 w-full h-[300px] overflow-auto  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-white"
          >
            {artistAlbums.map((v, i) => (
              <div>
                <SongList
                  key={v.id}
                  number={i}
                  name={v.trackName}
                  image={v.albumImageUrl}
                  followers={v.followers}
                  duration={v.trackDuration}
                />
              </div>
            ))}
          </div>
          <div className="flex-1 w-full m-auto">
            <ArtistDescription
              key={album.id}
              popularity={album.popularity}
              genre={album.genres}
              follower={album.followers}
            />
          </div>
        </div>
        <h2 className="text-white">싸발적인 엘범들</h2>
        <div className="flex gap-10">
          {uniqueAlbums.map((v) => (
            <div>
              <Album key={v.id} name={v.albumsName} image={v.albumImageUrl} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailList;
