<img src='https://github.com/user-attachments/assets/4659578d-18df-451a-9607-fd8eb3dbbbe0' alt='tembo' width='80px' height='80px'/>
<h1>tembo</h1>

<p>One CLI, all the coding agents • <a href="https://docs.tembo.io/cli">https://docs.tembo.io/cli</a></p>

## Quick Start

Install the Tembo CLI globally:

```bash
npm install -g tembo
```

Run any coding agent:

```bash
tembo claude
tembo cursor
tembo amp
tembo codex
...
```

## Key Features

- **Universal agent support** - Run any coding agent through one unified CLI interface

- **Intelligent task routing** - Tembo intelligently routes tasks to the best agent for the job (optional via running "tembo '<insert-task-here>' and not specifying an agent name)

- **Multi-agent modes** - Run multiple agents simultaneously with intelligent orchestration

- **Background execution** - Kick off long-running tasks in the cloud with any coding agent (requires tembo account)

- **Custom modes (Coming soon)** - Define your own multi-agent workflows and execution patterns

- **Team collaboration (Coming soon)** - Share threads, conversations, and coding sessions with your team across any agent

## Supported Agents

Tembo works with all major coding agents:

- **[Claude Code](https://docs.anthropic.com/en/docs/claude-code)** - `tembo claude`
- **[Sourcegraph Amp](https://sourcegraph.com/amp)** - `tembo amp`
- **[Cursor CLI](https://cursor.com/cli)** - `tembo cursor`
- **[Codex CLI](https://openai.com/codex/)** - `tembo codex`
- **[Aider](https://aider.chat/)** - `tembo aider`
- **[SST OpenCode](https://github.com/sst/opencode)** - `tembo opencode`
- **[Charm Crush CLI](https://github.com/charmbracelet/crush)** - `tembo crush`
- **[Gemini CLI](https://github.com/google-gemini/gemini-cli)** - `tembo gemini`
- **[Custom Agents](https://docs.tembo.io/cli/custom-agents)** - `tembo [agent-name]` (Coming soon)

## Execution Modes

### Standard Mode

Run a single coding agent:

```bash
tembo run claude-code "Fix the authentication bug in src/auth.js"
```

### MAX Mode

Run 3 agents simultaneously with LLM-as-judge evaluation:

```bash
tembo claude --mode max "Optimize the database queries in the user service"
```

### Background Mode

Execute tasks in a secure cloud sandbox environment via tembo cloud:

```bash
tembo login
tembo claude --background "Refactor the entire codebase for better performance"
```

### Custom Modes

Define your own multi-agent workflows:

```bash
tembo claude --mode custom-debug "Debug the memory leak in the payment processor"
```

## Cloud Features

Sign up for cloud execution and collaboration capabilities:

```bash
tembo login
tembo run --background [agent] "[task description]"
tembo status  # Check background task status
```

## Team Collaboration (Coming soon)

Share coding sessions and collaborate seamlessly across any agent:

```bash
tembo login
tembo run --share cursor-cli "Implement the new payment API"
tembo share [session-id]  # Share specific coding session with team
```

Collaborate with your team regardless of which coding agent they prefer - share threads, conversations, and entire coding sessions.

## Contributing

Contributions welcome! Open an issue, start a discussion, or submit a pull request.

## License

MIT — see [LICENSE](./LICENSE) for details.

© 2025 Tembo Data Systems, Inc.
