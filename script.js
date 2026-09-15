const h2_1 = document.querySelector(".h2_1")
const titlep = document.querySelector("#titlep")
const select = document.querySelector("#select")
const notes = document.querySelector("#notes")
const btn1 = document.querySelector(".btn1")
const btn2 = document.querySelector(".btn2")
const cancel = document.querySelector(".cancel")
const pp = document.querySelector(".pp")
const things = document.querySelector(".things")
const arr = []
const mode = null;
function inhtml() {
    if (arr.length >= 1) {
        pp.style.display = "none";
    }
    arr.forEach(element => {
        const card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `
            <h3></h3>
            <div class="categorey-date">
                <p class="catego"></p>
                <p class"datte"></p>
            </div>
            <p class"descr"></p>
            <div class="btns-2">
                <button class="edit">edit</button>
                <button class="delete">delete</button>
            </div>
        `
        card.querySelector("h3").innerText = element.title
        card.querySelector(".catego").innerText = element.category
        card.querySelector(".datte").innerText = element.date
        card.querySelector(".discr").innerText = element.description
        card.querySelector(".edit").addEventListener("click", ()=>{
            edit(element.id)
            
        })
        card.querySelector(".delete").addEventListener("click", ()=>{
            delet(element.id)
        })
        things.appendChild(card)

    });
}
function edit(id){
    h2_1.innerText = "Edit Item"
    btn1.innerText = "Save Changes"
    cancel.style.display = "flex"
    const item = arr.find((x) => x.id === id);
    if(item == null)
        {return}
    titlep.value = item.title
    select.value = item.category
    notes.value = item.description
}
function delet(){

}

