import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type CaseMember = {
  name: string;
};

type CaseData = {
  userName: string;
  userImage: string;
  userInitials: string;
  caseTitle: string;
  startDate: string;
  endDate: string;
  description: string;
  caseType: string;
  members: CaseMember[];
};

const UserCaseContainer = ({
  userName,
  userImage,
  userInitials,
  caseTitle,
  startDate,
  endDate,
  description,
  caseType,
  members,
}: CaseData) => {
  return (
    <div className="mainCard space-y-4 rounded-lg border bg-white p-6 shadow-sm">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <Avatar className="size-12">
          <AvatarImage src={userImage} />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-semibold">{userName}</h1>
      </div>

      {/* Case Info */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{caseTitle}</h2>
        <div className="text-sm text-muted-foreground">
          <span className="mr-4">Start: {startDate}</span>
          <span>Complete: {endDate}</span>
        </div>
        <Badge variant="destructive" className="text-xs">
          {caseType}
        </Badge>
        <p className="mt-2 text-sm text-gray-700">{description}</p>
      </div>

      {/* Members */}
      <div>
        <h3 className="text-sm font-medium text-gray-600">Members:</h3>
        <div className="mt-1 flex flex-wrap gap-2">
          {members.map((member, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {member.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCaseContainer;
