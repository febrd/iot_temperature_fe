export function saveFormatter(date: string | Date | null) {
    if (date === null) {
        return "Tanggal tidak tersedia"; // Tindakan jika date adalah null
    }

    return new Date(date).toLocaleDateString("id", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
}