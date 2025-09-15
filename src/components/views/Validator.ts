export function validateContact(data: { email: string; phone: string }): string[] {
  const errors: string[] = [];

  if (!data.email.trim()) {
    errors.push('Введите email');
  } else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(data.email.trim())) {
    errors.push('Некорректный email');
  }

  if (!data.phone.trim()) {
    errors.push('Введите телефон');
  } else if (!/^\+?\d{10,15}$/.test(data.phone.trim())) {
    errors.push('Некорректный телефон');
  }

  return errors;
}
