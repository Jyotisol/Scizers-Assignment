=== Task Management App README ===

Task Management App
This is a Task Management Application built using React, TypeScript, and Ant Design. It provides a user-friendly interface to manage tasks efficiently with features such as adding, editing, and deleting tasks.

Features
Core Features:
1. Task Creation:

Add new tasks with a title, priority, due date, and status  toggle.
User-friendly form with validation messages for required fields.

2. Task List Display:

Displays all tasks in a clean, organized table layout.
Shows task details, including title, priority, due date, and status.

3. Task Management:

Edit task details directly within the table.
Delete tasks with a single action.

4. API Integration:

Fetches tasks from a mock API to simulate real-world data flow.
Seamlessly updates the task list without page refresh.

5. Notifications:

Provides success and error notifications for user actions using Ant Design's notification system.

===Tech Stack==
.Frontend Framework: React (with TypeScript)
.UI Library: Ant Design
.State Management: React hooks (useState, useEffect)
.Styling: Inline CSS for styling customization
.Mock API Integration: Fetches tasks dynamically

===Project Structure===


src/
├── api/
│   └── taskApi.ts        # API functions for fetching tasks
├── components/
│   ├── TaskForm.tsx      # Form component to add tasks
│   ├── TaskTable.tsx     # Table component to display and manage tasks
│   └── TaskList.tsx      # Main component managing the entire task flow
├── types/
│   └── Task.ts           # Type definitions for the Task object
├── App.tsx               # Entry point for the app
└── index.tsx             # Renders the app to the DOM

=== Installation ===

Clone the repository:

.Copy code
git clone https://github.com/your-username/task-management-app.git

.Navigate to the project directory:

Copy code
cd task-management-app

.Install dependencies:

Copy code
npm install

.Start the development server:

Copy code
npm start


.Open the app in your browser:

Copy code
http://localhost:3000

.Use the form to add new tasks by providing the required details.
.View and manage tasks directly in the task table.
Screenshots
Task Form:![alt text](<src/asests/Screenshot 2024-12-12 180207.png>)

Task List

===Future Enhancements===
1.Search and Filter:
Add options to filter tasks by priority or due date.
2.Backend Integration:
Connect the app to a real backend for persistent data storage.
3.Mobile Responsiveness:
Enhance the UI for better usability on smaller screens.
4.Drag and Drop:
Enable drag-and-drop functionality for reordering tasks.


