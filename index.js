"use strict";


const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

  recognition.onstart = function () {
    console.log('Listening...');
  };

  recognition.onresult = function (event) {
      const command = event.results[0][0].transcript.toLowerCase();
      console.log('Command:', command);
      handleCommand(command);
  };
  const voiceIndicator = document.getElementById('voiceIndicator');
  recognition.onend = function () {
      console.log('Stopped listening. Restarting...');
      voiceIndicator.classList.remove('stopped');
      recognition.start();
  };

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }

  function handleCommand(command) {
      if (command.includes('hello')) {
          greetMe();
      } else if (command.includes('go to sleep')) {
          speak("Ok Sir, You can call me anytime");
          recognition.stop();
      } else if (command.includes('how are you')) {
          speak("I am fine sir, Thank you for asking");
      } else if (command.includes('what is your name')) {
          speak("I am Jarvis, Your personal assistant");
      } else if (command.includes('i am fine')) {
          speak("It's good to know that you are fine");
      } else if (command.includes('what is your age')) {
          speak("I am 1 day old sir");
      } else if (command.includes('open')) {
          openAppWeb(command);
      }else if(command.toLowerCase().includes("mantu")){
        speak("Mantu is your chuitya friend");
      }else if(command.toLowerCase().includes("tausif")){
        speak("Tuasif is your friend");
      }else if(command.toLowerCase().includes("add item")){
        // pass the item name to add item function
        let item = command.substring(command.indexOf('add item') + 9);
        addItem(item);
      }else if(command.toLowerCase().includes("delete item") || command.toLowerCase().includes("remove item")){
        // pass the item name to add item function
        let item = command.substring(command.indexOf('delete item') + 12) || command.substring(command.indexOf('remove item') + 12);
        delete_item_with_voice_command(item);
      }else if(command.toLowerCase().includes("delete all") || command.toLowerCase().includes("remove all")){
        // pass the item name to add item function
        localStorage.setItem("items", JSON.stringify([]));
        renderItems([]);
      }else if(command.toLowerCase().includes("show all")){
        // pass the item name to add item function
        let items = JSON.parse(localStorage.getItem("items"));
        renderItems(items);
      }else if(command.toLowerCase().includes("hide all")){
        // pass the item name to add item function
        renderItems([]);
      }else if(command.toLowerCase().includes("show completed")){
        // pass the item name to add item function
        let items = JSON.parse(localStorage.getItem("items"));
        renderItems(items.filter((item) => item.isDone));
      }else if(command.toLowerCase().includes("show pending")){
        // pass the item name to add item function
        let items = JSON.parse(localStorage.getItem("items"));
        renderItems(items.filter((item) => !item.isDone));
      }else if(command.toLowerCase().includes("make all completed")){
        // pass the item name to add item function
        let items = JSON.parse(localStorage.getItem("items"));
        let newItems = items.map((item) => {
          item.isDone = true;
          return item;
        });
        localStorage.setItem("items", JSON.stringify(newItems));
        renderItems(newItems);
      }else if(command.toLowerCase().includes("make all pending")){
        // pass the item name to add item function
        let items = JSON.parse(localStorage.getItem("items"));
        let newItems = items.map((item) => {
          item.isDone = false;
          return item;
        });
        localStorage.setItem("items", JSON.stringify(newItems));
        renderItems(newItems);
      }
      // mark done and mark pending
      else if(command.toLowerCase().includes("mark done")){
        // pass the item name to add item function
        let commond_item = command.substring(command.indexOf('mark done') + 10);
        let items = JSON.parse(localStorage.getItem("items"));
        let newItems = items.map((item) => {
          if(item.name.trim().toLowerCase() == commond_item.trim().toLowerCase()){
            item.isDone = !item.isDone;
          }
          return item;
        });
        localStorage.setItem("items", JSON.stringify(newItems));
        renderItems(newItems);
      }else if(command.toLowerCase().includes("mark pending") || command.toLowerCase().includes("mark not done")){
        // pass the item name to add item function
        let commond_item = command.substring(command.indexOf('mark pending') + 12) || command.substring(command.indexOf('mark not done') + 14);
        let items = JSON.parse(localStorage.getItem("items"));
        let newItems = items.map((item) => {
          if(item.name.trim().toLowerCase() == commond_item.trim().toLowerCase()){
            item.isDone = !item.isDone;
          }
          return item;
        });
        localStorage.setItem("items", JSON.stringify(newItems));
        renderItems(newItems);
      }else if (
        command.toLowerCase().includes("change background color") ||
        command.toLowerCase().includes("change background colour")
      ) {
        // Extract the color from the command
        let colorStartIndex =
          command.toLowerCase().indexOf("change background colour") + 24 ||
          command.toLowerCase().indexOf("change background color") + 23;
        let colors = {
          "red": "#ff0000",
          "green": "#00ff00",
          "blue": "#0000ff",
          "yellow": "#ffff00",
          "orange": "#ffa500",
          "pink": "#ffc0cb",
          "purple": "#800080",
          "black": "#000000",
          "white": "#ffffff",
          "brown": "#a52a2a",
          "gray": "#808080",
          "grey": "#808080",
          "cyan": "#00ffff",
          "magenta": "#ff00ff",
          "silver": "#c0c0c0",
          "maroon": "#800000",
          "olive": "#808000",
          "lime": "#00ff00",
          "teal": "#008080",
          "indigo": "#4b0082",
          "violet": "#ee82ee",
          "navy": "#000080",
          "aquamarine": "#7fffd4",
          "turquoise": "#40e0d0",
        }
        let color = command.substring(colorStartIndex).trim();
        if (colors[color]) {
          color = colors[color];
        }
        if (/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$|^rgb\(\d+,\s*\d+,\s*\d+\)$/i.test(color)) {
          // Set the background color
          document.getElementById("main-container").style.backgroundColor = color;
          // document.body.style.backgroundColor = color;
        } else {
          console.log('Invalid color format. Please use a valid CSS color name, hex code, or RGB value.');
        }
      
        // Set the background color
      }
      
    }
    
    
  function greetMe() {
      // Implementation for greeting
      speak("Hello! How can I help you?");
  }

  function openAppWeb(command) {
      // Implementation for opening apps or websites
      speak(`Opening ${command.substring(command.indexOf('open') + 5)}`);
  }

  recognition.start();

function handleWakeWord(command) {
    // Implement your logic to handle different commands
    const utterance = new SpeechSynthesisUtterance("Hello, Sir. How can I help you?");
    speechSynthesis.speak(utterance);
}





function updateBackgroundColor(itemId) {
  var item = document.getElementById(`item_${itemId}`);
  var checkbox = document.getElementById(`checkbox_item_${itemId}`);
  // make isDone true or false
  let items = JSON.parse(localStorage.getItem("items"));
  let newItems = items.map((item) => {
    if (item.id == itemId) {
      item.isDone = !item.isDone;
    }
    return item;
  });
  localStorage.setItem("items", JSON.stringify(newItems));
  if (checkbox.checked) {
    item.style.backgroundColor = "rgba(1, 59, 1, 0.719)";
  } else {
    item.style.backgroundColor = ""; // Reset to default background color
  }
}
document.getElementById("item").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addItem();
  }
});

let items = [];

function renderItems(items) {
  // set in local storage and get from local storage

  if (!items) {
    items = [];
  }

  let itemsList = document.getElementById("items_list");
  itemsList.innerHTML = "";
  items.forEach((item) => {
    let parentDiv = document.createElement("div");
    parentDiv.classList.add("item", "color-fill");
    // let random = Math.floor(Math.random() * 100);
    // let id = `item_${random}`;
    parentDiv.id = `item_${item.id}`;
    let p = document.createElement("p");
    p.textContent = item.name;
    let childDiv = document.createElement("div");
    childDiv.classList.add("action-container");
    let eleInput = document.createElement("input");
    eleInput.type = "checkbox";
    // checked or not if isDone is true
    eleInput.checked = item.isDone;
    item.isDone && (parentDiv.style.backgroundColor = "rgba(2, 121, 2, 0.822)");
    eleInput.id = `checkbox_item_${item.id}`;
    eleInput.addEventListener("change", function () {
      // Assuming 'id' is a variable defined before this code block
      updateBackgroundColor(item.id);
    });
    // console.log(eleInput);
    // parentDiv.appendChild(p);
    let eleSpan = document.createElement("span");
    eleSpan.classList.add("fa-solid", "fa-trash", "delete");
    // how to add onclick
    eleSpan.addEventListener("click", function () {
      // Assuming 'id' is a variable defined before this code block
      delete_item(`item_${item.id}`);
    });
    childDiv.append(eleInput);
    childDiv.append(eleSpan);
    parentDiv.append(p);
    parentDiv.append(childDiv);
    // console.log(parentDiv);
    document.getElementById("items_list").append(parentDiv);
  });
}

// renderItems(); when page loads and docuemnt is ready
document.addEventListener("DOMContentLoaded", function () {
  let items = JSON.parse(localStorage.getItem("items"));
  if (!items) localStorage.setItem("items", JSON.stringify([]));
  // renderItems(items || []);
});

function addItemWithClick() {
  let item = document.getElementById("item").value;
  addItem(item);
}

function addItem(item) {
  document.getElementById("btn").classList.add("clicked");
  let items = JSON.parse(localStorage.getItem("items"));
  if (item) {
    item = item.trim().charAt(0).toUpperCase() + item.slice(1);
    let random = Math.floor(Math.random() * 100);
    // let id = `item_${random}`;
    let newItem = {
      id: random,
      name: item,
      isDone: false,
    };
    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));
    renderItems(items);
    document.getElementById("item").value = "";
  }
  else{
    alert("Please add some item");
  }
  setTimeout(function () {
    document.getElementById("btn").classList.remove("clicked");
  }, 200);
}


function delete_item_with_voice_command(itemName) {
  let items = JSON.parse(localStorage.getItem("items"));
  let newItems = items.filter((item) => item.name.trim().toLowerCase() != itemName.trim().toLowerCase());
  localStorage.setItem("items", JSON.stringify(newItems));
  renderItems(newItems);
}

function delete_item(id) {
  let eleToDelete = document.getElementById(id);
  let items = JSON.parse(localStorage.getItem("items"));
  let newItems = items.filter((item) => item.id != id.split("_")[1]);
  localStorage.setItem("items", JSON.stringify(newItems));
  renderItems(newItems);
  eleToDelete.style.display = "none";
}

function onKeyDwon(){
  document.getElementById("item").style.transform = "scale(0.95)";
}
function onKeyUp(){
  document.getElementById("item").style.transform = "scale(1)";
}