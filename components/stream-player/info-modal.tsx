"use client";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ButtonHTMLAttributes, ElementRef, useRef, useState } from 'react';
import { useTransition } from 'react';
import { updateStream } from '@/actions/stream';
import { toast } from 'sonner';

interface InfoModalProps {
	initialName: string;
	initialThumbnailUrl: string | null;
};

const InfoModal = ({
	initialName,
	initialThumbnailUrl,
}: InfoModalProps) => {
	const closeRef = useRef<ElementRef<"button">>(null);
	const [isPending, startTransition] = useTransition();
	const [name, setName] = useState<string>(initialName);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		startTransition(() => {
			updateStream({ name: name })
				.then((data) => {
					toast.success(`Stream name updated to ${data.name}`);
					closeRef.current?.click();
				})
				.catch(() => toast.error("Something went wrong"));
		});
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="link" size="sm" className='ml-auto'>
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Edit stream info
					</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={(e) => onSubmit(e)}
					className='space-y-14'
				>
					<div className='space-y-2'>
						<Label>
							Name
						</Label>
						<Input
							placeholder='Stream Name'
							onChange={onChange}
							value={name}
							disabled={isPending}
						/>
					</div>
					<div className='flex justify-between'>
						<DialogClose asChild ref={closeRef}>
							<Button
								type='button'
								variant='ghost'
							>
								Cancel
							</Button>
						</DialogClose>
						<Button
							disabled={isPending}
							variant="primary"
							type='submit'
						>
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default InfoModal;