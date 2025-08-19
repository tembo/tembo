# Tembo - Run Any Coding Agent, One CLI 🚀

The universal CLI for running and orchestrating coding agents with advanced multi-agent capabilities and usage tracking.

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
tembo run claude
tembo run cursor
tembo run aider
```

## ⚡️ Key Features

🤖 **Universal agent support** - Run Claude Code, Cursor, Aider, or any coding agent through one unified interface

🎯 **MAX Mode** - Run 3 coding agents simultaneously on the same task with LLM-as-judge evaluation for optimal results

📊 **Local usage tracking** - Complete visibility into agent operations with dashboard on localhost

☁️ **Background execution** - Kick off long-running tasks in the cloud with any coding agent (optional Tembo.io account required)

🏠 **Works offline** - Core functionality works entirely on your machine without internet dependencies

## 🎛️ Agent Modes

### Standard Mode

Run a single coding agent:

```bash
tembo run claude "Fix the authentication bug in src/auth.js"
```

### MAX Mode

Run 3 agents simultaneously with automatic evaluation:

```bash
tembo run --mode max "Optimize the database queries in the user service"
```

### Background Mode

Execute tasks in the cloud (requires login):

```bash
tembo login
tembo run --background claude "Refactor the entire codebase for better performance"
```

## 📊 Usage Dashboard

View detailed analytics and reports:

```bash
tembo dashboard
# Opens localhost dashboard with usage metrics, agent performance, and task history
```

## ☁️ Cloud Features

Sign up for cloud execution capabilities:

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
await tembo.run("claude", "Fix the bug in utils.js")
```

### Proxy

Built-in usage tracking and request routing:

```bash
npx @tembo/proxy start
```

## 🤝 Contributing

Contributions welcome! Open an issue, start a discussion, or submit a pull request.

## 📄 License

MIT — see [LICENSE](./LICENSE) for details.

© 2025 Tembo Technologies Inc.
