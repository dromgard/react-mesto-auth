# Frontend для проекта "Mesto"

:exclamation:С 26.11.2022 разработка проекта ведется в общем с фронтендом репозитории - https://github.com/dromgard/react-mesto-api-full

### Описание проекта:

Frontend включает в себя верстку и функционал на ReactJS. Реализованы защищенные роуты, регистрация/авторизация, API до собственного Backend, адаптивная верстка.

### Используемые технологии:

<img src="https://img.shields.io/badge/ReactJS-blue?logo=React&logoColor=white" alt="ReactJS"/> <img src="https://img.shields.io/badge/CSS3-blue?logo=css3&logoColor=white" alt="CSS3"/> <img src="https://img.shields.io/badge/HTML5-blue?logo=html5&logoColor=white" alt="HTML5"/>

- Обращение к API реализовано через fetch запросы.
- Для хранения токена и поисковых запросов используется localStorage.
- Переход между страницами и защищенные роуты релизованы через react-router-dom v.6.
- В проекте применена адаптивная верстка, сайт отлично выглядит на экранах с большим и маленьким разрешением. Именование классов по БЭМ.
- Для адаптивной верстки в CSS используются медиазапросы.
- Для верстки блоков сайта использованы flex и grid.

### Макет:

[Макет сайта - https://www.figma.com/file/5H3gsn5lIGPwzBPby9jAOo/JavaScript.-Sprint-12?node-id=0%3A1&t=6KrcvzkxBXtSXVkj-0](https://www.figma.com/file/5H3gsn5lIGPwzBPby9jAOo/JavaScript.-Sprint-12?node-id=0%3A1&t=6KrcvzkxBXtSXVkj-0)

### Публикация в интернете:

[Frontend - http://dromgard.nomoredomains.club/](http://dromgard.nomoredomains.club/)

### Запуск проекта:

Требования:

- Node.js >= 14;
- npm >= 6.14;

Frontend:

- `npm start` — запускает проект в режиме разработчика.
- `npm run build` — собирает проект для продакшена в папочку `build`.
