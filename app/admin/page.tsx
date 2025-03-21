"use client";

import { useEffect } from "react";
import AlbumComponent from "@/components/AlbumComponent";
import Image from "next/image";
import { useAlbumStore } from "@/data/albumStore";

const AdminPage = () => {
  const {
    albumName,
    artistName,
    popularity,
    followers,
    artistsImageUrl,
    albumImageUrl,
    releaseDate,
    trackName,
    trackDuration,
    albums,
    setField,
    onClickUploadButton,
    getAlbums,
  } = useAlbumStore();

  useEffect(() => {
    getAlbums();
  }, [getAlbums]);

  return (
    <div style={{ color: "white" }}>
      <AlbumComponent />
      <h2 style={{ fontWeight: "bold", fontSize: "30px", marginTop: "10px" }}>
        앨범 추가를 해주세요
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <input
          type="text"
          value={albumName}
          onChange={(e) => setField("albumName", e.target.value)}
          placeholder="앨범 이름 입력"
        />
        <input
          type="text"
          value={artistName}
          onChange={(e) => setField("artistName", e.target.value)}
          placeholder="아티스트 이름 입력"
        />
        <input
          type="number"
          value={popularity}
          onChange={(e) => setField("popularity", Number(e.target.value))}
          placeholder="인기도"
        />
        <input
          type="number"
          value={followers}
          onChange={(e) => setField("followers", Number(e.target.value))}
          placeholder="팔로워 수"
        />
        <input
          type="text"
          value={artistsImageUrl}
          onChange={(e) => setField("artistsImageUrl", e.target.value)}
          placeholder="아티스트 이미지 URL"
        />
        <input
          type="text"
          value={albumImageUrl}
          onChange={(e) => setField("albumImageUrl", e.target.value)}
          placeholder="앨범 이미지 URL"
        />
        <input
          type="text"
          value={releaseDate}
          onChange={(e) => setField("releaseDate", e.target.value)}
          placeholder="발매일"
        />
        <input
          type="text"
          value={trackName}
          onChange={(e) => setField("trackName", e.target.value)}
          placeholder="트랙 이름"
        />
        <input
          type="text"
          value={trackDuration}
          onChange={(e) => setField("trackDuration", e.target.value)}
          placeholder="트랙 길이"
        />
        <button onClick={onClickUploadButton}>앨범 저장</button>
      </div>
      <h2 style={{ fontWeight: "bold", fontSize: "30px", marginTop: "10px" }}>
        앨범 리스트
      </h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <p>앨범이름 : {album.albumsName}</p>
            <p>발행년도 : {album.releaseDate}</p>
            <p>아티스트: {album.artistName}</p>
            {album.albumImageUrl ? (
              <Image
                src={album.albumImageUrl}
                alt={album.albumsName}
                width={100}
                height={100}
              />
            ) : (
              <p>이미지 없음</p>
            )}
            {album.artistsImageUrl ? (
              <Image
                src={album.artistsImageUrl}
                alt={album.artistName}
                width={100}
                height={100}
              />
            ) : (
              <p>이미지 없음</p>
            )}
            <p>
              인기도: {album.popularity} | 팔로워: {album.followers}
            </p>
            <p>장르: {album.genres.join(", ")}</p>
            <p>트랙(노래 제목): {album.trackName}</p>
            <p>재생시간 : {album.trackDuration}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
