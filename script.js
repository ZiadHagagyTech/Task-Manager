document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const taskName = document.getElementById('taskName').value;
    const taskTime = document.getElementById('taskTime').value;
    const taskNote = document.getElementById('taskNote').value;

    // Add task to the task list table
    addTaskToTable(taskName, taskTime, taskNote);

    // Schedule notification
    scheduleNotification(taskName, taskTime, taskNote);

    // Clear form fields
    document.getElementById('taskName').value = '';
    document.getElementById('taskTime').value = '';
    document.getElementById('taskNote').value = '';
});

function addTaskToTable(name, time, note) {
    const tableBody = document.querySelector('#taskList tbody');

    const row = tableBody.insertRow();
    const nameCell = row.insertCell(0);
    const timeCell = row.insertCell(1);
    const noteCell = row.insertCell(2);
    const actionCell = row.insertCell(3); // New cell for delete button

    nameCell.textContent = name;
    timeCell.textContent = time;
    noteCell.textContent = note;
    
    // Add delete button with Font Awesome icon
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Trash icon
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', function() {
        tableBody.removeChild(row); // Remove the task from the table
    });
    actionCell.appendChild(deleteButton);
}

function scheduleNotification(name, time, note) {
    const now = new Date().getTime();
    const selectedTime = new Date(time).getTime();
    const timeDiff = selectedTime - now;

    if (timeDiff <= 0) {
        alert('Please select a future time for the task!');
        return;
    }

    setTimeout(function() {
        // Notify user when task time arrives
        alert(`Task Name: ${name}\nTask Time: ${time}\nTask Note: ${note}`);
    }, timeDiff);
}
