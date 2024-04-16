"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface WrapperProps {
	children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
	const { collapsed } = useCreatorSidebar(state => state);

	return (
		<aside className={cn(
			"fixed items-center lg:items-stretch left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50",
			collapsed && "lg:w-[70px]"
		)}>
			{children}
		</aside>
	);
};

export default Wrapper;