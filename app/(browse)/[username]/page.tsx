import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import Actions from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";
import StreamPlayer from "@/components/stream-player";

interface UserPageProps {
	params: {
		username: string;
	};
};

const UserPage = async ({ params }: UserPageProps) => {
	const user = await getUserByUsername(params.username);

	if (!user || !user.stream) notFound();

	const isFollowing = await isFollowingUser(user.id);
	const isBlocked = await isBlockedByUser(user.id);

	if (isBlocked) notFound();

	return (
		<StreamPlayer
			isFollowing={isFollowing}
			user={{
				_count: {
					followedBy: user._count.followedBy
				},
				bio: user.bio,
				id: user.id,
				imageUrl: user.imageUrl,
				username: user.username,
			}}
			stream={{
				isChatDelayed: user.stream.isChatDelayed,
				isChatEnabled: user.stream.isChatEnabled,
				isChatFollowersOnly: user.stream.isChatFollowersOnly,
				name: user.stream.name,
				thumbnailUrl: user.stream.thumbnailUrl,
			}}
		/>
	);
};

export default UserPage;