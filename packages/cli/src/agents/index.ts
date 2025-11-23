import { readdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export { amp } from './amp';
export { codex } from './codex';
export { claudeCode } from './claudeCode';

export async function loadAgentsFromFs() {
	const agents: Record<string, any> = {};
	const currentDir = dirname(fileURLToPath(import.meta.url));

	const files = readdirSync(currentDir);

	for (const file of files) {
		if (file.endsWith('.ts') && file !== 'index.ts') {
			const agentKey = file.replace('.ts', '');
			const agentModule = await import(`./${agentKey}`);
			agents[agentKey] = agentModule[agentKey];
		}
	}

	return agents;
}

export function getAgentKeys(): string[] {
	const currentDir = dirname(fileURLToPath(import.meta.url));
	const files = readdirSync(currentDir);

	return files
		.filter((file) => file.endsWith('.ts') && file !== 'index.ts')
		.map((file) => file.replace('.ts', ''));
}

export type AgentKey = string;
