{ pkgs, ... }:
{
  programs.fzf = {
    enable = true;
    enableBashIntegration = true;
    enableZshIntegration = true;
    enableFishIntegration = true;
  };

  home.packages = [
    pkgs.fzf
  ];
}
