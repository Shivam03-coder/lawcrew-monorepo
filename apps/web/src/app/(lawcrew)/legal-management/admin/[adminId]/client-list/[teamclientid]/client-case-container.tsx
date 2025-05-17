import LoaderSpinner from "@/components/shared/laoder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import getFormatedTime from "@/utils/get-formated-date-time";
import { api } from "@lawcrew/trpc-client/src/client";
import {} from "date-fns";
type CaseMember = {
  name: string;
};

type CaseData = {
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
}: CaseData) => {
  const { data, isLoading } = api.litigation.getCaseDetailsByClientId.useQuery({
    clientId,
  });

  const litigation = data?.length ? data[0] : null;
  console.log("🚀 ~ litigation:", litigation)

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
        <h3 className="text-sm font-medium text-gray-600">Members:</h3>
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
    </div>
  );
};

export default ClientCaseContainer;
