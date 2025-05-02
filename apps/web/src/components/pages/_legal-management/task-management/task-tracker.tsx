"use client";

import { Play, Pause, X, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TimerTracker = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <Card className="bg-yellow-50 dark:bg-yellow-900">
    {/* Header */}
    <CardHeader className="text-center">
      <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Timer Tracker
      </CardTitle>
      <CardDescription className="text-gray-500 dark:text-gray-300">
        Track your daily time usage
      </CardDescription>
    </CardHeader>

    {/* Timer Display */}
    <CardContent className="flex flex-col items-center justify-center space-y-4">
      <button
        onClick={handleStartStop}
        className={`flex h-16 w-16 items-center justify-center rounded-full shadow-md transition duration-200 ${
          isRunning
            ? "bg-red-500 hover:bg-red-600"
            : "bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700"
        }`}
      >
        {isRunning ? (
          <Pause className="h-8 w-8 text-white" />
        ) : (
          <Play className="h-8 w-8 text-white" />
        )}
      </button>

      <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        {formatTime(time)}
      </p>
    </CardContent>

    {/* Footer */}
    <CardFooter className="flex w-full flex-col space-y-3">
      <span className="text-center font-semibold text-gray-800 dark:text-gray-100">
        {formatTime(time)} / 03:00:00
      </span>

      <button
        onClick={handleReset}
        className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gray-300 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
      >
        <X className="h-4 w-4" />
        <span>Reset Timer</span>
      </button>
    </CardFooter>
  </Card>
  );
};

const RemainingTask = () => (
  <Card className="bg-violet-50 dark:bg-violet-900">
    <CardHeader className="flex items-center justify-between">
      <CardTitle className="textDark">
        Remaining To Do
      </CardTitle>
      <button className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 transition hover:bg-amber-600">
        <ArrowUpRight className="h-4 w-4 text-white" />
      </button>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center justify-center py-6">
        <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">34</p>
      </div>
    </CardContent>
    <CardFooter>
      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="flex flex-col items-center rounded-lg border border-gray-200 dark:border-gray-700 p-3">
          <p className="text-sm text-gray-600 dark:text-gray-300">Due Today</p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-100">7</p>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-gray-200 dark:border-gray-700 p-3">
          <p className="text-sm text-gray-600 dark:text-gray-300">This Week</p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-100">18</p>
        </div>
      </div>
    </CardFooter>
  </Card>
);


export { TimerTracker, RemainingTask };
