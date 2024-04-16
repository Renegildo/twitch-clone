"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant, useStartAudio } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import ChatHeader from "./chat-header";
import ChatForm from "./chat-form";
import ChatList from "./chat-list";

interface ChatProps {
	viewerName: string;
	hostName: string;
	hostIdentity: string;
	isFollowing: boolean;
	isChatEnabled: boolean;
	isChatDelayed: boolean;
	isChatFollowersOnly: boolean;
};

const Chat = ({
	hostIdentity,
	hostName,
	isChatDelayed,
	isChatEnabled,
	isChatFollowersOnly,
	isFollowing,
	viewerName,
}: ChatProps) => {
	const matches = useMediaQuery("(max-width: 1024px)");
	const { variant, onExpand } = useChatSidebar(state => state);
	const connectionState = useConnectionState();
	const participant = useRemoteParticipant(hostIdentity);

	const isOnline = participant && connectionState === ConnectionState.Connected;

	const isHidden = !isChatEnabled || !isOnline;

	const [value, setValue] = useState<string>("");
	const { chatMessages: messages, send } = useChat();

	useEffect(() => {
		if (matches) {
			onExpand();
		}
	}, [matches, onExpand]);

	const reversedMessages = useMemo(() => {
		return messages.sort((a, b) => b.timestamp - a.timestamp);
	}, [messages]);

	const onSubmit = () => {
		if (!send) return;

		send(value);
		setValue("");
	};

	const onChange = (value: string) => {
		setValue(value);
	};

	return (
		<div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)] w-full">
			<ChatHeader />
			{variant === ChatVariant.CHAT && (
				<>
					<ChatList
						messages={reversedMessages}
						isHidden={isHidden}
					/>
					<ChatForm
						onSubmit={onSubmit}
						onChange={onChange}
						value={value}
						isHidden={isHidden}
						isFollowersOnly={isChatFollowersOnly}
						isDelayed={isChatDelayed}
						isFollowing={isFollowing}
					/>
				</>
			)}
			{variant === ChatVariant.COMMUNITY && (
				<>
					<p>COMMUNITY MODE</p>
				</>
			)}
		</div>
	);
};

export default Chat;