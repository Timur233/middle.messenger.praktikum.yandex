export default function dateFormatter(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    const isToday = date.toDateString() === now.toDateString();
    const isThisWeek = date > new Date(now.setDate(now.getDate() - now.getDay())) && date <= new Date();
    const isLastWeekOrEarlier = date <= new Date(now.setDate(now.getDate() - now.getDay()));

    if (isToday) {
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }

    if (isThisWeek) {
        return `${dayNames[date.getDay()]} ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
    }

    if (isLastWeekOrEarlier) {
        return `${date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${
            date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
    }

    return '';
}
