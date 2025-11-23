import { z } from 'zod';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join, dirname } from 'path';

const ConfigSchema = z.object({
	ampApiKey: z.string(),
	claudeCodeApiKey: z.string(),
	codexApiKey: z.string(),
	amp: z.record(z.string(), z.any()),
	claudeCode: z.record(z.string(), z.any()),
	codex: z.record(z.string(), z.any()),
});

export type Config = z.infer<typeof ConfigSchema>;

const CONFIG_PATH = join(homedir(), '.tembo', 'settings.json');

const DEFAULT_CONFIG: Config = {
	ampApiKey: '',
	claudeCodeApiKey: '',
	codexApiKey: '',
	amp: {},
	claudeCode: {},
	codex: {},
};

function createDefaultConfig(): void {
	const configDir = dirname(CONFIG_PATH);

	if (!existsSync(configDir)) {
		mkdirSync(configDir, { recursive: true });
	}

	writeFileSync(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf-8');

	console.log(`Created default config at ${CONFIG_PATH}`);
	console.log('Please edit this file and add your API keys.');
}

export function loadConfig(): Config {
	if (!existsSync(CONFIG_PATH)) {
		createDefaultConfig();
	}

	const fileContent = readFileSync(CONFIG_PATH, 'utf-8');
	const rawConfig = JSON.parse(fileContent);

	try {
		return ConfigSchema.parse(rawConfig);
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error('Config validation failed:');
			console.error(error.message);
			throw new Error('Invalid configuration file');
		}
		throw error;
	}
}

export function getConfigPath(): string {
	return CONFIG_PATH;
}
