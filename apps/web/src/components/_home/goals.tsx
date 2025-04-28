"use client";

import React from "react";
import {
  PieChart,
  FileText,
  User,
  Calendar,
  BarChart,
  CheckCircle,
} from "lucide-react";
import SectionHeader from "./section-header";

const RetroactiveCard = ({
  title,
  description,
  Icon,
  iconBgColor,
}: {
  title: string;
  description: string;
  Icon: React.ElementType;
  iconBgColor: string;
}) => (
  <div className="hover:bg-secondary/50 group flex transform items-center space-x-4 rounded-lg card p-4 shadow-md transition-all duration-300 hover:scale-[1.02] sm:p-5 md:p-6">
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-2.5 transition-colors group-hover:bg-opacity-80 sm:h-14 sm:w-14 sm:p-3 ${iconBgColor}`}
    >
      <Icon className="h-5 w-5 text-gray-800 sm:h-6 sm:w-6" />
    </div>
    <div className="space-y-1 sm:space-y-2">
      <h4 className="text-base font-medium textDark font-lexend sm:text-lg md:text-xl">
        {title}
      </h4>
      <p className="text-sm text-gray-600 dark:text-slate-300 font-manrope sm:text-base">{description}</p>
    </div>
  </div>
);

const Goal = () => {
  const cardsData = [
    {
      title: "Document Organization",
      description:
        "Streamline your document storage and retrieval processes effortlessly.",
      Icon: FileText,
      iconBgColor: "bg-green-300",
    },
    {
      title: "Client Relationship Management",
      description:
        "Keep track of client details and interactions in one place.",
      Icon: User,
      iconBgColor: "bg-purple-300",
    },
    {
      title: "Legal Compliance Tracking",
      description: "Monitor deadlines and ensure compliance with ease.",
      Icon: Calendar,
      iconBgColor: "bg-yellow-300",
    },
    {
      title: "Time Tracking Retroactively",
      description: "Gain insights into how your team spends time across tasks.",
      Icon: BarChart,
      iconBgColor: "bg-blue-300",
    },
    {
      title: "Analytics and Reporting",
      description:
        "Generate insightful reports to make informed business decisions.",
      Icon: PieChart,
      iconBgColor: "bg-teal-300",
    },
    {
      title: "Task Automation",
      description:
        "Automate routine tasks to save time and reduce manual errors.",
      Icon: CheckCircle,
      iconBgColor: "bg-orange-300",
    },
  ];

  return (
    <section className="container mx-auto space-y-8 px-4 py-8 sm:py-12 md:py-16 lg:py-20">
      <SectionHeader
        title="Goals of Our Business"
        description="Our legal management tool is designed to simplify and streamline your operations, helping you save time and resources. From organizing legal documents to managing client relationships, our features are tailored for your success."
        className="mx-auto max-w-[95%] dark:text-white text-center sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]"
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {cardsData.map((card, index) => (
          <RetroactiveCard
            key={index}
            title={card.title}
            description={card.description}
            Icon={card.Icon}
            iconBgColor={card.iconBgColor}
          />
        ))}
      </div>
    </section>
  );
};

export default Goal;
