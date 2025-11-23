import { Codex } from '@openai/codex-sdk';
import type { Config } from '../config';

interface CodexOptions {
	prompt: string;
	cwd?: string;
	continue?: boolean | string;
	dangerouslyAllowAll?: boolean;
}

export async function codex(
	config: Config,
	options: CodexOptions
): Promise<string> {
	if (config.codexApiKey) process.env.OPENAI_API_KEY = config.codexApiKey;

	const codexClient = new Codex(config.codex);

	const thread =
		options.continue && typeof options.continue === 'string'
			? codexClient.resumeThread(options.continue)
			: codexClient.startThread();

	console.log('Codex initialized');

	const result = await thread.run(options.prompt);

	console.log('\nCodex execution complete');

	return typeof result === 'string' ? result : JSON.stringify(result);
}
