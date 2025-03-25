# Discord Colored Text Generator

A simple web app that creates Discord-formatted ANSI text. Users can input text, select foreground and background colors using preset swatches, toggle bold/underline styles, and copy the resulting ANSI string for use in Discord messages.

## Features

- **Custom Text Styling:**  
  Toggle bold and underline styles for your text.
- **Color Swatches:**  
  Choose from preset foreground (FG) and background (BG) colors that map to 4-bit ANSI codes.
- **Live Preview:**  
  See a live preview of your styled text.
- **ANSI Code Generation:**  
  Generates a complete ANSI string wrapped in triple backticks (with the `ansi` language marker) that can be copied and pasted into Discord.

## Technologies Used

- **React.js & Next.js** (with client-side rendering)
- **Mantine UI Library:** For responsive layout and pre-styled UI components
- **ANSI Escape Codes:** For text formatting in Discord

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Abhinav-1904/VDAssignment.git
   cd VDAssignment
   ```
2. **Install Dependencies:**
   ```Using npm:
   pnpm install
   ```
3. **Run the Development Server: Using npm:**

   ```
   npm run dev

   ```
