/**
 * Status flags for the SSH forwarding container used on MacOS.
 */
enum AgentStatus {
  /**
   * SSH agent container is up and we can interact with it from the shell.
   */
  Running,

  /**
   * The SSH agent container commands were found, but the container isn't running.
   */
  NotRunning,

  /**
   * No SSH agent container management commands are available.
   */
  NotInstalled,
}

export default AgentStatus;
