import { db } from "./db";
import { getSelf } from "./auth-service";

export const getSearch = async (term?: string) => {
	let userId;

	try {
		const self = await getSelf();

		userId = self.id;
	} catch (error) {
		userId = null;
	}

	let streams = [];

	if (userId) {
		streams = await db.stream.findMany({
			where: {
				user: {
					NOT: {
						blockedBy: {
							some: {
								blockedId: userId,
							},
						},
					},
				},
				OR: [
					{
						name: {
							contains: term
						}
					},
					{
						user: {
							username: {
								contains: term,
							},
						},
					},
				],
			},
			select: {
				user: {
					select: {
						username: true,
						imageUrl: true,
					},
				},
				id: true,
				isLive: true,
				thumbnailUrl: true,
				name: true,
				updatedAt: true,
			},
			orderBy: [
				{
					isLive: "desc",
				},
				{
					updatedAt: "desc",
				},
			],
		});
	} else {
		streams = await db.stream.findMany({
			where: {
				OR: [
					{
						name: {
							contains: term
						}
					},
					{
						user: {
							username: {
								contains: term,
							},
						},
					},
				],
			},
			select: {
				user: {
					select: {
						username: true,
						imageUrl: true,
					},
				},
				id: true,
				isLive: true,
				thumbnailUrl: true,
				name: true,
				updatedAt: true,
			},
			orderBy: [
				{
					isLive: "desc",
				},
				{
					updatedAt: "desc",
				},
			],
		});
	}

	return streams;
};
