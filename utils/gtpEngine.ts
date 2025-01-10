import { EventEmitter } from 'events';

export class GTPEngine extends EventEmitter {
  private commands: Map<string, (...args: string[]) => string>;

  constructor() {
    super();
    this.commands = new Map();
    this.setupCommands();
  }

  private setupCommands() {
    this.commands.set('protocol_version', () => '2');
    this.commands.set('name', () => 'MyGoApp');
    this.commands.set('version', () => '1.0');
    this.commands.set('boardsize', (size) => {
      // Implement board size setting
      return '';
    });
    // Add more GTP commands as needed
  }

  public sendCommand(command: string): string {
    const [cmd, ...args] = command.trim().split(' ');
    const handler = this.commands.get(cmd.toLowerCase());

    if (!handler) {
      throw new Error(`Unknown command: ${cmd}`);
    }

    return handler(...args);
  }
}
