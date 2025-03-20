"use client";

import { Colorize } from "@/common/Style/color";
import Image from "next/image";
import { HiCheckBadge } from "react-icons/hi2";

type SubHeaderProps = {
  image: string;
  name: string;
  follower: number;
};

const SubHeader = ({ follower, image, name }: SubHeaderProps) => {
  return (
    <article
      style={{
        maxWidth: "100%",
        backgroundColor: Colorize.Neutral_03,
        padding: "24px",
        display: "flex",
      }}
    >
      <Image
        src={image}
        alt={name}
        width={251}
        height={251}
        style={{ borderRadius: "4px", objectFit: "cover" }}
      />
      <span
        style={{
          paddingLeft: "24px",
          paddingBottom: "17px",
          paddingTop: "96px",
          color: Colorize.Secondary_03,
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          <HiCheckBadge
            style={{ color: Colorize.Genre_12, fontSize: "20px" }}
          />
          <span>인증된 아티스트</span>
        </div>
        <div
          style={{
            fontSize: "80px",
            color: Colorize.Secondary_03,
            fontWeight: "bold",
          }}
        >
          {name}
        </div>
        <div>월별 리스너 {follower}</div>
      </span>
    </article>
  );
};

export default SubHeader;
