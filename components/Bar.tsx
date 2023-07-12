import { COLORS } from "@/helpers";

type BarProps = {
  index: number;
  value: number;
  length: number;
  finishedAnimation: boolean;
  pivot: number;
};

const Bar = ({ index, value, length, finishedAnimation, pivot }: BarProps) => {
  const margin = 100 / length > 3 ? "0.5rem" : "0.125rem";

  return (
    <div
      key={index}
      style={{
        width: `${100 / length}%`,
        height: `${value}px`,
        marginRight: margin,
        backgroundColor: finishedAnimation ? COLORS.FINAL : index === pivot ? COLORS.PIVOT : COLORS.DEFAULT,
        boxShadow: finishedAnimation ? "none" : index === pivot ? "0px 1px 34px 5px rgba(247, 42, 162, 1)" : "none",
      }}
    ></div>
  );
};

export default Bar;
