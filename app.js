const inputTarea = document.getElementById('input-tarea'); // Revisa que el ID coincida con tu HTML
const botonAgregar = document.getElementById('agregar');
const listaTareas = document.getElementById('lista-tareas');

// Estado de la aplicación
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// Renderizar tareas
const renderizarTareas = () => {
    listaTareas.innerHTML = '';
    tareas.forEach(({ id, texto, completado }) => {
        const li = document.createElement('li');
        li.textContent = texto;
        li.style.textDecoration = completado ? 'line-through' : 'none';
        li.style.cursor = 'pointer';

        // Marca como completada
        li.addEventListener('click', () => toggleTareas(id));

        // Eliminar tarea
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.style.marginLeft = '10px';
        botonEliminar.addEventListener('click', (e) => {
            e.stopPropagation(); 
            eliminarTarea(id);
        });

        li.appendChild(botonEliminar);
        listaTareas.appendChild(li);
    }); 
};

// Guardar tareas en localStorage
const guardarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
};

// Agregar tarea
const agregarTarea = () => {
    const texto = inputTarea.value.trim();
    if (!texto) return;

    const nuevaTarea = {
        id: Date.now(),
        texto,
        completado: false
    };
    tareas.push(nuevaTarea);
    guardarTareas();
    renderizarTareas();
    inputTarea.value = '';
};

// Eliminar tarea
const eliminarTarea = (id) => {
    tareas = tareas.filter(tarea => tarea.id !== id);
    guardarTareas();
    renderizarTareas();
};

// Marcar tarea como completada
const toggleTareas = (id) => {
    tareas = tareas.map(t => t.id === id ? { ...t, completado: !t.completado } : t);
    guardarTareas();
    renderizarTareas();
};

// Eventos
botonAgregar.addEventListener('click', agregarTarea);

// Permitir agregar tarea al presionar "Enter"
inputTarea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarTarea();
});

// Inicializar la vista al cargar la página
renderizarTareas();
