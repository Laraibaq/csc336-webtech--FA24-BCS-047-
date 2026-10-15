const query=window.matchMedia("(min-width:700px)");
const modeText=document.querySelector("#mode");

function updatemode(){
    modeText.textContent=query.matches ? "Desktop layout" :"Mobile layout";

}
updatemode();
query.addEventListener("change",updatemode)
document.querySelector("#theme").addEventListener("click",function(){
    document.body.classList.toggle("dark")
});