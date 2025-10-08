============================== Frame Annotation Tool - README ========================================
Thank you for using the Frame Annotation Tool. This application is a lightweight, browser-based tool designed for efficient image sequence labeling, particularly for tasks like tracking eye state and face direction.
1. How to Run the Application
To get the application running on your local machine, please follow these steps. You will need Node.js and npm installed.
1. Open the folder with VS Code: Navigate to the project's root directory and open it in Visual Studio Code or your preferred code editor.
2. Open a new terminal: In VS Code, you can open a new terminal by going to Terminal > New Terminal or by using the shortcut Ctrl+`` .
3. Install dependencies: Run the following command in the terminal to install the necessary packages (like React):
npm install

4. Start the development server: Once the installation is complete, start the local development server with this command:
npm run dev

5. Open in browser: The terminal will display a local server link, usually http://localhost:5173/. Click on this link (or copy-paste it into your browser) to open the application.
6. View the web application: The Frame Annotation Tool should now be running in your browser tab, ready for use.
2. Functionalities and Shortcuts
Core Functionalities
   * Frame Uploading: Start by dragging and dropping your image sequence (frames) or clicking to browse files from your local disk. The tool supports selecting multiple images at once.
   * Frame Navigation:
   * Previous: Go back to the previously viewed frame.
   * Skip Frame: Move to the next frame without saving any annotation for the current one.
   * Save & Next: Saves the current annotation and automatically proceeds to the next frame.
   * Annotation System: For each frame, you can assign labels from two distinct categories.
   * Category 1: Eye State: Label whether the subject's eyes are 'Open' or 'Closed'.
   * Category 2: Face Direction: Label the direction the subject's face is pointing ('Up', 'Down', 'Left', 'Right', 'Straight').
   * Light & Dark Theme: A toggle switch in the top-right corner allows you to switch between a bright and a dark user interface for your comfort.
   * Shortcuts Help: A question mark (?) icon next to the theme toggle opens a pop-up window detailing all the available keyboard shortcuts.
Keyboard Shortcuts
   * Navigation:
   * → : Save & Next
   * ← : Previous
   * X : Skip Frame
   * Eye State Labels:
   * E : Open
   * R : Closed
   * Face Direction Labels:
   * W : Up
   * S : Down
   * A : Left
   * D : Right
   * Q : Straight
3. How to Use the Web App (User Guide)
   1. Select Your Frames: When you first launch the app, you will see an upload screen. Drag and drop all the image files you wish to annotate onto the designated area, or click the area to open a file selection dialog and choose them from your local disk.
   2. Start Annotating: Once the frames are loaded, you will be taken to the main annotation screen. The first frame will be displayed.
   3. Label the Frame: On the right side of the screen, you will find the "Label Annotation" panel.
   * Click a button under "Category 1: Eye State" to label the eyes.
   * Click a button under "Category 2: Face Direction" to label the face orientation.
   * You can use the keyboard shortcuts for faster labeling.
   4. Navigate Through Frames: Use the control panel below the image to move through your frames:
   * Click "Save & Next" (or press →) to store the current labels and move to the next image. This is the primary action.
   * Click "Skip Frame" (or press X) if you do not wish to annotate the current image and want to move to the next one.
   * Click "Previous" (or press ←) to return to the last frame you viewed. Your previous annotations are remembered.
   5. Check Your Status: The status box at the bottom of the right-hand panel will tell you if an annotation is "ready to save" or if you still need to select labels.
   6. Customize Your View:
   * Use the sun/moon toggle in the top-right corner to switch between light and dark themes at any time.
   * If you forget the shortcuts, click the question mark (?) icon to see the list.
Happy Annotating!
