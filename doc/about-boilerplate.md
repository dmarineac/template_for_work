#Front-end app boilerplate / Шаблон для проектов
###Description / Описание

Для работы с шаблоном у Вас должен быть установлен:
   
   - Node.js[>>](nodejsInfo.md)
   - Gulp   [>>](gulpInfo.md)
   - Bower  [>>](bowerInfo.md)
    
Какие пакеты  входят для работы со стартовым шаблоном:

    - Gulp(build system)
    - Bower(packages manager)
    - Jade(HTML preprocessor)
    - Stylus(CSS preprocessor)


### Installation / Установка:
1. Копируем в папку проекта, все файлы

2. Затем, переходим через терминал в папку с проектом и вводим команду:
    ```
    npm init
    ```


Далее. Чтобы обновить все пакеты **npm** (описанные в **package.json**) введите команду:
```
npm update
```

И последнее. Чтобы обновить все библиотеки **bower**'a, введите:
```
bower init
```
Затем:
```
bower update
```
Все готово. Можно использовать. Полный список команд для работы можно посмотреть [тут](gulpInfo.md)

# Use / Использование:

###Список команд для работы gulp
    gulp    (основная команда, запускает локальный сервер, watcher следит за изменениями в директориях)
    gulp build


[//]: # (тут ваш комментарий)




###Project structure / Структура проекта

|-app/                                      исходникики проекта
    |--bower_components/                библиотеки bower'a
    |--styles/      стили (CSS Preprocessor)
    |--img/
    |--js/
    |--template             повторяющиеся куски кода html(footer, header and etc)
    |--fonts/
    |--sprite/
    |--favicon.ico
    |--index.html
|-doc/
|-node modules/
|-public/                                    продакшн версия, результат сборки(конконтенация,минификация и т.д.),каждый раз перед сборкой папка очищается
    |--css/                 css файлы(Важно! не редактируйте файл style.min.css ,используйте препроцессор)

|-.gitignore      тут находятся список папок/файлов которые не будут входить в комиты git'a

