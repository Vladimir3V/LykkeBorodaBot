console.log("my bot app");

var TelegramBot = require('node-telegram-bot-api');
var tg;
tt = 0;
function create() {
    var token = "448519348:AAGp1POn-0I53H1OX75nDmKVivQKs7OpXlU";
    tg = new TelegramBot(token, {
        polling: true,
        keyboard: ['start']
    });
    tg.on('message', onMessage);
}
function onMessage(message) {
    console.log('message:', message);
    if (message.text && message.text.toLowerCase() === '/start') {
        sendStartMessage(message);
    } else if (message.text && message.text.toLowerCase() === '45min') {
        var text45start = "Время пошло, сынок",
            text45end = "Расслабся, лошок";
        tg.sendMessage(message.chat.id, text45start);

        tt = setTimeout(function () {
            return (tg.sendMessage(message.chat.id, text45end));
        }, 2700);
    } else if (message.text === '15min') {
        var text15start = "Решил расслабится? Иди поищи пакет",
            text15end = "порабоать не хочешь? Мудила";
        tg.sendMessage(message.chat.id, text15start);
        clearTimeout(tt);
        tt = setTimeout(function () {
            return (tg.sendMessage(message.chat.id, text15end));
        }, 900);
    } else if (message.text === 'stop') {
        clearTimeout(tt);
        var helpText = "Ну ты и ссыкло. Иди кури крапиву.";
        tg.sendMessage(message.chat.id, helpText);
    }
}

// *********************************************
function sendStartMessage(message) {
    var text = 'Запускаем помодорку';
    //
    var bButton45 = {
        text:"45min",
        callback_data:'45min'
    };
    //
    var bButton15 = {
        text:"15min",
        callback_data:'15min'
    };
    //
    var bButtonStop = {
        text:"stop",
        callback_data:'stop'
    };
    //
    var options = {};
    options.reply_markup = {};
    options.reply_markup.keyboard = [];
    options.reply_markup.keyboard.push([bButton45, bButton15, bButtonStop]);
    tg.sendMessage(message.chat.id, text, options);
}
create();