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
import AddMembersForm from "./add-members-form";

export function AddMemberBtn() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"sm"} variant="default">
          <Plus /> Add Member
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full overflow-y-scroll bg-white">
        <SheetHeader className="mb-3">
          <SheetTitle> reate Member</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <AddMembersForm />
      </SheetContent>
    </Sheet>
  );
}

export default AddMemberBtn;
