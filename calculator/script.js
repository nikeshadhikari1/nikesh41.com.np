function change() {
    var buttons = document.querySelector('.buttons');
    var buttons1 = document.querySelector('.buttons1');
    
    if (buttons.style.display === 'none') {
        buttons.style.display = 'block';
        buttons1.style.display = 'none';
    } else {
        buttons.style.display = 'none';
        buttons1.style.display = 'block';
    }
}


function cleara(){
    document.getElementsByName('dis')[0].value='';
}
function displaydata(a){
    // document.getElementsByName('dis')[0].value += a;

    var display = document.getElementsByName('dis')[0];

    if (a === 'sin' || a === 'cos' || a === 'in' || a === 'log' || a === '1/x' || a === 'e^x' || a === 'x^2' || a === 'x^y' || a === '|x|' || a === '$' || a === 'e') {
        display.value += a + '(';
    } else {
        // For regular cases, just append the value directly
        display.value += a;
    }

}
function result(){
    document.getElementsByName('dis')[0].value = eval(document.getElementsByName('dis')[0].value)
}
function back(){
    // var a=document.getElementsByName('dis')[0].value;
    // document.getElementsByName('dis')[0].value=a.substring(0,a.length-1);

    var display = document.getElementsByName('dis')[0];
    var cursorPosition = display.selectionStart;
    if (cursorPosition > 0) {
        var currentValue = display.value;
        var newValue = currentValue.slice(0, cursorPosition - 1) + currentValue.slice(cursorPosition);

        // Update the value of the input field
        display.value = newValue;

        // Move the cursor one position to the left
        display.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
    }

}
function moveCursorLeft(){
    var display = document.getElementsByName('dis')[0];
    display.focus();
    display.setSelectionRange(display.selectionStart - 1, display.selectionStart - 1);
}
function moveCursorRight(){
    var display = document.getElementsByName('dis')[0];
    display.focus();
    display.setSelectionRange(display.selectionStart + 1, display.selectionStart + 1);
}

