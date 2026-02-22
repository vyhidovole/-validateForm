// import { validateForm } from "./validators";

// // Получение всех полей на странице
// const allInputs = document.querySelectorAll("input");

// // ОБъект для хранения сообщений об ошибках
// const validationErrors = {};

// /**
//  *
//  * @param {HTMLInputElement} input - Элемент инпута
//  */
// function updateErrors(input) {
//   // Формируем объект на основе атрибутов name и value у инпутов
//   const data = { [input.name]: input.value };

//   // Вызов функции для получения ошибок по полям
//   const errors = validateForm(data);

//   validationErrors[input.name] = errors[input.name];

//   // Обновление сообщений об ошибках в span
//   const errorElement = document.querySelector(`#${input.name}-error`);

//   // Показываем текст с ошибкой в каждом span, если есть ошибка
//   errorElement.textContent = validationErrors[input.name] || "";
// }

// // Подписываемся на событие change каждого инпута
// allInputs.forEach(function (input) {
//   input.addEventListener("change", () => updateErrors(input));
// });
import { validateForm } from "./validators.js";

// Получение всех инпутов
const allInputs = document.querySelectorAll("input");

// Объект для хранения сообщений об ошибках для каждого поля формы
const validationErrors = {};

allInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const data = {};

    allInputs.forEach((input) => {
      data[input.name] = input.value;
    });

    // Валидация только для текущего поля
    const errors = validateForm(data);

    validationErrors[input.name] = errors[input.name];

    // Обновление сообщения об ошибке только для текущего поля
    const errorElement = document.querySelector(`#${input.name}-error`);

    errorElement.textContent = validationErrors[input.name] || "";
  });
});