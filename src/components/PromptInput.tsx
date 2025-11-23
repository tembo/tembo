import { useKeyboard } from '@opentui/react';
import { useState } from 'react';

interface PromptInputProps {
	onSubmit: (prompt: string) => void;
	onCancel: () => void;
	disabled?: boolean;
}

export function PromptInput({
	onSubmit,
	onCancel,
	disabled = false,
}: PromptInputProps) {
	const [prompt, setPrompt] = useState('');

	useKeyboard((key) => {
		if (disabled) return;

		if (key.name === 'escape') {
			onCancel();
			return;
		}
		if (key.name === 'return' || key.name === 'enter') {
			if (prompt.trim()) {
				onSubmit(prompt);
				setPrompt('');
			}
			return;
		}
		if (key.name === 'backspace') {
			setPrompt((prev) => prev.slice(0, -1));
			return;
		}
		if (key.sequence && key.sequence.length === 1 && !key.ctrl && !key.meta) {
			setPrompt((prev) => prev + key.sequence);
		}
	});

	return (
		<box style={{ border: true, padding: 1 }}>
			<text>{disabled ? 'Running...' : `${prompt}_`}</text>
		</box>
	);
}
