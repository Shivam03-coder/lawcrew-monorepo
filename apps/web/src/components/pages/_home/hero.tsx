"use client";
import React from "react";
import { LoaderPinwheel, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const Router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-12 text-center">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 opacity-30 blur-3xl sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px]" />
        <div className="absolute right-0 top-1/3 h-40 w-40 rounded-full bg-pink-100 opacity-20 blur-2xl sm:h-52 sm:w-52 md:h-72 md:w-72" />
        <div className="absolute left-0 top-2/3 h-32 w-32 rounded-full bg-blue-100 opacity-20 blur-2xl sm:h-44 sm:w-44 md:h-64 md:w-64" />
      </div>

      <section className="max-w-3xl px-4 sm:max-w-4xl">
        {/* Heading */}
        <h1 className="textDark relative mx-auto mt-6 font-lexend text-3xl font-normal tracking-tight sm:text-3xl md:text-5xl lg:text-6xl">
          A Satisfied Customer is
          <span className="mt-2 block textDark pb-3 text-transparent dark:via-slate-400 sm:pb-5">
            The Best Business Strategy.
          </span>
        </h1>

        {/* Description */}
        <p className="textDark opacity-70  mx-auto mt-6 max-w-2xl font-lexend text-sm sm:text-lg md:text-lg">
          LAW-WISE empowers legal professionals with cutting-edge tools for
          efficient case management, secure document handling, and streamlined
          client communication. Simplify legal workflows, stay organized, and
          focus on what matters most—delivering justice with confidence.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-6">
          <Button
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            size="lg"
            aria-label="Try for Free"
          >
            <Link href="/lawcrew" className="flex items-center gap-x-4">
              Try Free <LoaderPinwheel className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            onClick={() => Router.push("/user-dashboard")}
            variant="outline"
            className="group flex w-full items-center justify-center gap-2 rounded-full border-2 border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            aria-label="View Demo"
          >
            <PlayCircle className="mr-2 h-5 w-5" /> View Demo
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
