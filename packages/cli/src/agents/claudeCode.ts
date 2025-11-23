import { query } from '@anthropic-ai/claude-agent-sdk';
import type { Config } from '../config';

interface ClaudeCodeOptions {
	prompt: string;
	cwd?: string;
	continue?: boolean;
	dangerouslyAllowAll?: boolean;
}

export async function claudeCode(
	config: Config,
	options: ClaudeCodeOptions,
	onStream: (stream: string) => void
): Promise<string> {
	if (config.claudeCodeApiKey)
		process.env.ANTHROPIC_API_KEY = config.claudeCodeApiKey;

	const queryOptions = {
		cwd: options.cwd,
		continue: options.continue ?? true,
		resume: typeof options.continue === 'string' ? options.continue : undefined,
		dangerouslyAllowAll: options.dangerouslyAllowAll ?? true,
		...config.claudeCode,
	};

	let sessionId: string | undefined;
	let result: string | undefined;

	for await (const message of query({
		prompt: options.prompt,
		options: queryOptions,
	})) {
		if (message.type === 'system' && message.subtype === 'init') {
			sessionId = message.session_id;
			// onStream(`Claude Code session started with ID: ${sessionId}`);
		} else if (message.type === 'assistant') {
			const content = message.message?.content?.[0];
			if (content && content.type === 'tool_use') {
				onStream(`→ Using ${content.name}...`);
			} else {
				onStream(content.text);
			}
		} else if (message.type === 'result') {
			if (message.is_error) {
				throw new Error(
					`Claude Code execution error: ${JSON.stringify(message)}`
				);
			}
			if (message.subtype === 'success') {
				result = message.result;
			}
		}
	}

	if (!result) {
		throw new Error('No result received from Claude Code');
	}

	return result;
}
