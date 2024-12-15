//----------------------------------------------------------------------------------------------

//BACKGROUND SETTINGS

document.addEventListener("DOMContentLoaded", function() {
    const backgroundOptions = document.querySelectorAll(".background-option");
    const defaultImage = document.getElementById("bg2"); 

    // Set initial background as default
    if (defaultImage) {
        document.body.style.backgroundImage = `url(${defaultImage.src})`;
        defaultImage.classList.add("selected");
    }

    backgroundOptions.forEach((img) => {
        img.addEventListener("click", function() {
            backgroundOptions.forEach((img) => img.classList.remove("selected"));
            this.classList.add("selected");
            document.body.style.backgroundImage = `url(${this.src})`;
        });
    });
});


//----------------------------------------------------------------------------------------------

// SCROLLING (for notes and todo)

function enableDragScroll(element) {
    let isDragging = false;
    let startY;
    let scrollTop;

    // Mouse down event to start dragging
    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = e.pageY - element.offsetTop; // Get the mouse Y position relative to the element
        scrollTop = element.scrollTop; // Store the current scroll position
        element.style.cursor = 'grabbing'; // Change cursor to grabbing
    });

    // Mouse move event to handle dragging
    element.addEventListener('mousemove', (e) => {
        if (!isDragging) return; // If not dragging, exit
        e.preventDefault(); // Prevent text selection
        const y = e.pageY - element.offsetTop; // Current mouse Y position
        const walk = (y - startY) * 1; // Calculate distance moved (2x for sensitivity)
        element.scrollTop = scrollTop - walk; // Scroll the element
    });

    // Mouse up event to stop dragging
    element.addEventListener('mouseup', () => {
        isDragging = false; // Stop dragging
        element.style.cursor = 'grab'; // Reset cursor
    });

    // Mouse leave event to stop dragging if mouse leaves the area
    element.addEventListener('mouseleave', () => {
        isDragging = false; // Stop dragging
        element.style.cursor = 'grab'; // Reset cursor
    });
}

const notesDiv = document.getElementById('notesDiv');
const todoList = document.getElementById('list-container');
enableDragScroll(notesDiv);
enableDragScroll(todoList);

//------------------------------------------------------------------------------------------

//QUOTES

const quotes = [
    " 'Believe you can and you're halfway there.' ",
    " 'Success is not the key to happiness. Happiness is the key to success.' ",
    " 'The only way to do great work is to love what you do.' ",
    " 'You are never too old to set another goal or to dream a new dream.' ",
    " 'Small steps every day lead to big changes over time.' ",
    " 'The harder you work for something, the greater you’ll feel when you achieve it.' ",
    " 'Your future self will thank you for the work you put in today.' ",
    " 'Every hour you dedicate to your work is a step closer to your dreams.' ",
    " 'You don’t have to be great to start, but you have to start to be great.' "
];

const quoteElement = document.getElementById('quote');

function changeQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}
setInterval(changeQuote, 15000);

changeQuote();

//----------------------------------------------------------------------------------------

// MAIN BUTTONS 

const popupToDo = document.getElementById('popup-to-do');
const popupNotes = document.getElementById('popup-notes');

const todoBtn = document.getElementById('to-do-btn');
const notesBtn = document.getElementById('notes-btn');

const topBar = document.getElementById('top-bar');
const timerCont = document.getElementById('container');

const overlayy = document.getElementById('overlay1');

const plusBtn = document.getElementById('plus-btn');
const minusBtn = document.getElementById('minus-btn');
const timerSection = document.querySelector('.container');

// TO DO BUTTON
document.getElementById('to-do-btn').addEventListener('click', function() {

    // Check if the To-Do popup is already open
    if (popupToDo.style.display === 'block') {
        popupToDo.style.display = 'none'; // Close To-Do popup
        todoBtn.classList.remove('active');
    } else {
        popupToDo.style.display = 'block'; // Open To-Do popup
        popupNotes.style.display = 'none'; 
        todoBtn.classList.add('active');
        notesBtn.classList.remove('active');
    }
});

// NOTES BUTTON
document.getElementById('notes-btn').addEventListener('click', function() {
    // Check if the Notes popup is already open
    if (popupNotes.style.display === 'block') {
        popupNotes.style.display = 'none'; 
        notesBtn.classList.remove('active');
    } else {
        popupNotes.style.display = 'block'; 
        popupToDo.style.display = 'none'; 
        notesBtn.classList.add('active');
        todoBtn.classList.remove('active');
    }
});

let isExpanded = false; // Track whether elements are expanded

// Handle Plus Button Click
document.getElementById('plus-btn').addEventListener('click', function () {

    const width = window.innerWidth;
    if (width <= 1500){
        popupToDo.style.transform = 'scale(0.9)';
        popupNotes.style.transform = 'scale(0.9)';
    }
    else{
        popupToDo.style.transform = 'scale(1)';
        popupNotes.style.transform = 'scale(1)';
    }

    // Apply expanded styles
    topBar.classList.add('expanded');
    timerSection.classList.add('expanded');
    overlayy.classList.add('expanded');
    popupToDo.style.display = 'block';
    popupNotes.style.display = 'block';
    todoBtn.style.display = 'none';
    notesBtn.style.display = 'none';
    plusBtn.style.display = 'none';
    minusBtn.style.display = 'block';
    

     timerSection.style.transform = 'scale(1.5)';
     timerSection.style.transition = 'transform 0.5s';

    quoteElement.classList.add('top');

    isExpanded = true; // Set expanded state
});

// Handle Minus Button Click
document.getElementById('minus-btn').addEventListener('click', function () {
   

    popupToDo.style.transform = 'scale(1)';
    popupNotes.style.transform = 'scale(1)';

    // Reset styles
    topBar.classList.remove('expanded');
    timerSection.classList.remove('expanded');
    overlayy.classList.remove('expanded');
    popupToDo.style.display = 'none';
    popupNotes.style.display = 'none';
    todoBtn.style.display = 'block';
    notesBtn.style.display = 'block';
    plusBtn.style.display = 'block';
    minusBtn.style.display = 'none';
    timerSection.style.transform = 'scale(1)';
    timerSection.style.transition = 'transform 0.5s';
    quoteElement.classList.remove('top');


    isExpanded = false; // Reset expanded state
});


// Handle Screen Resize for Media Queries
window.addEventListener('resize', function () {
    const width = window.innerWidth;
    //const notesContainer = document.getElementById('popup-notes');

    if (width <= 1350 && isExpanded == true){
        popupToDo.style.transform = 'scale(0.9)';
        popupToDo.style.transition = 'transform 0.5s';
        popupNotes.style.transform = 'scale(0.9)';
        popupNotes.style.transition = 'transform 0.5s';
    }
    if (width > 1350 && isExpanded == true){
        popupToDo.style.transform = 'scale(1)';
        popupToDo.style.transition = 'transform 0.5s';
        popupNotes.style.transform = 'scale(1)';
        popupNotes.style.transition = 'transform 0.5s';
    }

    if (width <= 1200) {
        topBar.classList.remove('expanded');
        timerSection.classList.remove('expanded');
        overlayy.classList.remove('expanded');
        
        todoBtn.style.display = 'block';
        notesBtn.style.display = 'block';
        plusBtn.style.display = 'none';
        minusBtn.style.display = 'none';
        timerSection.style.transform = 'scale(1.5)';
        quoteElement.classList.remove('top');
        if (isExpanded) {
            popupToDo.style.display = 'none';
            popupNotes.style.display = 'none';
        }

        isExpanded = false; 

    } else if (width > 1200) {
        // Show the correct button based on the expanded state
        if (isExpanded) {
            plusBtn.style.display = 'none';
            minusBtn.style.display = 'block';
        } else {
            plusBtn.style.display = 'block';
            minusBtn.style.display = 'none';
            timerSection.classList.remove('expanded');
            timerSection.style.transform = 'scale(1)';
        }
    }
});

//---------------------------------------------------------------------------------------------

// UPDATE AUDIO SOURCE 

function updateAudioSource() {
    // Get the audio element and the dropdown selection
    const backgroundSound = document.getElementById('audio');
    const selectedSound = document.getElementById('audio-selection').value;

    backgroundSound.src = selectedSound;
    backgroundSound.load();

    console.log(`Notification sound changed to: ${selectedSound}`);
}

const audioElement = document.getElementById('audio');
const volumeControl = document.getElementById('volume-control');

// Set the initial volume (matches the slider's initial value)
audioElement.volume = volumeControl.value;

// Update the volume when the slider value changes
volumeControl.addEventListener('input', (event) => {
    audioElement.volume = event.target.value;
});

//----------------------------------------------------------------------------------------------

// BACKGROUND MUSIC

const playMusicBtn = document.getElementById('play-music-btn');
const audio = document.getElementById('audio');
const volume = document.getElementById('volume-control');

playMusicBtn.addEventListener('click', () => {
    if (audio.paused) {    
        audio.play().then(() => {
            playMusicBtn.classList.remove('crossed-off'); // Remove cross-off style       
            console.log("Audio started playing.");
        }).catch(error => {
            console.error("Playback error:", error);
            alert("Autoplay blocked or another issue occurred. Please interact with the page first.");
        });
    } else {
        audio.pause();
        playMusicBtn.classList.add('crossed-off'); // Add cross-off style
       // volumeControl.value = 0;
        console.log("Audio paused.");
    }
});


//POMODORO TIMER
let workTitle = document.getElementById('work');
let shortBreakTitle = document.getElementById('shortBreak');
let longBreakTitle = document.getElementById('longBreak');

let workTime = 25;  // Work duration in minutes
let shortBreakTime = 5;  // Short break duration in minutes
let longBreakTime = 15;  // Long break duration in minutes

let seconds = 0;
let interval;
let pomodoroSessionsCount = 0;
let breakCount = 0;
let workMinutes;  // Store remaining minutes for resuming


// Load saved count and last date from localStorage
function loadPomodoroCount() {
    const savedCount = localStorage.getItem('pomodoroCount');
    const savedDate = localStorage.getItem('lastUpdatedDate');
    const currentDate = new Date().toISOString().split('T')[0];

    if (savedDate === currentDate) {
        pomodoroSessionsCount = parseInt(savedCount) || 0;
    } else {
        // Reset count if the day has changed
        pomodoroSessionsCount = 0;
        localStorage.setItem('pomodoroCount', 0);
        localStorage.setItem('lastUpdatedDate', currentDate);
    }

    updatePomodoroCountDisplay();
}

// Save the count to localStorage
function savePomodoroCount() {
    const currentDate = new Date().toISOString().split('T')[0];
    localStorage.setItem('pomodoroCount', pomodoroSessionsCount);
    localStorage.setItem('lastUpdatedDate', currentDate);
}

// Update the displayed Pomodoro count
function updatePomodoroCountDisplay() {
    document.getElementById('pomodoro-count').textContent = pomodoroSessionsCount;
}

// Increment the Pomodoro count after a session and update display
function endWorkSession() {
    pomodoroSessionsCount++;
    updatePomodoroCountDisplay();
    savePomodoroCount();
}

// Load count on page load
window.onload = () => {
    loadPomodoroCount();

    document.getElementById('minutes').innerHTML = workTime < 10 ? '0' + workTime : workTime;
    document.getElementById('seconds').innerHTML = "00";
    workTitle.classList.add('active');

    document.getElementById('start').style.display = "block";  
    document.getElementById('resume').style.display = "none"; 
    document.getElementById('reset').style.display = "none";  
    document.getElementById('stop').style.display = "none";  
};


document.getElementById('save-settings-btn').addEventListener('click', function() {

    workTime = parseInt(document.getElementById('workingTime').value);
    shortBreakTime = parseInt(document.getElementById('shortBreakChosenTime').value);
    longBreakTime = parseInt(document.getElementById('longBreakChosenTime').value);
    resetTimer();
    //updateAudioSource();
});




function updateNotificationSound() {
    // Get the audio element and the dropdown selection
    const notificationSound = document.getElementById('notification-sound');
    const selectedSound = document.getElementById('notification-sound-selection').value;

    // Update the source of the audio element
    notificationSound.src = selectedSound;

    // Preload the new sound
    notificationSound.load();
    notificationSound.play();
    console.log(`Notification sound changed to: ${selectedSound}`);
}

function playNotificationSound() {
    const notificationSound = document.getElementById('notification-sound');
    notificationSound.play().catch(error => {
        console.error("Error playing notification sound:", error);
    });
}

function start() {
    document.getElementById('start').style.display = "none";
    document.getElementById('resume').style.display = "none";
    document.getElementById('reset').style.display = "block";
    document.getElementById('stop').style.display = "block";

    seconds = 59;  // Start with 59 seconds

    workMinutes = workTime - 1;  // Set work time minutes based on updated settings
    let shortBreakMinutes = shortBreakTime - 1;  // Updated short break time
    let longBreakMinutes = longBreakTime - 1;  // Updated long break time

    interval = setInterval(() => {
        document.getElementById('minutes').innerHTML = workMinutes < 10 ? '0' + workMinutes : workMinutes;
        document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;

        seconds--;

        if (seconds < 0) {
            seconds = 59;
            workMinutes--;

            if (workMinutes < 0) {

              //  clearInterval(interval);
                playNotificationSound(); // Play notification sound


                if (breakCount === 0 || breakCount === 2 || breakCount === 4) {
                    shortBreakTitle.classList.add('active');
                    workTitle.classList.remove('active');
                    workMinutes = shortBreakMinutes;
                    breakCount++;
                    endWorkSession();
                } else if (breakCount === 6) {
                    longBreakTitle.classList.add('active');
                    shortBreakTitle.classList.remove('active');
                    workTitle.classList.remove('active');
                    workMinutes = longBreakMinutes;
                    breakCount++;
                    endWorkSession();
                } else if (breakCount === 7) {
                    longBreakTitle.classList.remove('active');
                    workTitle.classList.add('active');
                    workMinutes = workTime - 1;
                    breakCount = 0;
                } else {
                    workTitle.classList.add('active');
                    shortBreakTitle.classList.remove('active');
                    workMinutes = workTime - 1;
                    breakCount++;
                }
            }
        }
    }, 1000); // Update every second
}

function resetTimer() {
    clearInterval(interval);
    workMinutes = workTime - 1;  // Use updated work time
    seconds = 0;
    document.getElementById('minutes').innerHTML = workTime < 10 ? '0' + workTime : workTime;
    document.getElementById('seconds').innerHTML = "00";
    
    workTitle.classList.add('active');
    shortBreakTitle.classList.remove('active');
    longBreakTitle.classList.remove('active');
    document.getElementById('start').style.display = "block";
    document.getElementById('reset').style.display = "none";
    document.getElementById('stop').style.display = "none";
    document.getElementById('resume').style.display = "none";
}

// Stop the timer
function stopTimer() {
    clearInterval(interval); // Stop the countdown
    document.getElementById('start').style.display = "none"; // Show start button again
    document.getElementById('resume').style.display = "block"; // Keep reset visible
    document.getElementById('reset').style.display = "block"; // Keep reset visible
    document.getElementById('stop').style.display = "none"; // Keep reset visible
  
}

// Resume the timer
function resumeTimer() {
    document.getElementById('start').style.display = "none"; // Hide start button
    document.getElementById('resume').style.display = "none"; // Hide resume button
    document.getElementById('reset').style.display = "block"; // Keep reset visible
    document.getElementById('stop').style.display = "block"; // Show stop button

    // Start the timer with the remaining time
    interval = setInterval(() => {
        document.getElementById('minutes').innerHTML = workMinutes < 10 ? '0' + workMinutes : workMinutes;
        document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;

        seconds--;

        if (seconds < 0) {
            seconds = 59;
            workMinutes--;

            // Switch to break or long break after a work session
            if (workMinutes < 0) {
                if (breakCount === 0 || breakCount === 2 || breakCount === 4) {
                    // Short break
                    shortBreakTitle.classList.add('active');
                    workTitle.classList.remove('active');
                    workMinutes = shortBreakTime - 1;  // Reset for short break
                    breakCount++;
                } else if (breakCount === 6) {
                    // Long break after 4 work sessions
                    longBreakTitle.classList.add('active');
                    shortBreakTitle.classList.remove('active');
                    workMinutes = longBreakTime - 1;  // Reset for long break
                    breakCount++;
                } else if (breakCount === 7) {
                    // Restart cycle after long break
                    longBreakTitle.classList.remove('active');
                    workTitle.classList.add('active');
                    workMinutes = workTime - 1;  // Reset for next work session
                    breakCount = 0;
                } else {
                    // Start new work session
                    workTitle.classList.add('active');
                    shortBreakTitle.classList.remove('active');
                    workMinutes = workTime - 1;  // Reset for next work session
                    breakCount++;
                    pomodoroSessionsCount++;
                }
            }
        }
    }, 1000); // Update every second
}



//-------------------------------------------------------------------------------------

//TO-DO LIST 


const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value !== ''){
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputBox.value = "";
    saveData();
}

// Add task on Enter key press
inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { 
        addTask();
    }
});


listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
    else if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        saveData();
    }

}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();


//-------------------------------------------------------------------------------------
//NOTES

const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

let note = document.querySelectorAll(".input-box");
const createButton = document.getElementById("createBtn");

function createNote(){
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "img/trash.png";

    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    applyAlternatingColors(document.querySelectorAll(".input-box"));

     // Prevent Enter key behavior
     inputBox.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default behavior of Enter key
        }
    });

    inputBox.onkeyup = function() {
        saveNotesData();
    }
}

// Function to apply alternating colors to notes
function applyAlternatingColors(notes) {
   // const notes = document.querySelectorAll(".input-box");
    notes.forEach((note, index) => {
        if (index % 2 === 0) {
            note.classList.add("note-even");
            note.classList.remove("note-odd");
        } else {
            note.classList.add("note-odd");
            note.classList.remove("note-even");
        }
    });
}

notesContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        saveNotesData();
    }
    else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function(){
                saveNotesData();
            }
        })
    }
})


function saveNotesData(){
    localStorage.setItem("notesData", notesContainer.innerHTML);
}

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notesData");
}

showNotes();

function clearAllNotes() {
    // Clear localStorage for notesData
    localStorage.removeItem("notesData");
    // Clear the notes container in the UI
    notesContainer.innerHTML = ""; // This will remove all displayed notes
}


//-------------------------------------------------------------------------

//SETTINGS 

// Get the elements
const settingsBtn = document.getElementById('settings-btn');
const settingsPopup = document.getElementById('settingsOverlay');
const closePopupBtn = document.getElementById('close-popup');

// Function to open the settings popup
settingsBtn.addEventListener('click', () => {
    settingsPopup.style.display = 'block'; // Show the popup

});

// Function to close the settings popup
closePopupBtn.addEventListener('click', () => {
    settingsPopup.style.display = 'none'; // Hide the popup
});

//--------------------------------------------------------------------------------

//INFO 

document.addEventListener('DOMContentLoaded', () => {
    const infoBtn = document.getElementById('information-btn');
    const infoPopup = document.getElementById('infoOverlay');
    const closePopupBtnInfo = document.getElementById('close-popup-info');

    // Open popup
    infoBtn.addEventListener('click', () => {
        infoPopup.style.display = 'block';
    });

    // Close popup
    closePopupBtnInfo.addEventListener('click', () => {
        infoPopup.style.display = 'none';
    });
});



