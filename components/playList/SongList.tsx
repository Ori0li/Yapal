import { Colorize } from "@/common/Style/color";
import { SongProps } from "@/common/Type/type";
import Image from "next/image";

const SongList = ({ number, name, image, duration, followers }: SongProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="p-3.5 w-11" style={{ color: Colorize.Neutral_01 }}>
          {number + 1}
        </div>
        <div className="flex items-center">
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="ml-2">
          <p
            className="text-xl font-bold"
            style={{
              color: Colorize.Secondary_03,
            }}
          >
            {name}
          </p>
        </div>
      </div>
      <div className="flex items-center mr-12 gap-28">
        <div
          className="text-sm font-bold"
          style={{
            color: Colorize.Neutral_01,
          }}
        >
          {followers}
        </div>
        <div
          className="text-sm font-bold"
          style={{
            color: Colorize.Neutral_01,
          }}
        >
          {duration}
        </div>
      </div>
    </div>
  );
};

export default SongList;
