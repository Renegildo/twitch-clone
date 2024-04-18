import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
	return (
		<div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
			<h1 className="text-4xl">404</h1>
			<p className="text-center">
				You almost fell into the eternal void<br/> but this page of 404 saved you.
			</p>
			<Button variant="secondary" asChild>
				<Link href="/">
					Back to home
				</Link>
			</Button>
		</div>
	);
};

export default NotFoundPage;