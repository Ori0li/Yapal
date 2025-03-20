"use client";
import SubHeader from "@/components/header/SubHeader";
import { Album, useAlbumStore } from "@/data/albumStore";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

import { use, useEffect, useState } from "react";

type detailProps = {
  params: Promise<{ name: string }>;
};

const DetailPage = ({ params }: detailProps) => {
  // const { albums, getAlbums } = useAlbumStore();
  const [albums, setA] = useState<Album[]>();

  useEffect(() => {
    async () => {
      const albumQuery = query(collection(fireStore, "Album"), orderBy("id"));
      const querySnapshot = await getDocs(albumQuery);
      const a = querySnapshot.docs
        .map((doc) => doc.data() as Album)
        .filter((v) => v.artistName == name);
      console.log(querySnapshot.docs.map((doc) => doc.data() as Album));
      setA((prev) => a);
    };
  }, []);
  const { name } = use(params);

  if (!albums) return <>ㅁㄹ</>;

  return (
    <div>
      {albums.map((v) => (
        <>
          <SubHeader
            key={v.id}
            name={v.artistName}
            follower={v.followers}
            image={v.artistsImageUrl}
          />
        </>
      ))}
    </div>
  );
};

export default DetailPage;
