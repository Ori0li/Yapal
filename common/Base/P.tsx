import { IconType } from "react-icons";
import { Colorize } from "../Style/color";

type PProps = {
  text: number | string;
  icon?: IconType; // Make icon optional
};

const P = ({ text, icon: Icon }: PProps) => {
  const InfoCusStyle = "font-bold text-lg flex items-end gap-5";
  return (
    <p
      className={InfoCusStyle}
      style={{
        color: Colorize.Secondary_03,
      }}
    >
      {Icon && <Icon size={45} />} {text}
    </p>
  );
};

export default P;
