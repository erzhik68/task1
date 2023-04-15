let money = prompt("Ваш бюджет на месяц?", ""),
  time = prompt("Введите дату в формате YYYY-MM-DD", "");

const appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
};

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
  }
}

appData.moneyPerDay = (appData.budget / 30).toFixed();
alert("Бюджет на 1 день: " + appData.moneyPerDay);