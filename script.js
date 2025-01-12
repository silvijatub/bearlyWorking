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

const title = document.querySelector('.top-bar-title');

//----------------------------------------------------------------------------------------

// MAIN BUTTONS 


//Pop-up todo and notes toggle
function togglePopup(button, popup, otherButton, otherPopup) {
    if (popup.style.display === 'block') {
        popup.style.display = 'none';
        button.classList.remove('active');
    } else {
        popup.style.display = 'block';
        otherPopup.style.display = 'none';
        button.classList.add('active');
        otherButton.classList.remove('active');
    }
}

document.getElementById('to-do-btn').addEventListener('click', function() {
    togglePopup(todoBtn, popupToDo, notesBtn, popupNotes);
});

document.getElementById('notes-btn').addEventListener('click', function() {
    togglePopup(notesBtn, popupNotes, todoBtn, popupToDo);
});



let isExpanded = false; // Track whether elements are expanded

// Handles plus button click
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
    title.classList.add('expanded');

    popupToDo.style.display = 'block';
    popupNotes.style.display = 'block';
    todoBtn.style.display = 'none';
    notesBtn.style.display = 'none';
    plusBtn.style.display = 'none';
    minusBtn.style.display = 'block';
    popupNotes.style.backgroundColor = 'rgba(31, 48, 38, 0)';
    popupToDo.style.backgroundColor = 'rgba(31, 48, 38, 0)';
    timerSection.style.transform = 'scale(1.5)';
    timerSection.style.transition = 'transform 0.5s';
    quoteElement.classList.add('top');

    isExpanded = true; // Set expanded state
    });

    // Handles minus button click
    document.getElementById('minus-btn').addEventListener('click', function () {
   
    title.classList.remove('expanded');

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
    popupNotes.style.backgroundColor = 'rgba(31, 48, 38, 0.685)';
    popupToDo.style.backgroundColor = 'rgba(31, 48, 38, 0.685)';
    quoteElement.classList.remove('top');

    isExpanded = false; // Reset expanded state
});


// Handles scren resize 
window.addEventListener('resize', function () {
    const width = window.innerWidth;

    if (width <= 1350 && isExpanded == true){
        popupToDo.style.transform = 'scale(0.9)';
        popupToDo.style.transition = 'transform 0.5s';
        popupNotes.style.transform = 'scale(0.9)';
        popupNotes.style.transition = 'transform 0.5s';
        title.classList.add('expanded');
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
        title.classList.remove('expanded');
        todoBtn.style.display = 'block';
        notesBtn.style.display = 'block';
        plusBtn.style.display = 'none';
        minusBtn.style.display = 'none';
        timerSection.style.transform = 'scale(1.5)';
        quoteElement.classList.remove('top');
  
        popupToDo.style.transition = 'transform 0.5s';
        popupNotes.style.transition = 'transform 0.5s';
        if (isExpanded) {
            popupToDo.style.display = 'none';
            popupNotes.style.display = 'none';
            popupNotes.style.backgroundColor = 'rgba(31, 48, 38, 0.685)';
            popupToDo.style.backgroundColor = 'rgba(31, 48, 38, 0.685)';
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
            title.classList.remove('expanded');
            timerSection.style.transform = 'scale(1)';
            popupToDo.style.transition = 'transform 0.5s';
            popupNotes.style.transition = 'transform 0.5s';
        }
    }
});

//---------------------------------------------------------------------------------------------

// UPDATE AUDIO SOURCE 

const playMusicBtn = document.getElementById('play-music-btn');
const audio = document.getElementById('audio');
const volume = document.getElementById('volume-control');

function updateAudioSource() {
    // Get the audio element and the dropdown selection
    const selectedSound = document.getElementById('audio-selection').value;

    audio.src = selectedSound;
    audio.load();
    playMusicBtn.classList.remove('crossed-off');

    console.log(`Notification sound changed to: ${selectedSound}`);
}

// const audioElement = document.getElementById('audio');
// const volumeControl = document.getElementById('volume-control');

// Set the initial volume (matches the slider's initial value)
audio.volume = volume.value;

// Update the volume when the slider value changes
volume.addEventListener('input', (event) => {
    audio.volume = event.target.value;
});

//----------------------------------------------------------------------------------------------

playMusicBtn.addEventListener('click', () => {
    if (audio.paused) {    
        audio.play().then(() => {
            playMusicBtn.classList.remove('crossed-off');   
            console.log("Audio started playing.");
        }).catch(error => {
            console.error("Playback error:", error);
            alert("Autoplay blocked or another issue occurred. Please interact with the page first.");
        });
    } else {
        audio.pause();
        playMusicBtn.classList.add('crossed-off'); 
        console.log("Audio paused.");
    }
});


// POMODORO TIMER

// Request notification permission
// Request Permission on Page Load: Automatically handled by the DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", function () {
    if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
                // sendNotification("Welcome Back!", "Notifications are enabled for this session.");
            } else {
                console.log("Notification permission denied.");
            }
        });
    } else if (Notification.permission === "granted") {
        console.log("Notifications are already permitted.");
    } else if (Notification.permission === "denied") {
        console.log("Notifications are denied by the user.");
    }
});



//NOTIFICATIONS 
var playSound = false;
function sendNotification(title, message) {
    if (Notification.permission === "granted") {
        console.log("Sending notification:", title, message);
        new Notification(title, {
            body: message,
            icon: "img/logo_notif.png" 
        });

         // Play sound only if explicitly requested
         if (playSound) {
            playNotificationSound();
        }

    } else {
        console.warn("Notifications are not permitted. Current permission:", Notification.permission);
    }
}


document.getElementById('save-settings-btn').addEventListener('click', function() {

    workTime = parseInt(document.getElementById('workingTime').value);
    shortBreakTime = parseInt(document.getElementById('shortBreakChosenTime').value);
    longBreakTime = parseInt(document.getElementById('longBreakChosenTime').value);
    resetTimer();
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



// Pomodoro Timer

// pomodoro session stage titles
let workTitle = document.getElementById('work'); 
let shortBreakTitle = document.getElementById('shortBreak');
let longBreakTitle = document.getElementById('longBreak');

// default work and breaks time in minutes
let workTime = 25; 
let shortBreakTime = 5; 
let longBreakTime = 15; 

let interval; //stores id of current pomodoro session time
let startTime; //pradžios laikas
let endTime; //pabaigos laikas
let remainingTime = workTime * 60; // Remaining time of a current session in seconds
let pomodoroSessionsCount = 0; //counts sessions of that day
let breakCount = 0; // tracks count of breaks (determines if next is short or long break)


// Load saved count and last date from localStorage
function loadPomodoroCount() {
    const savedCount = localStorage.getItem('pomodoroCount'); 
    const savedDate = localStorage.getItem('lastUpdatedDate');
    const currentDate = new Date().toISOString().split('T')[0];

    // if the day has changed, pomodoro sessions is set to 0
    if (savedDate === currentDate) {
        pomodoroSessionsCount = parseInt(savedCount) || 0;
    } else {
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

// Start the timer
// Starts the Pomodoro timer by calculating the session's endTime and
// setting up an interval to update the timer every second.
function start() {
    startTime = Date.now();
    endTime = startTime + remainingTime * 1000; 

    interval = setInterval(updateTimer, 1000);// calls the updateTimer function every 1000 milliseconds

    document.getElementById('start').style.display = "none";
    document.getElementById('resume').style.display = "none";
    document.getElementById('reset').style.display = "block";
    document.getElementById('stop').style.display = "block";
}

// Update the timer
// Continuously updates the timer display and handles the session transition when time runs out
function updateTimer() {
    const now = Date.now();
    remainingTime = Math.round((endTime - now) / 1000); // The current time is compared to endTime. 
                                                        // Subtracting the two gives the time left in milliseconds

    if (remainingTime <= 0) {
        clearInterval(interval);
        playNotificationSound();
        handleSessionEnd();
        return;
    }

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    // If either value is less than 10, it's padded with a leading zero for consistency
    document.getElementById('minutes').innerHTML = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;
}

// Handle session end
// Manages transitions between work sessions, short breaks, and long breaks
function handleSessionEnd() {

    // Determine Session Type: breakCount keeps track of the current session type:
    // 0, 2, 4: Transition to short breaks.
    // 6: Transition to a long break.
    // 7: End the long break and reset to a new work session.
    // All other values: Transition to a work session.

    if (breakCount === 0 || breakCount === 2 || breakCount === 4) {
        // Short break
        shortBreakTitle.classList.add('active');
        workTitle.classList.remove('active');
        remainingTime = shortBreakTime * 60;
        breakCount++;
        sendNotification("Time for a break!", "You've completed a work session. Take a short break.");
        endWorkSession();
  
    } else if (breakCount === 6) {
        // Long break
        longBreakTitle.classList.add('active');
        shortBreakTitle.classList.remove('active');
        workTitle.classList.remove('active');
        remainingTime = longBreakTime * 60;
        breakCount++;
        sendNotification("Time for a long break!", "You've completed four work sessions. Enjoy a longer break.");
        endWorkSession();
       
    } else if (breakCount === 7) {
        // Restart cycle after long break
        longBreakTitle.classList.remove('active');
        workTitle.classList.add('active');
        remainingTime = workTime * 60;
        breakCount = 0;
        sendNotification("Back to work!", "Your long break is over. Let's start working again!");
    } else {
        // Start new work session
        workTitle.classList.add('active');
        shortBreakTitle.classList.remove('active');
        remainingTime = workTime * 60;
        breakCount++;
        sendNotification("Work session started!", "Time to focus and be productive.");
    }

    start(); // Automatically start the next session
}

// Reset the timer (after saving timer settings)
function resetTimer() {
    clearInterval(interval);
    remainingTime = workTime * 60;

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
    clearInterval(interval);
    remainingTime = Math.round((endTime - Date.now()) / 1000);

    document.getElementById('start').style.display = "none";
    document.getElementById('resume').style.display = "block";
    document.getElementById('reset').style.display = "block";
    document.getElementById('stop').style.display = "none";
}

// Resume the timer
function resumeTimer() {
    startTime = Date.now();
    endTime = startTime + remainingTime * 1000;

    interval = setInterval(updateTimer, 1000);

    document.getElementById('start').style.display = "none";
    document.getElementById('resume').style.display = "none";
    document.getElementById('reset').style.display = "block";
    document.getElementById('stop').style.display = "block";
}

// Increment Pomodoro count
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

settingsBtn.addEventListener('click', () => {
    settingsPopup.style.display = 'block'; // Show the popup
});

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



