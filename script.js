function showPrompt(promptNumber) {
    document.getElementById('prompt1').classList.add('hidden');
    document.getElementById('prompt2').classList.add('hidden');

    document.getElementById('prompt' + promptNumber).classList.remove('hidden');

    
}

const reflectionForm = document.getElementById("reflection");
const positiveAnswer = document.getElementById("positivemessage"); 

reflectionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const tile = document.createElement("div");
    tile.innerHTML = `
        <div class="answer">
            <p1>i’m proud of you for writing this. this just got you one step closer to being a self-aware person! i hope you got some relief after this practice👐</p1>
        </div>
    `;

    positiveAnswer.append(tile);
    reflectionForm.reset();
});

const ventForm = document.getElementById("venting");
const goodAnswer = document.getElementById("positivemessagetwo");

ventForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const tile = document.createElement("div");
    tile.innerHTML = `
        <div class="answertwo">
            <p1>i’m proud of you for writing this. this just got you one step closer to being a self-aware person! i hope you got some relief after this practice👐</p1>
        </div>
    `;

    goodAnswer.append(tile);
    ventForm.reset();
});




document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    let painting = false;
    let undoStack = [];
    let redoStack = [];

    function saveState() {
        undoStack.push(canvas.toDataURL());
        redoStack = [];
    }

    function restoreState(state) {
        const img = new Image();
        img.src = state;
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }

    function undo() {
        if (undoStack.length > 1) {
            redoStack.push(undoStack.pop());
            restoreState(undoStack[undoStack.length - 1]);
        }
    }

    function redo() {
        if (redoStack.length > 0) {
            undoStack.push(redoStack.pop());
            restoreState(undoStack[undoStack.length - 1]);
        }
    }

    function startPosition(e) {
        painting = true;
        saveState();
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;

        ctx.lineWidth = document.getElementById("lineWeight").value;
        ctx.lineCap = "round";
        ctx.strokeStyle = document.getElementById("colorPicker").value;

        ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    }

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

    document.getElementById("undoBtn").addEventListener("click", undo);
    document.getElementById("redoBtn").addEventListener("click", redo);
});


