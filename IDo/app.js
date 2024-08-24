const micBtn = document.querySelector('.mic-btn');
const textInput = document.getElementById('textInput');
const sendBtn = document.querySelector('.send-btn');

function speak(text) {
    const textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.volume = 1;
    textSpeak.pitch = 1;
    window.speechSynthesis.speak(textSpeak);
}

function wishMe() {
    const day = new Date();
    const hour = day.getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing i do...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    textInput.value = transcript;
    takeCommand(transcript.toLowerCase());
};

function startListening() {
    recognition.start();
    textInput.value = 'Listening...';
}

function sendMessage() {
    const message = textInput.value.trim();
    if (message) {
        takeCommand(message.toLowerCase());
    }
}

sendBtn.addEventListener('click', sendMessage);
micBtn.addEventListener('click', startListening);

const numberDictionary = {
    "nashik": "+918792211077",
    "varnika": "+916366670560",
    "keerthu": "+918147471064",
    "uppi": "+919606797025",
    "nithish" : "+916361227752",
    "mrudula" : "+919739581861",
    "bhuvan" : "+91807337237",
    "arvind": "+918073814892",
    "loki": "+917449166481",
    "sam": "+919019091130",
    "harshita": "+919886903039",
    "harshitha": "+919886903039",
};

function extractNumbers(message) {
    const words = message.split(/\s|[\.,\/#!$%\^&\*;:{}=\-_`~()]/).filter(Boolean);
    let numbers = [];
    const match = message.match(/\d+/g);
    let name = "";

    for (let word of words) {
        if (numberDictionary[word]) {
            name = word;
            numbers.push(numberDictionary[word]);
        }
    }

    if (numbers.length === 0 && match) {
        numbers = match.join('');
        name = numbers;
        return { number: numbers.length > 10 ? numbers.slice(0, 10) : numbers, name };
    } else if (numbers.length > 0) {
        return { number: numbers, name };
    }
    return false;
}

function extractMessage(message) {
    const words = message.split(/\s|[\.,\/#!$%\^&\*;:{}=\-_`~()]/).filter(Boolean);
    const index = words.indexOf('that');
    return index !== -1 ? words.slice(index + 1).join(' ') : "";
}

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("initialize") || message.includes("initialise")) {
        speak("Initializing i do...");
        wishMe();
    } else if (message.includes("wish me")) {
        wishMe();
    } else if (message.includes("open google") && message.includes("i do")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("what's your name") || message.includes("what is your name")) {
        speak("Hi, my name is i do!");
    } else if (message.includes("open youtube") && message.includes("i do")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook") && message.includes("i do")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if ((message.includes('what is') || message.includes('who is') || message.includes('what are')) && message.includes("i do")) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('wikipedia') && message.includes("i do")) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace(/\b(wikipedia|i do)\b/gi, "").trim()}`, "_blank");
        speak("This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('time') && message.includes("i do")) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The current time is " + time);
    } else if (message.includes('date') && message.includes("i do")) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes('calculator') && message.includes("i do")) {
        window.open('Calculator:///');
        speak("Opening Calculator");
    } else if (message.includes('whatsapp')) {
        const { number, name } = extractNumbers(message);
        //const num=number.split("");
        //console.log(num);
        console.log(name);
        console.log(number);
        const msg = extractMessage(message);
        if (number) {
            window.location.href = `whatsapp://send?phone=${number}&text=Hi%20${msg}!!!!`;
            speak("Sending message to " + name);
        } else {
            window.location.href = "whatsapp://";
            speak("Opening WhatsApp...");
        }
    } else if (message.includes('camera') && message.includes("i do")) {
        window.location.href = "microsoft.windows.camera:";
        speak("Opening Camera");
    } else if (message.includes('downloads')) {
        window.location.href = "chrome://downloads";
        speak("Opening Downloads");
    } else if (message.includes('viewer') && message.includes("i do")) {
        window.location.href = "com.microsoft.viewer3d:";
        speak("Opening 3D Viewer");
    } else if (message.includes('action center') && message.includes("i do")) {
        window.location.href = "ms-actioncenter:";
        speak("Opening Action Center");
    } else if ((message.includes('clock') || message.includes("alarm")) && message.includes("i do")) {
        window.location.href = "ms-clock:";
        speak("Opening Clock");
    } else if (message.includes('calendar') && message.includes("i do")) {
        window.location.href = "outlookcal:";
        speak("Opening Calendar");
    } else if (message.includes('projection') && message.includes("i do")) {
        window.location.href = "ms-projection:";
        speak("Opening Projection Settings");
    } else if (message.includes('cortana') && message.includes("i do")) {
        window.location.href = "ms-cortana:";
        speak("Opening Cortana");
    } else if (message.includes('board') && message.includes("i do")) {
        window.location.href = "ms-whiteboard-cmd:";
        speak("Opening Whiteboard");
    } else if (message.includes('i do')) {
        window.open(`https://www.google.com/search?q=${message.replace(/\b(i do)\b/gi, "").trim()}`, "_blank");
        speak("I found some information for " + message + " on Google.");
    } else {
        speak("Sorry, I am not able to understand you. Please specify my name before giving any command.");
    }
}
