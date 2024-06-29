# Visual Studio Code

Visual Studio Code is a lightweight but powerful source code editor that runs on your desktop and is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages and runtimes.

## Features

### Core Editor Features
- **IntelliSense**: Smart code completion, parameter hints, quick info, and member lists
- **Debugging**: Built-in debugging support with breakpoints, call stacks, and an interactive console
- **Git Integration**: Source control management with Git commands built right into the editor
- **Extensions**: Thousands of extensions to add languages, themes, debuggers, and connect to additional services

### Language Support
VS Code includes built-in support for:
- **JavaScript & TypeScript**: Advanced editing, debugging, and refactoring
- **Python**: Syntax highlighting, IntelliSense, linting, and debugging
- **C/C++**: Comprehensive language support with IntelliSense
- **Java**: Rich Java language support with debugging capabilities
- **HTML/CSS**: Web development with Emmet support
- **Markdown**: Rich markdown editing with live preview
- **JSON**: Schema validation and IntelliSense
- **And many more**: Go, Rust, PHP, Ruby, C#, PowerShell, Shell scripts, and more

### Developer Tools
- **Integrated Terminal**: Full terminal access within the editor
- **Task Runner**: Automate build tasks and external tools
- **Multi-root Workspaces**: Work with multiple project folders simultaneously
- **Settings Sync**: Synchronize settings, keybindings, and extensions across devices
- **Live Share**: Real-time collaborative development
- **Remote Development**: Edit code on remote machines, containers, or WSL

## Technologies

### Core Technologies
- **Electron**: Cross-platform desktop application framework
- **TypeScript**: Primary development language
- **Node.js**: Runtime environment for extensions and tools
- **Monaco Editor**: The code editor that powers VS Code
- **Rust**: Performance-critical components including the CLI

### Build System
- **Gulp**: Task automation and build system
- **Webpack**: Module bundler for extensions
- **ESBuild**: Fast JavaScript bundler
- **TypeScript Compiler**: Type checking and compilation

### Extension Ecosystem
- **Language Servers**: Protocol for language intelligence features
- **Debug Adapter Protocol**: Standardized debugging interface
- **Webviews**: Custom UI components using HTML/CSS/JavaScript
- **Tree Sitter**: Syntax highlighting and parsing

## Installation

### Prerequisites
- **Node.js**: Version 22.x or higher
- **Python**: Version 3.11+ (for native module compilation)
- **Git**: Latest version
- **C++ Build Tools**: Platform-specific compilers

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/microsoft/vscode.git
   cd vscode
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run compile
   ```

4. **Run VS Code**
   ```bash
   ./scripts/code.sh  # Linux/macOS
   .\scripts\code.bat # Windows
   ```

### Platform-Specific Requirements

#### Windows
- **Visual Studio Build Tools**: C++ compiler and Windows SDK
- **Python**: Install from Microsoft Store or python.org

#### macOS
- **Xcode Command Line Tools**: `xcode-select --install`
- **Homebrew**: Package manager for additional dependencies

#### Linux
- **Build Essential**: `sudo apt-get install build-essential`
- **Additional Libraries**: libx11-dev, libxkbfile-dev, libsecret-1-dev

## Usage

### Development Workflow

1. **Watch Mode**: Automatically rebuild on changes
   ```bash
   npm run watch
   ```

2. **Run Tests**
   ```bash
   npm run test          # Unit tests
   npm run test-browser  # Browser tests
   npm run smoketest     # Integration tests
   ```

3. **Extension Development**
   ```bash
   npm run watch-extensions  # Watch extension changes
   ```

### Building Extensions

Extensions are located in the `extensions/` directory. Each extension contains:
- `package.json`: Extension manifest and dependencies
- `src/`: TypeScript source code
- `syntaxes/`: TextMate grammar files
- `themes/`: Color themes and icon themes

### Remote Development

VS Code supports remote development through:
- **Remote - SSH**: Connect to remote machines
- **Remote - Containers**: Develop inside Docker containers
- **Remote - WSL**: Windows Subsystem for Linux integration

## Architecture

### Core Components

#### Editor Core (`src/vs/editor/`)
- **Monaco Editor**: Standalone code editor
- **Language Services**: IntelliSense, validation, formatting
- **Text Model**: Document representation and operations

#### Workbench (`src/vs/workbench/`)
- **Activity Bar**: Primary navigation
- **Side Bars**: Explorer, Search, Source Control, Extensions
- **Panel**: Terminal, Problems, Output, Debug Console
- **Editor Groups**: Tabbed editor interface

#### Platform (`src/vs/platform/`)
- **Configuration**: Settings and preferences
- **Keybinding**: Keyboard shortcuts
- **Commands**: Command palette and execution
- **Storage**: Persistent data management

#### Base (`src/vs/base/`)
- **Common Utilities**: Shared functionality
- **Lifecycle Management**: Application lifecycle
- **Event System**: Pub/sub messaging

### Extension System

Extensions run in separate processes and communicate through:
- **Extension Host**: Manages extension lifecycle
- **IPC Protocol**: Inter-process communication
- **API Surface**: VS Code extension API

## Configuration

### User Settings
Settings are stored in JSON format and can be configured at:
- **Global**: `~/.vscode/settings.json`
- **Workspace**: `.vscode/settings.json`
- **Folder**: Per-folder settings

### Keybindings
Custom keybindings in `keybindings.json`:
```json
{
  "key": "ctrl+shift+p",
  "command": "workbench.action.showCommands"
}
```

### Tasks
Automate builds and tools with `tasks.json`:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "build",
      "type": "shell",
      "command": "npm run compile"
    }
  ]
}
```

## Contributing

### Development Scripts
- `npm run compile`: Build the application
- `npm run watch`: Watch mode for development
- `npm run test`: Run test suite
- `npm run precommit`: Pre-commit checks

### Code Organization
- **Layer Architecture**: Common, Browser, Node, Electron layers
- **Import Restrictions**: ESLint rules enforce architectural boundaries
- **Type Safety**: Comprehensive TypeScript coverage

### Extension Development
- Extensions use the VS Code API
- Language servers implement the Language Server Protocol
- Debug adapters use the Debug Adapter Protocol

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) file for details.

## Community

- **GitHub Issues**: Report bugs and request features
- **GitHub Discussions**: Community discussions and questions
- **Stack Overflow**: Tag questions with `visual-studio-code`
- **Discord**: Real-time community chat

---

**Note**: This is the open-source version of Visual Studio Code. The Microsoft-branded version includes additional features and telemetry.