const form = document.querySelector(".con1")
const h2_1 = document.querySelector(".h2_1")
const titlep = document.querySelector("#titlep")
const select = document.querySelector("#select")
const notes = document.querySelector("#notes")
const btn1 = document.querySelector(".btn1")
const btn2 = document.querySelector(".btn2")
const cancel = document.querySelector(".cancel")
const pp = document.querySelector(".pp")
const things = document.querySelector(".things")
let arr = []
let mode = null;
let items_count = document.querySelector(".items-count")
function inhtml() {
    items_count = arr.length()
    things.innerHTML = ""
    if (arr.length == 0) {
        pp.style.display = "flex";
    }
    else{
        pp.style.display = "none";
    }
    arr.forEach(element => {
        const card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `
            <h3></h3>
            <div class="categorey-date">
                <p class="catego"></p>
                <p class="datte"></p>
            </div>
            <p class="descr"></p>
            <div class="btns-2">
                <button class="edit">edit</button>
                <button class="delete">delete</button>
            </div>
        `
        card.querySelector("h3").innerText = element.title
        card.querySelector(".catego").innerText = element.category
        card.querySelector(".datte").innerText = element.date
        card.querySelector(".descr").innerText = element.description
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
    if(item == null)
        {return}
    mode = id   
    h2_1.innerText = "Edit Item"
    btn1.innerText = "Save Changes"
    cancel.style.display = "flex"
    const item = arr.find((x) => x.id === id);
    titlep.value = item.title
    select.value = item.category
    notes.value = item.description
}
function delet(id){
    const respond = confirm("ARE U SURE 👍!!\n(What will you delete won't be back)")
    if(!respond){
        return
    }
    arr = arr.filter((x) => x.id !== id);
    if(mode == id){
        mode_reset()
    }
    inhtml()
    //save_changes()
}
function mode_reset(){
    mode = null 
    h2_1.innerText = "Add Item"
    btn1.innerText = "Add item"
    cancel.style.display = "none"
    form.reset();
}
// function save_changes(){
//    save in local storage
//}
btn1.addEventListener("click", ()=>{
    let title = titlep.value
    let categorey = select.value
    let description = notes.value
    if(!title.trim()){
        alert("Don't try to be SMART!!")
        return
    }

})