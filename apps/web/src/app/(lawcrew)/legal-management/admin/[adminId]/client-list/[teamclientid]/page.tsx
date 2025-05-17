"use client";
import React, { useEffect, useState } from "react";
import { api } from "@lawcrew/trpc-client/src/client";
import useAppLinks from "@lawcrew/navigations";
import { ClientType } from "@/types/global";
import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import CardList from "@/components/shared/card-list";
import CaseLineChart from "./case-line-chart";
import ClientInfoContainer from "./client-info-container";
import ClientCaseContainer from "./client-case-container";

interface ClientPageProps {
  params: Promise<{
    teamclientid: string;
  }>;
}

const ClientPage = ({ params }: ClientPageProps) => {
  const links = useAppLinks();
  const { teamclientid } = React.use(params);
  const [clientName, setClientName] = useState<string>("");
  const { data } = api.participant.getClientDetailsById.useQuery({
    clientId: teamclientid,
  });
  const [userInfo, setUserInfo] = useState<ClientType>();

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

  const userCrumbs = [
    { label: "Dashboard", href: links?.base },
    { label: "Clinets-List", href: links?.clientList },
    { label: clientName },
  ];

  return (
    <div className="page">
      <AppBreadcrumb items={userCrumbs} />
      <div className="mt-4 flex flex-col gap-8 xl:flex-row">
        <div className="w-full space-y-6 xl:w-1/3">
          {userInfo && <ClientInfoContainer {...userInfo} />}
          <div className="mainCard rounded-lg p-4">
            <CardList title="Recent Transactions" />
          </div>
        </div>
        <div className="w-full space-y-6 xl:w-2/3">
          <ClientCaseContainer
            userName="John Doe"
            userImage="https://avatars.githubusercontent.com/u/1486366"
            userInitials={userInfo?.email.slice(0, 2) as string}
            clientId={teamclientid}
          />

          <div className="mainCard rounded-lg p-4">
            <h1 className="text-xl font-semibold">User Activity</h1>
            <CaseLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
