###Установка Gulp
Предворительно убедитесь что у Вас установлен [Node.js](./doc/about-boilerplate.md)
Возможно у Вас уже установлен **gulp**, но Вы не помните - введите данную команду в терминал:
    ```
    gulp -v
    ```
Если не вывело версию **gulp**'a, то вы можете установить его c помощью команды:
    ```
    npm intall gulp --global
    ```
###Основные команды для работы
Основная команда - запуск локального сервера, watcher следит за измененями (препроцессора stylus,)
```
gulp
```



###Список плагинов Gulp ([package.json](../package.json)):

Server
 - browser-sync gulp        (локальный сервер)

HTML
 -  gulp-jade       (препроцессор html)
 -  gulp-htmlhint    (валидация html)
 -  gulp-htmlmin     (минификация html)

CSS
 -  gulp-stylus      (препроцессор CSS)
 -  gulp-concat-css     (конкатенация CSS)
 -  gulp-minify-css     (минификация CSS)
 -  gulp-uncss  (удаление неиспользованного CSS, оптимизация)
 -  gulp-autoprefixer     (автоматически расставляет префиксы в CSS)

JavaScript
 -  gulp-concat      (конкатенация js)
 -  gulp-uglify      (минификация js)

Files
 -  gulp-google-cdn      (заменяет ссылки бибдиотек(локальные) на google cdn)
 -  gulp-rename      (переименовывает файлы)
 -  gulp-main-bower-files        (переопределяет/вытаскивает из скачанных bower библиотек файлы)
 -  wiredep     (подключает библиотеки)

Images
 -  gulp-imagemin        (сжатие и оптимизация изображений)

Others
 - gulp-notify      (показывает уведомления)