// Diccionario para traducir los estados de las tareas
export const statusTranslations: {[key:string] : string} = { // Las keys y los valores son strings
    pending: 'Pendiente', 
    onHold: 'En Espera',
    inProgress: 'En Progreso',
    underReview: 'En Revisión',
    completed: 'Completado',
};