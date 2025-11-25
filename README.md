<img src='https://github.com/user-attachments/assets/4659578d-18df-451a-9607-fd8eb3dbbbe0' alt='tembo' width='80px' height='80px'/>

# tembo

**one cli, all the coding agents.**

Tembo CLI is a unified interface for working with the best AI coding agents available. Stop switching between tools—access Claude Code, Codex, Amp, and more from a single command line interface.

## Features

### Universal Agent Access

- **Multiple Agents**: Work with Claude Code, Codex, Amp, and other leading coding agents
- **Unified Interface**: One consistent CLI experience across all agents
- **Seamless Switching**: Change between agents without changing your workflow

### Tembo Max

Upgrade to Tembo Max for premium features:

- **Unified Access**: Single subscription for all supported coding agents
- **MAX Mode**: Intelligent auto-selection of the best agent/model combination for your task
- **Priority Support**: Get help when you need it

### Cloud & Local Integration

When logged into Tembo:

- **Cloud Tasks**: Start long-running tasks in the cloud
- **Resume Anywhere**: Begin work in the cloud, continue locally (or vice versa)
- **Seamless Sync**: Your context and progress travel with you

### Security & Isolation

- **Local Sandboxing**: Execute code in secure, isolated environments
- **Safe Experimentation**: Test and run code without risking your system

### Thread Sharing / Team Collaboration & Social Coding

Collaborate with your team by sharing coding agent conversations:

- **Share Threads**: Export and share agent conversation threads with teammates
- **Team Collaboration**: Review AI-assisted solutions and learn from each other's approaches
- **Knowledge Transfer**: Preserve context and decision-making process for future reference
- **Async Collaboration**: Team members can view, fork, and continue shared threads
- **Public Developer Profiles**: Showcase your AI-assisted coding activity with a public contribution graph similar to GitHub, displaying your usage across different coding agents and building your portfolio of AI collaboration work

### Coming Soon

- **Git Worktree Support**: Manage multiple branches and workspaces efficiently

## Repository Structure

This is a monorepo managed with [Bun workspaces](https://bun.com/docs/pm/workspaces):

```
tembo/
├── packages/
│   ├── cli/          # Tembo CLI application
│   └── sdk/          # Tembo SDK (coming soon)
├── package.json      # Workspace configuration
└── bun.lock
```

### Development

```bash
# Install all workspace dependencies
bun install

# Run the CLI locally (from the cli package)
cd packages/cli
bun run src/index.tsx
```

## Installation

```bash
# Coming soon
npm install -g tembo
```

## Quick Start

```bash
# Start using Tembo
tembo

# Use a specific agent
tembo --agent claudeCode

# Enable MAX mode (requires Tembo Max subscription)
tembo --max

# Start a cloud task
tembo cloud start

# Resume a cloud task locally
tembo cloud resume <task-id>
```

## Usage

### Basic Commands

```bash
# Interactive mode
tembo

# Run with specific agent
tembo --agent [claudeCode|codex|amp]

# Check status
tembo status

# Login to access cloud features
tembo login
```

### MAX Mode

Let Tembo automatically select the best agent and model for your task:

```bash
tembo --max
```

MAX mode analyzes your request and intelligently routes it to the optimal agent/model combination.

### Cloud Features

```bash
# Start a cloud task
tembo cloud start

# List your cloud tasks
tembo cloud list

# Resume a task locally
tembo cloud resume <task-id>

# Stop a cloud task
tembo cloud stop <task-id>
```

### Sandboxing

```bash
# Enable local sandbox
tembo --sandbox

# Configure sandbox settings
tembo config sandbox
```

### Slack Commands

Switch between agents seamlessly using slash commands in your conversation:

```bash
# Interactive agent selector
/agent

# Switch to Claude Code
/claude-code

# Switch to Codex
/codex

# Switch to Amp
/amp

# Enable MAX mode (auto-selects best agent)
/max
```

Use `/agent` for an interactive selector, or use specific commands to switch directly. Slack commands allow you to change agents mid-conversation without losing context.

## Configuration

Configure Tembo to match your preferences:

```bash
# Set default agent
tembo config set default-agent claude-code

# Configure API keys
tembo config set-key <agent-name> <api-key>

# View current configuration
tembo config list
```

## Subscription Tiers

### Free

- Access to select coding agents
- Local execution
- Basic features

### Tembo Max

- All supported coding agents
- MAX mode with intelligent routing
- Cloud task execution
- Resume tasks across devices
- Priority support

[Subscribe to Tembo Max](https://tembo.ai/max)

## Supported Agents

- Claude Code
- Codex
- Amp
- More coming soon

## Requirements

- Node.js 16+
- Terminal with color support (recommended)

## Documentation

Full documentation available at [https://docs.tembo.io/cli](https://docs.tembo.io/cli)

## Support

- GitHub Issues: [github.com/tembo/tembo-cli/issues](https://github.com/tembo/tembo-cli/issues)
- Discord: [discord.gg/tembo](https://discord.gg/tembo)
- Email: support@tembo.ai

## License

MIT License - see [LICENSE](LICENSE) for details

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

Built with care by the Tembo team
