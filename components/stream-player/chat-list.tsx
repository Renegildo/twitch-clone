import { ReceivedChatMessage } from "@livekit/components-react";
import ChatMessage from "./chat-message";

interface ChatListProps {
	messages: ReceivedChatMessage[];
	isHidden: boolean;
};

const ChatList = ({
	isHidden,
	messages,
}: ChatListProps) => {
	if (isHidden || !messages || messages.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center">
				<p className="text-sm text-muted-foreground">
					{isHidden ? "Chat is disabled" : "Welcome to the chat!"}
				</p>
			</div>
		);
	};

	return (
		<div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
			{messages.map((message) => (
				<ChatMessage
					key={message.timestamp}
					data={message}
				/>
			))}
		</div>
	);
};

export default ChatList;