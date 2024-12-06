export function formatDate(isoString: string) : string {
    const date = new Date(isoString); // Assumiendo que isoString tiene el formato 'YYYY-MM-DDTHH:mm:ss.sssZ'
    const formatter = new Intl.DateTimeFormat('es-ES', { // Formato de fecha y hora
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return formatter.format(date); // Devuelve la fecha en el formato 'día de la semana, día de mes, año'
}