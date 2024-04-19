"use client";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
	userId: string;
};

const UnblockButton = ({ userId }: UnblockButtonProps) => {
	const [isPending, startTransition] = useTransition();

	const onClick = () => {
		startTransition(() => {
			onUnblock(userId)
				.then((result) => toast.success(`User ${result.blocked.username} unblocked`))
				.catch(() => toast.error("Something went wrong"));
		});
	};

	return (
		<Button
			onClick={onClick}
			disabled={isPending}
		>
			Unblock
		</Button>
	);
};

export default UnblockButton;