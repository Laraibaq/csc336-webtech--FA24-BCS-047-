const out=document.querySelector("#width");
function showWidth(){
    out.textContent=window.innerWidth;
}
showWidth();
window.addEventListener("resize",showWidth)