import React, { useCallback, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Pencil } from "lucide-react";
import { ClientType } from "@/types/global";
import { format } from "date-fns";
import EditClientForm from "./edit-client-info-form";
const ClientInfoContainer = (client: ClientType) => {
  const [open, setOpen] = useState<boolean>(false);
  const getLocation = useCallback(() => {
    return client.UserAddress
      ? Object.values(client.UserAddress).filter(Boolean).join(", ")
      : "";
  }, [client.UserAddress]);

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
        {/* EDIT CLIENT INFO */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="sm" className="text-sm text-white">
              Edit User <Pencil size={14} className="ml-1" />
            </Button>
          </SheetTrigger>
          <EditClientForm open={open} setOpen={setOpen} user={{ ...client }} />
        </Sheet>
      </div>

      <div className="mt-4 space-y-4">
        <div className="mb-8 space-y-2">
          <p className="text-muted-foreground text-sm">Case completion</p>
          <Progress value={66} />
        </div>

        <InfoRow label="Username" value={client.userName} />
        <InfoRow label="Email" value={client.email} />
        <InfoRow label="Phone" value={client.phoneNumber} />
        <InfoRow label="Location" value={getLocation()} />
        <InfoRow
          label="Role"
          value={<Badge>{client.role.toUpperCase()}</Badge>}
        />
      </div>

      <p className="text-muted-foreground mt-4 text-sm">
        Joined on {format(new Date(client.createdAt), "yyyy.MM.dd")}
      </p>
    </div>
  );
};

export default ClientInfoContainer;
