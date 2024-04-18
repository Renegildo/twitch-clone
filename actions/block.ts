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
	// TODO: Adapt to disconnect from livestream
	// TODO: Allow ability to kick the guest
	try {
		const self = await getSelf();

		let blockedUser;

		try {
			blockedUser = await blockUser(id);
		} catch (error) {
			// This means user is a guest
		}

		try {
			await roomService.removeParticipant(self.id, id);
		} catch (error) {
			// This means user is not in the room
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
		const unblockedUser = await unblockUser(id);

		revalidatePath("/");

		if (unblockedUser) {
			revalidatePath(`/${unblockedUser.blocked.username}`);
		}

		return unblockedUser;
	} catch (error) {
		throw new Error("Internal error");
	}
};
