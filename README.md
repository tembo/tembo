<img src='https://github.com/user-attachments/assets/4659578d-18df-451a-9607-fd8eb3dbbbe0' alt='tembo' width='80px' height='80px'/>
<h1>tembo</h1>
<p>one cli, all the coding agents</p>

---

[Website](https://tembo.io) • [Docs](https://docs.tembo.io) • [Discord](https://discord.com/invite/tembo)

---

## 🚀 Quick Start

Install the Tembo CLI globally:

```bash
npm install -g tembo
```

Run any coding agent:

```bash
tembo run claude-code
tembo run cursor-cli
tembo run aider
```

## ⚡️ Key Features

🤖 **Universal agent support** - Run any coding agent through one unified CLI interface

🎯 **Multi-agent modes** - Run multiple agents simultaneously with intelligent orchestration

📊 **Local usage tracking** - Complete visibility into agent operations with dashboard on localhost

☁️ **Background execution** - Kick off long-running tasks in the cloud with any coding agent

🤝 **Team collaboration** - Share threads, conversations, and coding sessions with your team across any agent

🔧 **Custom modes** - Define your own multi-agent workflows and execution patterns

🏠 **Works offline** - Core functionality works entirely on your machine

## 🎛️ Supported Agents

Tembo works with all major coding agents:

- **AmpCode** - `tembo run ampcode`
- **Cursor CLI** - `tembo run cursor-cli`
- **Claude Code** - `tembo run claude-code`
- **Codex** - `tembo run codex`
- **OpenCode** - `tembo run opencode`
- **Aider** - `tembo run aider`
- **OpenCode Clone** - `tembo run opencode-clone`
- **Gemini CLI** - `tembo run gemini-cli`
- **Charm CLI** - `tembo run charm-cli`

## 🎭 Execution Modes

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

Execute tasks in the cloud:

```bash
tembo login
tembo run --background aider "Refactor the entire codebase for better performance"
```

## 📊 Usage Dashboard

View detailed analytics and reports:

```bash
tembo dashboard
# Opens localhost dashboard with usage metrics, agent performance, and task history
```

Track agent performance, compare results, and analyze usage patterns across all your coding agents.

## 🤝 Team Collaboration

Share coding sessions and collaborate seamlessly across any agent:

```bash
tembo login
tembo run --share cursor-cli "Implement the new payment API"
tembo share [session-id]  # Share specific coding session with team
```

Collaborate with your team regardless of which coding agent they prefer - share threads, conversations, and entire coding sessions for seamless teamwork.

## ☁️ Cloud Features

Sign up for cloud execution and collaboration capabilities:

```bash
tembo login
tembo run --background [agent] "[task description]"
tembo status  # Check background task status
```

## 📦 Components

### CLI

The main command-line interface for running agents and managing tasks.

### SDK

Programmatically interface with Tembo:

```bash
npm install @tembo/sdk
```

```javascript
import { Tembo } from "@tembo/sdk"

const tembo = new Tembo()
await tembo.run("claude-code", "Fix the bug in utils.js")
```

### Proxy

Built-in usage tracking and request routing for comprehensive observability.

## 🤝 Contributing

Contributions welcome! Open an issue, start a discussion, or submit a pull request.

## 📄 License

MIT — see [LICENSE](./LICENSE) for details.

© 2025 Tembo Technologies Inc.
