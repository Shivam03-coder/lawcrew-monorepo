import LoaderSpinner from "@/components/shared/laoder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import getFormatedTime from "@/utils/get-formated-date-time";
import { api } from "@lawcrew/trpc-client/src/client";
import {} from "date-fns";
import { DownloadCloud, PencilIcon, TagIcon, UserCheck } from "lucide-react";
import { useState } from "react";

const tagColors = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-pink-100 text-pink-800",
  "bg-purple-100 text-purple-800",
  "bg-red-100 text-red-800",
];

type ClientCaseContainerProps = {
  userName: string;
  userImage: string;
  userInitials: string;
  clientId: string;
};

const ClientCaseContainer = ({
  userName,
  userImage,
  userInitials,
  clientId,
}: ClientCaseContainerProps) => {
  const { data, isLoading } = api.litigation.getCaseDetailsByClientId.useQuery({
    clientId,
  });
  const [open, setOpen] = useState<boolean>(false);

  const litigation = data?.length ? data[0] : null;
  if (isLoading) return <LoaderSpinner />;

  return (
    <div className="mainCard space-y-4 rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <Avatar className="size-12">
          <AvatarImage src={userImage} />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-semibold">{userName}</h1>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{litigation?.title}</h2>
        <div className="text-muted-foreground text-sm">
          <span className="mr-4">
            Start: {getFormatedTime(litigation?.arrivalDate as string)}
          </span>
          <span>
            Complete: {getFormatedTime(litigation?.closedDate as string)}
          </span>
        </div>
        <Badge variant="destructive" className="text-xs">
          {litigation?.practiseArea}
        </Badge>
        <p className="mt-2 text-sm text-gray-700">{litigation?.description}</p>
      </div>

      <div>
        <h3 className="ml-1 inline-flex gap-1 text-sm font-medium text-gray-600">
          <UserCheck className="text-muted-foreground h-4 w-4" />
          Members:
        </h3>
        <div className="mt-1 flex flex-wrap gap-2">
          {litigation?.members?.length ? (
            litigation.members
              .filter((member) => member?.teamMember?.user?.userName)
              .map((member, idx) => (
                <Badge
                  key={member.teamMemberId ?? idx}
                  variant="secondary"
                  className="text-xs"
                >
                  {member?.teamMember?.user?.userName!}
                </Badge>
              ))
          ) : (
            <span className="text-muted-foreground text-xs">
              No members assigned
            </span>
          )}
        </div>
      </div>
      {litigation?.caseTag?.label && (
        <div>
          <h3 className="p-1items-center ml-1 inline-flex gap-1 text-sm font-medium text-gray-600">
            <TagIcon className="text-muted-foreground h-4 w-4" />
            Tags:
          </h3>
          <div className="mt-1 flex flex-wrap gap-2">
            {litigation.caseTag.label.split(",").map((tag, idx) => {
              const trimmedTag = tag.trim();
              if (!trimmedTag) return null;
              const color = tagColors[idx % tagColors.length];

              return (
                <Badge
                  key={trimmedTag}
                  className={`text-xs capitalize ${color}`}
                >
                  {trimmedTag}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-between gap-2 pt-2">
        <Button
          size="sm"
          variant="outline"
          className="border-2 border-blue-400 bg-zinc-300 text-xs text-primary"
          onClick={() => {
            console.log("Download case files");
          }}
        >
          <DownloadCloud className="mr-1 h-4 w-4" />
          Download Documents
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="center rounded-full bg-primary text-xs text-secondary"
              onClick={() => {
                // Replace with navigation or modal open logic
                console.log("Edit case");
              }}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
          </SheetTrigger>
        </Sheet>
      </div>
    </div>
  );
};

export default ClientCaseContainer;
