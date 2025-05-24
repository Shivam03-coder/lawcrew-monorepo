"use client";
import { api } from "@lawcrew/trpc-client/src/client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ClientListCard = () => {
  const { data: clients } = api.participant.getClient.useQuery();

  return (
    <div className="fontin h-[470px] overflow-scroll">
      <h1 className="mb-6 font-inter text-base font-semibold">
        {"List Of Clients"}
      </h1>
      <div className="flex flex-col gap-2">
        {clients?.map((item) => (
          <Card
            key={item.id}
            className="flex items-center justify-between gap-4 p-3 shadow-inner"
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback className="border bg-primary uppercase text-secondary">
                {item.firstName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <CardContent className="flex-1 p-0 text-justify">
              <h5 className="text-sm font-medium">{item.userName}</h5>
              <Badge className="text-xs font-medium text-primary/80">
                {item.email}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientListCard;
