import { Nullable } from './types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { PeriodIF } from '@/types/refExercise/config';

export const getFullName = (
  lastname: Nullable<string>,
  firstname: Nullable<string>
) => {
  let first = '';
  let last = '';

  if (firstname) {
    const trimed = firstname.trim();
    first = trimed.charAt(0).toUpperCase() + trimed.slice(1).toLowerCase();
  }

  if (lastname) {
    last = lastname.trim().toUpperCase();
  }

  return `${first} ${last}`;
};

export const formatDate = (date: Date) => {
  // Format the date
  const formattedDate = format(date, 'dd MMM yyyy', { locale: fr });

  // Capitalize the first letter of the month
  return formattedDate.replace(/(\b[a-z])/i, (char) => char.toUpperCase());
};

export function truncateString(
  input: Nullable<string>,
  maxLength: number = 16
): Nullable<string> {
  if (!input) {
    return '';
  }
  if (input.length <= maxLength) {
    return input; // Return the string as is if it's shorter than or equal to the max length
  }
  return input.slice(0, maxLength) + '..'; // Truncate and append ".."
}

/**
 * Create a new Date based on given day, with the current month & year
 * Example: input = 28 and today is 01 february, 2025. Returns: 28, February, 2025
 * @param day : the target day
 * @returns a new Date with a given day number
 */
export function getDateWithDay(day: number | null): Date | undefined {
  // if day is null
  if (!day) return undefined;
  // else normal computations
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), day);
}

/**
 * Example: this year is 2000, so the outpu would be: [2000, 2001, 2001]
 * @returns 3 years from now (current year included)
 */
export function getThreeYearsFromNow() {
  const currentYear = new Date().getFullYear();
  return [currentYear, currentYear + 1, currentYear + 2];
}

/**
 * Returning the corresponding level object based on exerciseType
 * @param baseObject : periods base object
 * @param level : level 1 => Budget, level 2 => QBR, level 3 => MBR
 * @returns the corresponding level object
 */
export function getElementsByLevel(baseObject: PeriodIF, level: 1 | 2 | 3) {
  const years = getThreeYearsFromNow();

  if (level === 1) {
    return years.map((year) => ({
      id: `${year}`,
      label: `${year}`
    }));
  }

  if (level === 2) {
    return years.map((year) => ({
      id: `${year}`,
      label: `${year}`,
      children: baseObject.children.map((q) => ({
        id: `${year}-${q.id}`,
        label: q.name,
      })),
    }));
  }

  if (level === 3) {
    return years.map((year) => ({
      id: `${year}`,
      label: `${year}`,
      children: baseObject.children.flatMap((q) =>
        q.children.map((month) => ({
          id: `${year}-${month.id}`,
          label: month.name,
        }))
      ),
    }));
  }

  return [];
}
