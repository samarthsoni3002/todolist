const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const previousBtn = document.getElementById("previous-btn");

// Load existing tasks from the backend
async function loadTasks() {
  try {
    const res = await fetch("http://localhost:3000/api/tasks");
    const tasks = await res.json();
    taskList.innerHTML = "";
    tasks.forEach(createTaskElement);
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

// Fetch and display all previous tasks from the backend
async function loadPreviousTasks() {
  try {
    const res = await fetch("http://localhost:3000/api/tasks");
    const tasks = await res.json();
    taskList.innerHTML = "";
    tasks.forEach(createTaskElement);
  } catch (error) {
    console.error("Error loading previous tasks:", error);
  }
}

// Create and append task elements to the list
function createTaskElement(task) {
  const li = document.createElement("li");
  li.textContent = task.text;
  if (task.completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    // You can add code here to update task completion in backend if needed.
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.addEventListener("click", async () => {
    // Remove task only from the UI, no request to delete from the backend
    li.remove();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Handle adding new tasks
addBtn.addEventListener("click", async () => {
  const text = taskInput.value.trim();
  if (text) {
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (res.ok) {
        const task = await res.json();
        createTaskElement(task);
        taskInput.value = ""; // Clear the input field
      } else {
        console.error("Failed to add task:", res.statusText);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }
});

// Add event listener for "Previous Tasks" button
previousBtn.addEventListener("click", loadPreviousTasks);

// Load tasks when the page first loads
loadTasks();
