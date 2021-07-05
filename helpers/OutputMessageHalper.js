class OutputMessageHalper{
    getHtmlBars(item, d){
        return `
<b>Я нашла заведения, которые находятся недальше, чем 3 км от тебя.</b>
            
<i>Название:</i> <strong>${item.name}</strong>

<i>Телефон:</i> ${item.telephone}

<i>Адрес:</i> <strong>${item.addres}</strong>

<i>Рейтинг:</i> ${item.rate}

<i>Время работы:</i> <strong>${item.work_time}</strong>

<i>Находится от вас в:</i> ${d} км          
${item.picture}
        `
    }
}
module.exports = new OutputMessageHalper()