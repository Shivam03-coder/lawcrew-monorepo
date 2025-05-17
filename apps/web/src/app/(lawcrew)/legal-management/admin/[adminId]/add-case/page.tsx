"use client";
import LoaderSpinner from "@/components/shared/laoder";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectedMembersType } from "@/types/global";
import { api } from "@lawcrew/trpc-client/src/client";
import React, { useCallback, useState } from "react";
import BillingDetailsForm from "./billing-details-form";
import AddOpponentForm from "./add-opponents-form";
import CaseDetailsForm from "./case-details-form";
import SelectedMembers from "./selected-members";
import Image from "next/image";
import AddCaseFormSubNavsProps from "./add-case-forms-sub-nav";

const AddCasePage = () => {
  const [activeTab, setActiveTab] = useState("Case Details");
  const [selectedMembers, setSelectedMembers] = useState<SelectedMembersType[]>(
    [],
  );

  const { data: members = [], isLoading } =
    api.participant.getMember.useQuery();

  const handleMemberSelect = useCallback(
    (memberId: string) => {
      const member = members?.find((m) => m.TeamMember?.id === memberId);
      if (!member) return;

      setSelectedMembers((prev) => {
        const isSelected = prev.some((m) => m.id === memberId);
        return isSelected
          ? prev.filter((m) => m.id !== memberId)
          : [...prev, { id: memberId, name: member.firstName }];
      });
    },
    [members],
  );

  if (isLoading) return <LoaderSpinner />;
  return (
    <main className="flex h-screen overflow-hidden py-6">
      {/* Sidebar */}
      <ScrollArea className="flex w-[350px] flex-col border-r border-none py-6">
        <AddCaseFormSubNavsProps active={activeTab} setActive={setActiveTab} />
        <Image
          className="mb-5 border-2 border-primary/15"
          src="/law-apperance.jpg"
          width={350}
          height={350}
          alt="apperance"
        />
        ;
        <SelectedMembers
          onMemberSelect={handleMemberSelect}
          selectedMembers={selectedMembers}
        />
      </ScrollArea>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === "Case Details" && (
          <CaseDetailsForm
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
            onMemberSelect={handleMemberSelect}
          />
        )}
        {activeTab === "Billing Details" && <BillingDetailsForm />}
        {activeTab === "Opponent Details" && <AddOpponentForm />}
      </div>
    </main>
  );
};

export default AddCasePage;
