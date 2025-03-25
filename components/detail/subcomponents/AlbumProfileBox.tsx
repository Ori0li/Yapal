"use client";

import { Colorize } from "@/common/Style/color";
import { nameImgProps } from "@/common/Type/type";

const AlbumProfileBox = ({ image, name }: nameImgProps) => {
  return (
    <article
      className="max-w-full py-10 px-6 sm:px-32 flex flex-col  items-center sm:flex-row sm:gap-7 sm:items-end"
      style={{
        background:
          "linear-gradient(to bottom, rgba(205, 168, 228, 1), rgba(18, 18, 18, 1))",
      }}
    >
      <div className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] overflow-hidden">
        <img src={image} alt={name} />
      </div>

      <div
        className="text-3xl font-bold sm:text-5xl sm:font-bold sm:py-16 sm:max-w-[800px]"
        style={{
          color: Colorize.Secondary_03,
        }}
      >
        {name}
      </div>
    </article>
  );
};

export default AlbumProfileBox;
