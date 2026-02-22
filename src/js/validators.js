/**
 * Валидаторы для полей формы.
 * @property {function(string): string|null} text - Валидатор для текстового поля.
 * @property {function(string): string|null} email - Валидатор для электронной почты.
 * @property {function(string): string|null} phone - Валидатор для телефона.
 * @property {function(string): string|null} password - Валидатор для пароля.
 * @property {function(string): string|null} number - Валидатор для числовых полей.
 */
const validators = {
  /**
   * Валидатор для текстового поля.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  text: (value) => {
    if (!value) return "field is required";

    const regexText = /^[^!>?<_\-$№#@]+$/;

    if (!regexText.test(value))
      return "Text should not contain !>?<_-$№#@ symbols";

    return null;
  },
  /**
   * Валидатор для электронной почты.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  email: (value) => {
    if (!value) return "field is required";

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
      return "Invalid email";

    return null;
  },
  /**
   * Валидатор для телефона.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  phone: (value) => {
    if (!value) return "field is required";

    if (!/^[78]\d{3}\d{3}\d{2}\d{2}$/.test(value))
      return "Invalid phone number";

    return null;
  },
  /**
   * Валидатор для пароля.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  password: (value) => {
    if (!value) return "field is required";

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[A-Za-z\d!@#\$%\^&\*]{8,}$/.test(
        value
      )
    )
      return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)";

    return null;
  },
  /**
   * Валидатор для числовых полей.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  number: (value) => {
    if (!value) return "field is required";

    if (isNaN(value)) return "Must be a number";

    return null;
  },
};

/**
 * Функция для валидации формы на основе предоставленных валидаторов.
 *
 * @param {Object} formData - Данные формы в виде объекта.
 * @returns {Object} - Объект с сообщениями об ошибках для каждого поля.
 */
export function validateForm(formData) {
  const errors = {}; // Объект для хранения сообщений об ошибках

  // Итерация по каждому полю формы
  Object.entries(formData).forEach(([field, value]) => {
    const validator = validators[field]; // Получаем валидатор для текущего поля
    if (validator) {
      const error = validator(value); // Проверяем значение поля валидатором
      if (error) {
        errors[field] = error; // Если есть ошибка, добавляем ее в объект ошибок
      }
    }
  });

  return errors; // Возвращаем объект с сообщениями об ошибках
}
