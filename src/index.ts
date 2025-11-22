#!/usr/bin/env bun
import { Command } from 'commander';
import { loadConfig } from './config';
import { amp } from './agents/amp';

function main() {
	const program = new Command();

	program
		.name('tembo')
		.description('one cli, all the coding agents.')
		.version('1.0.0')
		.action(() => {
			console.log('hello world');
		});

	program
		.command('config')
		.description('configure the cli')
		.action(() => {
			console.log(loadConfig());
		});

	program
		.command('amp')
		.description('execute a prompt with the Amp agent')
		.argument('<prompt>', 'the prompt to send to Amp')
		.option('-c, --cwd <directory>', 'working directory')
		.option('--continue [threadId]', 'continue an existing conversation')
		.option('-y, --yes', 'skip permission prompts')
		.action(async (prompt, options) => {
			try {
				const config = loadConfig();

				if (!config.ampApiKey && !process.env.AMP_API_KEY) {
					console.error('Error: ampApiKey not set in config');
					console.error('Run: tembo config');
					process.exit(1);
				}

				const result = await amp(config, {
					prompt,
					cwd: options.cwd,
					continue: options.continue === true ? true : options.continue,
					dangerouslyAllowAll: options.yes,
				});

				console.log('\n✓ Result:');
				console.log(result);
			} catch (error) {
				console.error(
					'Error:',
					error instanceof Error ? error.message : String(error)
				);
				process.exit(1);
			}
		});

	program.parse(process.argv);
}

main();
