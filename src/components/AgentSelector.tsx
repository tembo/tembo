import { TextAttributes } from '@opentui/core';
import { useKeyboard } from '@opentui/react';
import { useState } from 'react';

interface AgentSelectorProps {
	agents: string[];
	onSelect: (agent: string) => void;
	onCancel: () => void;
}

export function AgentSelector({
	agents,
	onSelect,
	onCancel,
}: AgentSelectorProps) {
	const [selectedIndex, setSelectedIndex] = useState(0);

	useKeyboard((key) => {
		if (key.name === 'escape') {
			onCancel();
		}
		if (key.name === 'return' || key.name === 'enter') {
			onSelect(agents[selectedIndex] ?? '');
		}
		if (key.name === 'up' || key.name === 'k') {
			setSelectedIndex((prev) => Math.max(0, prev - 1));
		}
		if (key.name === 'down' || key.name === 'j') {
			setSelectedIndex((prev) => Math.min(agents.length - 1, prev + 1));
		}
	});

	return (
		<box flexDirection='column'>
			<text attributes={TextAttributes.DIM}>Select agent:</text>
			<box flexDirection='column' style={{ marginTop: 1 }}>
				{agents.map((agent, index) => (
					<box
						key={agent}
						style={{
							backgroundColor: index === selectedIndex ? '#334155' : undefined,
							paddingLeft: 1,
							paddingRight: 1,
						}}>
						<text
							attributes={
								index === selectedIndex ? TextAttributes.BOLD : undefined
							}>
							{index === selectedIndex ? '▶ ' : '  '}
							{agent}
						</text>
					</box>
				))}
			</box>
		</box>
	);
}
