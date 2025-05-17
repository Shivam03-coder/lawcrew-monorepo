"use client";

import { FC, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronRight,
  Scale,
  Briefcase,
  Shield,
  BarChart,
  CreditCard,
  FileText,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import SectionHeader from "./section-header";

interface SolutionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  titlebg: string;
}

const SolutionCard: FC<SolutionCardProps> = ({
  icon,
  title,
  description,
  linkText,
  linkHref,
  titlebg,
}) => {
  return (
    <Card
      className={`card bg-white group flex h-full flex-col hover:transition-all duration-300 hover:scale-[1.02]`}
    >
      <CardHeader className="flex-none">
        <CardTitle
          className={`flex h-16 w-16 items-center justify-center rounded-lg p-3 text-primary sm:h-[3.75rem] sm:w-[3.75rem] ${titlebg}`}
        >
          {icon}
        </CardTitle>
        <CardDescription className="pt-4">
          <span className="textDark font-lexend text-base font-medium sm:text-lg md:text-xl">
            {title}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-primary/70 font-inter text-sm dark:text-slate-300 sm:text-base">
          {description}
        </p>
      </CardContent>
      <CardFooter className="flex-none pt-4">
      
      <Link href={linkHref} className="mt-auto flex justify-center">
          <Button
            variant="outline"
            className="w-full rounded-full border-white bg-primary text-secondary transition-all"
          >
            {linkText || "Click to Explore"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Solution = () => {
  const solutions = [
    {
      icon: <Scale className="h-6 w-6 sm:h-7 sm:w-7" />,
      title: "Streamline Legal Operations",
      description:
        "Simplify your legal processes, manage cases, and stay compliant with our cutting-edge tools.",
      linkText: "Get Started",
      linkHref: "/get-started",
      titlebg: "bg-blue-200",
    },
    {
      icon: <Briefcase className="h-6 w-6 sm:h-7 sm:w-7" />,
      title: "Efficient Case Management",
      description:
        "Track, organize, and collaborate on cases with ease using our intuitive platform.",
      linkText: "Learn More",
      linkHref: "/learn-more",
      titlebg: "bg-green-200 ",
    },
    {
      icon: <Shield className="h-6 w-6 sm:h-7 sm:w-7" />,
      title: "Ensure Compliance & Security",
      description:
        "Protect sensitive data, maintain compliance, and ensure the security of your legal documents.",
      linkText: "Discover More",
      linkHref: "/discover-more",
      titlebg: "bg-indigo-200",
    },
    {
      icon: <FileText className="h-6 w-6 sm:h-7 sm:w-7" />,
      title: "AI-Powered Tax Filing",
      description:
        "Easily file your taxes with AI-driven automation and avoid costly errors.",
      linkText: "File Now",
      linkHref: "/tax-filing",
      titlebg: "bg-red-200",
    },
    {
      icon: <BarChart className="h-6 w-6 sm:h-7 sm:w-7" />,
      title: "Finance & GST Submission with AI",
      description:
        "Let AI handle your finance reports and GST filings, ensuring accuracy and compliance.",
      linkText: "Start Now",
      linkHref: "/finance-gst",
      titlebg: "bg-teal-200",
    },
    {
      icon: <CreditCard className="h-6 w-6 sm:h-7 sm:w-7" />,
      title: "Secure Payment Processing",
      description:
        "Make transactions securely with AI-powered fraud detection and encryption.",
      linkText: "Explore",
      linkHref: "/secure-payments",
      titlebg: "bg-purple-200",
    },
  ];

  return (
    <section className="container mx-auto space-y-8 px-4 py-8 sm:py-12 md:py-16 lg:py-12">
      {/* Solution header section */}
      <SectionHeader
        title="Perfect Solution For Your Business"
        description="Our legal management tool is designed to simplify and streamline your operations, helping you save time and resources. From organizing legal documents to managing client relationships."
        className="mx-auto max-w-[90%] text-center dark:text-white sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]"
      />

      {/* Solution Cards section */}
      <div className="grid grid-cols-1 gap-6 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map((solution, index) => (
          <SolutionCard
            key={index}
            icon={solution.icon}
            title={solution.title}
            description={solution.description}
            linkText={solution.linkText}
            linkHref={solution.linkHref}
            titlebg={solution.titlebg}
          />
        ))}
      </div>
    </section>
  );
};

export default Solution;
