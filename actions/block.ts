"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
	process.env.LIVEKIT_API_URL!,
	process.env.LIVEKIT_API_KEY!,
	process.env.LIVEKIT_API_SECRET!,
);

export const onBlock = async (id: string) => {
	try {
		const self = await getSelf();

		let blockedUser;

		try {
			blockedUser = await blockUser(id);
		} catch (error) {
			throw new Error("You need to sign in to block users");
		}

		try {
			await roomService.removeParticipant(self.id, id);
		} catch (error) {
			throw new Error("User is not in the room");
		}

		revalidatePath(`/u/${self.username}`);

		if (blockedUser) {
			revalidatePath(`/${blockedUser.blocked.username}`);
		}

		return blockedUser;
	} catch (error) {
		throw new Error("Internal error");
	}
};

export const onUnblock = async (id: string) => {
	try {
		const self = await getSelf();
		const unblockedUser = await unblockUser(id);

		revalidatePath(`/u/${self.username}/community`);

		return unblockedUser;
	} catch (error) {
		throw new Error("Internal error");
	}
};
