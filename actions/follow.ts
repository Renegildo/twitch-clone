"use server";

import { revalidatePath } from 'next/cache';

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { followUser, unfollowUser } from "@/lib/follow-service";

export const onFollow = async (id: string) => {
	try {
		const followedUser = await followUser(id);

		revalidatePath("/");

		if (followedUser) {
			revalidatePath(`/${followedUser.following.username}`)
		}

		return followedUser;
	} catch (error) {
		throw new Error("Internal Error");
	};
};

export const onUnfollow = async (id: string) => {
	try {
		const unfollowedUser = await unfollowUser(id);

		revalidatePath("/");

		if (unfollowedUser) {
			revalidatePath(`/${unfollowedUser.following.username}`);
		}

		return unfollowedUser;
	} catch (error) {
		throw new Error("Internal error.");
	}
};
