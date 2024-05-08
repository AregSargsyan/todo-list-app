# Todo Application

## Description
This todo application is built using Angular and json-server to simulate a full-stack environment. The application allows users to manage their tasks effectively with features such as adding new tasks, moving tasks between different statuses, and deleting tasks. It leverages drag-and-drop functionality for easy task management and provides a real-time search capability.

## How to Run the Project

To run this Todo application, you will need Node.js and npm installed on your machine. The application uses two main commands: one to start the json-server which serves your `db.json` file on port 3000, and another to run the Angular development server.

### Prerequisites

Make sure you have the following installed:
- Node.js
- npm (usually comes with Node.js)

### Steps to Run

1. **Start the json-server**:
   - This server provides a full fake REST API for your application. Open a terminal and run the following command:
     ```
     json-server --watch db.json --port 3000
     ```
   - This will start the json-server on `http://localhost:3000`.

2. **Start the Angular App**:
   - In a new terminal window, run the Angular development server using:
     ```
     ng serve
     ```
   - Alternatively, if you have a specific npm script set up, you can run:
     ```
     npm run start
     ```
   - This will serve the app on `http://localhost:4200`.

By running these two commands, you are setting up both the backend and frontend parts of the application. Ensure json-server is running before you start the Angular app to avoid any connectivity issues.

### Key Features

- **Task Creation**: Users can quickly add new tasks using a task creation dialog, which captures essential details for each task.

- **Task Categorization**: Tasks can be easily moved between different statuses—postponed, in-progress, or completed—via intuitive drag-and-drop functionality. This helps in effectively managing the lifecycle of each task.

- **Restrictions on Task Movement**: According to the predefined requirements, once tasks are moved to the postponed or completed status, they cannot be moved back to in-progress. This ensures that tasks follow a logical progression towards completion.

- **Search Functionality**: The application includes a search feature that allows users to find tasks by title. This search checks for full equality, ensuring precise and direct results.

- **Bulk Delete Option**: Users have the capability to delete all tasks at once through a dedicated button, making it simple to clear the task list when needed.

- **Progress Visualization**: A progress bar visually represents the distribution of tasks across different statuses, offering a quick overview of personal or team productivity.

- **Enhanced Tooltips**: Each task and the progress bar feature tooltips that provide a brief description or status information, enhancing the user experience by making the application more informative and interactive.

## Technical Details

This Todo application leverages modern web development practices and technologies to ensure efficient performance and maintainability. Here are some of the technical specifics of the implementation:

### Framework and Version

- **Angular 17**: The application is built using Angular 17, the latest version of the popular web application framework. This version brings performance improvements, better developer ergonomics, and more robust type-checking.

### Architecture

- **Component Design**: All components in this application are designed to be singletons.

- **Change Detection**: Each component utilizes the `OnPush` change detection strategy, which significantly reduces the number of checks Angular needs to make. This strategy marks components to be checked only when new references are passed to them or when events occur.

- **Signals for State Management**: For demonstrational purposes, this application incorporates Angular's new signals feature.
