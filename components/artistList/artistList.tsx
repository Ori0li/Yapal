"use client";
// AlbumList 컴포넌트
import { useAlbumStore } from "@/data/albumStore";
import { useEffect, useMemo } from "react";
import ArtistHover from "../artist/ArtistHover";
import Link from "next/link";

const AlbumList = () => {
  const { albums, getAlbums } = useAlbumStore();

  useEffect(() => {
    getAlbums();
  }, [getAlbums]);

  const uniqueArtists = useMemo(() => {
    return Object.values(
      albums.reduce((acc, album) => {
        if (!acc[album.artistName]) {
          acc[album.artistName] = album;
        }
        return acc;
      }, {} as Record<string, (typeof albums)[0]>)
    );
  }, [albums]);

  return (
    <div className="sm:p-12 p-5 justify-center">
      <h2 className="text-white">아티스트 리스트</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {uniqueArtists.map((artist) => {
          const encodedArtistName = encodeURIComponent(artist.artistName);

          return (
            <Link href={`/detail/${encodedArtistName}`} key={artist.artistName}>
              <ArtistHover
                image={artist.artistsImageUrl}
                name={artist.artistName}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumList;
