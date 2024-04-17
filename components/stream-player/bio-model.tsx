"use client";

import React, {
	useState,
	useTransition,
	ElementRef,
	useRef,
} from 'react';

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '../ui/button';
import Hint from '../hint';
import { Textarea } from '../ui/textarea';
import { updateUser } from '@/actions/user';
import { toast } from 'sonner';

interface BioModalProps {
	initialValue: string | null;
}

const BioModal = ({ initialValue }: BioModalProps) => {
	const [value, setValue] = useState<string>(initialValue || "");
	const [isPending, startTransition] = useTransition();

	const closeRef = useRef<ElementRef<"button">>(null);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		startTransition(() => {
			updateUser({ bio: value })
				.then(() => {
					toast.success("Bio updated successfully");
					closeRef.current?.click();
				})
				.catch(() => toast.error("Something went wrong"));
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="link"
					size="sm"
					className='ml-auto'
				>
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Edit user bio
					</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={(e) => onSubmit(e)}
					className='space-y-4'
				>
					<Textarea
						placeholder='User bio'
						onChange={(e) => setValue(e.target.value)}
						value={value}
						disabled={isPending}
						className='resize-none'
					/>
					<div className='flex justify-between'>
						<DialogClose asChild>
							<Button type='button' variant='ghost' ref={closeRef}>
								Cancel
							</Button>
						</DialogClose>
						<Button
							type='submit'
							disabled={isPending}
							variant="primary"
						>
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default BioModal;