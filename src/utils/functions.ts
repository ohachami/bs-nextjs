import { Nullable } from "./types";

export const getFullName = (lastname: Nullable<string>, firstname: Nullable<string>) => {
    let first = '';
    let last = '';

    if (firstname) {
        const trimed = firstname.trim()
        first = trimed.charAt(0).toUpperCase() + trimed.slice(1).toLowerCase();
    }

    if (lastname) {
        last = lastname.trim().toUpperCase();
    }

    return `${first} ${last}`;
}

export const formatDateMedium = (date: Date) => {
    const formatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' });

    // Format the date
    const formattedDate = formatter.format(date);

    // Capitalize the first letter of the month
    return formattedDate.replace(/(\b[a-z])/i, (char) => char.toUpperCase());

}

export function truncateString(input: Nullable<string>, maxLength: number = 16): Nullable<string> {
    if (!input) {
        return '';
    }
    if (input.length <= maxLength) {
        return input; // Return the string as is if it's shorter than or equal to the max length
    }
    return input.slice(0, maxLength) + ".."; // Truncate and append ".."
}