"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import ChatInfo from "./chat-info";

interface ChatFormProps {
	onSubmit: () => void;
	onChange: (value: string) => void;
	value: string;
	isHidden: boolean;
	isFollowersOnly: boolean;
	isDelayed: boolean;
	isFollowing: boolean;
};

const ChatForm = ({
	isDelayed,
	isFollowersOnly,
	isFollowing,
	isHidden,
	onChange,
	onSubmit,
	value,
}: ChatFormProps) => {
	const [isDelayBlocked, setIsDelayBlocked] = useState<boolean>(false);

	const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
	const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (!value || isDisabled) return;

		if (isDelayed && !isDelayBlocked) {
			setIsDelayBlocked(true);
			setTimeout(() => {
				setIsDelayBlocked(false);
				onSubmit();
			}, 3000);
			return;
		};

		onSubmit();
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center gap-y-4 p-3"
		>
			<div className="w-full">
				<ChatInfo
					isDelay={isDelayed}
					isFollowersOnly={isFollowersOnly}
				/>
				<Input
					onChange={(e) => onChange(e.target.value)}
					value={value}
					disabled={isDisabled}
					placeholder="Send a message"
					className={cn(
						"border-white/10",
						(isFollowersOnly || isDelayed) && "rounded-t-none border-t-0"
					)}
				/>
			</div>
			<div className="ml-auto">
				<Button
					type="submit"
					variant="primary"
					size="sm"
					disabled={isDisabled}
				>
					Chat
				</Button>
			</div>
		</form>
	);
};

export const ChatFormSkeleton = () => {
	return (
		<div className="flex flex-col items-center gap-y-4 p-3">
			<Skeleton className="w-full h-10" />
			<div className="flex items-center gap-x-2 ml-auto">
				<Skeleton className="h-7 w-7" />
				<Skeleton className="h-7 w-12" />
			</div>
		</div>
	);
};

export default ChatForm;