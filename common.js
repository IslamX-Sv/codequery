// Общие функции для всех страниц
document.addEventListener('DOMContentLoaded', function() {
    initPageLanguageSwitcher();
    updateFooterLinks();
    translatePageContent(getCurrentLanguage());
});

// Получить текущий язык
function getCurrentLanguage() {
    return localStorage.getItem('codequery_lang') || 'ru';
}

// Инициализация языкового переключателя для страниц
function initPageLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    if (!langButtons.length) return;
    
    const currentLang = getCurrentLanguage();
    
    // Устанавливаем активную кнопку
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
        
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Сохраняем язык
            localStorage.setItem('codequery_lang', lang);
            
            // Обновляем кнопки
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Обновляем содержимое страницы
            translatePageContent(lang);
            
            // Показываем уведомление
            showNotification(lang === 'ru' ? 'Язык изменен на русский' : 'Language changed to English');
        });
    });
}

// Перевод содержимого страницы
function translatePageContent(lang) {
    const translations = {
        ru: {
            // Навигация
            'login': 'Вход',
            'register': 'Регистр',
            
            // FAQ страница
            'faqTitle': 'FAQ — Часто задаваемые вопросы',
            'faqQuestion1': 'Что такое CodeQuery?',
            'faqAnswer1': 'CodeQuery — это инструмент для умного поиска и анализа кода. Он помогает быстро находить функции, классы, зависимости и логику работы в проектах любого размера.',
            
            'faqQuestion2': 'Для кого предназначен CodeQuery?',
            'faqAnswer2': 'CodeQuery подходит для:',
            'faqList2_1': 'разработчиков',
            'faqList2_2': 'тимлидов',
            'faqList2_3': 'code reviewer\'ов',
            'faqList2_4': 'студентов и начинающих программистов',
            'faqAnswer2_extra': 'Если ты работаешь с кодом — CodeQuery сэкономит тебе время.',
            
            'faqQuestion3': 'Чем CodeQuery отличается от обычного поиска?',
            'faqAnswer3_1': 'Обычный поиск ищет текст.',
            'faqAnswer3_2': 'CodeQuery понимает структуру кода:',
            'faqList3_1': 'функции и классы',
            'faqList3_2': 'вызовы и зависимости',
            'faqList3_3': 'контекст использования',
            'faqAnswer3_extra': 'Это делает поиск точнее и полезнее.',
            
            'faqQuestion4': 'Какие языки программирования поддерживаются?',
            'faqAnswer4_1': 'На старте CodeQuery поддерживает популярные языки, а список будет расширяться.',
            'faqAnswer4_2': 'Мы постоянно добавляем новые языки и улучшения.',
            
            'faqQuestion5': 'Безопасен ли мой код?',
            'faqAnswer5_1': 'Да.',
            'faqAnswer5_2': 'CodeQuery не передаёт код третьим лицам и не использует его без вашего разрешения. Безопасность и конфиденциальность — наш приоритет.',
            
            'faqQuestion6': 'Нужно ли что-то устанавливать?',
            'faqAnswer6_1': 'CodeQuery работает через сайт.',
            'faqAnswer6_2': 'Никакой сложной установки — просто загрузи или укажи код и начни работу.',
            
            'faqQuestion7': 'Можно ли использовать CodeQuery для больших проектов?',
            'faqAnswer7_1': 'Да!',
            'faqAnswer7_2': 'CodeQuery оптимизирован для работы как с небольшими проектами, так и с крупными кодовыми базами.',
            
            'faqQuestion8': 'Планируются ли новые функции?',
            'faqAnswer8_1': 'Конечно. В разработке:',
            'faqList8_1': 'графы зависимостей',
            'faqList8_2': 'более умные запросы',
            'faqList8_3': 'интеграции с IDE',
            'faqList8_4': 'улучшенная визуализация кода',
            
            'faqQuestion9': 'Как связаться с командой?',
            'faqAnswer9_1': 'Если у тебя есть идеи, вопросы или предложения — свяжись с нами:',
            'faqContactEmail': 'Email: support@codequery.com',
            'faqContactTelegram': 'Telegram: @codequery_support',
            'faqContactGitHub': 'GitHub: github.com/codequery',
            
            // About страница
            'aboutTitle': 'О нас',
            'aboutHeader': 'CodeQuery — это инструмент, созданный разработчиками для разработчиков.',
            'aboutText1': 'Мы понимаем, насколько сложно бывает разбираться в большом количестве кода, особенно в новых или унаследованных проектах. Поэтому наша цель — сделать поиск и анализ кода быстрым, понятным и удобным.',
            'aboutText2': 'CodeQuery помогает находить нужные функции, классы и зависимости, понимать структуру проекта и экономить время на рутинных задачах. Вместо бесконечного скроллинга и ручного поиска вы получаете точные ответы и чёткое понимание кода.',
            'aboutText3': 'Мы верим, что хороший инструмент должен быть:',
            'aboutList1': 'простым в использовании',
            'aboutList2': 'точным и быстрым',
            'aboutList3': 'полезным как для новичков, так и для опытных разработчиков',
            'aboutText4': 'Наша команда постоянно развивает CodeQuery, добавляя новые возможности, улучшая производительность и расширяя поддержку языков программирования.',
            'aboutHighlight': 'CodeQuery — это не просто поиск по коду. Это новый способ понимать код.',
            
            'missionTitle': 'Наша миссия',
            'missionText': 'Упростить работу разработчиков, предоставив им мощный инструмент для понимания и анализа кода. Мы стремимся сделать программирование более доступным и эффективным для всех.',
            
            'teamTitle': 'Наша команда',
            'teamText': 'Мы — группа разработчиков, которые сами сталкивались с проблемами поиска и понимания кода. Объединив наш опыт, мы создали CodeQuery, чтобы решить эти проблемы раз и навсегда.',
            'teamStat1': '50+',
            'teamStat1Label': 'Лет опыта',
            'teamStat2': '1000+',
            'teamStat2Label': 'Пользователей',
            'teamStat3': '24/7',
            'teamStat3Label': 'Поддержка',
            
            // Support страница
            'supportTitle': 'Техническая поддержка',
            'supportEmailTitle': 'Email поддержка',
            'supportEmailDesc': 'Пишите нам на почту',
            'supportEmailTime': 'Время ответа: 1-24 часа',
            
            'supportTelegramTitle': 'Telegram чат',
            'supportTelegramDesc': 'Быстрая помощь в реальном времени',
            'supportTelegramTime': 'Время ответа: 5-30 минут',
            
            'supportFaqTitle': 'Частые вопросы',
            'supportFaqDesc': 'Возможно, ответ уже есть в FAQ',
            'supportFaqLink': 'Перейти к FAQ',
            'supportFaqTime': 'Мгновенные ответы',
            
            'supportCommunityTitle': 'Сообщество',
            'supportCommunityDesc': 'Помощь от других пользователей',
            'supportCommunityLink': 'Присоединиться',
            'supportCommunityTime': 'Активное сообщество',
            
            'formTitle': 'Форма обратной связи',
            'formDesc': 'Заполните форму, и мы свяжемся с вами в ближайшее время',
            'formName': 'Ваше имя *',
            'formNamePlaceholder': 'Иван Иванов',
            'formEmail': 'Email *',
            'formEmailPlaceholder': 'ivan@example.com',
            'formCategory': 'Категория вопроса',
            'formCategory1': 'Техническая проблема',
            'formCategory2': 'Оплата и биллинг',
            'formCategory3': 'Предложение функции',
            'formCategory4': 'Другое',
            'formMessage': 'Сообщение *',
            'formMessagePlaceholder': 'Опишите вашу проблему или вопрос...',
            'formSubmit': 'Отправить сообщение',
            
            'hoursTitle': 'Часы работы поддержки',
            'hours1': 'Понедельник - Пятница',
            'hoursTime1': '09:00 - 21:00',
            'hours2': 'Суббота',
            'hoursTime2': '10:00 - 18:00',
            'hours3': 'Воскресенье',
            'hoursTime3': '12:00 - 18:00',
            'timezone': '(Московское время, GMT+3)',
            
            // Terms страница
            'termsTitle': 'Условия использования',
            'lastUpdated': 'Последнее обновление: 15 января 2024 года',
            'termsSection1': '1. Общие положения',
            'termsText1_1': '1.1. Используя сервис CodeQuery (далее — "Сервис"), вы соглашаетесь с настоящими Условиями использования.',
            'termsText1_2': '1.2. Сервис предоставляет доступ к AI-ассистенту для генерации кода на различных языках программирования.',
            'termsText1_3': '1.3. Администрация оставляет за собой право изменять условия без предварительного уведомления.',
            
            'termsSection2': '2. Политика оплаты и возвратов',
            'termsText2_1': '2.1. Все покупки подписок являются окончательными.',
            'termsText2_2': '2.2. Возврат средств осуществляется только в следующих случаях:',
            'termsList2_1': 'Техническая ошибка при списании средств',
            'termsList2_2': 'Повторное списание за одну и ту же подписку',
            'termsList2_3': 'Невозможность использования Сервиса по вине администрации',
            'termsText2_3': '2.3. Для запроса возврата необходимо обратиться в службу поддержки в течение 3 дней с момента оплаты.',
            'termsText2_4': '2.4. Пробный период в 10 бесплатных сообщений предоставляется один раз для каждого пользователя.',
            
            'termsSection3': '3. Ответственность пользователя',
            'termsText3_1': '3.1. Пользователь обязуется:',
            'termsList3_1': 'Не использовать Сервис для незаконной деятельности',
            'termsList3_2': 'Не генерировать вредоносный код',
            'termsList3_3': 'Не нарушать права интеллектуальной собственности',
            'termsList3_4': 'Не пытаться взломать или нарушить работу Сервиса',
            'termsText3_2': '3.2. Администрация не несет ответственности за:',
            'termsList3_5': 'Код, сгенерированный AI',
            'termsList3_6': 'Убытки, вызванные использованием сгенерированного кода',
            'termsList3_7': 'Перебои в работе Сервиса',
            
            'termsSection4': '4. Конфиденциальность',
            'termsText4_1': '4.1. Мы не храним исходный код, отправляемый для анализа.',
            'termsText4_2': '4.2. Запросы к AI сохраняются для улучшения качества Сервиса.',
            'termsText4_3': '4.3. Платежные данные обрабатываются через защищенные платежные системы.',
            
            'termsSection5': '5. Ограничения использования',
            'termsText5_1': '5.1. Запрещено:',
            'termsList5_1': 'Использование ботов для автоматических запросов',
            'termsList5_2': 'Обход ограничений пробного периода',
            'termsList5_3': 'Распространение подписки третьим лицам',
            'termsList5_4': 'Коммерческое использование без соответствующей лицензии',
            
            'termsAcceptance': 'Используя CodeQuery, вы подтверждаете, что прочитали и согласны с данными Условиями использования.',
            
            // Privacy страница
            'privacyTitle': 'Политика конфиденциальности',
            'privacySection1': '1. Какие данные мы собираем',
            'privacyText1_1': '1.1. При регистрации: имя, email, пароль.',
            'privacyText1_2': '1.2. При использовании Сервиса: запросы к AI, история бесед.',
            'privacyText1_3': '1.3. Технические данные: IP-адрес, тип браузера, время запросов.',
            'privacyText1_4': '1.4. Важно: Мы не сохраняем исходный код, который вы анализируете.',
            
            'privacySection2': '2. Как мы используем данные',
            'privacyText2_1': '2.1. Для работы Сервиса: обработка ваших запросов, показ истории.',
            'privacyText2_2': '2.2. Для улучшения: анализ анонимизированных запросов для обучения AI.',
            'privacyText2_3': '2.3. Для безопасности: обнаружение и предотвращение злоупотреблений.',
            'privacyText2_4': '2.4. Для поддержки: ответы на ваши обращения.',
            
            'privacySection3': '3. Защита данных',
            'privacyText3_1': '3.1. Шифрование: все данные передаются по защищенному соединению (HTTPS).',
            'privacyText3_2': '3.2. Пароли: хранятся в хэшированном виде.',
            'privacyText3_3': '3.3. Регулярные проверки безопасности.',
            'privacyText3_4': '3.4. Ограниченный доступ: только необходимый персонал имеет доступ к данным.',
            
            'privacySection4': '4. Файлы cookies',
            'privacyText4_1': '4.1. Технические cookies: необходимы для работы сайта (сессии, авторизация).',
            'privacyText4_2': '4.2. Аналитические cookies: помогают понять, как используется Сервис.',
            'privacyText4_3': '4.3. Вы можете отключить cookies в настройках браузера, но это может повлиять на работу Сервиса.',
            
            'privacySection5': '5. Третьи стороны',
            'privacyText5_1': '5.1. Мы не продаем и не передаем ваши данные третьим лицам.',
            'privacyText5_2': '5.2. Исключения:',
            'privacyList5_1': 'Платежные системы (для обработки оплат)',
            'privacyList5_2': 'Хостинг-провайдеры (для хранения данных)',
            'privacyList5_3': 'По требованию закона',
            
            'privacySection6': '6. Ваши права',
            'privacyText6_1': '6.1. Право на доступ: вы можете запросить информацию о ваших данных.',
            'privacyText6_2': '6.2. Право на исправление: можете обновить неточные данные.',
            'privacyText6_3': '6.3. Право на удаление: можете запросить удаление вашего аккаунта и данных.',
            'privacyText6_4': '6.4. Для реализации прав обращайтесь в поддержку: support@codequery.com',
            
            'privacyContact': 'Контакты по вопросам конфиденциальности',
            'privacyEmail': 'Email: privacy@codequery.com',
            'privacyResponse': 'Время ответа: в течение 7 рабочих дней',
            
            // Футер
            'country': 'Россия',
            'home': 'Главная',
            'faq': 'FAQ',
            'about': 'О нас',
            'support': 'Поддержка',
            'pricing': 'Цены',
            'privacy': 'Конфиденциальность',
            'rules': 'Правила',
            'terms': 'Условия'
        },
        en: {
            // Navigation
            'login': 'Login',
            'register': 'Sign Up',
            
            // FAQ page
            'faqTitle': 'FAQ — Frequently Asked Questions',
            'faqQuestion1': 'What is CodeQuery?',
            'faqAnswer1': 'CodeQuery is a tool for smart code search and analysis. It helps quickly find functions, classes, dependencies and logic in projects of any size.',
            
            'faqQuestion2': 'Who is CodeQuery for?',
            'faqAnswer2': 'CodeQuery is suitable for:',
            'faqList2_1': 'developers',
            'faqList2_2': 'team leads',
            'faqList2_3': 'code reviewers',
            'faqList2_4': 'students and beginner programmers',
            'faqAnswer2_extra': 'If you work with code — CodeQuery will save you time.',
            
            'faqQuestion3': 'How is CodeQuery different from regular search?',
            'faqAnswer3_1': 'Regular search looks for text.',
            'faqAnswer3_2': 'CodeQuery understands code structure:',
            'faqList3_1': 'functions and classes',
            'faqList3_2': 'calls and dependencies',
            'faqList3_3': 'usage context',
            'faqAnswer3_extra': 'This makes search more accurate and useful.',
            
            'faqQuestion4': 'Which programming languages are supported?',
            'faqAnswer4_1': 'At launch, CodeQuery supports popular languages, and the list will be expanded.',
            'faqAnswer4_2': 'We are constantly adding new languages and improvements.',
            
            'faqQuestion5': 'Is my code safe?',
            'faqAnswer5_1': 'Yes.',
            'faqAnswer5_2': 'CodeQuery does not share your code with third parties or use it without your permission. Security and privacy are our priority.',
            
            'faqQuestion6': 'Do I need to install anything?',
            'faqAnswer6_1': 'CodeQuery works through the website.',
            'faqAnswer6_2': 'No complex installation — just upload or point to the code and start working.',
            
            'faqQuestion7': 'Can CodeQuery be used for large projects?',
            'faqAnswer7_1': 'Yes!',
            'faqAnswer7_2': 'CodeQuery is optimized to work with both small projects and large codebases.',
            
            'faqQuestion8': 'Are new features planned?',
            'faqAnswer8_1': 'Of course. In development:',
            'faqList8_1': 'dependency graphs',
            'faqList8_2': 'smarter queries',
            'faqList8_3': 'IDE integrations',
            'faqList8_4': 'improved code visualization',
            
            'faqQuestion9': 'How to contact the team?',
            'faqAnswer9_1': 'If you have ideas, questions or suggestions — contact us:',
            'faqContactEmail': 'Email: support@codequery.com',
            'faqContactTelegram': 'Telegram: @codequery_support',
            'faqContactGitHub': 'GitHub: github.com/codequery',
            
            // About page
            'aboutTitle': 'About Us',
            'aboutHeader': 'CodeQuery is a tool created by developers for developers.',
            'aboutText1': 'We understand how difficult it can be to understand large amounts of code, especially in new or legacy projects. That\'s why our goal is to make code search and analysis fast, clear and convenient.',
            'aboutText2': 'CodeQuery helps find the right functions, classes and dependencies, understand project structure and save time on routine tasks. Instead of endless scrolling and manual searching, you get accurate answers and a clear understanding of the code.',
            'aboutText3': 'We believe a good tool should be:',
            'aboutList1': 'easy to use',
            'aboutList2': 'accurate and fast',
            'aboutList3': 'useful for both beginners and experienced developers',
            'aboutText4': 'Our team is constantly developing CodeQuery, adding new features, improving performance and expanding programming language support.',
            'aboutHighlight': 'CodeQuery is not just code search. It\'s a new way to understand code.',
            
            'missionTitle': 'Our Mission',
            'missionText': 'To simplify developers\' work by providing them with a powerful tool for understanding and analyzing code. We strive to make programming more accessible and effective for everyone.',
            
            'teamTitle': 'Our Team',
            'teamText': 'We are a group of developers who have faced code search and understanding problems ourselves. Combining our experience, we created CodeQuery to solve these problems once and for all.',
            'teamStat1': '50+',
            'teamStat1Label': 'Years of experience',
            'teamStat2': '1000+',
            'teamStat2Label': 'Users',
            'teamStat3': '24/7',
            'teamStat3Label': 'Support',
            
            // Support page
            'supportTitle': 'Technical Support',
            'supportEmailTitle': 'Email Support',
            'supportEmailDesc': 'Write to us by email',
            'supportEmailTime': 'Response time: 1-24 hours',
            
            'supportTelegramTitle': 'Telegram Chat',
            'supportTelegramDesc': 'Fast help in real time',
            'supportTelegramTime': 'Response time: 5-30 minutes',
            
            'supportFaqTitle': 'Frequently Asked Questions',
            'supportFaqDesc': 'Maybe the answer is already in FAQ',
            'supportFaqLink': 'Go to FAQ',
            'supportFaqTime': 'Instant answers',
            
            'supportCommunityTitle': 'Community',
            'supportCommunityDesc': 'Help from other users',
            'supportCommunityLink': 'Join',
            'supportCommunityTime': 'Active community',
            
            'formTitle': 'Feedback Form',
            'formDesc': 'Fill out the form and we will contact you as soon as possible',
            'formName': 'Your Name *',
            'formNamePlaceholder': 'John Smith',
            'formEmail': 'Email *',
            'formEmailPlaceholder': 'john@example.com',
            'formCategory': 'Question Category',
            'formCategory1': 'Technical problem',
            'formCategory2': 'Payment and billing',
            'formCategory3': 'Feature suggestion',
            'formCategory4': 'Other',
            'formMessage': 'Message *',
            'formMessagePlaceholder': 'Describe your problem or question...',
            'formSubmit': 'Send Message',
            
            'hoursTitle': 'Support Working Hours',
            'hours1': 'Monday - Friday',
            'hoursTime1': '09:00 - 21:00',
            'hours2': 'Saturday',
            'hoursTime2': '10:00 - 18:00',
            'hours3': 'Sunday',
            'hoursTime3': '12:00 - 18:00',
            'timezone': '(Moscow time, GMT+3)',
            
            // Terms page
            'termsTitle': 'Terms of Use',
            'lastUpdated': 'Last updated: January 15, 2024',
            'termsSection1': '1. General Provisions',
            'termsText1_1': '1.1. By using the CodeQuery service (hereinafter referred to as the "Service"), you agree to these Terms of Use.',
            'termsText1_2': '1.2. The Service provides access to an AI assistant for generating code in various programming languages.',
            'termsText1_3': '1.3. The Administration reserves the right to change the terms without prior notice.',
            
            'termsSection2': '2. Payment and Refund Policy',
            'termsText2_1': '2.1. All subscription purchases are final.',
            'termsText2_2': '2.2. Refunds are made only in the following cases:',
            'termsList2_1': 'Technical error when debiting funds',
            'termsList2_2': 'Repeated debiting for the same subscription',
            'termsList2_3': 'Inability to use the Service due to the fault of the Administration',
            'termsText2_3': '2.3. To request a refund, you must contact support within 3 days of payment.',
            'termsText2_4': '2.4. The trial period of 10 free messages is provided once for each user.',
            
            'termsSection3': '3. User Responsibility',
            'termsText3_1': '3.1. The User undertakes to:',
            'termsList3_1': 'Not use the Service for illegal activities',
            'termsList3_2': 'Not generate malicious code',
            'termsList3_3': 'Not violate intellectual property rights',
            'termsList3_4': 'Not attempt to hack or disrupt the Service',
            'termsText3_2': '3.2. The Administration is not responsible for:',
            'termsList3_5': 'Code generated by AI',
            'termsList3_6': 'Losses caused by the use of generated code',
            'termsList3_7': 'Service interruptions',
            
            'termsSection4': '4. Confidentiality',
            'termsText4_1': '4.1. We do not store the source code sent for analysis.',
            'termsText4_2': '4.2. Requests to AI are saved to improve the quality of the Service.',
            'termsText4_3': '4.3. Payment data is processed through secure payment systems.',
            
            'termsSection5': '5. Usage Limitations',
            'termsText5_1': '5.1. It is prohibited to:',
            'termsList5_1': 'Use bots for automatic requests',
            'termsList5_2': 'Bypass trial period restrictions',
            'termsList5_3': 'Share subscription with third parties',
            'termsList5_4': 'Commercial use without appropriate license',
            
            'termsAcceptance': 'By using CodeQuery, you confirm that you have read and agree to these Terms of Use.',
            
            // Privacy page
            'privacyTitle': 'Privacy Policy',
            'privacySection1': '1. What Data We Collect',
            'privacyText1_1': '1.1. During registration: name, email, password.',
            'privacyText1_2': '1.2. When using the Service: requests to AI, conversation history.',
            'privacyText1_3': '1.3. Technical data: IP address, browser type, request times.',
            'privacyText1_4': '1.4. Important: We do not store the source code you analyze.',
            
            'privacySection2': '2. How We Use Data',
            'privacyText2_1': '2.1. For the Service operation: processing your requests, showing history.',
            'privacyText2_2': '2.2. For improvement: analysis of anonymized requests for AI training.',
            'privacyText2_3': '2.3. For security: detecting and preventing abuse.',
            'privacyText2_4': '2.4. For support: responding to your requests.',
            
            'privacySection3': '3. Data Protection',
            'privacyText3_1': '3.1. Encryption: all data is transmitted over a secure connection (HTTPS).',
            'privacyText3_2': '3.2. Passwords: stored in hashed form.',
            'privacyText3_3': '3.3. Regular security checks.',
            'privacyText3_4': '3.4. Limited access: only necessary personnel have access to data.',
            
            'privacySection4': '4. Cookies',
            'privacyText4_1': '4.1. Technical cookies: necessary for the website operation (sessions, authorization).',
            'privacyText4_2': '4.2. Analytical cookies: help understand how the Service is used.',
            'privacyText4_3': '4.3. You can disable cookies in your browser settings, but this may affect the Service operation.',
            
            'privacySection5': '5. Third Parties',
            'privacyText5_1': '5.1. We do not sell or transfer your data to third parties.',
            'privacyText5_2': '5.2. Exceptions:',
            'privacyList5_1': 'Payment systems (for processing payments)',
            'privacyList5_2': 'Hosting providers (for data storage)',
            'privacyList5_3': 'By law requirement',
            
            'privacySection6': '6. Your Rights',
            'privacyText6_1': '6.1. Right to access: you can request information about your data.',
            'privacyText6_2': '6.2. Right to correction: you can update inaccurate data.',
            'privacyText6_3': '6.3. Right to deletion: you can request deletion of your account and data.',
            'privacyText6_4': '6.4. To exercise your rights, contact support: support@codequery.com',
            
            'privacyContact': 'Privacy Contact Information',
            'privacyEmail': 'Email: privacy@codequery.com',
            'privacyResponse': 'Response time: within 7 business days',
            
            // Footer
            'country': 'Russia',
            'home': 'Home',
            'faq': 'FAQ',
            'about': 'About',
            'support': 'Support',
            'pricing': 'Pricing',
            'privacy': 'Privacy',
            'rules': 'Rules',
            'terms': 'Terms'
        }
    };
    
    const texts = translations[lang];
    if (!texts) return;
    
    // Обновляем кнопки входа/регистрации
    document.querySelectorAll('.login-btn .btn-text').forEach(btn => {
        btn.textContent = texts.login;
    });
    
    document.querySelectorAll('.register-btn .btn-text').forEach(btn => {
        btn.textContent = texts.register;
    });
    
    // ОПРЕДЕЛЯЕМ ТЕКУЩУЮ СТРАНИЦУ И ПЕРЕВОДИМ КОНТЕНТ
    const currentPage = window.location.pathname;
    
    // FAQ страница
    if (currentPage.includes('faq.html')) {
        translateFAQPage(texts);
    }
    
    // About страница
    else if (currentPage.includes('about.html')) {
        translateAboutPage(texts);
    }
    
    // Support страница
    else if (currentPage.includes('support.html')) {
        translateSupportPage(texts);
    }
    
    // Terms страница
    else if (currentPage.includes('terms.html')) {
        translateTermsPage(texts);
    }
    
    // Privacy страница
    else if (currentPage.includes('privacy.html')) {
        translatePrivacyPage(texts);
    }
    
    // Обновляем футер
    updateFooterLinks(lang);
}

// Переводим FAQ страницу
function translateFAQPage(texts) {
    // Заголовок страницы
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        const icon = pageTitle.querySelector('i');
        pageTitle.innerHTML = `<i class="${icon ? icon.className : 'fas fa-question-circle'}"></i> ${texts.faqTitle}`;
    }
    
    // Все FAQ секции
    const faqSections = document.querySelectorAll('.faq-section');
    
    if (faqSections.length >= 9) {
        // Вопрос 1
        const q1 = faqSections[0];
        q1.querySelector('.faq-question h3').innerHTML = `<i class="fas fa-search"></i> ${texts.faqQuestion1}`;
        q1.querySelector('.faq-answer p').innerHTML = `<strong>CodeQuery</strong> ${texts.faqAnswer1.split('— это инструмент')[1]}`;
        
        // Вопрос 2
        const q2 = faqSections[1];
        q2.querySelector('.faq-question h3').innerHTML = `<i class="fas fa-user"></i> ${texts.faqQuestion2}`;
        const q2Answer = q2.querySelector('.faq-answer');
        q2Answer.querySelector('p:first-child').innerHTML = `<strong>CodeQuery</strong> ${texts.faqAnswer2.split('подходит для:')[1]}`;
        
        const ul2 = q2Answer.querySelector('ul');
        if (ul2) {
            const items = ul2.querySelectorAll('li');
            if (items.length >= 4) {
                items[0].textContent = texts.faqList2_1;
                items[1].textContent = texts.faqList2_2;
                items[2].textContent = texts.faqList2_3;
                items[3].textContent = texts.faqList2_4;
            }
        }
        q2Answer.querySelector('p:last-child').textContent = texts.faqAnswer2_extra;
        
        // Вопрос 3
        const q3 = faqSections[2];
        q3.querySelector('.faq-question h3').innerHTML = `<i class="fas fa-brain"></i> ${texts.faqQuestion3}`;
        const q3Answer = q3.querySelector('.faq-answer');
        const q3Paragraphs = q3Answer.querySelectorAll('p');
        if (q3Paragraphs.length >= 3) {
            q3Paragraphs[0].innerHTML = `<strong>Обычный поиск</strong> ${texts.faqAnswer3_1.split('ищет текст')[0]}`;
            q3Paragraphs[1].innerHTML = `<strong>CodeQuery</strong> ${texts.faqAnswer3_2.split('понимает структуру кода:')[0]}`;
            
            const ul3 = q3Answer.querySelector('ul');
            if (ul3) {
                const items = ul3.querySelectorAll('li');
                if (items.length >= 3) {
                    items[0].textContent = texts.faqList3_1;
                    items[1].textContent = texts.faqList3_2;
                    items[2].textContent = texts.faqList3_3;
                }
            }
            q3Paragraphs[2].textContent = texts.faqAnswer3_extra;
        }
        
        // Вопрос 4
        const q4 = faqSections[3];
        q4.querySelector('.faq-question h3').innerHTML = `<i class="fas fa-code"></i> ${texts.faqQuestion4}`;
        const q4Answer = q4.querySelector('.faq-answer');
        const q4Paragraphs = q4Answer.querySelectorAll('p');
        if (q4Paragraphs.length >= 2) {
            q4Paragraphs[0].innerHTML = `<strong>CodeQuery</strong> ${texts.faqAnswer4_1.split('поддерживает популярные языки')[0]}`;
            q4Paragraphs[1].textContent = texts.faqAnswer4_2;
        }
        
        // Вопрос 5
        const q5 = faqSections[4];
        q5.querySelector('.faq-question h3').innerHTML = `<i class="fas fa-shield-alt"></i> ${texts.faqQuestion5}`;
        const q5Answer = q5.querySelector('.faq-answer');
        const q5Paragraphs = q5Answer.querySelectorAll('p');
        if (q5Paragraphs.length >= 2) {
            q5Paragraphs[0].innerHTML = `<strong>${texts.faqAnswer5_1}</strong>`;
            q5Paragraphs[1].textContent = texts.faqAnswer5_2;
        }
        
        // Вопрос 6
        const q6 = faqSections[5];
        q6.querySelector('.faq-question h3').innerHTML = `<i class="fas fa-download"></i> ${texts.faqQuestion6}`;
        const q6Answer = q6.querySelector('.faq-answer');
        const q6Paragraphs = q6Answer.querySelectorAll('p');
        if (q6Paragraphs.length >= 2) {
            q6Paragraphs[0].innerHTML = `<strong>CodeQuery</strong> ${texts.faqAnswer6_1.split('работает через сайт')[0]}`;
            q6Paragraphs[1].textContent = texts.faqAnswer6_2;
        }
        
        // Вопрос 7
        const q7 = faqSections[6];
        q7.querySelector('.faq-question h3').innerHTML = `<i class="fas fa-project-diagram"></i> ${texts.faqQuestion7}`;
        const q7Answer = q7.querySelector('.faq-answer');
        const q7Paragraphs = q7Answer.querySelectorAll('p');
        if (q7Paragraphs.length >= 2) {
            q7Paragraphs[0].innerHTML = `<strong>${texts.faqAnswer7_1}</strong>`;
            q7Paragraphs[1].textContent = texts.faqAnswer7_2;
        }
        
        // Вопрос 8
        const q8 = faqSections[7];
        q8.querySelector('.faq-question h3').innerHTML = `<i class="fas fa-rocket"></i> ${texts.faqQuestion8}`;
        const q8Answer = q8.querySelector('.faq-answer');
        const q8Paragraphs = q8Answer.querySelectorAll('p');
        if (q8Paragraphs.length >= 1) {
            q8Paragraphs[0].innerHTML = `<strong>${texts.faqAnswer8_1.split('.')[0]}.</strong> ${texts.faqAnswer8_1.split('. ')[1]}`;
            
            const ul8 = q8Answer.querySelector('ul');
            if (ul8) {
                const items = ul8.querySelectorAll('li');
                if (items.length >= 4) {
                    items[0].textContent = texts.faqList8_1;
                    items[1].textContent = texts.faqList8_2;
                    items[2].textContent = texts.faqList8_3;
                    items[3].textContent = texts.faqList8_4;
                }
            }
        }
        
        // Вопрос 9
        const q9 = faqSections[8];
        q9.querySelector('.faq-question h3').innerHTML = `<i class="fas fa-envelope"></i> ${texts.faqQuestion9}`;
        const q9Answer = q9.querySelector('.faq-answer');
        const q9Paragraphs = q9Answer.querySelectorAll('p');
        if (q9Paragraphs.length >= 1) {
            q9Paragraphs[0].textContent = texts.faqAnswer9_1;
            
            const contactInfo = q9Answer.querySelector('.contact-info');
            if (contactInfo) {
                const contactParagraphs = contactInfo.querySelectorAll('p');
                if (contactParagraphs.length >= 3) {
                    contactParagraphs[0].innerHTML = `<i class="fas fa-envelope"></i> ${texts.faqContactEmail}`;
                    contactParagraphs[1].innerHTML = `<i class="fab fa-telegram"></i> ${texts.faqContactTelegram}`;
                    contactParagraphs[2].innerHTML = `<i class="fab fa-github"></i> ${texts.faqContactGitHub}`;
                }
            }
        }
    }
}

// Переводим About страницу
function translateAboutPage(texts) {
    // Заголовок страницы
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        const icon = pageTitle.querySelector('i');
        pageTitle.innerHTML = `<i class="${icon ? icon.className : 'fas fa-star'}"></i> ${texts.aboutTitle}`;
    }
    
    // Заголовок intro
    const introHeader = document.querySelector('.intro-header h2');
    if (introHeader) {
        introHeader.textContent = texts.aboutHeader;
    }
    
    // Тексты
    const introText = document.querySelector('.intro-text');
    if (introText) {
        const paragraphs = introText.querySelectorAll('p');
        if (paragraphs.length >= 5) {
            paragraphs[0].textContent = texts.aboutText1;
            paragraphs[1].textContent = texts.aboutText2;
            
            // Третий параграф с списком
            paragraphs[2].textContent = texts.aboutText3.split(':')[0] + ':';
            
            const valuesList = document.querySelector('.values-list');
            if (valuesList) {
                const valueItems = valuesList.querySelectorAll('.value-item span');
                if (valueItems.length >= 3) {
                    valueItems[0].textContent = texts.aboutList1;
                    valueItems[1].textContent = texts.aboutList2;
                    valueItems[2].textContent = texts.aboutList3;
                }
            }
            
            paragraphs[3].textContent = texts.aboutText4;
            paragraphs[4].textContent = texts.aboutHighlight;
        }
    }
    
    // Миссия
    const missionCard = document.querySelector('.mission-card');
    if (missionCard) {
        const missionTitle = missionCard.querySelector('h3');
        const missionTextElement = missionCard.querySelector('.mission-content p');
        
        if (missionTitle) missionTitle.textContent = texts.missionTitle;
        if (missionTextElement) missionTextElement.textContent = texts.missionText;
    }
    
    // Команда
    const teamSection = document.querySelector('.team-section');
    if (teamSection) {
        const teamTitle = teamSection.querySelector('h2');
        const teamTextElement = teamSection.querySelector('p');
        
        if (teamTitle) teamTitle.innerHTML = `<i class="fas fa-users"></i> ${texts.teamTitle}`;
        if (teamTextElement) teamTextElement.textContent = texts.teamText;
        
        // Статистика
        const teamStats = document.querySelectorAll('.team-stat');
        if (teamStats.length >= 3) {
            teamStats[0].querySelector('.stat-number').textContent = texts.teamStat1;
            teamStats[0].querySelector('.stat-label').textContent = texts.teamStat1Label;
            
            teamStats[1].querySelector('.stat-number').textContent = texts.teamStat2;
            teamStats[1].querySelector('.stat-label').textContent = texts.teamStat2Label;
            
            teamStats[2].querySelector('.stat-number').textContent = texts.teamStat3;
            teamStats[2].querySelector('.stat-label').textContent = texts.teamStat3Label;
        }
    }
}

// Переводим Support страницу
function translateSupportPage(texts) {
    // Заголовок страницы
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        const icon = pageTitle.querySelector('i');
        pageTitle.innerHTML = `<i class="${icon ? icon.className : 'fas fa-headset'}"></i> ${texts.supportTitle}`;
    }
    
    // Карточки поддержки
    const supportCards = document.querySelectorAll('.support-card');
    if (supportCards.length >= 4) {
        // Email
        const emailCard = supportCards[0];
        emailCard.querySelector('h3').textContent = texts.supportEmailTitle;
        emailCard.querySelector('p').textContent = texts.supportEmailDesc;
        emailCard.querySelector('.response-time').textContent = texts.supportEmailTime;
        
        // Telegram
        const telegramCard = supportCards[1];
        telegramCard.querySelector('h3').textContent = texts.supportTelegramTitle;
        telegramCard.querySelector('p').textContent = texts.supportTelegramDesc;
        telegramCard.querySelector('.response-time').textContent = texts.supportTelegramTime;
        
        // FAQ
        const faqCard = supportCards[2];
        faqCard.querySelector('h3').textContent = texts.supportFaqTitle;
        faqCard.querySelector('p').textContent = texts.supportFaqDesc;
        faqCard.querySelector('.contact-link').textContent = texts.supportFaqLink;
        faqCard.querySelector('.response-time').textContent = texts.supportFaqTime;
        
        // Community
        const communityCard = supportCards[3];
        communityCard.querySelector('h3').textContent = texts.supportCommunityTitle;
        communityCard.querySelector('p').textContent = texts.supportCommunityDesc;
        communityCard.querySelector('.contact-link').textContent = texts.supportCommunityLink;
        communityCard.querySelector('.response-time').textContent = texts.supportCommunityTime;
    }
    
    // Форма
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formTitle = contactForm.querySelector('h2');
        const formDesc = contactForm.querySelector('p');
        
        if (formTitle) formTitle.innerHTML = `<i class="fas fa-comment-alt"></i> ${texts.formTitle}`;
        if (formDesc) formDesc.textContent = texts.formDesc;
        
        // Поля формы
        const labels = document.querySelectorAll('.form-group label');
        if (labels.length >= 4) {
            labels[0].innerHTML = `${texts.formName} <span class="required">*</span>`;
            labels[1].innerHTML = `${texts.formEmail} <span class="required">*</span>`;
            labels[2].textContent = texts.formCategory;
            labels[3].innerHTML = `${texts.formMessage} <span class="required">*</span>`;
        }
        
        // Плейсхолдеры
        const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
        if (inputs.length >= 4) {
            inputs[0].placeholder = texts.formNamePlaceholder;
            inputs[1].placeholder = texts.formEmailPlaceholder;
            inputs[3].placeholder = texts.formMessagePlaceholder;
        }
        
        // Категории
        const select = document.getElementById('category');
        if (select) {
            const options = select.querySelectorAll('option');
            if (options.length >= 4) {
                options[0].textContent = texts.formCategory1;
                options[1].textContent = texts.formCategory2;
                options[2].textContent = texts.formCategory3;
                options[3].textContent = texts.formCategory4;
            }
        }
        
        // Кнопка отправки
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${texts.formSubmit}`;
        }
    }
    
    // Часы работы
    const workingHours = document.querySelector('.working-hours');
    if (workingHours) {
        const hoursTitle = workingHours.querySelector('h3');
        if (hoursTitle) hoursTitle.innerHTML = `<i class="fas fa-clock"></i> ${texts.hoursTitle}`;
        
        const hourItems = workingHours.querySelectorAll('.hour-item');
        if (hourItems.length >= 3) {
            hourItems[0].querySelector('.day').textContent = texts.hours1;
            hourItems[0].querySelector('.time').textContent = texts.hoursTime1;
            
            hourItems[1].querySelector('.day').textContent = texts.hours2;
            hourItems[1].querySelector('.time').textContent = texts.hoursTime2;
            
            hourItems[2].querySelector('.day').textContent = texts.hours3;
            hourItems[2].querySelector('.time').textContent = texts.hoursTime3;
        }
        
        const timezone = workingHours.querySelector('.timezone');
        if (timezone) timezone.textContent = texts.timezone;
    }
}

// Переводим Terms страницу
function translateTermsPage(texts) {
    // Заголовок страницы
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        const icon = pageTitle.querySelector('i');
        pageTitle.innerHTML = `<i class="${icon ? icon.className : 'fas fa-file-contract'}"></i> ${texts.termsTitle}`;
    }
    
    // Дата обновления
    const lastUpdated = document.querySelector('.last-updated p');
    if (lastUpdated) {
        const icon = lastUpdated.querySelector('i');
        lastUpdated.innerHTML = `<i class="${icon ? icon.className : 'fas fa-calendar-alt'}"></i> ${texts.lastUpdated}`;
    }
    
    // Секции
    const sections = document.querySelectorAll('.section');
    if (sections.length >= 5) {
        // Секция 1
        sections[0].querySelector('h2').textContent = texts.termsSection1;
        const s1Paragraphs = sections[0].querySelectorAll('p');
        if (s1Paragraphs.length >= 3) {
            s1Paragraphs[0].textContent = texts.termsText1_1;
            s1Paragraphs[1].textContent = texts.termsText1_2;
            s1Paragraphs[2].textContent = texts.termsText1_3;
        }
        
        // Секция 2
        sections[1].querySelector('h2').textContent = texts.termsSection2;
        const s2Paragraphs = sections[1].querySelectorAll('p');
        const s2List = sections[1].querySelector('ul');
        
        if (s2Paragraphs.length >= 4) {
            s2Paragraphs[0].textContent = texts.termsText2_1;
            s2Paragraphs[1].textContent = texts.termsText2_2;
            s2Paragraphs[2].textContent = texts.termsText2_3;
            s2Paragraphs[3].textContent = texts.termsText2_4;
        }
        
        if (s2List) {
            const items = s2List.querySelectorAll('li');
            if (items.length >= 3) {
                items[0].textContent = texts.termsList2_1;
                items[1].textContent = texts.termsList2_2;
                items[2].textContent = texts.termsList2_3;
            }
        }
        
        // Секция 3
        sections[2].querySelector('h2').textContent = texts.termsSection3;
        const s3Paragraphs = sections[2].querySelectorAll('p');
        const s3Lists = sections[2].querySelectorAll('ul');
        
        if (s3Paragraphs.length >= 2) {
            s3Paragraphs[0].textContent = texts.termsText3_1;
            s3Paragraphs[1].textContent = texts.termsText3_2;
        }
        
        if (s3Lists.length >= 2) {
            const list1Items = s3Lists[0].querySelectorAll('li');
            if (list1Items.length >= 4) {
                list1Items[0].textContent = texts.termsList3_1;
                list1Items[1].textContent = texts.termsList3_2;
                list1Items[2].textContent = texts.termsList3_3;
                list1Items[3].textContent = texts.termsList3_4;
            }
            
            const list2Items = s3Lists[1].querySelectorAll('li');
            if (list2Items.length >= 3) {
                list2Items[0].textContent = texts.termsList3_5;
                list2Items[1].textContent = texts.termsList3_6;
                list2Items[2].textContent = texts.termsList3_7;
            }
        }
        
        // Секция 4
        sections[3].querySelector('h2').textContent = texts.termsSection4;
        const s4Paragraphs = sections[3].querySelectorAll('p');
        if (s4Paragraphs.length >= 3) {
            s4Paragraphs[0].textContent = texts.termsText4_1;
            s4Paragraphs[1].textContent = texts.termsText4_2;
            s4Paragraphs[2].textContent = texts.termsText4_3;
        }
        
        // Секция 5
        sections[4].querySelector('h2').textContent = texts.termsSection5;
        const s5Paragraphs = sections[4].querySelectorAll('p');
        const s5List = sections[4].querySelector('ul');
        
        if (s5Paragraphs.length >= 1) {
            s5Paragraphs[0].textContent = texts.termsText5_1;
        }
        
        if (s5List) {
            const items = s5List.querySelectorAll('li');
            if (items.length >= 4) {
                items[0].textContent = texts.termsList5_1;
                items[1].textContent = texts.termsList5_2;
                items[2].textContent = texts.termsList5_3;
                items[3].textContent = texts.termsList5_4;
            }
        }
        
        // Подтверждение
        const acceptance = document.querySelector('.acceptance p');
        if (acceptance) {
            acceptance.textContent = texts.termsAcceptance;
        }
    }
}

// Переводим Privacy страницу
function translatePrivacyPage(texts) {
    // Заголовок страницы
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        const icon = pageTitle.querySelector('i');
        pageTitle.innerHTML = `<i class="${icon ? icon.className : 'fas fa-shield-alt'}"></i> ${texts.privacyTitle}`;
    }
    
    // Дата обновления
    const lastUpdated = document.querySelector('.last-updated p');
    if (lastUpdated) {
        const icon = lastUpdated.querySelector('i');
        lastUpdated.innerHTML = `<i class="${icon ? icon.className : 'fas fa-calendar-alt'}"></i> ${texts.lastUpdated}`;
    }
    
    // Секции
    const sections = document.querySelectorAll('.section');
    if (sections.length >= 6) {
        // Секция 1
        sections[0].querySelector('h2').textContent = texts.privacySection1;
        const s1Paragraphs = sections[0].querySelectorAll('p');
        if (s1Paragraphs.length >= 4) {
            s1Paragraphs[0].textContent = texts.privacyText1_1;
            s1Paragraphs[1].textContent = texts.privacyText1_2;
            s1Paragraphs[2].textContent = texts.privacyText1_3;
            s1Paragraphs[3].textContent = texts.privacyText1_4;
        }
        
        // Секция 2
        sections[1].querySelector('h2').textContent = texts.privacySection2;
        const s2Paragraphs = sections[1].querySelectorAll('p');
        if (s2Paragraphs.length >= 4) {
            s2Paragraphs[0].textContent = texts.privacyText2_1;
            s2Paragraphs[1].textContent = texts.privacyText2_2;
            s2Paragraphs[2].textContent = texts.privacyText2_3;
            s2Paragraphs[3].textContent = texts.privacyText2_4;
        }
        
        // Секция 3
        sections[2].querySelector('h2').textContent = texts.privacySection3;
        const s3Paragraphs = sections[2].querySelectorAll('p');
        if (s3Paragraphs.length >= 4) {
            s3Paragraphs[0].textContent = texts.privacyText3_1;
            s3Paragraphs[1].textContent = texts.privacyText3_2;
            s3Paragraphs[2].textContent = texts.privacyText3_3;
            s3Paragraphs[3].textContent = texts.privacyText3_4;
        }
        
        // Секция 4
        sections[3].querySelector('h2').textContent = texts.privacySection4;
        const s4Paragraphs = sections[3].querySelectorAll('p');
        if (s4Paragraphs.length >= 3) {
            s4Paragraphs[0].textContent = texts.privacyText4_1;
            s4Paragraphs[1].textContent = texts.privacyText4_2;
            s4Paragraphs[2].textContent = texts.privacyText4_3;
        }
        
        // Секция 5
        sections[4].querySelector('h2').textContent = texts.privacySection5;
        const s5Paragraphs = sections[4].querySelectorAll('p');
        const s5List = sections[4].querySelector('ul');
        
        if (s5Paragraphs.length >= 2) {
            s5Paragraphs[0].textContent = texts.privacyText5_1;
            s5Paragraphs[1].textContent = texts.privacyText5_2;
        }
        
        if (s5List) {
            const items = s5List.querySelectorAll('li');
            if (items.length >= 3) {
                items[0].textContent = texts.privacyList5_1;
                items[1].textContent = texts.privacyList5_2;
                items[2].textContent = texts.privacyList5_3;
            }
        }
        
        // Секция 6
        sections[5].querySelector('h2').textContent = texts.privacySection6;
        const s6Paragraphs = sections[5].querySelectorAll('p');
        if (s6Paragraphs.length >= 4) {
            s6Paragraphs[0].textContent = texts.privacyText6_1;
            s6Paragraphs[1].textContent = texts.privacyText6_2;
            s6Paragraphs[2].textContent = texts.privacyText6_3;
            s6Paragraphs[3].textContent = texts.privacyText6_4;
        }
        
        // Контакты
        const contactSection = document.querySelector('.contact');
        if (contactSection) {
            const contactTitle = contactSection.querySelector('h3');
            const contactParagraphs = contactSection.querySelectorAll('p');
            
            if (contactTitle) contactTitle.textContent = texts.privacyContact;
            if (contactParagraphs.length >= 2) {
                contactParagraphs[0].textContent = texts.privacyEmail;
                contactParagraphs[1].textContent = texts.privacyResponse;
            }
        }
    }
}

// Обновление ссылок в футере
function updateFooterLinks(lang = getCurrentLanguage()) {
    const texts = {
        ru: {
            'country': 'Россия',
            'home': 'Главная',
            'faq': 'FAQ',
            'about': 'О нас',
            'support': 'Поддержка',
            'pricing': 'Цены',
            'privacy': 'Конфиденциальность',
            'rules': 'Правила',
            'terms': 'Условия'
        },
        en: {
            'country': 'Russia',
            'home': 'Home',
            'faq': 'FAQ',
            'about': 'About',
            'support': 'Support',
            'pricing': 'Pricing',
            'privacy': 'Privacy',
            'rules': 'Rules',
            'terms': 'Terms'
        }
    };
    
    const currentTexts = texts[lang] || texts.ru;
    
    // Страна
    const country = document.querySelector('.country');
    if (country) {
        country.textContent = currentTexts.country;
    }
    
    // Ссылки футера
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            if (href.includes('index.html')) {
                link.textContent = currentTexts.home;
            } else if (href.includes('faq.html')) {
                link.textContent = currentTexts.faq;
            } else if (href.includes('about.html')) {
                link.textContent = currentTexts.about;
            } else if (href.includes('support.html')) {
                link.textContent = currentTexts.support;
            } else if (href.includes('#pricing') || href.includes('pricing.html')) {
                link.textContent = currentTexts.pricing;
            } else if (href.includes('privacy.html')) {
                link.textContent = currentTexts.privacy;
            } else if (href.includes('terms.html')) {
                // Проверяем, это ли это "Правила" (вторая ссылка на terms.html)
                if (link.textContent.includes('Правила') || link.textContent.includes('Rules')) {
                    link.textContent = currentTexts.rules;
                } else {
                    link.textContent = currentTexts.terms;
                }
            }
        }
    });
}

// Показываем уведомление
function showNotification(message) {
    // Удаляем старые уведомления
    const oldNotifications = document.querySelectorAll('.notification');
    oldNotifications.forEach(n => {
        if (n.parentNode) {
            n.parentNode.removeChild(n);
        }
    });
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2c3e50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Добавляем стили для анимации если их нет
if (!document.querySelector('#page-notification-animation')) {
    const style = document.createElement('style');
    style.id = 'page-notification-animation';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}