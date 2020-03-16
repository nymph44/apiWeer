var input;

function setup(){
    noCanvas();
    input = createInput();

    input.changed(newText);
    
}

function newText(){
    console.log(input.value());
}