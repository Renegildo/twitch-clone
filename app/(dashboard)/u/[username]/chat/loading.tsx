import { ToggleCardSkeleton } from "./_components/toggle-card";

const ChatLoading = () => {
	return (
		<div className="p-6">
			<div className="mb-4">
				<h1 className="text-2xl font-bold">
					Chat settings
				</h1>
			</div>
			<div className="space-y-4">
				{[...Array(3)].map((_, i) => (
					<ToggleCardSkeleton key={i} />
				))}
			</div>
		</div>
	);
};

export default ChatLoading;