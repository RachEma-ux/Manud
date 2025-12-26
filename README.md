# Simple Chat Bot

A responsive React chatbot application with JSON export/import functionality, built with Tailwind CSS and Lucide icons.

## Features

- **Interactive Chat Interface**: Send and receive messages with a clean, modern UI
- **Responsive Design**: Adapts to different screen sizes (mobile, tablet, desktop) using the Responsiveness Framework V3
- **JSON Export**: Export your entire chat history to a JSON file with metadata
- **JSON Import**: Import previously exported chat sessions
- **JSON Preview**: View a preview of your chat data in JSON format
- **Model Selection**: Toggle between different AI models (simulated)
- **Auto-growing Input**: Message input automatically expands as you type
- **Message Timestamps**: All messages include timestamps
- **Multiple Themes**: Dark theme interface for comfortable viewing

## Screenshots

### Main Interface
The chatbot features a full-screen interface with:
- Header showing model count and message statistics
- Scrollable message area with user and assistant bubbles
- Toolbar with quick actions (New Chat, Models, Export, Import, Settings, Presets)
- Pill-shaped input area with attachment, connector, voice, and send buttons

### JSON Features
- **Export**: Downloads chat data as a formatted JSON file
- **Import**: Restores chat from a previously exported JSON file
- **Preview**: View JSON structure in a modal before exporting

## Technologies Used

- **React 18**: UI framework
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Responsiveness Framework V3**: Custom hook for responsive dimensions

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Claude
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## Usage Guide

### Starting a Conversation

1. Click the **"Models"** button to select models (toggles between 0 and 3 models)
2. Type your message in the input field
3. Press the **Send** button (arrow up icon) or hit Enter to send

### Exporting Chat History

1. Click the **Download** button (green icon) in the toolbar
2. A JSON file will be automatically downloaded with your chat history
3. The file includes all messages, metadata, and timestamps

### Importing Chat History

1. Click the **Upload** button (purple icon) in the toolbar
2. Select a previously exported JSON file
3. Your chat history will be restored

### Viewing JSON Preview

1. Click the **Settings** button (gear icon)
2. Select **"JSON Preview"** from the menu
3. View the JSON structure of your current chat
4. You can export from this modal as well

### Creating a New Chat

1. Click the **Plus** (+) button in the toolbar, or
2. Click the **Menu** button and select **"New Chat"**

## Project Structure

```
Claude/
├── public/              # Static files
├── src/
│   ├── App.jsx         # Main App component
│   ├── SimpleChatBot.jsx   # Chatbot component
│   ├── useResponsive.js    # Responsive dimensions hook
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles with Tailwind
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── README.md          # This file
```

## Component Architecture

### SimpleChatBot Component
The main chatbot component that manages:
- Message state
- Model selection
- JSON export/import functionality
- UI modals (Settings, Presets, JSON Preview)
- Auto-scrolling to latest messages
- Textarea auto-growth

### useResponsive Hook
Custom hook that provides responsive dimensions based on screen size:
- Automatically adjusts button sizes, gaps, font sizes
- Optimizes for mobile (< 768px), small mobile (< 480px), and large desktop (> 1440px)
- Returns `isMobile` flag and `dimensions` object

### Button Component
Reusable button component with variants:
- Default: Gray background with border
- Ghost: Transparent background with hover effect

### ChatBubble Component
Message display component with:
- Different styling for user vs assistant messages
- Message content with line breaks
- Timestamp display

## JSON Data Structure

Exported JSON files contain:

```json
{
  "version": "1.0",
  "exportDate": "ISO timestamp",
  "metadata": {
    "totalMessages": number,
    "selectedModels": number,
    "framework": "Responsiveness Framework V3",
    "testPurpose": "JSON file creation test"
  },
  "messages": [
    {
      "id": "string",
      "content": "string",
      "role": "user" | "assistant",
      "timestamp": "ISO timestamp"
    }
  ],
  "dimensions": {
    "screenWidth": number,
    "currentDimensions": { ... }
  }
}
```

## Customization

### Changing Colors

Edit the Tailwind classes in `SimpleChatBot.jsx`:
- User messages: `bg-blue-600` (line 66)
- Assistant messages: `bg-gray-800` (line 66)
- Background: `bg-gray-950` (line 307)

### Adjusting Responsive Breakpoints

Modify the breakpoints in `useResponsive.js`:
- Mobile: `width < 768`
- Small mobile: `width < 480`
- Large desktop: `width > 1440`

### Changing AI Response Delay

Adjust the timeout in the `handleSend` function (line 149):
```javascript
setTimeout(() => { ... }, 800); // Change 800 to your preferred delay in ms
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations

- AI responses are simulated (not connected to a real AI service)
- No authentication or user management
- Chat history is not persisted (except via JSON export)
- No real-time collaboration features

## Future Enhancements

- [ ] Connect to real AI API (OpenAI, Anthropic, etc.)
- [ ] Add local storage persistence
- [ ] Implement multiple chat sessions
- [ ] Add message editing and deletion
- [ ] Support for markdown in messages
- [ ] File attachment support
- [ ] Voice input functionality
- [ ] Custom theme editor
- [ ] Message search functionality

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

Built with ❤️ using React, Vite, and Tailwind CSS
