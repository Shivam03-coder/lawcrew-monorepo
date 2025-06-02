"use client";
import { useState, useEffect, useRef } from "react";
import type { User, Channel as StreamChannel } from "stream-chat";
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { useSearchParams } from "next/navigation";
import "stream-chat-react/dist/css/v2/index.css";
import { api } from "@lawcrew/trpc-client/src/client";
import { useReadLocalStorage } from "usehooks-ts";
import LoaderSpinner from "@/components/shared/laoder";

const CaseChannel = () => {
  const searchParams = useSearchParams();
  const userToken = searchParams.get("token") as string;
  const [channel, setChannel] = useState<StreamChannel>();
  const { data: userInfo } = api.user.userinfo.useQuery();
  const activeCase = JSON.parse(useReadLocalStorage("ActiveCase") as string);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const user: User = {
    id: userInfo?.user?.id ?? "X",
    name: userInfo?.user?.userName,
    image: `https://getstream.io/random_png/?name=${userInfo?.user?.userName}`,
  };

  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
    tokenOrProvider: userToken,
    userData: user,
  });

  useEffect(() => {
    if (!client) return;

    const chatChannel = client.channel("messaging", activeCase.caseId!, {
      // @ts-ignore
      name: activeCase.caseName!,
      members: [user.id],
    });

    const initChannel = async () => {
      try {
        await chatChannel.watch();
        setChannel(chatChannel);
      } catch (err) {
        console.error("Failed to watch or create channel", err);
      }
    };

    initChannel();
  }, [client]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [channel?.state.messages]);

  if (!client) return <LoaderSpinner />;

  return (
    <div className="flex h-screen flex-col font-lexend">
      <div className="mx-auto flex w-[90%] flex-1 flex-col overflow-hidden rounded-lg">
        <Chat client={client}>
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
                <MessageList />
              </div>
              <div className="sticky bottom-0 border-t border-gray-200 bg-white p-4">
                <MessageInput
                  focus
                  additionalTextareaProps={{
                    placeholder: "Type your message here...",
                    className: "border border-gray-300 rounded-lg p-3 w-full",
                    rows: 1,
                  }}
                  audioRecordingEnabled
                />
              </div>
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </div>
  );
};

export default CaseChannel;
