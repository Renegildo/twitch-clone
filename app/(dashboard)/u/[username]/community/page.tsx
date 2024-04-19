import { format } from "date-fns";

import { getBlockedUsers } from "@/lib/block-service";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";


const CommunityPage = async () => {
	const blockedUsers = await getBlockedUsers();

	const formattedData = blockedUsers.map((block) => ({
		...block,
		userId: block.blockedId,
		imageUrl: block.blocked.imageUrl,
		username: block.blocked.username,
		createdAt: format(block.blocked.createdAt, "dd/MM/yyyy"),
	}));

	return (
		<div className="p-6">
			<div className="mb-4">
				<h1 className="text-2xl font-bold">
					Community Settings
				</h1>
				<DataTable columns={columns} data={formattedData} />
			</div>
		</div>
	);
};

export default CommunityPage;