"use client";
import Bar from "@/components/Bar";
import Button from "@/components/Button";
import Title from "@/components/Title";
import { COLORS, colorChange, generateRandomArray, sleep } from "@/helpers";
import { ChangeEvent, useRef, useState } from "react";

export default function Home() {
  const [dataLength, setDataLength] = useState("");
  const [data, setData] = useState<number[]>([]);
  const [pivot, setPivot] = useState<number>(0);
  const [finishedAnimation, setFinishedAnimation] = useState(false);
  const [isSorting, setIsSorting] = useState(false);

  const dataRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = parseInt(inputValue, 10);

    if (Number.isNaN(numericValue) || numericValue < 1 || numericValue > 100) {
      setDataLength("");
      return;
    }

    setDataLength(inputValue);
  };

  const generateData = () => {
    if (!dataLength) return;

    const parsedLength = parseInt(dataLength, 10);
    if (isNaN(parsedLength) || parsedLength < 1) return;

    setFinishedAnimation(false);
    const newData = generateRandomArray(parsedLength);
    setPivot(newData.length - 1);
    setData(newData);
  };

  const quickSort = async (arr: number[], low: number, high: number): Promise<void> => {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSort(arr, low, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, high);
    }
  };

  const partition = async (arr: number[], low: number, high: number): Promise<number> => {
    const dataBars = dataRef.current?.children!;

    const pivot = arr[high];

    setPivot(high);

    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      colorChange(dataBars[j] as HTMLDivElement, COLORS.CURRENT);
      await sleep(500);
      colorChange(dataBars[j] as HTMLDivElement, COLORS.DEFAULT);

      if (arr[j] < pivot) {
        i++;

        if (arr[i] !== arr[j]) {
          colorChange(dataBars[i] as HTMLDivElement, COLORS.COMPARE);
          colorChange(dataBars[j] as HTMLDivElement, COLORS.COMPARE);
          await swap(arr, i, j);
          await sleep(500);
          colorChange(dataBars[i] as HTMLDivElement, COLORS.DEFAULT);
          colorChange(dataBars[j] as HTMLDivElement, COLORS.DEFAULT);
        }
      }
    }

    if (arr[i + 1] !== arr[high]) {
      colorChange(dataBars[i + 1] as HTMLDivElement, COLORS.COMPARE);
      colorChange(dataBars[high] as HTMLDivElement, COLORS.COMPARE);
      await swap(arr, i + 1, high);
      await sleep(500);
      colorChange(dataBars[i + 1] as HTMLDivElement, COLORS.DEFAULT);
      colorChange(dataBars[high] as HTMLDivElement, COLORS.DEFAULT);
    }

    return i + 1;
  };

  const swap = async (arr: number[], i: number, j: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    setData([...arr]);
  };

  const start = async () => {
    setFinishedAnimation(false);
    setIsSorting(true);
    await quickSort(data, 0, data.length - 1);
    await sleep(1000);
    setFinishedAnimation(true);
    setIsSorting(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-16">
      <Title title="Quick Sort" subTitle="The algorithm visualization" />
      <div>
        <div className="relative">
          <input type="text" value={dataLength} onChange={handleChange} className="block w-full p-4 text-sm border-solid bg-black rounded-lg border-purple-500 border-2 text-white outline-0" placeholder="Length of data" required />
          <button type="submit" disabled={isSorting} onClick={() => generateData()} className="text-white absolute right-2.5 bottom-2.5 bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
            GENERATE
          </button>
        </div>
        <p className="text-sm text-purple-300">Pass the number between 1 and 100</p>
      </div>
      {data.length ? (
        <>
          <div ref={dataRef} className="flex items-end justify-between w-full mt-16 mb-8">
            {data.map((value, index) => (
              <Bar key={index} finishedAnimation={finishedAnimation} index={index} length={data.length} pivot={pivot} value={value} />
            ))}
          </div>
          <div className="flex">
            <Button disabled={isSorting} onClick={start}>
              START
            </Button>
          </div>
        </>
      ) : null}
    </main>
  );
}
