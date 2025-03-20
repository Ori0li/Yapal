import { useAlbumStore } from "@/data/albumStore";
import SubHeader from "@/components/header/SubHeader";
import Album from "@/components/artist/Album";
import DetailList from "@/components/detailList/DetailList";

type DetailProps = {
  params: { artistName: string };
};

const DetailPage = async ({ params }: DetailProps) => {
  const { artistName } = await params;

  return (
    <div>
      <DetailList artistName={artistName}></DetailList>
    </div>
  );
};

export default DetailPage;
