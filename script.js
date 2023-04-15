let money, time;

function start() {
  money = +prompt("Ваш бюджет на месяц?", "");
  time = prompt("Введите дату в формате YYYY-MM-DD", "");

  while (isNaN(money) || money == null || money == "") {
    money = +prompt("Ваш бюджет на месяц?", "");
  }
}
start();

const appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: true,
};

function chooseExpenses() {
  for (let i = 0; i < 2; i++) {
    let itemOfExpenses = prompt(
        "Введите обязательную статью расходов в этом месяце",
        ""
      ),
      moneyItemOfExpenses = +prompt("Во сколько обойдется?", "");

    if (
      typeof itemOfExpenses != null &&
      typeof moneyItemOfExpenses != null &&
      itemOfExpenses != "" &&
      moneyItemOfExpenses != ""
    ) {
      appData.expenses[itemOfExpenses] = moneyItemOfExpenses;
      console.log("done");
    } else {
      i = i - 1;
    }
  }
}
chooseExpenses();

function chooseOptExpenses() {
  for (let i = 0; i < 3; i++) {
    let itemOptExpenses = prompt("Статья необязательных расходов?");
    appData.optionalExpenses[i + 1] = itemOptExpenses;
  }
}
chooseOptExpenses();

function detectDayBudget() {
  appData.moneyPerDay = (appData.budget / 30).toFixed();
  alert("Ежедневный бюджет: " + appData.moneyPerDay);
}
detectDayBudget();

function detectLevel() {
  if (appData.moneyPerDay < 100) {
    console.log("Минимальный уровень достатка");
  } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
    console.log("Средний уровень достатка");
  } else if (appData.moneyPerDay > 2000) {
    console.log("Высокий уровень достатка");
  } else {
    console.log("Произошла ошибка");
  }
}
detectLevel();

function checkSavings() {
  if (appData.savings == true) {
    let save = +prompt("Какова сумма накоплений?"),
      persent = +prompt("Под какой процент?");

    appData.monthIncome = (save / 100 / 12) * persent;
    alert("Доход в месяц с вашего депозита: " + appData.monthIncome.toFixed(1));
  }
}
checkSavings();
