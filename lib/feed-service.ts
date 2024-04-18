import { getSelf } from "./auth-service";
import { db } from "./db"

export const getStreams = async () => {
	let userId;

	try {
		const self = await getSelf();

		userId = self.id;
	} catch (error) {
		userId = null;
	}

	let streams;

	if (userId) {
		streams = await db.stream.findMany({
			select: {
				id: true,
				user: true,
				isLive: true,
				name: true,
				thumbnailUrl: true,
			},
			where: {
				user: {
					NOT: {
						blocking: {
							some: {
								blockedId: userId,
							},
						},
					},
				},
			},
			orderBy: [
				{
					isLive: "asc",
				},
				{
					updatedAt: "desc",
				},
			],
		});
	} else {
		streams = await db.stream.findMany({
			orderBy: [
				{
					isLive: "asc",
				},
				{
					updatedAt: "desc",
				},
			],
			select: {
				id: true,
				user: true,
				isLive: true,
				name: true,
				thumbnailUrl: true,
			},
		});
	};

	return streams;
};
