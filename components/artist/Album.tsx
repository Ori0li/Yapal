import { Colorize } from "@/common/Style/color";
import { bodyFont, headerFont } from "@/common/Style/font";
import Image from "next/image";

type AlbumProps = {
  image: string;
  name: string;
};

const Album = ({ name, image }: AlbumProps) => {
  return (
    <article className="max-w-[280px]">
      <Image src={image} alt={name} width={280} height={280} />
      <div className="mt-1">
        <p
          style={{
            fontSize: "18px",
            color: Colorize.Neutral_01,
          }}
        >
          {name}
        </p>
      </div>
    </article>
  );
};

export default Album;
