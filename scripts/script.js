// Variables
const taskStorageHandler = (() => {
    let tasks = [];

    const getStoredTasks = () => tasks;
    const pushTask = (taskObj) => tasks.push(taskObj);
    const removeTask = (pos) => 
    {
        tasks.splice(pos, 1)
    }

    return {getStoredTasks, pushTask, removeTask}
})()

const displayController = (() => {

    const addTaskDisplay = (taskObj,i) => {
        const mainContainer = document.getElementById("maintodo")

        let container = document.createElement("div")
        let checkbox = document.createElement("div")
        let task = document.createElement("div")
        let taskTitle = document.createElement("h2")
        let taskDesc = document.createElement("p")
        let taskBtnCont = document.createElement("div")
        let taskBtnDel = document.createElement("button")
        let taskBtnFin = document.createElement("button")
        let checkmark = document.createElement("i")

        console.log(container)
        
        taskTitle.textContent = taskObj.name
        taskDesc.textContent = taskObj.desc
        taskBtnDel.textContent = "Eliminar Tarea"
        taskBtnFin.textContent = "Finalizar Tarea"

        taskBtnCont.appendChild(taskBtnDel)
        taskBtnCont.appendChild(taskBtnFin)

        task.appendChild(taskTitle)
        task.appendChild(taskDesc)
        task.appendChild(taskBtnCont)

        container.appendChild(checkbox)
        container.appendChild(task)
        
        checkbox.appendChild(checkmark)
        checkmark.classList.add("fas")
        checkmark.classList.add("fa-check")
        checkmark.classList.add("is-hidden")

        mainContainer.appendChild(container)

        container.classList.add("todo")
        checkbox.classList.add("todo-checkbox")
        task.classList.add("todo-task")
        taskTitle.classList.add("todo-title")
        taskDesc.classList.add("todo-desc")
        taskBtnCont.classList.add("todo-btn-cont")
        taskBtnDel.classList.add("todo-btn")
        taskBtnFin.classList.add("todo-btn")
        taskBtnDel.classList.add("del-btn")
        taskBtnFin.classList.add("fin-btn")

        container.setAttribute("data-pos", `${i}`)

        

    }

    const clearDisplay = () => 
    {
        const maintodo = document.getElementById("maintodo")
        maintodo.querySelectorAll("*").forEach(elem => elem.remove())
    }

    const setEvent = () =>
    {
        container = document.getElementById("maintodo")

        container.addEventListener("click", e =>
        {
            if (e.target.classList.contains("del-btn"))
            {
                console.log(e)
                taskStorageHandler.removeTask(Number(e.target.dataset.pos))
                displayController.render()
            } else if (e.target.classList.contains("fin-btn"))
            {
                console.log(e.path[3].querySelector(".fas").classList.toggle("is-hidden"))
            }
        })
    }

    const removeEvent = () => 
    {
        const old = document.getElementById("maintodo")
        const newCont = old.cloneNode(old)

        old.parentNode.replaceChild(newCont,old)
    }
    const render = () => {
        removeEvent()
        clearDisplay()
        setEvent()
        let currentTask = taskStorageHandler.getStoredTasks()

        for (let i = 0; i < currentTask.length; i++)
        {   
            addTaskDisplay(currentTask[i],i)
        }
    }

    return {render}

})()

const taskFactory = (name, desc, isFinished) => 
{
    return {name, desc, isFinished}
}

let form = document.getElementById("taskform");
form.addEventListener("submit", (e) => 
{
    e.preventDefault();
    taskStorageHandler.pushTask(
        taskFactory(e.target[0].value, e.target[1].value, false)
    )
    displayController.render()
    
})

