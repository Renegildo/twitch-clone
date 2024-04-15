"use client";

import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
	value?: string;
}

const CopyButton = ({
	value,
}: CopyButtonProps) => {
	const [isCopied, setIsCopied] = useState<boolean>(false);

	const onCopy = () => {
		if (!value) return;

		setIsCopied(true);
		navigator.clipboard.writeText(value);
		setTimeout(() => {
			setIsCopied(false);
		}, 1000);
	};

	const Icon = isCopied ? CopyCheck : Copy;

	return (
		<Button
			onClick={onCopy}
			disabled={isCopied || !value}
			variant="ghost"
			size="sm"
		>
			<Icon className="w-4 h-4" />
		</Button>
	);
};

export default CopyButton;