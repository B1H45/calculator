console.log("HELLO");

let val1;
let val2;
let op;

let operate = function() {
    let result;

    switch (op.id) {
        case "add":
            result = val1 + val2;
            break;
        case "subtract":
            result = val1 - val2;
            break;
        case "multiply":
            result = val1 * val2;
            break;
        case "divide":
            result = parseFloat((val1 / val2).toFixed(4));
            break;
    }

    console.log(result);
    val1 = result;
    val2 = 0;
    op = null;
    return result;
}

let setNumber = function(num) {
    if (op && !val2) {
        val2 = val1;
        val1 = num;
    } else if (val1 || op) {
        val1 = val1*10 + num;
    } else {
        val1 = num;
    }
}

let setOp = function(setOp) {
    if (setOp.id == "equals") {
        operate();
    }
    else if (val1 && val2 && op) {
        operate();
        op = setOp;
    } else {
        op = setOp;
    }

}

let mainRow = document.getElementById("mainRow");
// let topRow = document.getElementById("topRow");
let thing = document.getElementById("thing");

let updateDisplay = function() {
    mainRow.textContent = val1;
    // topRow.textContent = val2;
    if (val1 == 0 && val2 != 0 && val2 != null) {
        // mainRow.textContent = topRow.textContent;
        // topRow.textContent = "";
    }
    if (val2 == 0 || val1 == 0) {
        // topRow.textContent = "";
        
    }
    if (op && val2 && val1 && op.innerHTML != "=") {
        // topRow.textContent = `${val2} ${op.innerHTML}`;
    }

    thing.textContent = `${val1}, ${val2}, ${op.id}`;
}

let numButtons = document.querySelectorAll(".numButton");
numButtons.forEach((element) => {

    element.addEventListener("click", (e) => {
        setNumber(Number(e.target.innerHTML));
        updateDisplay();
    })

});

let clearButton = document.querySelector("#clear");
let delButton = document.querySelector("#delete");


clearButton.addEventListener("click", () => {
    val1 = null;
    val2 = null;
    op = null;
    updateDisplay();
});


delButton.addEventListener("click", () => {
    val1 = Math.floor(val1/10);
    if (val1 == 0) {
        val1 = null;
    }
    updateDisplay();
});


let opButtons = document.querySelectorAll(".opButton");
opButtons.forEach((element) => {

    element.addEventListener("click", (e) => {
        setOp(e.target);
        updateDisplay();
    })

});


