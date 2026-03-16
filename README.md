# tembo

## tembo-shell.nix with fzf

Use the local shell setup:

```bash
nix-shell tembo-shell.nix
```

This adds `fzf` and loads bash/zsh bindings and completion in the shell hook.

If you manage your shell with Home Manager, import:

`./tembo-home-manager-fzf.nix`

into your Home Manager configuration to enable:

- `programs.fzf.enable`
- shell integrations for bash/zsh/fish
