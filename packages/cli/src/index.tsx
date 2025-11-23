#!/usr/bin/env bun
import { createCliRenderer } from '@opentui/core';
import { createRoot } from '@opentui/react';
import { Command } from 'commander';
import { useState } from 'react';
import { loadConfig } from './config';
import { amp, codex, claudeCode, getAgentKeys } from './agents';
import { AgentSelector } from './components/AgentSelector';
import { PromptInput } from './components/PromptInput';
import { LoadingShimmer } from './components/LoadingShimmer';

async function main() {
	const program = new Command();

	program
		.name('tembo')
		.description('one cli, all the coding agents.')
		.version('1.0.0')
		.action(async () => {
			const agents = getAgentKeys();
			const renderer = await createCliRenderer();
			const root = createRoot(renderer);

			function App() {
				const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
				const [convoStream, setConvoStream] = useState<string[]>([]);
				const [isLoading, setIsLoading] = useState(false);

				async function handlePromptSubmit(prompt: string) {
					const config = loadConfig();
					setConvoStream((prev) => [...prev, `> ${prompt}`]);
					setIsLoading(true);

					try {
						if (selectedAgent === 'amp') {
							if (!config.ampApiKey && !process.env.AMP_API_KEY) {
								setConvoStream((prev) => [
									...prev,
									'Error: ampApiKey not set in config',
									'Run: tembo config',
								]);
								setIsLoading(false);
								return;
							}
							await amp(config, { prompt }, (message) => {
								setConvoStream((prev) => [...prev, message]);
							});
						} else if (selectedAgent === 'codex') {
							if (!config.codexApiKey && !process.env.OPENAI_API_KEY) {
								setConvoStream((prev) => [
									...prev,
									'Error: codexApiKey not set in config',
									'Run: tembo config',
								]);
								setIsLoading(false);
								return;
							}
							await codex(config, { prompt });
						} else if (selectedAgent === 'claudeCode') {
							if (!config.claudeCodeApiKey && !process.env.ANTHROPIC_API_KEY) {
								setConvoStream((prev) => [
									...prev,
									'Error: claudeCodeApiKey not set in config',
									'Run: tembo config',
								]);
								setIsLoading(false);
								return;
							}
							await claudeCode(config, { prompt }, (message) => {
								setConvoStream((prev) => [...prev, message]);
							});
						}
						setIsLoading(false);
					} catch (error) {
						setConvoStream((prev) => [
							...prev,
							`Error: ${error instanceof Error ? error.message : String(error)}`,
						]);
						setIsLoading(false);
					}
				}

				function handleCancel() {
					root.unmount();
					process.exit(0);
				}

				if (selectedAgent) {
					return (
						<box flexDirection='column' flexGrow={1}>
							<box flexDirection='column' style={{ flexGrow: 1 }}>
								{convoStream.map((line, i) => (
									<text key={i}>{line}</text>
								))}
								{isLoading && <LoadingShimmer />}
							</box>
							<box style={{ marginTop: 1 }}>
								<PromptInput
									onSubmit={handlePromptSubmit}
									onCancel={handleCancel}
									disabled={isLoading}
								/>
							</box>
						</box>
					);
				}

				return (
					<box>
						<AgentSelector
							agents={agents}
							onSelect={setSelectedAgent}
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

				const result = await amp(
					config,
					{
						prompt,
						cwd: options.cwd,
						continue: options.continue === true ? true : options.continue,
						dangerouslyAllowAll: options.yes,
					},
					(stream) => console.log(stream)
				);

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

				const result = await claudeCode(
					config,
					{
						prompt,
						cwd: options.cwd,
						continue: options.continue === true ? true : options.continue,
						dangerouslyAllowAll: options.yes,
					},
					(stream) => console.log(stream)
				);

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
