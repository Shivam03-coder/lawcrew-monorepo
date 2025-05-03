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
import MembersForm from "./members-form";

export function AddMember() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"sm"} variant="default">
          <Plus /> Add Member
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full overflow-y-scroll bg-white">
        <SheetHeader className="mb-3">
          <SheetTitle>Create Member</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <MembersForm />
      </SheetContent>
    </Sheet>
  );
}

export default AddMember;
