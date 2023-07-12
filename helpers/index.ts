export const COLORS = {
  DEFAULT : "#a855f7",
  CURRENT : "#f884fa",
  COMPARE: '#ff9d35',
  FINAL:"#94d92b",
  PIVOT: "#f72aa2",
}

export const generateRandomArray = (length: number): number[] => {
  const randomArray: number[] = [];

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 381) + 20;
    randomArray.push(randomNumber);
  }

  return randomArray;
};

export const sleep = (delay: number) => new Promise<void>((resolve) => setTimeout(resolve, delay));


export const colorChange = (element: HTMLDivElement, color: string) => {
  element.style.backgroundColor = color;
}