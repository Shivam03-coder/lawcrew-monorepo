"use client";
import React, { useEffect, useMemo, useState } from "react";
import { api } from "@lawcrew/trpc-client/src/client";
import { ClientCaseList, ClientType } from "@/types/global";
import ClientCaseContainer from "./client-case-container";
import ClientsCaseTable from "./client-case-table";
import CaseLineChart from "./case-line-chart";
import useUser from "@/hooks/use-user";

interface ClientPageProps {
  params: Promise<{
    teamclientid: string;
  }>;
}

const ClientPage = ({ params }: ClientPageProps) => {
  const user = useUser();
  const { teamclientid } = React.use(params);
  const [clientName, setClientName] = useState<string>("");
  const { data } = api.participant.getClientDetailsById.useQuery({
    clientId: teamclientid,
  });

  const { data: caseDetails } =
    api.litigation.getCaseDetailsByClientId.useQuery({
      clientId: teamclientid,
    });
  const [userInfo, setUserInfo] = useState<ClientType>();

  const caseData = useMemo((): ClientCaseList[] => {
    if (!caseDetails) return [];

    return caseDetails.map((c) => ({
      id: c.id,
      clientName:
        `${c.client.user?.firstName ?? ""} ${c.client.user?.lastName ?? ""}`.trim(),
      opponentName:
        `${c.Opponent?.firstName ?? ""} ${c.Opponent?.lastName ?? ""}`.trim(),
      internalRefNumber: c.internalRefNumber ?? "",
      membersName: c.members.map(
        (member) => member.teamMember.user?.firstName ?? "",
      ),
      caseStatus: c.status ?? "PENDING",
    }));
  }, [caseDetails]);

  useEffect(() => {
    if (data?.userName) {
      setClientName(data.userName);
      setUserInfo({
        ...data,
        clientId: teamclientid,
      });
    }

    return () => {
      setClientName("");
    };
  }, [data]);

  return (
    <div className="grid grid-cols-12 gap-5 p-4">
      <div className="col-span-12">
        <ClientCaseContainer
          userName={`${userInfo?.firstName} ${userInfo?.lastName}`}
          userImage="https://avatars.githubusercontent.com/u/1486366"
          userInitials={userInfo?.email.slice(0, 2) as string}
          clientId={teamclientid}
        />
      </div>
      <div className="col-span-6">
        <CaseLineChart />
      </div>
      <div className="col-span-6">
        <CaseLineChart />
      </div>
      <div className="col-span-12">
        <ClientsCaseTable data={caseData} />
      </div>
    </div>
  );
};

export default ClientPage;
