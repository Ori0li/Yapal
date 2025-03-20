import { Colorize } from "@/common/Style/color";
import Image from "next/image";
import PlayButton from "../icon/PlayButton";

type Artist = {
  image: string;
  name: string;
};

const ArtistHover = ({ image, name }: Artist) => {
  return (
    <article className="p-2 w-[180px] flex flex-col items-center">
      <div className=" relative">
        <div className="w-[180px] h-[180px] rounded-full overflow-hidden">
          <img src={image} alt={name} />
        </div>
        <div
          className="w-8 h-8 absolute right-1 bottom-1 flex justify-center items-center"
          style={{
            backgroundColor: Colorize.Primary_01,
            borderRadius: "50%",
          }}
        >
          <PlayButton />
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm" style={{ color: Colorize.Secondary_03 }}>
          {"노래제목"}
        </p>
        <p className="text-xs" style={{ color: Colorize.Neutral_01 }}>
          {"아티스트"}
        </p>
      </div>
    </article>
  );
};

export default ArtistHover;
