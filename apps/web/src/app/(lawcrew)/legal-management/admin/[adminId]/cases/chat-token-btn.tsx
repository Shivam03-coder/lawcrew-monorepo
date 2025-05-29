"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2, SendHorizonal } from "lucide-react";
import { api } from "@lawcrew/trpc-client/src/client";
import { useAppToasts } from "@/hooks/use-app-toast";
import useUser from "@/hooks/use-user";
import useAppLinks from "@lawcrew/navigations";
import { useLocalStorage } from "usehooks-ts";

const ChatTokenBtn = ({
  caseId,
  caseName,
}: {
  caseId: string;
  caseName: string;
}) => {
  const user = useUser();
  const router = useRouter();
  const navs = useAppLinks();
  const { SuccessToast, ErrorToast } = useAppToasts();
  const [_, setActiveCase] = useLocalStorage("ActiveCase", "");
  const { data, isLoading: isCheckingToken } = api.user.checkToken.useQuery();
  const setChatToken = api.user.setChatToken.useMutation();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!user) router.push("/");
  }, [user, router]);

  const handleNavigate = (token: string) => {
    if (navs?.casesDiscussion) {
      router.push(`${navs.casesDiscussion}?token=${token}`);
    }
  };
  const handleGenerateTokenAndNavigate = async () => {
    if (!user?.id) return;

    setIsGenerating(true);
    try {
      const response = await axios.get(`/api/chat/${user.id}`, {
        headers: { "Content-Type": "application/json" },
      });

      const token = response.data.token;

      await setChatToken.mutateAsync(
        { token },
        {
          onSuccess: () => {
            SuccessToast({ title: "Welcome to case discussion page" });
            handleNavigate(token);
          },
          onError: ({ message }) => {
            ErrorToast({ title: message });
          },
        },
      );
    } catch (err) {
      console.error("Error generating token:", err);
      ErrorToast({ title: "Failed to generate token" });
    } finally {
      setIsGenerating(false);
    }
  };

  if (isCheckingToken || !user) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }
  const handleClick = () => {
    console.log(caseId, caseName);
    if (caseId && caseName) {
      const caseData = {
        caseId,
        caseName,
      };
      setActiveCase(JSON.stringify(caseData));
    }

    if (data?.token) {
      handleNavigate(data.token);
    } else {
      handleGenerateTokenAndNavigate();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isGenerating}
      className="flex items-center justify-center rounded px-4 py-2 text-primary disabled:opacity-50"
    >
      {isGenerating ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <SendHorizonal className="h-5 w-5" />
      )}
    </button>
  );
};

export default ChatTokenBtn;
