let listaTareas = [];

// Guardar tareas en localStorage
const saveText = () => {
    localStorage.setItem("tasks", JSON.stringify(listaTareas));
}

// Agregar una nueva tarea
const addTask = () => {
    const datos = document.querySelector(".texto");
    let texto_entrada = datos.value.trim();
    if (texto_entrada) {
        listaTareas.push({
            text: texto_entrada,
            completed: false
        });
        datos.value = ''; // Limpiar el campo de entrada después de agregar la tarea
    }
    taskUpdate();
    updateState();
    saveText();
}

// Eliminar una tarea
const deletecampo = (index) => {
    listaTareas.splice(index, 1);
    taskUpdate();
    updateState();
    saveText();
}

// Editar una tarea
const editarcampo = (index) => {
    const envio = document.querySelector(".texto");
    envio.value = listaTareas[index].text;
    listaTareas.splice(index, 1);
    taskUpdate();
    updateState();
    saveText();
}

// Actualizar el progreso y el conteo de tareas
const updateState = () => {
    let taskcomplete = listaTareas.filter(task => task.completed).length;
    let totaltask = listaTareas.length;
    let progres = (totaltask > 0) ? (taskcomplete / totaltask) * 100 : 0;
    let medida = document.querySelector(".medida");
    medida.style.width = `${progres}%`;
    document.querySelector(".t-2").innerText = `${taskcomplete}/${totaltask}`;
}

// Alternar el estado de completado de una tarea
const toggleTaskCompleted = (index) => {
    listaTareas[index].completed = !listaTareas[index].completed;
    taskUpdate();
    updateState();
    saveText();
}

// Actualizar la lista de tareas
const taskUpdate = () => {
    let listShow = document.querySelector(".c-list");
    listShow.innerHTML = '';

    listaTareas.forEach((task, index) => {
        const element = document.createElement("li");
        element.innerHTML = `
            <div class="c-list-2">
                <div class="d-flex c-input gap-2 ${task.completed ? 'completed' : 'no'}">
                    <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}"><span>${task.text}</span>
                </div>
                <div class="logos d-flex justify-content-center align-items-center gap-2">
                    <ion-icon name="close-circle-outline" onClick="deletecampo(${index})"></ion-icon>
                    <ion-icon name="create-outline" onClick="editarcampo(${index})"></ion-icon>
                </div>
            </div>`;

        // Añadir evento de cambio al checkbox dentro del elemento
        const checkbox = element.querySelector("input[type='checkbox']");
        checkbox.addEventListener("change", (event) => {
            toggleTaskCompleted(index);
        });

        listShow.appendChild(element);
    });
}

// Cargar tareas desde localStorage al iniciar
document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    listaTareas = storedTasks;
    taskUpdate();
    updateState();
});

// Manejar el evento del botón de agregar tarea
const botton = document.querySelector(".envio");
botton.addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
});
