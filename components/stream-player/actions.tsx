"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Heart } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
	isFollowing: boolean;
	hostIdentity: string;
	isHost: boolean;
}

const Actions = ({
	hostIdentity,
	isFollowing,
	isHost,
}: ActionsProps) => {
	const [isPending, startTransition] = useTransition();
	const { userId } = useAuth();

	const router = useRouter();

	const handleFollow = () => {
		startTransition(() => {
			console.log("---------------");
			console.log("hostIdentity: " + hostIdentity);
			onFollow(hostIdentity)
				.then((data) => toast.success(`Now you are following ${data.following.username}`))
				.catch(() => toast.error("Error while trying to follow user"));
		});
	};

	const handleUnfollow = () => {
		startTransition(() => {
			onUnfollow(hostIdentity)
				.then((data) => toast.success(`You are no more following ${data.following.username}`))
				.catch(() => toast.error("Error while trying to unfollow user"));
		});
	};

	const toggleFollow = () => {
		if (!userId) {
			return router.push("/sign-in");
		}

		if (isHost) return;

		if (isFollowing) {
			startTransition(() => {
				handleUnfollow();
			});
		} else {
			startTransition(() => {
				handleFollow();
			});
		};
	};

	return (
		<Button
			disabled={isPending || isHost}
			onClick={toggleFollow}
			variant="primary"
			className="w-full lg:w-auto"
			size="sm"
		>
			<Heart className={cn(
				"h-4 w-4 mr-2",
				isFollowing
					? "fill-white"
					: "fill-none"
			)} />
			{isFollowing
				? "Unfollow"
				: "Follow"}
		</Button>
	);
};

export const ActionsSkeleton = () => {
	return (
		<Skeleton className="h-10 w-full lg:w-24" />
	);
}

export default Actions;