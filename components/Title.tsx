type TitleProps = {
  title: string;
  subTitle: string;
};

const Title = ({ title, subTitle }: TitleProps) => {
  return (
    <div className="text-center mb-4">
      <h1 className="font-bold text-7xl text-purple-500">{title}</h1>
      <h2 className="font-medium text-xl text-purple-300">{subTitle}</h2>
    </div>
  );
};

export default Title;
