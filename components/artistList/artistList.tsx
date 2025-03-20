"use client";

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
    <div className="p-12">
      <h2 className="text-white">아티스트 리스트</h2>
      <div className="grid grid-cols-4">
        {uniqueArtists.map((artist) => (
          <Link href={`/detail/${artist.artistName}`}>
            <ArtistHover
              key={artist.id}
              image={artist.artistsImageUrl}
              name={artist.artistName}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
