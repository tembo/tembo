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
tembo run claude
tembo run cursor
tembo run amp
```

## Key Features

**Universal agent support** - Run any coding agent through one unified CLI interface

**Multi-agent modes** - Run multiple agents simultaneously with intelligent orchestration

**Local usage tracking** - Complete visibility into agent operations with dashboard on localhost

**Background execution** - Kick off long-running tasks in the cloud with any coding agent

**Custom modes (Maybe)** - Define your own multi-agent workflows and execution patterns

**Team collaboration (Maybe)** - Share threads, conversations, and coding sessions with your team across any agent

## Supported Agents

Tembo works with all major coding agents:

- **[Claude Code](https://docs.anthropic.com/en/docs/claude-code)** - `tembo run claude`
- **[Sourcegraph Amp](https://sourcegraph.com/amp)** - `tembo run amp`
- **[Cursor CLI](https://cursor.com/cli)** - `tembo run cursor`
- **[Codex CLI](https://openai.com/codex/)** - `tembo run codex`
- **[Aider](https://aider.chat/)** - `tembo run aider`
- **[SST OpenCode](https://github.com/sst/opencode)** - `tembo run opencode`
- **[Charm Crush CLI](https://github.com/charmbracelet/crush)** - `tembo run crush`
- **[Gemini CLI](https://github.com/google-gemini/gemini-cli)** - `tembo run gemini`

## Execution Modes

### Standard Mode

Run a single coding agent:

```bash
tembo run claude-code "Fix the authentication bug in src/auth.js"
```

### MAX Mode

Run 3 agents simultaneously with LLM-as-judge evaluation:

```bash
tembo run --mode max "Optimize the database queries in the user service"
```

### Custom Modes

Define your own multi-agent workflows:

```bash
tembo run --mode custom-debug "Debug the memory leak in the payment processor"
```

### Background Mode

Execute tasks via tembo cloud:

```bash
tembo login
tembo run --background aider "Refactor the entire codebase for better performance"
```

## Usage Dashboard

View detailed analytics and reports:

```bash
tembo dashboard
# Opens localhost dashboard with usage metrics, agent performance, and task history
```

Track agent performance, compare results, and analyze usage patterns across all your coding agents.

## Team Collaboration

Share coding sessions and collaborate seamlessly across any agent:

```bash
tembo login
tembo run --share cursor-cli "Implement the new payment API"
tembo share [session-id]  # Share specific coding session with team
```

Collaborate with your team regardless of which coding agent they prefer - share threads, conversations, and entire coding sessions for seamless teamwork.

## Cloud Features

Sign up for cloud execution and collaboration capabilities:

```bash
tembo login
tembo run --background [agent] "[task description]"
tembo status  # Check background task status
```

## Components

### CLI

The main command-line interface for running agents and managing tasks.

### SDK

Programatic interface to tembo cloud:

```bash
npm install @tembo/sdk
```

```javascript
import { Tembo } from "@tembo/sdk"

const tembo = new Tembo({
  apiKey: "your-api-key",
})
await tembo.run("claude-code", "Fix the bug in utils.js")
```

### Proxy

Built-in usage tracking and request routing for comprehensive observability.

```
npx @tembo/proxy start
npx @tembo/proxy stop
npx @tembo/proxy status
```

## Contributing

Contributions welcome! Open an issue, start a discussion, or submit a pull request.

## License

MIT — see [LICENSE](./LICENSE) for details.

© 2025 Tembo Data Systems, Inc.
