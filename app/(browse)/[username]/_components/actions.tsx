"use client";

import { Button } from "@/components/ui/button";

import { onFollow, onUnfollow } from '@/actions/follow'
import { useTransition } from "react";
import { toast } from "sonner";
import { onBlock, onUnblock } from "@/actions/block";
import { notFound } from "next/navigation";

interface ActionsProps {
	isFollowing: boolean;
	isBlocked: boolean;
	userId: string;
};

const Actions = ({ isFollowing, isBlocked, userId }: ActionsProps) => {
	const [isPending, startTransition] = useTransition();

	if (isBlocked) notFound();

	const followUser = () => {
		startTransition(() => {
			onFollow(userId)
				.then((data) => toast.success(`You are now following ${data.following.username}`))
				.catch(() => toast.error("Something went wrong"));
		});
	};

	const unfollowUser = () => {
		startTransition(() => {
			onUnfollow(userId)
				.then((data) => toast.success(`You are not following ${data.following.username} anymore`))
				.catch(() => toast.error("Something went wrong"));
		});
	};

	const blockUser = () => {
		startTransition(() => {
			onBlock(userId)
				.then((data) => toast.success(`${data.blocked.username} is now blocked`))
				.catch((error) => toast.error(`${error}`));
		});
	};

	const unblockUser = () => {
		startTransition(() => {
			onUnblock(userId)
				.then((data) => toast.success(`${data.blocked.username} is now unblocked`))
				.catch((error) => toast.error(`${error}`));
		});
	};

	return (
		<>
			<Button
				disabled={isPending}
				onClick={isFollowing ? unfollowUser : followUser}
				variant="primary">
				{isFollowing ? "Unfollow" : "Follow"}
			</Button>
			<Button
				disabled={isPending}
				onClick={blockUser}
			>
				Block
			</Button>
		</>
	);
};

export default Actions;
