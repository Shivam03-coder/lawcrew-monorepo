"use client";
import { useState, useEffect } from "react";
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
    const channel = client.channel("messaging", activeCase.caseId!, {
      // @ts-ignore
      name: activeCase.caseName!,
      members: [user.id],
    });
    setChannel(channel);
  }, [client]);

  if (!client) return <LoaderSpinner />;

  return (
    <div className="h-screen font-lexend">
      <div className="mx-auto h-full w-[90%] overflow-hidden rounded-lg">
        <Chat client={client}>
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput audioRecordingEnabled additionalTextareaProps={{}} />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </div>
  );
};

export default CaseChannel;
