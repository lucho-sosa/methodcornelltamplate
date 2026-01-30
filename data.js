const CornellDB = {
    // Carga los datos o inicializa el esquema si está vacío
    obtenerTodo() {
        const rawData = localStorage.getItem('cornell_app');
        return rawData ? JSON.parse(rawData) : { temas: {} };
    },

    // Guarda el estado actual en el almacenamiento local
    guardarTodo(data) {
        localStorage.setItem('cornell_app', JSON.stringify(data));
    },

    // Crea un nuevo tema
    añadirTema(nombre) {
        const data = this.obtenerTodo();
        if (!data.temas[nombre]) {
            data.temas[nombre] = [];
            this.guardarTodo(data);
        }
        return data;
    },

    // Crea una nota vacía dentro de un tema
    crearNota(temaNombre) {
        const data = this.obtenerTodo();
        const nuevaNota = {
            id: Date.now(),
            titulo: "Nueva Nota",
            cue: "",
            notes: "",
            summary: ""
        };
        data.temas[temaNombre].push(nuevaNota);
        this.guardarTodo(data);
        return nuevaNota.id;
    },

    // Busca una nota específica por ID
    obtenerNota(temaNombre, id) {
        const data = this.obtenerTodo();
        return data.temas[temaNombre].find(n => n.id === parseInt(id));
    },

    // Actualiza el contenido de una nota existente
    actualizarNota(temaNombre, id, campos) {
        const data = this.obtenerTodo();
        const index = data.temas[temaNombre].findIndex(n => n.id === parseInt(id));
        if (index !== -1) {
            data.temas[temaNombre][index] = { ...data.temas[temaNombre][index], ...campos };
            this.guardarTodo(data);
        }
    },

    // ... dentro de CornellDB ...

    eliminarNota(temaNombre, id) {
        const data = this.obtenerTodo();
        data.temas[temaNombre] = data.temas[temaNombre].filter(n => n.id !== parseInt(id));
        this.guardarTodo(data);
    },

    eliminarTema(nombre) {
        const data = this.obtenerTodo();
        if (confirm(`¿Estás seguro de eliminar el tema "${nombre}" y todas sus notas?`)) {
            delete data.temas[nombre];
            this.guardarTodo(data);
            return true;
        }
        return false;
    }
};