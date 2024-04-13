"use client";

import { Button } from "@/components/ui/button";

import { onFollow, onUnfollow } from '@/actions/follow'
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
	isFollowing: boolean;
	userId: string;
};

const Actions = ({ isFollowing, userId }: ActionsProps) => {
	const [isPending, startTransition] = useTransition();

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
				.catch(() => toast.error("Something went wrong"))
		})
	}

	return (
		<Button
			disabled={isPending}
			onClick={isFollowing ? unfollowUser : followUser}
			variant="primary">
			{isFollowing ? "Unfollow" : "Follow"}
		</Button>
	);
};

export default Actions;
