"use client";
import AddClientForm from "@/components/forms/case-details-form";
import AddClientFormNavs from "@/components/shared/add-client-form-nav";
import AddCleintPoster from "@/components/shared/add-client-poster";
import { ScrollArea } from "@/components/ui/scroll-area";
import SelectedMembers from "@/features/legal-management/_admin/selected-members";
import { SelectedMembersType } from "@/types/global";
import { api } from "@lawcrew/trpc-client/src/client";
import React, { useState } from "react";

const AddCasePage = () => {
  const [active, setActive] = useState("Case Details");
  const [selectedMembers, setSelectedMembers] = useState<SelectedMembersType[]>(
    [],
  );
  const { data: members } = api.participant.getMember.useQuery();

  const handleMemberSelect = (memberId: string) => {
    const member = members?.find((m) => m.TeamMember?.id === memberId);
    if (!member) return;

    setSelectedMembers((prev) => {
      const isSelected = prev.some((m) => m.id === memberId);
      if (isSelected) {
        return prev.filter((m) => m.id !== memberId);
      }
      return [...prev, { id: memberId, name: member.firstName }];
    });
  };

  return (
    <main className="flex h-screen overflow-hidden py-6">
      {/* Sidebar */}
      <ScrollArea className="flex w-[350px] flex-col border-r border-none py-6">
        <AddClientFormNavs active={active} setActive={setActive} />
        <AddCleintPoster />
        <SelectedMembers  onMemberSelect={handleMemberSelect} selectedMembers={selectedMembers} />
      </ScrollArea>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-5">
        <AddClientForm
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
          onMemberSelect={handleMemberSelect}
        />
      </div>
    </main>
  );
};

export default AddCasePage;
