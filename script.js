document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

function addTask() {
    const dateInput = document.getElementById('dateInput').value;
    const taskInput = document.getElementById('taskInput').value;

    if (!dateInput || !taskInput.trim()) {
        alert('Please enter a valid date and task.');
        return;
    }

    const task = {
        date: dateInput,
        text: taskInput,
        completed: false
    };

    saveTask(task);
    addTaskToDOM(task);

    document.getElementById('taskInput').value = '';
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('taskList');

    const taskItem = document.createElement('li');
    if (task.completed) {
        taskItem.classList.add('completed');
    }

    taskItem.innerHTML = `
        <span>${task.date} - ${task.text}</span>
        <div>
            <button onclick="toggleCompleteTask('${task.text}')">Complete</button>
            <button onclick="deleteTask('${task.text}')">Delete</button>
        </div>
    `;

    taskList.appendChild(taskItem);
}

function toggleCompleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    tasks = tasks.filter(task => task.text !== taskText);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}