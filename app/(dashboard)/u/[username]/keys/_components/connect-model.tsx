"use client";

import { useState, useTransition, useRef, ElementRef } from 'react';

import { AlertTriangle } from 'lucide-react';
import { IngressInput } from 'livekit-server-sdk';

import { createIngress } from '@/actions/ingress';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import {
	Alert,
	AlertDescription,
	AlertTitle,
} from '@/components/ui/alert'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner';

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

const ConnectModel = () => {
	const closeRef = useRef<ElementRef<"button">>(null);

	const [isPending, startTransition] = useTransition();
	const [ingressType, setIngressType] = useState<IngressType>(RTMP);


	const onSubmit = () => {
		startTransition(() => {
			createIngress(parseInt(ingressType))
				.then(() => {
					toast.success("Ingress Created")
					closeRef.current?.click();
				})
				.catch((error) => toast.error("Something went wrong"));
		});
	}

	return (
		<Dialog>
			<DialogTrigger>
				<Button variant="primary">
					Generate connection
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Generate connection</DialogTitle>
				</DialogHeader>
				<Select
					disabled={isPending}
					value={ingressType}
					onValueChange={(value) => setIngressType(value)}
				>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Ingress Type' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={RTMP}>RTMP</SelectItem>
						<SelectItem value={WHIP}>WHIP</SelectItem>
					</SelectContent>
				</Select>
				<Alert>
					<AlertTriangle className='h-4 w-4' />
					<AlertTitle>Warning!</AlertTitle>
					<AlertDescription>This action will reset all active streams using the current connection</AlertDescription>
				</Alert>
				<div className='flex justify-between'>
					<DialogClose
						ref={closeRef}
					>
						<Button variant="ghost">
							Cancel
						</Button>
					</DialogClose>
					<Button
						disabled={isPending}
						onClick={onSubmit}
						variant="primary"
					>
						Generate
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ConnectModel;