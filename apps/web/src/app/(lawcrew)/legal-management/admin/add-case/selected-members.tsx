import { SelectedMembersType } from "@/types/global";
import { X } from "lucide-react";
import React from "react";

const SelectedMembers = ({
  selectedMembers,
  onMemberSelect,
}: {
  selectedMembers: SelectedMembersType[] | [];
  onMemberSelect: (memberId: string) => void;
}) => {
  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {selectedMembers.map((member) => (
        <div
          key={member.id}
          className="flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-white"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-primary">
            {member.name.charAt(0).toUpperCase()}
          </span>
          <span>{member.name}</span>
          <button
            type="button"
            onClick={() => onMemberSelect(member.id)}
            className="hover:bg-primary-dark rounded-full p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectedMembers;
