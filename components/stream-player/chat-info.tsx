import { useMemo } from "react";
import { Info } from "lucide-react";

import Hint from "../hint";

interface ChatInfoProps {
	isDelay: boolean;
	isFollowersOnly: boolean;
};

const ChatInfo = ({
	isDelay,
	isFollowersOnly,
}: ChatInfoProps) => {
	const hint = useMemo(() => {
		if (isFollowersOnly && !isDelay) {
			return "Only followers can chat";
		}

		if (!isFollowersOnly && isDelay) {
			return "Messages are delayed by 3 seconds";
		}

		if (isFollowersOnly && isDelay) {
			return "Only followers can chat. Messages are delayed by 3 seconds";
		}

		return "";
	}, [isDelay, isFollowersOnly]);

	const label = useMemo(() => {
		if (isFollowersOnly && !isDelay) {
			return "Followers only";
		}

		if (!isFollowersOnly && isDelay) {
			return "Slow mode";
		}

		if (isFollowersOnly && isDelay) {
			return "Followers only and slow mode";
		}

		return "";
	}, [isDelay, isFollowersOnly]);

	if (!isDelay && !isFollowersOnly) {
		return null;
	}

	return (
		<div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
			<Hint label={hint}>
				<Info className="h-4 w-4" />
			</Hint>
			<p className="text-xs font-semibold">
				{label}
			</p>
		</div>
	);
};

export default ChatInfo;