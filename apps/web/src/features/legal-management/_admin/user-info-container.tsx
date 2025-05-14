import React, { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Pencil } from "lucide-react";
import EditUser from "./edit-user";
import { ClientType } from "@/types/global";

const UserInfoContainer = ({
  userName,
  email,
  phoneNumber,
  UserAddress,
}: ClientType) => {
  const getLocation = useCallback(() => {
    return UserAddress
      ? Object.values(UserAddress).filter(Boolean).join(", ")
      : "";
  }, [UserAddress]);

  const InfoRow = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => (
    <div className="flex items-center gap-2">
      <span className="font-bold">{label}:</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className="mainCard rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Client Information</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" className="text-sm text-white">
              Edit User <Pencil size={14} className="ml-1" />
            </Button>
          </SheetTrigger>
          <EditUser />
        </Sheet>
      </div>

      <div className="mt-4 space-y-4">
        <div className="mb-8 space-y-2">
          <p className="text-sm text-muted-foreground">Case completion</p>
          <Progress value={66} />
        </div>

        <InfoRow label="Username" value={userName} />
        <InfoRow label="Email" value={email} />
        <InfoRow label="Phone" value={phoneNumber} />
        <InfoRow label="Location" value={getLocation()} />
        <InfoRow label="Role" value={<Badge>Admin</Badge>} />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">Joined on 2025.01.01</p>
    </div>
  );
};

export default UserInfoContainer;
