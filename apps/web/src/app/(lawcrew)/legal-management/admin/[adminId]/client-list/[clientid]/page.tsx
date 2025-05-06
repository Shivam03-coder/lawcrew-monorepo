import { Badge } from "@/components/ui/badge";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Pencil } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CaseLineChart from "@/features/legal-management/_admin/case-line-chart";
import EditUser from "@/features/legal-management/_admin/edit-user";
import CardList from "@/features/legal-management/_admin/card-list";
import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import UserStatusContainer from "@/features/legal-management/_admin/user-status-container";
import UserInfoContainer from "@/features/legal-management/_admin/user-info-container";
import UserCaseContainer from "@/features/legal-management/_admin/user-case-container";

const UserPage = () => {
  const userCrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Users", href: "/users" },
    { label: "John Doe" },
  ];
  return (
    <div className="page">
      <AppBreadcrumb items={userCrumbs} />
      {/* CONTAINER */}
      <div className="mt-4 flex flex-col gap-8 xl:flex-row">
        {/* LEFT */}
        <div className="w-full space-y-6 xl:w-1/3">
          {/* USER STATUS CONTAINER */}
          <UserStatusContainer
            isVerified={true}
            isClientCustomer={true}
            isOnline={true}
          />

          {/* INFORMATION CONTAINER */}
          <UserInfoContainer />
          {/* CARD LIST CONTAINER */}
          <div className="mainCard rounded-lg p-4">
            <CardList title="Recent Transactions" />
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full space-y-6 xl:w-2/3">
          {/* USER CARD CONTAINER */}
          <UserCaseContainer
            userName="John Doe"
            userImage="https://avatars.githubusercontent.com/u/1486366"
            userInitials="JD"
            caseTitle="Property Dispute Case"
            startDate="2024-01-15"
            endDate="2024-05-10"
            description="This case deals with a property ownership issue between two parties."
            caseType="Civil"
            members={[
              { name: "Alice Smith" },
              { name: "Bob Johnson" },
              { name: "Carol White" },
            ]}
          />

          {/* CHART CONTAINER */}
          <div className="mainCard rounded-lg p-4">
            <h1 className="text-xl font-semibold">User Activity</h1>
            <CaseLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
