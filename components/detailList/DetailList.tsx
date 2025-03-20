"use client";

import { useAlbumStore } from "@/data/albumStore";
import SubHeader from "@/components/header/SubHeader";
import Album from "@/components/artist/Album";

const DetailList = ({ artistName }: { artistName: string }) => {
  const { albums } = useAlbumStore();
  // URL 디코딩 및 소문자로 변환하여 처리
  const cleanedArtistName = decodeURIComponent(artistName).toLowerCase();

  console.log("Original Artist Name:", artistName); // 원본 artistName
  console.log("Cleaned Artist Name:", cleanedArtistName);

  const artistAlbums = albums.filter(
    (album) =>
      decodeURIComponent(album.artistName).toLowerCase() === cleanedArtistName
  );

  // 앨범의 id를 기준으로 중복 제거
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
        key={album.id}
        image={album.artistsImageUrl}
        name={album.artistName}
        follower={album.followers}
      />
      <div className="grid grid-cols-3 py-36 px-48 gap-24">
        {uniqueAlbums.map((v) => (
          <div key={v.id}>
            <Album name={v.albumsName} image={v.albumImageUrl} />
          </div>
        ))}
      </div>
    </>
  );
};

export default DetailList;
