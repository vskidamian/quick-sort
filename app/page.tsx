"use client";
import Button from "@/components/Button";
import { generateRandomArray } from "@/helpers";
import { ChangeEvent, useState } from "react";
import { clsx } from "clsx";

export default function Home() {
  const [dataLength, setDataLength] = useState("");
  const [data, setData] = useState<number[]>([]);
  const [pivot, setPivot] = useState<number | undefined>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = parseInt(inputValue, 10);

    if (Number.isNaN(numericValue) || numericValue < 1 || numericValue > 100) return;

    setDataLength(inputValue);
  };

  const generateData = () => {
    if (!dataLength) return;

    const parsedLength = parseInt(dataLength, 10);
    if (isNaN(parsedLength) || parsedLength < 1) return;

    const newData = generateRandomArray(parsedLength);
    setData(newData);
  };

  const quickSort = async (arr: number[], low: number, high: number): Promise<void> => {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      if (typeof pivot !== undefined && pivotIndex !== Number(pivot)) setPivot(pivotIndex);

      await quickSort(arr, low, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, high);
    }
  };

  const partition = async (arr: number[], low: number, high: number): Promise<number> => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      if (arr[j] < pivot) {
        i++;
        await swap(arr, i, j);
      }
    }
    await swap(arr, i + 1, high);

    return i + 1;
  };

  const swap = async (arr: number[], i: number, j: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    setData([...arr]);
  };

  const start = async () => {
    await quickSort(data, 0, data.length - 1);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <div className="text-center mb-4">
        <h1 className="font-bold text-7xl text-purple-500">Quick Sort</h1>
        <h2 className="font-medium text-xl text-purple-300">The algorithm visualization</h2>
      </div>

      <div>
        <div className="relative">
          <input type="text" value={dataLength} onChange={handleChange} className="block w-full p-4 text-sm border-solid bg-black rounded-lg border-purple-500 border-2 text-white outline-0" placeholder="Length of data" required />
          <button type="submit" onClick={() => generateData()} className="text-white absolute right-2.5 bottom-2.5 bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
            GENERATE
          </button>
        </div>
        <p className="text-sm text-purple-300">Pass the number between 1 and 100</p>
      </div>
      {data.length > 0 ? (
        <>
          <div className="flex items-end justify-between w-full mt-16 mb-8  ">
            {data.map((value, index) => (
              <div
                key={index}
                style={{
                  width: `calc(${100 / data.length}% - 0.25rem)`,
                  height: `${value}px`,
                  minWidth: "1px",
                }}
                className={clsx("mr-1", index === pivot ? "bg-gradient-to-t from-pink-700 to-pink-400" : "bg-gradient-to-t from-purple-700 to-purple-400")}
              ></div>
            ))}
          </div>
          <Button onClick={() => start()}>START</Button>
        </>
      ) : null}
    </main>
  );
}
