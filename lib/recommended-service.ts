import { db } from "./db";
import { getSelf } from "./auth-service";
import { SelfDecodingBody } from "svix/dist/openapi";

export const getRecommended = async () => {
	let userId;

	try {
		const self = await getSelf();
		userId = self.id
	} catch (error) {
		userId = null;
	}

	if (userId) {
		const users = await db.user.findMany({
			where: {
				AND: [
					{
						NOT: {
							id: userId,
						},
					},
					{
						NOT: {
							followedBy: {
								some: {
									followerId: userId,
								},
							},
						},
					},
					{
						NOT: {
							blocking: {
								some: {
									blockedId: userId,
								},
							},
						},
					},
				],
			},
			include: {
				stream: {
					select: {
						isLive: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
		return users;
	}

	const users = await db.user.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			stream: {
				select: {
					isLive: true,
				},
			},
		},
	});
	return users;
};
