import Image from "next/image";
import UserAvatar from "./user-avatar";
import { Skeleton } from "./ui/skeleton";
import LiveBadge from "./live-badge";

interface ThumbnailProps {
	fallback: string;
	username: string;
	isLive: boolean;
	src: string | null;
}

const Thumbnail = ({
	fallback,
	isLive,
	src,
	username,
}: ThumbnailProps) => {
	let content;

	if (!src) {
		content = (
			<div className="bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md">
				<UserAvatar
					size="lg"
					username={username}
					imageUrl={fallback}
					isLive={isLive}
					showBadge
				/>
			</div>
		);
	} else {
		content = (
			<Image
				src={src}
				alt={"Thumbnail"}
				fill
				className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
			/>
		);
	}

	return (
		<div className="group aspect-video relative rounded-md cursor-pointer">
			<div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
			{content}
			{(isLive && src) && (
				<div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
					<LiveBadge />
				</div>
			)}
		</div>
	);
};

export const ThumbnailSkeleton = () => {
	return (
		<div className="group aspect-video relative rounded-xl cursor-pointer">
			<Skeleton className="w-full h-full" />
		</div>
	);
};

export default Thumbnail;