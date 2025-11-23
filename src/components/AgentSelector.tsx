import type { SelectOption } from '@opentui/core';
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

	const options: SelectOption[] = agents.map((agent) => ({
		name: agent,
		description: `Execute with ${agent} agent`,
		value: agent,
	}));

	useKeyboard((key) => {
		if (key.name === 'escape') {
			onCancel();
		}
		if (key.name === 'return') {
			onSelect(agents[selectedIndex] ?? '');
		}
	});

	return (
		<box style={{ border: true, height: Math.min(agents.length + 4, 12) }}>
			<box
				title='Select Agent'
				style={{
					border: true,
					flexGrow: 1,
				}}>
				<select
					style={{ flexGrow: 1 }}
					options={options}
					focused={true}
					onChange={(index) => {
						setSelectedIndex(index);
					}}
					showScrollIndicator
				/>
			</box>
		</box>
	);
}
