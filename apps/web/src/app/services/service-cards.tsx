"use client";
import React from "react";
import { Scale, Briefcase, ChevronRight, MonitorCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useAuth from "@/hooks/use-auth";

function ServicesCards() {
  const user = useAuth();
  if (!user) return null;
  const services = [
    {
      title: "Legal Management",
      icon: <Scale className="h-12 w-12 text-indigo-600" />,
      description: "Expert legal solutions tailored for you.",
      features: [
        "Legal Consultation",
        "Document Review",
        "Contract Drafting",
        "Legal Representation",
      ],
      path: `/legal-management/${user?.role?.toLowerCase()}/${user?.id}/`,
    },
    {
      title: "Financial Management",
      icon: <Briefcase className="h-12 w-12 text-emerald-600" />,
      description: "Handle tax, income & wealth effortlessly.",
      features: [
        "Taxation",
        "Income Tracking",
        "Financial Planning",
        "Wealth Management",
      ],
      path: `/finance-management/${user?.role?.toLowerCase()}/${user?.id}/`,
    },
  ];

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="textDark font-lexend text-4xl font-normal">
          Welcome to LawCrew
        </h1>
        <p className="font-manrope mt-2 text-xl text-gray-600 dark:text-slate-300">
          Choose your service to get started
        </p>
      </div>

      <div className="mt-10 grid max-w-4xl grid-cols-1 gap-10 font-lexend sm:grid-cols-2">
        {services.map((service) => (
          <Card
            key={service.title}
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

              <Link
                href={service.path}
                className="mt-auto flex w-full justify-center"
              >
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

export default ServicesCards;
