import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface HintProps {
	label: string;
	children: React.ReactNode;
	asChild?: boolean;
	side?: 'top' | 'bottom' | 'left' | 'right';
	align?: 'start' | 'center' | 'end';
}

const Hint = ({
	children,
	label,
	align,
	asChild,
	side }: HintProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild={asChild}>
					{children}
				</TooltipTrigger>
				<TooltipContent
					className="text-black bg-white"
					side={side}
					align={align}
				>
					<p className="font-semibold">
						{label}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default Hint;