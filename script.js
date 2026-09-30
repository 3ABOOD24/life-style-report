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
const STORAGE_KEY = "kagi"
function inhtml() {
    items_count.innerText = arr.length
    things.innerHTML = ""
    if (arr.length == 0) {
        pp.style.display = "flex";
    }
    else {
        pp.style.display = "none";
        things.style.display = "flex";
    }
    arr.forEach(element => {
        const card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `
            <h3 class = "title_h3"></h3>
            <div class="categorey-date">
                <p class="catego"></p>
                <p> : </p>
                <p class="datte"></p>
            </div>
            <p class="descr"></p>
            <div class="btns-2">
                <button class="edit" type="button">edit</button>
                <button class="delete" type="button">delete</button>
            </div>
        `
        card.querySelector("h3").innerText = element.titl
        card.querySelector(".catego").innerText = element.categ
        card.querySelector(".datte").innerText = element.date
        card.querySelector(".descr").innerText = element.notes
        card.querySelector(".edit").addEventListener("click", () => {
            edit(element.id)

        })
        card.querySelector(".delete").addEventListener("click", () => {
            delet(element.id)
        })
        things.appendChild(card)

    });
}
function edit(id) {
    const item = arr.find((x) => x.id === id);
    if (item == null) { return }
    mode = id
    h2_1.innerText = "Edit Item"
    btn1.innerText = "Save Changes"
    cancel.style.display = "flex"
    titlep.value = item.titl
    select.value = item.categ
    notes.value = item.notes
}
function delet(id) {
    const respond = confirm("ARE U SURE 👍!!\n(What will you delete won't be back)")
    if (!respond) {
        return
    }
    arr = arr.filter((x) => x.id !== id);
    if (mode == id) {
        mode_reset()
    }
    inhtml()
    saveItems()
}
function mode_reset() {
    mode = null
    h2_1.innerText = "Add Item"
    btn1.innerText = "Add item"
    cancel.style.display = "none"
    form.reset();
}
btn1.addEventListener("click", (e) => {
    e.preventDefault()
    let title = titlep.value
    let categorey = select.value
    let description = notes.value
    if (!title.trim()) {
        alert("Don't try to be SMART!!")
        return
    }
    if (mode == null) {
        const item = {
            titl: title.trim(),
            categ: categorey,
            date: new Date().toISOString().slice(0, 10),
            notes: description,
            id: Date.now()
        }
        arr.push(item)
    }
    else {
        const findex = arr.findIndex((x) => x.id === mode);
        if (findex != -1) {
            arr[findex].titl = title.trim()
            arr[findex].categ = categorey
            arr[findex].notes = description
        }
        mode_reset()
    }
    inhtml()
    form.reset()
    console.log(arr)
    saveItems()
})
cancel.addEventListener("click", () => {
    mode_reset()
})
function saveItems() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    }
    catch (error) {
        console.error('Save failed:', error);
        alert('Could not save your list. Storage may be full or blocked.');
    }
}
function loadItems() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            arr = [];
            return;
        }
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            throw new Error('Saved data is not an array.');
        }
        arr = parsed;
    }
    catch (error) {
        console.error('Load failed:', error);
        localStorage.removeItem(STORAGE_KEY);
        arr = [];
        alert('Saved data was corrupted and has been reset.');
    }
}
loadItems()
btn2.addEventListener('click', () => {
    if (arr.length === 0) {
        alert('There is nothing to clear.');
        return;
    }
    const ok = confirm('Clear ALL items? This cannot be undone.');
    if (!ok) return;
    arr = [];
    mode_reset();
    saveItems();
    inhtml();
});