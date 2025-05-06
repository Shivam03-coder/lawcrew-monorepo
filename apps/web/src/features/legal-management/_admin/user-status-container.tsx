import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
  import { BadgeCheck, UserCircle2, Wifi } from "lucide-react";
  
  const UserStatusContainer = ({
    isVerified,
    isClientCustomer,
    isOnline,
  }: {
    isVerified: boolean;
    isClientCustomer: boolean;
    isOnline: boolean;
  }) => {
    return (
      <div className="mainCard rounded-lg p-4 shadow">
        <h5 className="text-xl font-semibold">User Status</h5>
        <div className="mt-4 flex gap-4">
          {isVerified && (
            <HoverCard>
              <HoverCardTrigger>
                <BadgeCheck
                  size={36}
                  className="border rounded-full border-blue-500/50 bg-blue-500/30 p-2 text-blue-700"
                />
              </HoverCardTrigger>
              <HoverCardContent>
                <h5 className="mb-2 font-bold">Verified</h5>
                <p className="text-muted-foreground text-sm">
                  This member has been verified by the platform.
                </p>
              </HoverCardContent>
            </HoverCard>
          )}
  
          {isClientCustomer && (
            <HoverCard>
              <HoverCardTrigger>
                <UserCircle2
                  size={36}
                  className="border rounded-full border-emerald-500/50 bg-emerald-500/30 p-2 text-emerald-700"
                />
              </HoverCardTrigger>
              <HoverCardContent>
                <h5 className="mb-2 font-bold">Client's Customer</h5>
                <p className="text-muted-foreground text-sm">
                  This member is a customer of a registered client.
                </p>
              </HoverCardContent>
            </HoverCard>
          )}
  
          <HoverCard>
            <HoverCardTrigger>
              <Wifi
                size={36}
                className={`border rounded-full ${
                  isOnline
                    ? "border-green-500/50 bg-green-500/30 text-green-700"
                    : "border-gray-400/40 bg-gray-400/20 text-gray-600"
                } p-2`}
              />
            </HoverCardTrigger>
            <HoverCardContent>
              <h5 className="mb-2 font-bold">
                {isOnline ? "Online" : "Offline"}
              </h5>
              <p className="text-muted-foreground text-sm">
                This member is currently {isOnline ? "online" : "offline"}.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    );
  };
  
  export default UserStatusContainer;
  