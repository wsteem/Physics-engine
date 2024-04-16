let svgns = "http:/www.w3.org/2000/svg";
let svg = document.createElementNS(svgns, 'svg');
svg.setAttribute('width', '500');
svg.setAttribute('height', '500');
console.log(svg.getAttribute('height'));

var map = document.getElementById("map");
var mouse_pos = document.getElementById("mouse-pos");
var masses = 0;
const colors = ["red", "blue", "green", "yellow", "black", "brown", "orange"]

function add_mass() {
    masses++;
    let circle = document.createElementNS(svgns, 'circle');
    circle.setAttribute('cx', '50');
    circle.setAttribute('cy', '50');
    circle.setAttribute('r', '15');
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('stroke-width', '0');
    circle.setAttribute('fill', colors[(masses-1)%colors.length])
    svg.appendChild(circle);
}
map.appendChild(svg);
map.addEventListener("mousemove", function(e){
    let mouseX = String(e.offsetX);
    let mouseY = String(map.offsetHeight - e.offsetY);
    mouse_pos.innerHTML = mouseX.concat(", ").concat(mouseY);
})

//THIS IS THE BEGGINING OF MY WORK//
//ONLY INPUT THE STUFF BELOW THIS PIONT!!!//

let availableKeywords = [
    'Home' ,
    'About' ,
    'Team' ,
];

//Next few lines are used to display the available words in the search drum//
const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

//When user starts typing anything the search box, this function will be executed//
inputBox.onkeyup = function(){
    //stores all the filtered key words//
    let result = [];
    let input = inputBox.value;
    //This will check what keywords are similar to the available words//
    if(input.length){
        result = availableKeywords.filter((keyword)=>{
            //checks any keyword and relates it to available words, whether it be LowerCase or UpperCase//
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
        console.log(result);
    }
    display(result);

    //To hide the small portion of the div that shows even when no available keywords relate to the searched item//
    if(!result.length){
        resultsBox.innerHTML = '';
    }
}

//funtion that will display result from available keywords based on keyword searched by the user//
function display(result){
    const content = result.map((list)=>{
        return "<li onclick=selectInput(this)>" + list + "</li>";
    });
    
    //to remove commas after available keywords, the .join('') adds empty space between its '' to replace the comma//
    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

//To have a realted keyword autofill the search bar after the user clicks on it//
function selectInput(list){
    inputBox.value = list.innerHTML
    //To hide all available keywords that originally appeared after the user clicks on one of them//
    resultsBox.innerHTML = '';
}