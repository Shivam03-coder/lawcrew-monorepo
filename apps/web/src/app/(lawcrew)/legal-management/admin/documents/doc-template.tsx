"use client";

import * as React from "react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { api } from "@lawcrew/trpc-client/src/client";
import { useRouter } from "next/navigation";
import useAppLinks from "@lawcrew/navigations";
import { useLocalStorage } from "usehooks-ts";
import { TEMPLATES } from "@/constants/template";

const TemplateCard = ({
  template,
  onTemplateClick,
}: {
  template: (typeof TEMPLATES)[0];
  onTemplateClick: Function;
}) => {
  const categoryColors = {
    Corporate: "bg-blue-100 text-blue-800",
    Family: "bg-pink-100 text-pink-800",
    Employment: "bg-purple-100 text-purple-800",
    Tax: "bg-green-100 text-green-800",
    IP: "bg-yellow-100 text-yellow-800",
    Property: "bg-orange-100 text-orange-800",
    Legal: "bg-red-100 text-red-800",
    Estate: "bg-gray-100 text-gray-800",
    Business: "bg-indigo-100 text-indigo-800",
  };

  return (
    <Card className="flex flex-col justify-between border border-gray-200 bg-white text-black transition-shadow hover:shadow-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          {template.icon}
        </div>
        <h3 className="line-clamp-2 whitespace-nowrap text-sm font-medium">
          {template.title}
        </h3>
      </CardHeader>

      <CardFooter className="flex flex-col items-center gap-2">
        <Badge
          className={`${categoryColors[template.category as keyof typeof categoryColors] || "bg-gray-100"} text-xs`}
        >
          {template.category}
        </Badge>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Free Template
        </Badge>
        <Button
          onClick={() => onTemplateClick(template.title, "")}
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Use Template
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function DocsTemplate({
  setisDocLoading,
}: {
  setisDocLoading: (val: boolean) => void;
}) {
  const createDocs = api.document.createDoc.useMutation();
  const [_, setValue] = useLocalStorage("document-id", "");
  const router = useRouter();
  const link = useAppLinks();
  const onTemplateClick = (title: string, initialContent: string) => {
    setisDocLoading(createDocs.isPending);
    createDocs.mutateAsync(
      { title, initialContent },
      {
        onSuccess: ({ id }) => {
          setValue(id);
          const encodedContent = encodeURIComponent(initialContent);
          router.push(`${link?.documents}/${id}?content=${encodedContent}`);
        },
      },
    );
    setisDocLoading(createDocs.isPending);
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4">
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
            <div className="p-2">
              <NewDocumentCard onTemplateClick={onTemplateClick} />
            </div>
          </CarouselItem>
          {TEMPLATES.map((template, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="p-2">
                <TemplateCard
                  onTemplateClick={() =>
                    onTemplateClick(template.title, template.initialContent)
                  }
                  template={template}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

function NewDocumentCard({ onTemplateClick }: { onTemplateClick: Function }) {
  return (
    <Card className="flex flex-col justify-between border-2 border-dashed border-blue-500 bg-white text-black transition-shadow hover:shadow-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <Plus className="h-8 w-8 text-gray-600" />
        </div>
        <h3 className="text-sm font-medium">Untitled Document</h3>
      </CardHeader>

      <CardFooter className="flex flex-col items-center gap-2">
        <Badge className="op bg-yellow-100 text-xs text-yellow-800">
          Custom
        </Badge>
        <Badge className="bg-green-100 text-xs text-green-800">No Cost</Badge>
        <Button
          onClick={() => onTemplateClick("Untitled Documents", "")}
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Create Document
        </Button>
      </CardFooter>
    </Card>
  );
}
