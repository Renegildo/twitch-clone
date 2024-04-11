"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/user-sidebar";

interface WrapperProps {
	children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
	const { collapsed } = useSidebar((state) => state);

	return (
		<aside
			className={cn(
				"fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E32] z-50",
				collapsed ? "w-[70px]" : "w-60"
			)}
		>
			{children}
		</aside>
	);
};

export default Wrapper;