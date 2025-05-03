import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ClientForm from "./client-form";
import { Plus } from "lucide-react";

export function AddClient() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"sm"} variant="default">
          <Plus /> Add Client
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full overflow-y-scroll bg-white">
        <SheetHeader className="mb-3">
          <SheetTitle>Create Client</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <ClientForm />
      </SheetContent>
    </Sheet>
  );
}

export default AddClient;
