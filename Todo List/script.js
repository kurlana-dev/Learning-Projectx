// Display current date
function displayCurrentDate() {
    // Create a new Date object (gets current date/time)
    const today = new Date();
    
    // Get date parts and format them with leading zeros
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = today.getFullYear();
    
    // Combine into DD/MM/YYYY format
    const formattedDate = `${day}/${month}/${year}`;
    
    // Update the HTML element with id "currentDate"
    document.getElementById('currentDate').textContent = formattedDate;
}

// Array to store all tasks
let tasks = [];

// Toggle the add task form visibility
function toggleAddForm() {
    // Get the form element
    const form = document.getElementById('addTaskForm');
    
    // Toggle the 'show' class (add if missing, remove if present)
    form.classList.toggle('show');
    
    // If form is now visible, focus on the input field
    if (form.classList.contains('show')) {
        document.getElementById('taskInput').focus();
    }
}

// Add a new task
function addTask() {
    // Get the input element and its value
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim(); // Remove extra spaces
    
    // Only add if text isn't empty
    if (taskText) {
        // Add new task to the tasks array
        tasks.push({
            id: Date.now(),           // Unique ID using timestamp
            text: taskText,            // The task description
            completed: false           // Not completed yet
        });
        
        // Clear the input
        input.value = '';
        
        // Hide the form
        toggleAddForm();
        
        // Update the display
        renderTasks();
    }
}

// Delete a specific task
function deleteTask(id) {
    // Keep all tasks that DON'T have this id
    tasks = tasks.filter(task => task.id !== id);
    renderTasks(); // Update display
}

// Delete all completed tasks
function deleteCompletedTasks() {
    // Keep only tasks that are NOT completed
    tasks = tasks.filter(task => !task.completed);
    renderTasks(); // Update display
}

// Toggle task completion status
function toggleComplete(id) {
    // Go through each task
    tasks = tasks.map(task => {
        // If this task has the matching id
        if (task.id === id) {
            // Return a new task with completed toggled
            return {...task, completed: !task.completed};
        }
        // Otherwise return the task unchanged
        return task;
    });
    renderTasks(); // Update display
}

// Display all tasks in the HTML
function renderTasks() {
    // Get the task list container
    const taskList = document.getElementById('taskList');
    
    // If no tasks, show empty state message
    if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-state">No tasks yet. Click "Add Task" to get started!</div>';
        return;
    }
    
    // Create HTML for each task and join into one string
    taskList.innerHTML = tasks.map(task => `
        <div class="task-item">
            <input type="checkbox" 
                   ${task.completed ? 'checked' : ''} 
                   onchange="toggleComplete(${task.id})">
            <span class="task-text" style="${task.completed ? 'text-decoration: line-through; color: #999;' : ''}">
                ${task.text}
            </span>
            <button class="delete-task" onclick="deleteTask(${task.id})">✕</button>
        </div>
    `).join('');
}

// Initialize the app when page loads
// Set up example tasks
tasks = [
    { id: 1, text: 'Add Task', completed: false },
    { id: 2, text: 'Delete Task', completed: false }
];

// Show today's date
displayCurrentDate();

// Display the tasks
renderTasks();