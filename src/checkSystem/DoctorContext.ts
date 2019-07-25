/**
 * Context shared between `checkSystem()` tasks.
 */
interface DoctorContext {
  /**
   * Does this system have Docker installed?
   */
  hasDocker?: boolean;
}

export default DoctorContext;
