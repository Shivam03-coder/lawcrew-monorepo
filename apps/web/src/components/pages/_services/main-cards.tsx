"use client";
import React from "react";
import { Scale, Briefcase, ChevronRight, MonitorCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useAuth from "@/hooks/use-auth";

function MainCards() {
  const user = useAuth();
  if (!user) return null;
  const services = [
    {
      title: "Legal Services",
      icon: <Scale className="h-12 w-12 text-indigo-600" />,
      description: "Expert legal solutions for all your needs",
      features: [
        "Legal Consultation",
        "Document Review",
        "Contract Drafting",
        "Legal Representation",
      ],
      path: `/legal-management/${user?.role?.toLocaleLowerCase()}/${user?.id}/`,
    },
    {
      title: "Financial Services",
      icon: <Briefcase className="h-12 w-12 text-emerald-600" />,
      description: "Comprehensive financial planning ",
      features: [
        "Financial Planning",
        "Investment Advisory",
        "Tax Consultation",
        "Wealth Management",
      ],
      path: `/legal-management/${user?.role}/${user?.id}/`,
    },
    {
      title: "Income Services",
      icon: <MonitorCheck className="h-12 w-12 text-emerald-600" />,
      description: "Comprehensive financial planning.",
      features: [
        "Financial Planning",
        "Investment Advisory",
        "Tax Consultation",
        "Wealth Management",
      ],
      path: `/legal-management/${user?.role}/${user?.id}/`,
    },
  ];

  const handleServiceClick = (path: string) => {
    console.log(`Navigating to ${path}`);
    // Navigation logic will go here
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="textDark font-lexend text-4xl font-normal">
          Welcome to LawCrew
        </h1>
        <p className="mt-2 font-manrope text-xl text-gray-600 dark:text-slate-300">
          Choose your service to get started
        </p>
      </div>

      <div className="mt-10 grid max-w-6xl grid-cols-1 gap-11 font-lexend sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card
            key={service.title}
            onClick={() => handleServiceClick(service.path)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-800 bg-white text-primary shadow-md transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <CardHeader className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-slate-200 p-4 dark:bg-gray-900">
                {service.icon}
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                {service.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col justify-between px-6 pb-6 pt-0">
              <p className="mb-6 text-center text-sm text-primary">
                {service.description}
              </p>

              <div className="mb-6 space-y-3">
                {service.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-primary transition-all duration-300 group-hover:translate-x-2"
                  >
                    <ChevronRight className="h-4 w-4 text-main" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href={service.path} className="mt-auto flex justify-center">
                <Button
                  variant="outline"
                  className="w-full rounded-full border-white bg-primary text-secondary transition-all"
                >
                  Click to Explore
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MainCards;
