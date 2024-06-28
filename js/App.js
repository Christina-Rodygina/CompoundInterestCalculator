const descriptionBlock = `
<div>
    <div class="description__banner">
        <img src="../assets/banner.svg" alt="Banner" class="description__img"/>
    </div>
    <div class="description__info">
        <h1>Сложный процент</h1>
        <span>
            Сложный процент — это процент, который начисляется на начальную сумму вложений, а также на проценты, накопленные за предыдущие периоды. Начисление сложных процентов предполагает реинвестирование полученного дохода.
        </span>
    </div>
</div>
`

const calculatorForm = `
    <div class="calculator__form">
        <h6>Валюта</h6>
        <div class="calculator__tabs">
            <input name="currency" id="RUB" type="radio" checked value="RUB">
            <label for="RUB" class="calculator__type-label" onclick="change_currency('RUB')">рубль</label>
            <input name="currency" id="USD" type="radio" value="USD">
            <label for="USD" class="calculator__type-label" onclick="change_currency('USD')">доллар</label>
            <input name="currency" id="EUR" type="radio" value="EUR">
            <label for="EUR" class="calculator__type-label" onclick="change_currency('EUR')">евро</label>
        </div>
        <h6>Стартовый капитал</h6>
        <div class="form__row">
            <input type="number" placeholder="100 000" id="startupInput" oninput="generateTable()">
            <span class="mask mask__right">RUB</span>
        </div>
        <h6>Срок инвестирования</h6>
        <div class="form__row">
            <div class="calculator-input">
                <input type="number" class="calculator-input__value" name="time_value" id="startupTermInput" oninput="generateTable()">
                <div class="term__container" onclick="open_term()">
                    <span class="term__base">МЕСЯЦ</span>
                    <img src="../assets/arrow-down.svg" alt="Down" class="arrow-svg">
                    <div class="term__add-container">
                        <div class="term__internal-container">
                            <div class="time-type-selector__option css-10wo9uf-option selected" aria-disabled="false" id="react-select-3-option-0" tabindex="-1" role="option" aria-selected="false" onclick="change_term('месяц')">МЕСЯЦ</div>
                            <div class="time-type-selector__option time-type-selector__option--is-focused time-type-selector__option--is-selected css-tr4s17-option" aria-disabled="false" id="react-select-3-option-1" tabindex="-1" role="option" aria-selected="true" onclick="change_term('год')">ГОД</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h6>Дополнительные вложения в месяц</h6>
        <div class="form__row">
            <input type="number" placeholder="5 000" id="additionalAttachmentsInput" oninput="generateTable()">
            <span class="mask mask__right">RUB</span>
        </div>
        <div class="form__row">
            <div class="profit-withdrawal__container" onclick="open_profit()">
                <span>Выводим прибыль ежемесячно</span>
                <img src="../assets/arrow-down.svg" alt="Down" class="arrow-svg">
                <div class="profit-withdrawal__add-container">
                    <div class="profit-withdrawal__internal-container">
                        <div class="profit-withdrawal__item selected" aria-disabled="false" id="react-select-3-option-2" tabindex="-1" role="option" aria-selected="true" onclick="change_profit('first')">Выводим прибыль ежемесячно</div>
                        <div class="profit-withdrawal__item" aria-disabled="false" id="react-select-3-option-3" tabindex="-1" role="option" aria-selected="true" onclick="change_profit('last')">Реинвестировать ежемесячно</div>
                    </div>
                </div>
            </div>
        </div>
        <h6>Ставка в месяц</h6>
        <div class="form__row">
            <input type="text" placeholder="5.5" id="ratePerMonthInput" oninput="generateTable()">
            <span class="mask mask__percent">%</span>
        </div>
        <div class="result__container">
            <div class="result__blue-block">
                <h5>Результат инвестирования</h5>
                <span></span>
            </div>
        </div>
        <div class="graph__container">
            <h2 class="graph__info" id="warningMessageChart">Для отображения графика заполните все поля</h2>
            <div class="canvas-container" id="investmentChart" style="display: none;">
                <canvas id="myChart" class="canvas"></canvas>
            </div>
            <div class="statistics__footnotes" id="statisticsChart" style="display: none;">
                <div class="statistics__footnote">
                    <span class="statistics__footnote-icon background__blue-one"></span>
                    Капитал на начало срока
                </div>
                <div class="statistics__footnote">
                    <span class="statistics__footnote-icon background__green-three"></span>
                    Прибыль
                </div>
                <div class="statistics__footnote">
                    <span class="statistics__footnote-icon background__red"></span>
                    Сумма дополнительных вложений
                </div>
            </div>
        </div>
        <div class="detailed-calculation">
            <h3>Подробный расчет</h3>
            <h4 id="warningMessage">Для отображения подробного расчета заполните все поля</h4>
            <table id="investmentTable" style="display: none;">
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Капитал на начало срока</th>
                        <th>Сумма дополнительных вложений</th>
                        <th>Прибыль</th>
                        <th>Итог</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <!-- Данные будут добавлены с помощью JavaScript -->
                </tbody>
                <tfoot>
                    <tr>
                        <td>ИТОГИ ИНВЕСТИРОВАНИЯ</td>
                        <td id="totalStartCapital"></td>
                        <td id="totalAdditionalInvestment"></td>
                        <td id="totalProfit"></td>
                        <td id="totalSum"></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <button class="purchase">Купить торговую систему</button>
    </div>
`

// app.js
const appTemplate = `
    <main>
        <section class="compound-interest">
            ${descriptionBlock}
            ${calculatorForm}
        </section>
    </main>
`;


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('app').innerHTML = appTemplate;
});

// scripts

let currencySelected = "RUB";
let startupCapital = 0;
let startupTerm = 0;
let termSelected = "месяц";
let additionalAttachments = 0;
let profitSelected = "first";
let ratePerMonth = 0;

document.addEventListener('DOMContentLoaded', () => {
    const startupInput = document.getElementById('startupInput');
    const startupTermInput = document.getElementById('startupTermInput');
    const additionalAttachmentsInput = document.getElementById('additionalAttachmentsInput');
    const ratePerMonthInput = document.getElementById('ratePerMonthInput');

    const currencyInputs = document.querySelectorAll('input[name="currency"]');
    currencyInputs.forEach(input => {
        input.addEventListener('change', (event) => {
            change_currency(event.target.value);
        });
    });

    startupInput.addEventListener('input', (event) => {
        startupCapital = parseFloat(event.target.value);
        generateTable(); // Вызываем функцию после изменения данных
    });

    startupTermInput.addEventListener('input', (event) => {
        startupTerm = parseInt(event.target.value);
        generateTable(); // Вызываем функцию после изменения данных
    });

    additionalAttachmentsInput.addEventListener('input', (event) => {
        additionalAttachments = parseFloat(event.target.value);
        generateTable(); // Вызываем функцию после изменения данных
    });

    ratePerMonthInput.addEventListener('input', (event) => {
        ratePerMonth = parseFloat(event.target.value);
        generateTable(); // Вызываем функцию после изменения данных
    });
});

const change_currency = (currency) => {
    const items = document.querySelectorAll(".mask__right");
    if (currency) {
        items.forEach(item => {
            item.innerText = currency;
            currencySelected = currency;
        });
    } else {
        items.forEach(item => {
            item.innerText = "RUB";
        });
    }
    generateTable();
};

const change_term = (term) => {
    const month = document.getElementById("react-select-3-option-0")
    const age = document.getElementById("react-select-3-option-1")
    const termBase = document.querySelector(".term__base")
    if (term === "месяц") {
        if (!month.classList.contains("selected")) {
            month.classList.add("selected")
        }
        if (age.classList.contains("selected")) {
            age.classList.remove("selected")
        }
        termBase.innerText = "МЕСЯЦ"
        termSelected = "месяц"
    } else {
        if (!age.classList.contains("selected")) {
            age.classList.add("selected")
        }
        if (month.classList.contains("selected")) {
            month.classList.remove("selected")
        }
        termBase.innerText = "ГОД"
        termSelected = "год"
    }
    generateTable(); // Вызываем функцию после изменения данных
}

const open_term = () => {
    const section = document.querySelector(".term__add-container")
    if (section.classList.contains("open")) {
        section.classList.remove("open")
    } else {
        section.classList.add("open")
    }
}


const change_profit = (profit) => {
    const first = document.getElementById("react-select-3-option-2");
    const last = document.getElementById("react-select-3-option-3");
    const profitBase = document.querySelector(".profit-withdrawal__container span");
    if (profit === "first") {
        if (!first.classList.contains("selected")) {
            first.classList.add("selected");
        }
        if (last.classList.contains("selected")) {
            last.classList.remove("selected");
        }
        profitBase.innerText = "Выводим прибыль ежемесячно";
        profitSelected = "first";
    } else {
        if (!last.classList.contains("selected")) {
            last.classList.add("selected");
        }
        if (first.classList.contains("selected")) {
            first.classList.remove("selected");
        }
        profitBase.innerText = "Реинвестировать ежемесячно";
        profitSelected = "last";
    }
    generateTable(); // Вызываем функцию после изменения данных
}

const open_profit = () => {
    const section = document.querySelector(".profit-withdrawal__add-container")
    if (section.classList.contains("open")) {
        section.classList.remove("open")
    } else {
        section.classList.add("open")
    }
}

function generateTable() {
    if (isNaN(startupCapital) || isNaN(startupTerm) || isNaN(additionalAttachments) || isNaN(ratePerMonth) || startupTerm <= 0 || startupCapital <= 0 || ratePerMonth <= 0) {
        document.getElementById('warningMessage').style.display = 'block';
        document.getElementById('warningMessageChart').style.display = 'block';
        document.getElementById('investmentTable').style.display = 'none';
        document.getElementById('investmentChart').style.display = 'none';
        document.getElementById('statisticsChart').style.display = 'none';
        return;
    } else {
        document.getElementById('warningMessage').style.display = 'none';
        document.getElementById('warningMessageChart').style.display = 'none';
    }

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    let currentCapital = startupCapital;
    let totalAdditionalInvestment = 0;
    let totalProfitWithCompoundInterest = 0;
    let totalWithdrawnProfit = 0;

    const labels = [];
    const startCapitalData = [];
    const profitData = [];
    const additionalInvestmentData = [];

    // Вычисление для месяцев
    if (termSelected === "месяц") {
        for (let i = 1; i <= startupTerm; i++) {
            const month = new Date();
            month.setMonth(month.getMonth() + i - 1);
            const formattedMonth = month.toLocaleString('ru-RU', {month: 'long', year: 'numeric'}).toUpperCase();

            const additionalInvestment = i === 1 ? 0 : additionalAttachments;
            totalAdditionalInvestment += additionalInvestment;

            const profit = (currentCapital + additionalInvestment) * (ratePerMonth / 100);
            totalProfitWithCompoundInterest += profit;

            if (profitSelected === 'first') {
                totalWithdrawnProfit += profit;
            } else {
                currentCapital += profit;
            }

            const endCapital = currentCapital + additionalInvestment;

            labels.push(formattedMonth);
            startCapitalData.push(currentCapital);
            profitData.push(profit);
            additionalInvestmentData.push(totalAdditionalInvestment);

            const row = `
                <tr>
                    <td>${formattedMonth}</td>
                    <td>${currentCapital.toLocaleString('ru-RU', {style: 'currency', currency: currencySelected})}</td>
                    <td>${additionalInvestment.toLocaleString('ru-RU', {style: 'currency', currency: currencySelected})}</td>
                    <td>${profit.toLocaleString('ru-RU', {style: 'currency', currency: currencySelected})}</td>
                    <td>${endCapital.toLocaleString('ru-RU', {style: 'currency', currency: currencySelected})}</td>
                </tr>
            `;

            tableBody.innerHTML += row;
            currentCapital = endCapital;
        }
    }
    // Вычисление для годов
    else if (termSelected === "год") {
        for (let i = 1; i <= startupTerm; i++) {
            const year = new Date();
            year.setFullYear(year.getFullYear() + i - 1);
            const formattedYear = year.toLocaleString('ru-RU', {year: 'numeric'});

            const additionalInvestment = i === 1 ? additionalAttachments * 11 : additionalAttachments * 12;
            totalAdditionalInvestment += additionalInvestment;

            const profit = (currentCapital + additionalInvestment) * (ratePerMonth / 100) * 12;
            totalProfitWithCompoundInterest += profit;

            if (profitSelected === 'first') {
                totalWithdrawnProfit += profit;
            } else {
                currentCapital += profit;
            }

            const endCapital = currentCapital + additionalInvestment;

            labels.push(formattedYear);
            startCapitalData.push(currentCapital);
            profitData.push(profit);
            additionalInvestmentData.push(totalAdditionalInvestment);

            const row = `
                <tr>
                    <td>${formattedYear}</td>
                    <td>${currentCapital.toLocaleString('ru-RU', {style: 'currency', currency: currencySelected})}</td>
                    <td>${additionalInvestment.toLocaleString('ru-RU', {style: 'currency', currency: currencySelected})}</td>
                    <td>${profit.toLocaleString('ru-RU', {style: 'currency', currency: currencySelected})}</td>
                    <td>${endCapital.toLocaleString('ru-RU', {style: 'currency', currency: currencySelected})}</td>
                </tr>
            `;

            tableBody.innerHTML += row;
            currentCapital = endCapital;
        }
    }

    // Обновление данных для графика
    updateChart(labels, startCapitalData, profitData, additionalInvestmentData, currentCapital);

    // Обновление итоговых значений в таблице
    document.getElementById('totalAdditionalInvestment').innerText = totalAdditionalInvestment.toLocaleString('ru-RU', {
        style: 'currency',
        currency: currencySelected
    });
    document.getElementById('totalProfit').innerText = totalProfitWithCompoundInterest.toLocaleString('ru-RU', {
        style: 'currency',
        currency: currencySelected
    });
    document.getElementById('totalSum').innerText = currentCapital.toLocaleString('ru-RU', {
        style: 'currency',
        currency: currencySelected
    });
    document.querySelector(".result__blue-block span").innerText = currentCapital.toLocaleString('ru-RU', {
        style: 'currency',
        currency: currencySelected
    });

    // Показываем таблицу и график
    document.getElementById('investmentTable').style.display = 'table';
    document.getElementById('investmentChart').style.display = 'block';
    document.getElementById('statisticsChart').style.display = 'block';
}

function updateChart(labels, startCapitalData, profitData, additionalInvestmentData, currentCapital) {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Проверяем, существует ли текущий экземпляр графика и уничтожаем его перед созданием нового
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    // Создаем новый экземпляр графика
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Прибыль',
                    data: profitData,
                    borderColor: '#58ad3b',
                    pointRadius: 6,
                    pointBackgroundColor: '#58ad3b',
                    backgroundColor: 'rgba(88, 173, 59, 0.6)', // Цвет фона под линией
                    fill: true, // Заполняем под линией цветом
                    cubicInterpolationMode: 'monotone',
                },
                {
                    label: 'Сумма доп. вложений',
                    data: additionalInvestmentData,
                    borderColor: '#dc3c3c',
                    pointRadius: 6,
                    pointBackgroundColor: '#dc3c3c',
                    backgroundColor: 'rgba(220, 60, 60, 0.7)', // Цвет фона под линией
                    fill: true, // Заполняем под линией цветом
                    cubicInterpolationMode: 'monotone',
                },
                {
                    label: 'Капитал на начало срока',
                    data: startCapitalData,
                    borderColor: '#0072ff',
                    pointRadius: 6,
                    pointBackgroundColor: '#0072ff',
                    backgroundColor: 'rgba(0, 114, 255, 0.6)', // Цвет фона под линией
                    fill: true, // Заполняем под линией цветом
                    cubicInterpolationMode: 'monotone',
                },
            ]
        },
        options: {
            responsive: true, // График будет растягиваться на всю ширину
            maintainAspectRatio: false, // Отключаем сохранение соотношения сторон
            interaction: {
                mode: 'nearest',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            plugins: {
                legend: {
                    position: "none"
                },
                tooltip: {
                    enabled: true, // Включение/выключение всплывающей подсказки
                    position: 'nearest',
                    callbacks: {
                        title: function(tooltipItems) {
                            // Здесь возвращаем заголовок (например, месяц и год)
                            return `${labels[tooltipItems[0].dataIndex]}`;
                        },
                        label: function(tooltipItem) {
                            let datasetIndex = tooltipItem.datasetIndex;
                            let datasetLabel;

                            if (datasetIndex === 0) {
                                datasetLabel = 'Прибыль';
                            } else if (datasetIndex === 1) {
                                datasetLabel = 'Сумма дополнительных вложений';
                            } else if (datasetIndex === 2) {
                                datasetLabel = 'Капитал на начало срока';
                            }

                            return `${datasetLabel}`;
                        },
                        footer: function(tooltipItem) {
                            let value = tooltipItem[0].formattedValue;
                            let formattedValue = currentCapital.toLocaleString('ru-RU', {
                                style: 'currency',
                                currency: currencySelected
                            });
                            return `${formattedValue}`;
                        }
                    },
                    // Дополнительные стили
                    backgroundColor: '#fff', // Фон всплывающей подсказки
                    titleColor: "#000",
                    titleFont: {
                        size: 16, // Размер шрифта заголовка
                        weight: 500, // Толщина шрифта заголовка
                        family: 'Inter Tight', // Семейство шрифта заголовка
                    },
                    bodyColor: "#000",
                    bodyFont: {
                        size: 16, // Размер шрифта тела
                        weight: 500, // Толщина шрифта тела
                        family: 'Inter Tight', // Семейство шрифта тела
                    },
                    footerColor: "#0072ff",
                    footerFont: {
                        size: 16, // Размер шрифта нижнего колонтитула
                        weight: 500, // Толщина шрифта нижнего колонтитула
                        family: 'Inter Tight', // Семейство шрифта нижнего колонтитула
                    },
                    borderColor: 'rgba(255, 255, 255, 0.8)', // Цвет границы
                    borderWidth: 1, // Ширина границы
                    cornerRadius: 5, // Радиус углов
                    caretSize: 6, // Размер указателя (стрелочки)
                    padding: 10, // Внутренний отступ
                    boxPadding: 5, // Внутренний отступ коробки
                    displayColors: false // Отключить отображение цветов
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                    ticks: {
                        font: {
                            weight: '700',
                        },
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        font: {
                            size: 16,
                            weight: '700',
                        },
                    },
                },
            },
        }
    });
    window.myChart.update();
}