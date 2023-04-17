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
  chooseExpenses: function () {
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
  },
  detectDayBudget: function () {
    appData.moneyPerDay = (appData.budget / 30).toFixed();
    alert("Ежедневный бюджет: " + appData.moneyPerDay);
  },
  detectLevel: function () {
    if (appData.moneyPerDay < 100) {
      console.log("Минимальный уровень достатка");
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      console.log("Средний уровень достатка");
    } else if (appData.moneyPerDay > 2000) {
      console.log("Высокий уровень достатка");
    } else {
      console.log("Произошла ошибка");
    }
  },
  checkSavings: function () {
    if (appData.savings == true) {
      let save = +prompt("Какова сумма накоплений?"),
        persent = +prompt("Под какой процент?");

      appData.monthIncome = (save / 100 / 12) * persent;
      alert(
        "Доход в месяц с вашего депозита: " + appData.monthIncome.toFixed(1)
      );
    }
  },
  chooseOptExpenses: function () {
    for (let i = 0; i < 3; i++) {
      let itemOptExpenses = prompt("Статья необязательных расходов?");
      appData.optionalExpenses[i + 1] = itemOptExpenses;
    }
  },
  chooseIncome: function () {
    let items = prompt(
      "Что принесет дополнительный доход? (Перечислите через запятую)",
      ""
    ); // в конце в скобках пустая строка для совместимости с IE
    while (typeof items !== "string" || items == null || items == "") {
      items = prompt("Еще раз напишите, что приносит доход, через запятую");
      console.log(items);
      console.log(typeof items);
    }
    appData.income.push(prompt("Может что то еще хотите добавить?"));
    appData.income = items.split(", ");
    appData.income.sort();
    appData.income.forEach(function (value, index) {
      alert("Способы доп. заработка: " + value);
    });
  },
};

function allData() {
  console.log("Наша программа включает в себя данные: ");
  let index = 0;
  for (let key in appData) {
    index++;
    console.log(index + ". " + key + ": " + appData[key]);
  }
}
