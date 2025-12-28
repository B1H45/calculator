console.log("HELLO");

let val1;
let val2;
let op;
let nope = false;

let operate = function() {
    let result;

    switch (op.parentElement.id) {
        case "add":
            result = parseFloat((val2 + val1).toFixed(8));
            break;
        case "subtract":
            result = parseFloat((val2 - val1).toFixed(8));
            break;
        case "multiply":
            result = parseFloat((val2 * val1).toFixed(8));
            break;
        case "divide":
            result = parseFloat((val2 / val1).toFixed(8));
            break;
    }

    console.log(result);
    if (!Number.isFinite(result)) {
        val1 = 0;
        nope = true;
        updateDisplay();
        return "NOPE!!!"
    }
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
        val1 = `${val1}${num}`;
    } else {
        val1 = num;
    }
}

let setOp = function(setOp) {
    if (setOp.parentElement.id == "equals") {
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

let updateDisplay = function(str) {
    if (nope) {
        mainRow.textContent = "NOPE!!!";
    }
    else {
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

        // thing.textContent = `Val1, val2, op: ${val1}, ${val2}, ${op.id}`;
    }


}

let numButtons = document.querySelectorAll(".numButton");
numButtons.forEach((element) => {

    element.addEventListener("click", (e) => {
        setNumber(Number(element.children[0].textContent));
        console.log(e.target.textContent);
        updateDisplay();
    })

});

let clearButton = document.querySelector("#clear");
let delButton = document.querySelector("#delete");
let pointButton = document.querySelector("#pointButton")

clearButton.addEventListener("click", () => {
    val1 = null;
    val2 = null;
    op = null;
    updateDisplay();
});


delButton.addEventListener("click", () => {
    val1 = (`${val1}`).slice(0, -1);
    if (val1 == 0 || val1 == '') {
        val1 = null;
    }
    updateDisplay();
});

pointButton.addEventListener("click", () => {
    val1 = val1 + ".";
    updateDisplay();
});

let opButtons = document.querySelectorAll(".opButton");
opButtons.forEach((element) => {

    element.addEventListener("click", (e) => {
        setOp(e.target);
        updateDisplay();
    })

});


const follower = document.getElementById('follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  // Smooth interpolation (lerp)
  followerX += (mouseX - followerX) * .1;
  followerY += (mouseY - followerY) * .1;
  
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  
  requestAnimationFrame(animate);
}

let buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  // Create the wipe element
  let buttonColoring = document.createElement("div");
  button.append(buttonColoring);
  buttonColoring.classList.add("buttonColoring");
  
  button.addEventListener("mouseenter", (e) => {
    // Get fresh rect on each mouseenter
    const rect = button.getBoundingClientRect();
    
    // Mouse position relative to button center
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    
    // Calculate angle and offset
    const angle = Math.atan2(mouseY, mouseX);
    const distance = 200; // How far outside the button to start
    const xOffset = Math.cos(angle) * distance;
    const yOffset = Math.sin(angle) * distance;
    
    // Disable transition, move to start position
    buttonColoring.style.transition = 'none';
    buttonColoring.style.left = `calc(50% + ${xOffset}px - 5rem)`;
    buttonColoring.style.top = `calc(50% + ${yOffset}px - 5rem)`;
    
    // Force reflow to apply the position change
    buttonColoring.offsetHeight;
    
    // Re-enable transition and animate to center
    buttonColoring.style.transition = 'left 0.5s ease, top 0.5s ease';
    buttonColoring.style.left = 'calc(50% - 5rem)';
    buttonColoring.style.top = 'calc(50% - 5rem)';
    
    // Scale down follower
    follower.style.transform = "translate(-50%, -50%) scale(0.1)";
    follower.style.transition = "transform .5s ease-out";
  });
  
  button.addEventListener("mouseleave", (e) => {
    // Get fresh rect
    const rect = button.getBoundingClientRect();
    
    // Mouse position relative to button center
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    
    // Calculate exit direction
    const angle = Math.atan2(mouseY, mouseX);
    const distance = 200;
    const xOffset = Math.cos(angle) * distance;
    const yOffset = Math.sin(angle) * distance;
    
    // Animate out in the direction of exit
    buttonColoring.style.left = `calc(50% + ${xOffset}px - 5rem)`;
    buttonColoring.style.top = `calc(50% + ${yOffset}px - 5rem)`;
    
    // Reset follower
    follower.style.transform = "translate(-50%, -50%)";
  });
});


animate();