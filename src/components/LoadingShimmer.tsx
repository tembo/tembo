import { RGBA } from '@opentui/core';
import { useTimeline } from '@opentui/react';
import { useState, useEffect } from 'react';

interface ShimmerProps {
	text: string;
	color: RGBA;
}

const DURATION = 2500;

function Shimmer(props: ShimmerProps) {
	const characters = props.text.split('');
	const color = props.color;

	const [shimmerValues, setShimmerValues] = useState<number[]>(
		characters.map(() => 0.4)
	);

	const timeline = useTimeline({
		duration: DURATION,
		loop: true,
	});

	useEffect(() => {
		if (!timeline) return;

		characters.forEach((_, i) => {
			const target = { shimmer: 0.4 };

			timeline.add(
				target,
				{
					shimmer: 1,
					duration: DURATION / (props.text.length + 1),
					ease: 'linear',
					alternate: true,
					loop: 2,
					onUpdate: () => {
						setShimmerValues((prev) => {
							const newValues = [...prev];
							newValues[i] = target.shimmer;
							return newValues;
						});
					},
				},
				(i * (DURATION / (props.text.length + 1))) / 2
			);
		});
	}, [timeline, characters.length, props.text.length]);

	return (
		<text>
			{characters.map((ch, i) => {
				const shimmerValue = shimmerValues[i] ?? 0.4;
				const fg = RGBA.fromInts(
					color.r * 255,
					color.g * 255,
					color.b * 255,
					shimmerValue * 255
				);
				return (
					<span key={i} style={{ fg }}>
						{ch}
					</span>
				);
			})}
		</text>
	);
}

export function LoadingShimmer() {
	return (
		<box>
			<Shimmer text='running' color={RGBA.fromInts(255, 255, 255, 255)} />
		</box>
	);
}
