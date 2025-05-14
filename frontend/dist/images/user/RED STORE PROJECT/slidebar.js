let menubar =document.querySelector(".menubar");
let slide=document.querySelector('.slide')
let li=document.querySelector('li')


menubar.onclick=function(){
    menubar.classList.toggle('active');
    slide.classList.toggle('active');

}