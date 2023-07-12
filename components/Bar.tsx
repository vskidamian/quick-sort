import { COLORS } from "@/helpers";

type BarProps = {
  index: number;
  value: number;
  length: number;
  finishedAnimation: boolean;
  pivot: number;
};

const Bar = ({ index, value, length, finishedAnimation, pivot }: BarProps) => {
  return (
    <div
      key={index}
      style={{
        width: `calc(${100 / length}% - 0.25rem)`,
        height: `${value}px`,
        minWidth: "1vw",
        marginRight: "0.25rem",
        backgroundColor: finishedAnimation ? COLORS.FINAL : index === pivot ? COLORS.PIVOT : COLORS.DEFAULT,
        boxShadow: finishedAnimation ? "none" : index === pivot ? "0px 1px 34px 5px rgba(247, 42, 162, 1)" : "none",
        color: "black",
        fontSize: "40px",
      }}
    >
      {value}
    </div>
  );
};

export default Bar;
