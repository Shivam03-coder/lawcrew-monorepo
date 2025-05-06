import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Pencil } from "lucide-react";
import React from "react";
import EditUser from "./edit-user";

const UserInfoContainer = () => {
  return (
    <div className="mainCard rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">User Information</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"sm"} className="text-sm text-white">
              Edit User <Pencil size={6} />
            </Button>
          </SheetTrigger>
          <EditUser />
        </Sheet>
      </div>
      <div className="mt-4 space-y-4">
        <div className="mb-8 flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">Case completion</p>
          <Progress value={66} />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Username:</span>
          <span>john.doe</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Email:</span>
          <span>john.doe@gmail.com</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Phone:</span>
          <span>+1 234 5678</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Location:</span>
          <span>New York, NY</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Role:</span>
          <Badge>Admin</Badge>
        </div>
      </div>
      <p className="text-muted-foreground mt-4 text-sm">Joined on 2025.01.01</p>
    </div>
  );
};

export default UserInfoContainer;
