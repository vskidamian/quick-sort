export const generateRandomArray = (length: number): number[] => {
    const randomArray: number[] = [];
  
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 381) + 20;
      randomArray.push(randomNumber);
    }
  
    return randomArray;
  };