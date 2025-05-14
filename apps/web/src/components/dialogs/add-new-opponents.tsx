"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { useState } from "react";
import NewOpponentDetailsForm from "../forms/new-opponents-details-form";
export function AddNewOpponents() {
  const [showSheet, setShowSheet] = useState<boolean>(false);
  return (
    <Sheet onOpenChange={setShowSheet} open={showSheet}>
      <SheetTrigger onClick={() => setShowSheet(true)} asChild>
        <button className="rounded-md bg-black p-1 text-white">
          <Plus />
        </button>
      </SheetTrigger>
      <SheetContent className="h-full overflow-y-scroll bg-white">
        <SheetHeader className="mb-3">
          <SheetTitle>Create Opponents</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <NewOpponentDetailsForm setShowSheet={setShowSheet} />
      </SheetContent>
    </Sheet>
  );
}

export default AddNewOpponents;
