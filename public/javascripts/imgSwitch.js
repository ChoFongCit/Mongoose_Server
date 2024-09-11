var imgArr = ["../images/camping.jpg", "../images/climbing.jpg"];
var img = document.getElementsByClassName('img');
var index = 0;
img.style.background.src = "url('imgArr[index]')";

function changeImg(){
    img.style.background.src = "url('imgArr[index]')";
}
setInterval()