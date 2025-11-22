import { execute } from '@sourcegraph/amp-sdk';
import type { Config } from '../config';

interface AmpOptions {
	prompt: string;
	cwd?: string;
	continue?: boolean | string;
	dangerouslyAllowAll?: boolean;
}

export async function amp(
	config: Config,
	options: AmpOptions
): Promise<string> {
	if (config.ampApiKey) process.env.AMP_API_KEY = config.ampApiKey;

	const executeOptions = {
		cwd: options.cwd,
		continue: options.continue,
		dangerouslyAllowAll: options.dangerouslyAllowAll ?? false,
		...config.amp,
	};

	for await (const message of execute({
		prompt: options.prompt,
		options: executeOptions,
	})) {
		if (message.type === 'system') {
			console.log(
				'Amp initialized with tools:',
				message.tools?.slice(0, 5).join(', ')
			);
		} else if (message.type === 'assistant') {
			const content = message.message.content[0];
			if (content && content.type === 'tool_use') {
				console.log(`→ Using ${content.name}...`);
			}
		} else if (message.type === 'result') {
			if (message.is_error) {
				throw new Error(`Amp error: ${message.error}`);
			}
			return message.result;
		}
	}

	throw new Error('No result received from Amp');
}
