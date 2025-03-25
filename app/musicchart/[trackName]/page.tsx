import { TrackProps } from "@/common/Type/type";
import TrackList from "@/components/playList/TrackList";

const TrackPage = async ({ params }: TrackProps) => {
  const { trackName } = await params;
  return (
    <div>
      <TrackList trackName={trackName} />
    </div>
  );
};

export default TrackPage;
