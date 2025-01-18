// const socket = io("74.176.208.12:8192", {
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000, // Initial delay between attempts (default: 1000 ms)
//   reconnectionDelayMax: 5000, // Maximum delay (default: 5000 ms)
//   timeout: 20000, // Timeout for connection attempt (default: 20000 ms)
// });

const socket = io("localhost:8192", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000, // Initial delay between attempts (default: 1000 ms)
  reconnectionDelayMax: 5000, // Maximum delay (default: 5000 ms)
  timeout: 20000, // Timeout for connection attempt (default: 20000 ms)
});

let message = document.getElementById("message");
let button = document.getElementById("button");
let messages = document.getElementById("messages");

let joinRoom = document.getElementById("join-room");
let createRoom = document.getElementById("create-room");
let roomCode = document.getElementById("room-code");

socket.on("connect", () => {
  console.log("Connected to server!");
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected from server:", reason);
});

// Handle reconnection attempts
socket.on("reconnect_attempt", (attempt) => {
  console.log(`Reconnection attempt #${attempt}`);
});

// Handle reconnection success
socket.on("reconnect", (attempt) => {
  console.log(`Reconnected successfully after ${attempt} attempts.`);
});

// Handle reconnection failure
socket.on("reconnect_failed", () => {
  console.log("Reconnection failed.");
});

socket.on("receiveMsg", (msg) => {
  console.log(msg);
  messages.innerHTML += `
    <p>${msg}</p>
  `;
});

function sendMsg() {
  console.log(message.value);
  socket.emit("sendMsg", message.value);
}

button.addEventListener("click", sendMsg);
