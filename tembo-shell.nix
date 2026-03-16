{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  packages = with pkgs; [
    fzf
  ];

  shellHook = ''
    # Provide fzf keybindings/completion without requiring Home Manager.
    if [ -n "$BASH_VERSION" ]; then
      [ -f "${pkgs.fzf}/share/fzf/key-bindings.bash" ] && source "${pkgs.fzf}/share/fzf/key-bindings.bash"
      [ -f "${pkgs.fzf}/share/fzf/completion.bash" ] && source "${pkgs.fzf}/share/fzf/completion.bash"
    elif [ -n "$ZSH_VERSION" ]; then
      [ -f "${pkgs.fzf}/share/fzf/key-bindings.zsh" ] && source "${pkgs.fzf}/share/fzf/key-bindings.zsh"
      [ -f "${pkgs.fzf}/share/fzf/completion.zsh" ] && source "${pkgs.fzf}/share/fzf/completion.zsh"
    fi
  '';
}
