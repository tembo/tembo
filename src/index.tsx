#!/usr/bin/env bun
import { createCliRenderer } from '@opentui/core';
import { createRoot } from '@opentui/react';
import { Command } from 'commander';
import { loadConfig } from './config';
import { amp, codex, claudeCode } from './agents';
import { AgentSelector } from './components/AgentSelector';

async function main() {
	const program = new Command();

	program
		.name('tembo')
		.description('one cli, all the coding agents.')
		.version('1.0.0')
		.action(async () => {
			const agents = ['amp', 'codex', 'claude'];
			const renderer = await createCliRenderer();
			const root = createRoot(renderer);

			function App() {
				function handleSelect(agent: string) {
					root.unmount();
					console.log(`Selected agent: ${agent}`);
					process.exit(0);
				}

				function handleCancel() {
					root.unmount();
					process.exit(0);
				}

				return (
					<box>
						<AgentSelector
							agents={agents}
							onSelect={handleSelect}
							onCancel={handleCancel}
						/>
					</box>
				);
			}

			root.render(<App />);
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

	program
		.command('codex')
		.description('execute a prompt with the Codex agent')
		.argument('<prompt>', 'the prompt to send to Codex')
		.option('-c, --cwd <directory>', 'working directory')
		.option('--continue [threadId]', 'continue an existing conversation')
		.option('-y, --yes', 'skip permission prompts')
		.action(async (prompt, options) => {
			try {
				const config = loadConfig();

				if (!config.codexApiKey && !process.env.OPENAI_API_KEY) {
					console.error('Error: codexApiKey not set in config');
					console.error('Run: tembo config');
					process.exit(1);
				}

				const result = await codex(config, {
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

	program
		.command('claude')
		.description('execute a prompt with the Claude Code agent')
		.argument('<prompt>', 'the prompt to send to Claude Code')
		.option('-c, --cwd <directory>', 'working directory')
		.option('--continue [threadId]', 'continue an existing conversation')
		.option('-y, --yes', 'skip permission prompts')
		.action(async (prompt, options) => {
			try {
				const config = loadConfig();

				if (!config.claudeCodeApiKey && !process.env.ANTHROPIC_API_KEY) {
					console.error('Error: claudeCodeApiKey not set in config');
					console.error('Run: tembo config');
					process.exit(1);
				}

				const result = await claudeCode(config, {
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
