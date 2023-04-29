"use strict";

// Получить кнопку "Начать расчет" через id
// let startButton = document.querySelector("#start");
let startBtn = document.getElementById("start");

// Получить все блоки в правой части программы через классы
// (которые имеют класс название-value, начиная с и заканчивая)
let budgetValue = document.getElementsByClassName("budget-value")[0];
let daybudgetValue = document.getElementsByClassName("daybudget-value")[0];
let levelValue = document.getElementsByClassName("level-value")[0];
let expensesValue = document.getElementsByClassName("expenses-value")[0];
let optionalExpensesValue = document.getElementsByClassName(
  "optionalexpenses-value"
)[0];
let incomeValue = document.getElementsByClassName("income-value")[0];
let monthsavingsValue =
  document.getElementsByClassName("monthsavings-value")[0];
let yearsavingsValue = document.getElementsByClassName("yearsavings-value")[0];

// Получить поля(input) c обязательными расходами через класс. (class=”expenses-item”)
let expensesItem = document.getElementsByClassName("expenses-item");

// Получить кнопки “Утвердить” и “Рассчитать” через Tag, каждую в своей переменной.
let expensesItemBtn = document.getElementsByTagName("button")[0];
let optionalExpensesBtn = document.getElementsByTagName("button")[1];
let countBudgetBtn = document.getElementsByTagName("button")[2];

// Получить поля для ввода необязательных расходов
// (optionalexpenses-item) при помощи querySelectorAll
let optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item");

// Получить оставшиеся поля через querySelector
// (статьи возможного дохода, чекбокс, сумма, процент, год, месяц, день)
let chooseIncome = document.querySelector(".choose-income");
let checkSavings = document.querySelector("#savings");
let chooseSum = document.querySelector(".choose-sum");
let choosePercent = document.querySelector(".choose-percent");
let yearValue = document.querySelector(".year-value");
let monthValue = document.querySelector(".month-value");
let dayValue = document.querySelector(".day-value");

let money, time;

startBtn.addEventListener("click", function () {
  expensesItemBtn.disabled = false;
  optionalExpensesBtn.disabled = false;
  countBudgetBtn.disabled = false;

  time = prompt("Введите дату в формате YYYY-MM-DD", "");
  money = +prompt("Ваш бюджет на месяц?", "");

  while (isNaN(money) || money == null || money == "") {
    money = +prompt("Ваш бюджет на месяц?", "");
  }
  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  // если элемент input, то вносит значение лучше в value, а не через textContent
  yearValue.value = new Date(Date.parse(time)).getFullYear();
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
  dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesItemBtn.addEventListener("click", function () {
  let sum = 0;

  for (let i = 0; i < expensesItem.length; i++) {
    let itemOfExpenses = expensesItem[i].value,
      moneyItemOfExpenses = expensesItem[++i].value;

    if (
      typeof itemOfExpenses != null &&
      typeof moneyItemOfExpenses != null &&
      itemOfExpenses != "" &&
      moneyItemOfExpenses != ""
    ) {
      appData.expenses[itemOfExpenses] = moneyItemOfExpenses;
      console.log("done");
      sum += +moneyItemOfExpenses;
    } else {
      i = i - 1;
    }
  }
  expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener("click", function () {
  for (let i = 0; i < optionalExpensesItem.length; i++) {
    let itemOptExpenses = optionalExpensesItem[i].value;
    appData.optionalExpenses[i] = itemOptExpenses;
    optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
  }
});

countBudgetBtn.addEventListener("click", function () {
  if (expensesValue.textContent != "") {
    if (appData.budget != undefined) {
      appData.moneyPerDay = (
        (appData.budget - expensesValue.textContent) /
        30
      ).toFixed();
      daybudgetValue.textContent = appData.moneyPerDay;

      if (appData.moneyPerDay < 100) {
        levelValue.textContent = "Минимальный уровень достатка";
      } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        levelValue.textContent = "Средний уровень достатка";
      } else if (appData.moneyPerDay > 2000) {
        levelValue.textContent = "Высокий уровень достатка";
      } else {
        levelValue.textContent = "Произошла ошибка";
      }
    } else {
      daybudgetValue.textContent = "Произошла ошибка";
    }
  } else {
    alert("Для правильного расчета сначала введите обязательные расходы!");
  }
});

chooseIncome.addEventListener("input", function () {
  let items = chooseIncome.value;
  appData.income = items.split(", ");
  incomeValue.textContent = appData.income;
});

checkSavings.addEventListener("click", function () {
  if (appData.savings == true) {
    appData.savings = false;
  } else {
    appData.savings = true;
  }
});

chooseSum.addEventListener("input", function () {
  if (appData.savings == true) {
    let sum = +chooseSum.value,
      percent = +choosePercent.value;

    appData.monthIncome = (sum / 100 / 12) * percent;
    appData.yearIncome = (sum / 100) * percent;

    monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

choosePercent.addEventListener("input", function () {
  if (appData.savings == true) {
    let sum = +chooseSum.value,
      percent = +choosePercent.value;

    appData.monthIncome = (sum / 100 / 12) * percent;
    appData.yearIncome = (sum / 100) * percent;

    monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

const appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
};
