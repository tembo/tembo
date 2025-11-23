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

	const agentColors: Record<string, string> = {
		amp: '\x1b[38;2;243;79;63m',
		claudeCode: '\x1b[38;2;216;119;87m',
	};

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
				{agents.map((agent, index) => {
					const isSelected = index === selectedIndex;
					const colorCode = agentColors[agent];
					const displayText = colorCode ? `${colorCode}${agent}\x1b[0m` : agent;
					return (
						<box
							key={agent}
							style={{
								backgroundColor: undefined,
								paddingLeft: 1,
								paddingRight: 1,
							}}>
							<text attributes={isSelected ? TextAttributes.BOLD : undefined}>
								{isSelected ? '> ' : '  '}
								{displayText}
							</text>
						</box>
					);
				})}
			</box>
		</box>
	);
}
