// Placeholder for Sticky Notes App logic


const notesContainer = document.getElementById("notesContainer");
const addNoteBtn = document.getElementById("addNoteBtn");

// Function to create a new note
const colorPicker = document.getElementById("colorPicker");

function createNote(content = "", color = "#fffd82") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.contentEditable = "true";
  note.innerText = content;
  note.style.backgroundColor = color;
  

  // Delete on double-click
  note.addEventListener("dblclick", () => {
    note.remove();
    saveNotes();
  });

  // Save on typing
  note.addEventListener("input", () => {
    saveNotes();
  });

  notesContainer.appendChild(note);
  saveNotes();
}


// Save notes to localStorage
function saveNotes() {
  const notes = document.querySelectorAll(".note");
  const data = [];
  notes.forEach(note => {
    data.push({
      text: note.innerText,
      color: note.style.backgroundColor
    });
  });
  localStorage.setItem("stickyNotes", JSON.stringify(data));
}


// Load notes from localStorage
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem("stickyNotes") || "[]");
  savedNotes.forEach(noteData => createNote(noteData.text, noteData.color));
}

// Add note on button click
addNoteBtn.addEventListener("click", () => {
  const selectedColor = colorPicker.value;
  createNote("New Note...", selectedColor);
});


// Load notes when page loads
window.onload = loadNotes;

const darkModeToggle = document.getElementById("darkModeToggle");

// Load saved theme
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark");
  darkModeToggle.innerText = "☀️ Light Mode";
}

// Toggle dark mode
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled");
    darkModeToggle.innerText = "☀️ Light Mode";
  } else {
    localStorage.setItem("darkMode", "disabled");
    darkModeToggle.innerText = "🌙 Dark Mode";
  }
});
//search bar
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const notes = document.querySelectorAll(".note");

  notes.forEach(note => {
    const text = note.innerText.toLowerCase();
    if (text.includes(query)) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
});
