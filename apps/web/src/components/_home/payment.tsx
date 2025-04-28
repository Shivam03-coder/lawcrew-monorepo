import React from "react";
import SectionHeader from "../../components/_home/section-header";
import { Card } from "@/components/ui/card";
import { Check, ChevronRight, Scale } from "lucide-react";
const plans = [
  {
    title: "Basic Legal Suite",
    price: "$15/mth",
    description: "Billed annually.",
    features: [
      "Case management dashboard",
      "Document storage (20GB per user)",
      "Basic compliance tracking",
      "Up to 5 team members",
      "Email & Chat support",
    ],
  },
  {
    title: "Professional Legal Suite",
    price: "$30/mth",
    description: "Billed annually.",
    features: [
      "Advanced case tracking & reminders",
      "Contract automation tools",
      "50GB secure storage per user",
      "Up to 15 team members",
      "Priority support",
    ],
  },
  {
    title: "Enterprise Legal Suite",
    price: "$60/mth",
    description: "Billed annually.",
    features: [
      "AI-driven legal insights",
      "Unlimited document storage",
      "Full compliance management",
      "Unlimited team members",
      "24/7 dedicated support",
    ],
  },
];

const Payment = () => {
  return (
    <section className="col-span-full space-y-8 py-5">
      {/* Payment Section Header */}
      <SectionHeader
        title="Choose Your Plan"
        description="Select the plan that best suits your business needs. Our flexible pricing models are designed to give you the best value and help streamline your legal management tasks."
        className="w-[50%] dark:text-secondary"
      />

      <section className="mx-auto my-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className="card mx-auto flex w-full max-w-[22rem] flex-col bg-gradient-to-r transition-transform duration-300 hover:scale-105"
          >
            <section className="p-6 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-secondary bg-primary dark:bg-secondary p-2.5">
                  <Scale size={28} className="text-secondary dark:text-primary" />
                </div>
                <h3 className="text-xl font-semibold textDark">
                  {plan.title}
                </h3>
                <p className="text-4xl font-bold textDark">{plan.price}</p>
                <p className="textDark text-sm">
                  {plan.description}
                </p>
              </div>
              <div className="mt-6 flex flex-col items-start gap-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <Check className="text-green-500" size={18} />
                    <span className="text-sm textDark">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
            <div className="p-4">
              <button className="w-full rounded bg-[#001f3f] px-5 py-3 text-white transition hover:bg-[#003366]">
                Get Started{" "}
                <ChevronRight className="ml-2 inline-block" size={18} />
              </button>
            </div>
          </Card>
        ))}
      </section>
    </section>
  );
};

export default Payment;
