const input = document.getElementById("todoInput")
const button = document.getElementById("button")
const list = document.getElementById("todolist")

button.addEventListener("click", () => {
    const value = input.value.trim()
    if (!value) {
        return
    }

    const li = document.createElement("li")
    li.textContent = value;
    list.appendChild(li);

    input.value=""

})