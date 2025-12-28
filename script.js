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
    nope = false;
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

buttons.forEach(
    (button) => {
        let buttonColoring = document.createElement("div");
        button.append(buttonColoring);
        buttonColoring.classList.add("buttonColoring");

        let rect = button.getBoundingClientRect();
        let posX;
        let posY;

        document.addEventListener("mousemove", (e) => {
            posX = mouseX - rect.left - rect.width/2;
            posY = mouseY - rect.top - rect.height/2;

            // const angle = Math.atan2(mouseY - (rect.top+rect.height/4), mouseX - (rect.left+rect.width/4));
            // button.children[0].style.transform = `rotate(${angle*(180/Math.PI) +45}deg)`;

        });

        button.addEventListener("mouseenter", () => {
            let xOffset = Math.cos(Math.atan2(posY, posX))*200;
            let yOffset = Math.sin(Math.atan2(posY, posX))*200;

            if (button.id == "clear") {
                console.log(`xOffset: ${xOffset}, yOffset: ${yOffset}`);
            }

            button.children[1].classList.add("disableTransition");
            
            button.children[1].style.left = `calc((${xOffset + rect.width/2}px - 5rem))`;
            button.children[1].style.top = `calc((${yOffset + rect.height/2}px - 5rem))`;
        
            follower.style.transform = "translate(-50%, -50%) scale(0.1)";
            follower.style.transition = "transform .5s ease-out";

            setTimeout(() => {
                button.children[1].classList.remove("disableTransition");
                button.children[1].style.left = "calc(50% - 5rem)";
                button.children[1].style.top = "calc(50% - 5rem)";
            }, 10);

        });

        button.addEventListener("mouseleave", () => {
            let xOffset = Math.cos(Math.atan2(posY, posX))*200;
            let yOffset = Math.sin(Math.atan2(posY, posX))*200;

            button.children[1].style.left = `calc((${xOffset + rect.width/2}px - 5rem))`;
            button.children[1].style.top = `calc((${yOffset + rect.height/2}px - 5rem))`;

            follower.style.transform = "translate(-50%, -50%)";
        });
    }
);


animate();