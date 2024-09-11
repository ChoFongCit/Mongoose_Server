var dropdown = document.getElementsByClassName('dropDown');
var hiddenText = document.getElementsByClassName('hiddenText');

dropdown.addEventListener('click',myFunction);

function myFunction(){
    hiddenText.classList.toggle('show');
}