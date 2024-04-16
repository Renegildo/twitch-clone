"use client";

import { Participant, Track } from "livekit-client";
import { useRef } from "react";

import { useTracks } from "@livekit/components-react";
import FullscreenControl from "./fullscreen-control";

interface LiveVideoProps {
	participant: Participant;
}

const LiveVideo = ({ participant }: LiveVideoProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useTracks([Track.Source.Camera, Track.Source.Microphone])
		.filter((track) => track.participant.identity = participant.identity)
		.forEach((track) => {
			if (videoRef.current) {
				track.publication.track?.attach(videoRef.current);
			}
		});

	return (
		<div
			ref={wrapperRef}
			className="relative h-full flex"
		>
			<video
				ref={videoRef}
				width="100%"
			/>
			<div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
				<div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
					<FullscreenControl
						isFullscreen={false}
						onToggle={() => { }}
					/>
				</div>
			</div>
		</div>
	);
};

export default LiveVideo;