export function formatId(date: string | Date | null) {
    if (date === null) {
        return "Tanggal tidak tersedia"; // Tindakan jika date adalah null
    }

    return new Date(date).toLocaleDateString("id", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}