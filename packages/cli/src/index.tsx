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
		.enablePositionalOptions(true)
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
						<box flexDirection='column' height='100%'>
							<box flexDirection='column' flexGrow={1} overflow='scroll'>
								{convoStream.map((line, i) => (
									<text key={i}>{line}</text>
								))}
								{isLoading && <LoadingShimmer />}
							</box>
							<box flexShrink={0} marginTop={1}>
								<PromptInput
									onSubmit={handlePromptSubmit}
									onCancel={handleCancel}
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

	// Map of tool aliases to their binary names
	const toolBinaries: Record<string, string> = {
		'codex': 'codex',
		'claude': 'claude',
		'claude-code': 'claude',
		'amp': 'amp',
		'ampcode': 'amp',
	};

	// Helper function to find the binary path
	async function findBinaryPath(binaryName: string): Promise<string | null> {
		const { existsSync } = await import('fs');
		const { dirname, join } = await import('path');
		const { fileURLToPath } = await import('url');

		const currentDir = dirname(fileURLToPath(import.meta.url));

		// Possible locations for the binary (in order of preference)
		const possiblePaths = [
			// Local package node_modules/.bin
			join(currentDir, '..', 'node_modules', '.bin', binaryName),
			// Workspace root node_modules/.bin (monorepo setup)
			join(currentDir, '..', '..', '..', 'node_modules', '.bin', binaryName),
			// Global bun installation path
			join(process.env.HOME || '', '.bun', 'bin', binaryName),
		];

		for (const binPath of possiblePaths) {
			if (existsSync(binPath)) {
				return binPath;
			}
		}

		return null;
	}

	program
		.command('run', { isDefault: false })
		.description('run external CLI tools (codex, claude-code, amp)')
		.argument('<tool>', 'the tool to run (codex, claude, claude-code, amp, ampcode)')
		.argument('[args...]', 'arguments to pass to the tool')
		.allowUnknownOption(true)
		.passThroughOptions(true)
		.action(async (tool: string, args: string[]) => {
			const binaryName = toolBinaries[tool.toLowerCase()];

			if (!binaryName) {
				console.error(`Error: Unknown tool '${tool}'`);
				console.error('Available tools: codex, claude, claude-code, amp, ampcode');
				process.exit(1);
			}

			const binPath = await findBinaryPath(binaryName);

			if (!binPath) {
				console.error(`Error: Could not find binary for '${tool}'`);
				console.error('Make sure the package is installed correctly.');
				process.exit(1);
			}

			try {
				const proc = Bun.spawn([binPath, ...args], {
					stdin: 'inherit',
					stdout: 'inherit',
					stderr: 'inherit',
					cwd: process.cwd(),
					env: process.env,
				});

				const exitCode = await proc.exited;
				process.exit(exitCode);
			} catch (error) {
				console.error(
					`Error running ${tool}:`,
					error instanceof Error ? error.message : String(error)
				);
				process.exit(1);
			}
		});

	program.parse(process.argv);
}

main();
