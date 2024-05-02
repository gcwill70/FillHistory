export interface Command {
  /** Optional. The name of the Extension Command  */
  name?: string | undefined;
  /** Optional. The Extension Command description  */
  description?: string | undefined;
  /** Optional. The shortcut active for this command, or blank if not active.  */
  shortcut?: string | undefined;
}
