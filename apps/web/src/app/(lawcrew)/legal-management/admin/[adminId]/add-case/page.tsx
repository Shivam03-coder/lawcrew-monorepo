"use client";
import AddOpponentForm from "@/components/forms/add-opponents-form";
import BillingDetailsForm from "@/components/forms/billing-details-form";
import AddClientForm from "@/components/forms/case-details-form";
import AddClientFormNavs from "@/components/shared/add-client-form-nav";
import AddCleintPoster from "@/components/shared/add-client-poster";
import LoaderSpinner from "@/components/shared/laoder";
import { ScrollArea } from "@/components/ui/scroll-area";
import SelectedMembers from "@/features/legal-management/_admin/selected-members";
import { SelectedMembersType } from "@/types/global";
import { api } from "@lawcrew/trpc-client/src/client";
import React, { useCallback, useState } from "react";

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
        <AddClientFormNavs active={activeTab} setActive={setActiveTab} />
        <AddCleintPoster />
        <SelectedMembers
          onMemberSelect={handleMemberSelect}
          selectedMembers={selectedMembers}
        />
      </ScrollArea>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === "Case Details" && (
          <AddClientForm
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
            onMemberSelect={handleMemberSelect}
          />
        )}
        {activeTab === "Billing Details" && <BillingDetailsForm />}
        {activeTab === "Opponent Details" && <AddOpponentForm  />}
      </div>
    </main>
  );
};

export default AddCasePage;
