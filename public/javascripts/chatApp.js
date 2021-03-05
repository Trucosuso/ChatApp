// eslint-disable-next-line no-undef
var socket = io();

/** @type {String} Name of the user */
var username = "";

/* Store DOM elements to work with them */
var chat = document.getElementById("chat");
var login = document.getElementById("login");
var loginForm = document.getElementById("loginForm");
var loginInput = document.getElementById("loginInput");
var messages = document.getElementById("messages");
var chatForm = document.getElementById("form");
var chatInput = document.getElementById("input");

/** Event to store username and change view to chat */
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (loginInput.value) {
        username = loginInput.value;
        loginInput.value = "";
        socket.emit("user registered", username);
        chat.style.display = "initial";
        login.style.display = "none";
        chatInput.focus();
    }
});

/** Event to send message */
chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (chatInput.value) {
        socket.emit("chat message", {
            user: username,
            message: chatInput.value
        });
        chatInput.value = "";
    }
});

/** Event to recive message and print it */
socket.on("chat message", function (msg) {
    let item = document.createElement("li");
    let messageUsername = document.createElement("strong");
    messageUsername.textContent = msg.user + ": ";
    let messageText = document.createElement("span");
    messageText.textContent = msg.message;

    item.append(messageUsername, messageText);

    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});