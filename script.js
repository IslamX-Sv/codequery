// Глобальные переменные
let messagesCount = parseInt(localStorage.getItem('codequery_messages_count')) || 0;
const MAX_FREE_MESSAGES = 10;
let isSubscribed = localStorage.getItem('codequery_subscribed') === 'true' || false;
let currentLanguage = localStorage.getItem('codequery_lang') || 'ru';
let chatHistory = JSON.parse(localStorage.getItem('codequery_chat_history')) || [];
let currentUser = JSON.parse(localStorage.getItem('codequery_current_user')) || null;
let registeredUsers = JSON.parse(localStorage.getItem('codequery_users')) || [];

// Тексты для перевода
const translations = {
    ru: {
        // Навигация
        login: "Вход",
        register: "Регистр",
        logout: "Выход",
        // Чат
        placeholder: "Опишите вашу задачу или задайте вопрос...",
        welcome: "Привет! Я CodeQuery AI. Задайте мне вопрос о программировании, и я помогу с кодом.",
        botName: "CodeQuery AI Assistant",
        botStatus: "Готов помочь с кодом",
        quickQuestionsTitle: "Популярные вопросы:",
        quickButtons: [
            "Python функция",
            "React компонент",
            "SQL пример",
            "Оптимизация JS"
        ],
        freeMessages: "Бесплатных сообщений осталось:",
        trial: "Начальный тест: 10 бесплатных сообщений",
        trialEnded: "Пробная версия истекла",
        buySubscription: "Для продолжения работы купите подписку за $10/месяц",
        buyButton: "Купить подписку",
        // Сообщения бота
        botResponse: "Вот решение вашей задачи:",
        copyCode: "Копировать",
        // Уведомления
        languageChanged: "Язык изменен на русский",
        trialEndedAlert: "Лимит бесплатных сообщений исчерпан. Купите подписку!",
        paymentProcessing: "Обработка платежа...",
        paymentSuccess: "✅ Оплата прошла успешно! Подписка активирована.",
        paymentError: "❌ Ошибка оплаты. Попробуйте другой метод.",
        codeCopied: "Код скопирован!",
        questionAdded: "Вопрос добавлен. Нажмите кнопку отправки",
        enterQuestion: "Введите ваш вопрос",
        clearChatConfirm: "Вы уверены, что хотите очистить историю чата?",
        chatCleared: "Чат очищен!",
        clearChatTitle: "Очистить чат",
        // Регистрация/Вход
        registrationSuccess: "✅ Регистрация успешна! Вы вошли в систему.",
        registrationError: "❌ Ошибка регистрации. Пользователь с таким email уже существует.",
        loginSuccess: "✅ Вход выполнен успешно!",
        loginError: "❌ Ошибка входа. Неверный email или пароль.",
        logoutSuccess: "✅ Выход выполнен успешно!",
        passwordsNotMatch: "❌ Пароли не совпадают.",
        fillAllFields: "❌ Заполните все поля.",
        termsRequired: "❌ Необходимо согласиться с условиями использования.",
        // Футер
        country: "Россия",
        footerLinks: [
            "FAQ",
            "О нас",
            "Поддержка",
            "Цены",
            "Конфиденциальность",
            "Правила",
            "Условия"
        ]
    },
    en: {
        // Navigation
        login: "Login",
        register: "Sign Up",
        logout: "Logout",
        // Chat
        placeholder: "Describe your task or ask a question...",
        welcome: "Hello! I'm CodeQuery AI. Ask me a programming question and I'll help with code.",
        botName: "CodeQuery AI Assistant",
        botStatus: "Ready to help with code",
        quickQuestionsTitle: "Popular questions:",
        quickButtons: [
            "Python function",
            "React component",
            "SQL example",
            "JS optimization"
        ],
        freeMessages: "Free messages left:",
        trial: "Initial test: 10 free messages",
        trialEnded: "Trial version expired",
        buySubscription: "To continue working, buy a subscription for $10/month",
        buyButton: "Buy Subscription",
        // Bot messages
        botResponse: "Here is the solution to your problem:",
        copyCode: "Copy",
        // Notifications
        languageChanged: "Language changed to English",
        trialEndedAlert: "Free message limit exhausted. Buy a subscription!",
        paymentProcessing: "Payment processing...",
        paymentSuccess: "✅ Payment successful! Subscription activated.",
        paymentError: "❌ Payment error. Try another method.",
        codeCopied: "Code copied!",
        questionAdded: "Question added. Click send button",
        enterQuestion: "Enter your question",
        clearChatConfirm: "Are you sure you want to clear chat history?",
        chatCleared: "Chat cleared!",
        clearChatTitle: "Clear chat",
        // Registration/Login
        registrationSuccess: "✅ Registration successful! You are now logged in.",
        registrationError: "❌ Registration error. User with this email already exists.",
        loginSuccess: "✅ Login successful!",
        loginError: "❌ Login error. Invalid email or password.",
        logoutSuccess: "✅ Logout successful!",
        passwordsNotMatch: "❌ Passwords do not match.",
        fillAllFields: "❌ Please fill all fields.",
        termsRequired: "❌ You must agree to the terms of use.",
        // Footer
        country: "Russia",
        footerLinks: [
            "FAQ",
            "About",
            "Support",
            "Pricing",
            "Privacy",
            "Rules",
            "Terms"
        ]
    }
};

// Основная функция инициализации
document.addEventListener('DOMContentLoaded', function() {
    // Устанавливаем сохраненный язык
    setLanguage(currentLanguage);
    
    initLanguageSwitcher();
    initModals();
    initChatInterface();
    initPaymentSystem();
    updateMessageCount();
    loadChatHistory();
    
    // Применяем стили для чата
    applyChatStyles();
    
    // Проверяем подписку
    checkSubscription();
    
    // Обновляем UI в зависимости от статуса входа
    updateAuthUI();
});

// Проверяем подписку
function checkSubscription() {
    if (isSubscribed) {
        document.getElementById('freeMessagesCount').textContent = '∞';
        document.getElementById('freeMessagesCount').style.color = '#34A853';
        document.getElementById('messageProgress').style.width = '100%';
        document.getElementById('messageProgress').style.background = '#34A853';
        
        const statsInfo = document.querySelector('.stats-info');
        if (statsInfo) {
            const span = statsInfo.querySelector('span:first-child');
            if (span) {
                span.textContent = currentLanguage === 'ru' ? 'Подписка активна' : 'Subscription active';
            }
        }
    }
}

// Обновляем UI в зависимости от статуса входа
function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (currentUser) {
        // Пользователь вошел - меняем кнопки
        if (loginBtn) {
            loginBtn.querySelector('.btn-text').textContent = translations[currentLanguage].logout;
            loginBtn.querySelector('i').className = 'fas fa-sign-out-alt';
            loginBtn.onclick = logoutUser;
        }
        
        if (registerBtn) {
            registerBtn.style.display = 'none';
        }
        
        // Показываем имя пользователя в чате
        showUserName();
    } else {
        // Пользователь не вошел
        if (loginBtn) {
            loginBtn.querySelector('.btn-text').textContent = translations[currentLanguage].login;
            loginBtn.querySelector('i').className = 'fas fa-sign-in-alt';
            loginBtn.onclick = () => openModal('loginModal');
        }
        
        if (registerBtn) {
            registerBtn.style.display = 'flex';
            registerBtn.querySelector('.btn-text').textContent = translations[currentLanguage].register;
            registerBtn.onclick = () => openModal('registerModal');
        }
    }
}

// Показать имя пользователя в чате
function showUserName() {
    if (currentUser) {
        const chatHeader = document.querySelector('.chat-info');
        if (chatHeader) {
            const userNameElement = document.createElement('div');
            userNameElement.className = 'user-name';
            userNameElement.textContent = currentUser.name;
            userNameElement.style.cssText = 'font-size: 12px; color: rgba(255,255,255,0.8); margin-top: 2px;';
            
            const existingName = chatHeader.querySelector('.user-name');
            if (existingName) {
                existingName.remove();
            }
            
            chatHeader.appendChild(userNameElement);
        }
    }
}

// Выход пользователя
function logoutUser() {
    currentUser = null;
    localStorage.removeItem('codequery_current_user');
    showNotification(translations[currentLanguage].logoutSuccess);
    updateAuthUI();
}

// Применяем стили для чата
function applyChatStyles() {
    // Автоматическое изменение высоты textarea
    const textarea = document.getElementById('chatInput');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
    }
}

// Загружаем историю чата
function loadChatHistory() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    // Очищаем контейнер кроме приветственного сообщения
    const welcomeMessage = chatMessages.querySelector('.welcome-message-bubble');
    chatMessages.innerHTML = '';
    
    if (welcomeMessage) {
        chatMessages.appendChild(welcomeMessage);
    } else {
        // Если нет приветственного сообщения, создаем его
        const welcomeElement = document.createElement('div');
        welcomeElement.className = 'welcome-message-bubble';
        welcomeElement.innerHTML = `
            <div class="welcome-icon">
                <i class="fas fa-robot"></i>
            </div>
            <div class="welcome-text">
                ${translations[currentLanguage].welcome}
            </div>
            <div class="quick-questions-buttons">
                ${translations[currentLanguage].quickButtons.map((text, index) => `
                    <button class="quick-question-btn" data-question="${getQuickQuestionByIndex(index)}">
                        ${text}
                    </button>
                `).join('')}
            </div>
        `;
        chatMessages.appendChild(welcomeElement);
    }
    
    // Восстанавливаем историю сообщений
    chatHistory.forEach(message => {
        addMessageToChat(message.text, message.sender, message.time, false);
    });
    
    // Прокручиваем вниз
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Сохраняем сообщение в историю
function saveMessageToHistory(text, sender) {
    const message = {
        text: text,
        sender: sender,
        time: getCurrentTime()
    };
    
    chatHistory.push(message);
    localStorage.setItem('codequery_chat_history', JSON.stringify(chatHistory));
}

// Сохраняем счетчик сообщений
function saveMessagesCount() {
    localStorage.setItem('codequery_messages_count', messagesCount.toString());
}

// Функция очистки чата
function clearChatHistory() {
    chatHistory = [];
    messagesCount = 0;
    
    // Очищаем localStorage
    localStorage.removeItem('codequery_chat_history');
    localStorage.removeItem('codequery_messages_count');
    
    // Перезагружаем историю и обновляем счетчик
    loadChatHistory();
    updateMessageCount();
}

// Добавляем сообщение в чат
function addMessageToChat(text, sender, time = null, save = true) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageTime = time || getCurrentTime();
    
    const messageElement = document.createElement('div');
    messageElement.className = `message-bubble ${sender === 'user' ? 'user-message-bubble' : 'bot-message-bubble'}`;
    
    if (sender === 'user') {
        messageElement.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${messageTime}</div>
        `;
    } else {
        const botResponse = generateBotResponse(text);
        messageElement.innerHTML = `
            <div class="message-content">${translations[currentLanguage].botResponse}</div>
            <div class="code-block">
                <div class="code-header">
                    <span class="code-language">Python</span>
                    <button class="copy-code-btn">
                        <i class="far fa-copy"></i>
                        ${translations[currentLanguage].copyCode}
                    </button>
                </div>
                <pre class="code-content">${botResponse}</pre>
            </div>
            <div class="message-time">${messageTime}</div>
        `;
    }
    
    chatMessages.appendChild(messageElement);
    
    // Сохраняем в историю если нужно
    if (save && sender === 'user') {
        saveMessageToHistory(text, sender);
    }
    
    // Прокручиваем вниз
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Установка языка
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('codequery_lang', lang);
    translatePage(lang);
}

// Инициализация языкового переключателя
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Устанавливаем активную кнопку
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
        
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            
            // Показываем уведомление
            showNotification(translations[lang].languageChanged);
        });
    });
}

// Функция перевода страницы
function translatePage(lang) {
    const texts = translations[lang];
    
    // Обновляем язык в HTML
    document.documentElement.lang = lang;
    document.title = lang === 'ru' ? 'CodeQuery - AI помощник для разработчиков' : 'CodeQuery - AI Assistant for Developers';
    
    // Обновляем UI авторизации
    updateAuthUI();
    
    // Заголовок чата - название бота
    const chatBotName = document.getElementById('chatBotName');
    if (chatBotName) {
        chatBotName.textContent = texts.botName;
    }
    
    // Статус бота под названием
    const chatBotStatus = document.getElementById('chatBotStatus');
    if (chatBotStatus) {
        chatBotStatus.textContent = texts.botStatus;
    }
    
    // Приветственное сообщение в чате
    const welcomeText = document.getElementById('welcomeText');
    if (welcomeText) {
        welcomeText.textContent = texts.welcome;
    }
    
    // Заголовок "Популярные вопросы:"
    const quickQuestionsTitle = document.getElementById('quickQuestionsTitle');
    if (quickQuestionsTitle) {
        quickQuestionsTitle.textContent = texts.quickQuestionsTitle;
    }
    
    // Быстрые кнопки в приветственном сообщении
    const welcomeQuickButtons = document.querySelectorAll('.welcome-message-bubble .quick-question-btn');
    welcomeQuickButtons.forEach((btn, index) => {
        if (texts.quickButtons[index]) {
            btn.textContent = texts.quickButtons[index];
            // Обновляем data-question атрибут
            btn.setAttribute('data-question', getQuickQuestionByIndex(index));
        }
    });
    
    // Быстрые кнопки внизу
    const quickButtons = document.querySelectorAll('.quick-questions-container .quick-question-btn');
    quickButtons.forEach((btn, index) => {
        if (texts.quickButtons[index]) {
            btn.textContent = texts.quickButtons[index];
            // Обновляем data-question атрибут
            btn.setAttribute('data-question', getQuickQuestionByIndex(index));
        }
    });
    
    // Статистика сообщений
    const freeMessagesText = document.getElementById('freeMessagesText');
    if (freeMessagesText) {
        freeMessagesText.textContent = texts.freeMessages;
    }
    
    // Текст пробного периода
    const trialText = document.getElementById('trialText');
    if (trialText) {
        trialText.textContent = texts.trial;
    }
    
    // Плейсхолдер чата
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.placeholder = texts.placeholder;
    }
    
    // Кнопка очистки чата (title)
    const clearChatBtn = document.getElementById('clearChatBtn');
    if (clearChatBtn) {
        clearChatBtn.title = texts.clearChatTitle;
    }
    
    // Текст истекшей пробной версии
    const trialEndedTitle = document.getElementById('trialEndedTitle');
    if (trialEndedTitle) {
        trialEndedTitle.textContent = texts.trialEnded;
    }
    
    const buySubscriptionText = document.getElementById('buySubscriptionText');
    if (buySubscriptionText) {
        buySubscriptionText.textContent = texts.buySubscription;
    }
    
    // Кнопка покупки подписки
    const buyButton = document.getElementById('buySubscriptionBtn');
    if (buyButton) {
        buyButton.textContent = texts.buyButton;
    }
    
    // Футер
    const countryElement = document.getElementById('countryText');
    if (countryElement) {
        countryElement.textContent = texts.country;
    }
    
    // Заголовки модальных окон
    const loginTitle = document.getElementById('loginTitle');
    if (loginTitle) {
        loginTitle.textContent = lang === 'ru' ? 'Вход в аккаунт' : 'Login to Account';
    }
    
    const registerTitle = document.getElementById('registerTitle');
    if (registerTitle) {
        registerTitle.textContent = lang === 'ru' ? 'Регистрация' : 'Registration';
    }
    
    const paymentTitle = document.getElementById('paymentTitle');
    if (paymentTitle) {
        paymentTitle.textContent = lang === 'ru' ? 'Оплата подписки' : 'Subscription Payment';
    }
    
    // Кнопки в модальных окнах
    const loginSubmitBtn = document.getElementById('loginSubmitBtn');
    if (loginSubmitBtn) {
        loginSubmitBtn.textContent = lang === 'ru' ? 'Войти' : 'Login';
    }
    
    const registerSubmitBtn = document.getElementById('registerSubmitBtn');
    if (registerSubmitBtn) {
        registerSubmitBtn.textContent = lang === 'ru' ? 'Зарегистрироваться' : 'Sign Up';
    }
    
    // Платежная информация
    const monthText = document.getElementById('monthText');
    if (monthText) {
        monthText.textContent = lang === 'ru' ? '/ месяц' : '/ month';
    }
    
    const paymentMethodsTitle = document.getElementById('paymentMethodsTitle');
    if (paymentMethodsTitle) {
        paymentMethodsTitle.textContent = lang === 'ru' ? 'Способы оплаты:' : 'Payment Methods:';
    }
    
    // Тексты функций подписки
    const feature1 = document.getElementById('feature1');
    if (feature1) {
        feature1.textContent = lang === 'ru' ? 'Неограниченные запросы' : 'Unlimited requests';
    }
    
    const feature2 = document.getElementById('feature2');
    if (feature2) {
        feature2.textContent = lang === 'ru' ? 'Приоритетная поддержка' : 'Priority support';
    }
    
    const feature3 = document.getElementById('feature3');
    if (feature3) {
        feature3.textContent = lang === 'ru' ? 'Расширенные возможности AI' : 'Advanced AI features';
    }
    
    const feature4 = document.getElementById('feature4');
    if (feature4) {
        feature4.textContent = lang === 'ru' ? 'Сохранение истории' : 'History saving';
    }
    
    // Тексты методов оплаты
    const cardText = document.getElementById('cardText');
    if (cardText) {
        cardText.textContent = lang === 'ru' ? 'Карта' : 'Card';
    }
    
    const cryptoText = document.getElementById('cryptoText');
    if (cryptoText) {
        cryptoText.textContent = 'Crypto';
    }
    
    const sbpText = document.getElementById('sbpText');
    if (sbpText) {
        sbpText.textContent = lang === 'ru' ? 'СБП' : 'SBP';
    }
    
    const otherText = document.getElementById('otherText');
    if (otherText) {
        otherText.textContent = lang === 'ru' ? 'Другое' : 'Other';
    }
    
    const payButtonText = document.getElementById('payButtonText');
    if (payButtonText) {
        payButtonText.textContent = lang === 'ru' ? 'Оплатить $10' : 'Pay $10';
    }
    
    // Ссылки футера
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach((link, index) => {
        if (texts.footerLinks[index]) {
            link.textContent = texts.footerLinks[index];
        }
    });
}

// Функция для получения вопросов по индексу
function getQuickQuestionByIndex(index) {
    const questions = {
        ru: [
            "Напиши функцию для сортировки массива на Python",
            "Создай React компонент кнопки",
            "Покажи пример SQL запроса",
            "Как оптимизировать JavaScript код?"
        ],
        en: [
            "Write a function to sort an array in Python",
            "Create a React button component",
            "Show an example SQL query",
            "How to optimize JavaScript code?"
        ]
    };
    
    return questions[currentLanguage][index] || questions[currentLanguage][0];
}

// Модальные окна
function initModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Кнопки для открытия модальных окон
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    // Закрытие по крестику
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Закрытие по клику вне окна
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Переключение между логином и регистрацией
    const switchToRegister = document.getElementById('switchToRegister');
    if (switchToRegister) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal('loginModal');
            openModal('registerModal');
        });
    }
    
    // Обработка формы входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            loginUser(email, password);
        });
    }
    
    // Обработка формы регистрации
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelectorAll('input[type="password"]')[0].value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
            const terms = this.querySelector('#terms').checked;
            
            registerUser(name, email, password, confirmPassword, terms);
        });
    }
}

// Регистрация пользователя
function registerUser(name, email, password, confirmPassword, terms) {
    const texts = translations[currentLanguage];
    
    // Валидация
    if (!name || !email || !password || !confirmPassword) {
        showNotification(texts.fillAllFields);
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification(texts.passwordsNotMatch);
        return;
    }
    
    if (!terms) {
        showNotification(texts.termsRequired);
        return;
    }
    
    // Проверяем, существует ли пользователь с таким email
    const existingUser = registeredUsers.find(user => user.email === email);
    if (existingUser) {
        showNotification(texts.registrationError);
        return;
    }
    
    // Создаем нового пользователя
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password, // В реальном приложении нужно хэшировать пароль
        createdAt: new Date().toISOString(),
        isSubscribed: false,
        freeMessagesUsed: 0
    };
    
    // Сохраняем пользователя
    registeredUsers.push(newUser);
    localStorage.setItem('codequery_users', JSON.stringify(registeredUsers));
    
    // Автоматически входим
    currentUser = newUser;
    localStorage.setItem('codequery_current_user', JSON.stringify(currentUser));
    
    // Закрываем модальное окно
    closeModal('registerModal');
    
    // Показываем уведомление
    showNotification(texts.registrationSuccess);
    
    // Обновляем UI
    updateAuthUI();
    
    // Сбрасываем счетчик сообщений для нового пользователя
    messagesCount = 0;
    saveMessagesCount();
    updateMessageCount();
}

// Вход пользователя
function loginUser(email, password) {
    const texts = translations[currentLanguage];
    
    // Валидация
    if (!email || !password) {
        showNotification(texts.fillAllFields);
        return;
    }
    
    // Ищем пользователя
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Вход успешен
        currentUser = user;
        localStorage.setItem('codequery_current_user', JSON.stringify(currentUser));
        
        // Закрываем модальное окно
        closeModal('loginModal');
        
        // Показываем уведомление
        showNotification(texts.loginSuccess);
        
        // Обновляем UI
        updateAuthUI();
        
        // Загружаем историю чата пользователя (если бы она была привязана к пользователю)
        // Пока используем общую историю
    } else {
        // Неверные данные
        showNotification(texts.loginError);
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Очищаем формы при закрытии
        if (modalId === 'loginModal') {
            document.getElementById('loginForm').reset();
        } else if (modalId === 'registerModal') {
            document.getElementById('registerForm').reset();
        }
    }
}

// Чат интерфейс
function initChatInterface() {
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatInput = document.getElementById('chatInput');
    const luckyBtn = document.getElementById('luckyBtn');
    
    // Кнопка "Отправить сообщение"
    if (sendMessageBtn && chatInput) {
        sendMessageBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    // Кнопка "Мне повезёт"
    if (luckyBtn) {
        luckyBtn.addEventListener('click', function() {
            const examples = {
                ru: [
                    "Напиши функцию для сортировки массива на Python",
                    "Создай React компонент кнопки",
                    "Покажи пример SQL запроса",
                    "Как оптимизировать JavaScript код?",
                    "Напиши функцию для валидации email"
                ],
                en: [
                    "Write a function to sort an array in Python",
                    "Create a React button component",
                    "Show an example SQL query",
                    "How to optimize JavaScript code?",
                    "Write a function to validate email"
                ]
            };
            
            const randomExample = examples[currentLanguage][Math.floor(Math.random() * examples[currentLanguage].length)];
            chatInput.value = randomExample;
            chatInput.focus();
            showNotification(translations[currentLanguage].questionAdded);
        });
    }
    
    // Кнопка очистки чата
    const clearChatBtn = document.getElementById('clearChatBtn');
    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', function() {
            if (confirm(translations[currentLanguage].clearChatConfirm)) {
                clearChatHistory();
                showNotification(translations[currentLanguage].chatCleared);
            }
        });
    }
    
    // Быстрые вопросы
    document.addEventListener('click', function(e) {
        if (e.target.closest('.quick-question-btn')) {
            const question = e.target.closest('.quick-question-btn').getAttribute('data-question');
            chatInput.value = question;
            chatInput.focus();
            showNotification(translations[currentLanguage].questionAdded);
        }
    });
    
    // Копирование кода
    document.addEventListener('click', function(e) {
        if (e.target.closest('.copy-code-btn') || e.target.classList.contains('.copy-code-btn')) {
            const codeBlock = e.target.closest('.code-block');
            if (codeBlock) {
                const code = codeBlock.querySelector('.code-content').textContent;
                navigator.clipboard.writeText(code)
                    .then(() => {
                        const btn = e.target.closest('.copy-code-btn');
                        btn.innerHTML = `<i class="fas fa-check"></i> ${currentLanguage === 'ru' ? 'Скопировано' : 'Copied'}`;
                        btn.style.background = '#34A853';
                        
                        setTimeout(() => {
                            btn.innerHTML = `<i class="far fa-copy"></i> ${translations[currentLanguage].copyCode}`;
                            btn.style.background = '#3d3d3d';
                        }, 2000);
                    });
            }
        }
    });
    
    // Автоматическое изменение высоты textarea
    const textarea = document.getElementById('chatInput');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatInput.value.trim()) {
        showNotification(translations[currentLanguage].enterQuestion);
        return;
    }
    
    if (!isSubscribed && messagesCount >= MAX_FREE_MESSAGES) {
        showNotification(translations[currentLanguage].trialEndedAlert);
        openModal('paymentModal');
        return;
    }
    
    const messageText = chatInput.value.trim();
    
    // Добавляем сообщение пользователя
    addMessageToChat(messageText, 'user');
    
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    // Увеличиваем счетчик только если пользователь не подписан
    if (!isSubscribed) {
        messagesCount++;
        saveMessagesCount();
        updateMessageCount();
    }
    
    // Имитация ответа бота
    setTimeout(() => {
        addMessageToChat(messageText, 'bot');
    }, 1500);
}

function generateBotResponse(userMessage) {
    // Примеры ответов
    const responses = {
        'python': `def solve_problem():
    """
    ${currentLanguage === 'ru' ? 'Решение задачи:' : 'Problem solution:'} ${userMessage}
    """
    # ${currentLanguage === 'ru' ? 'Инициализация переменных' : 'Variable initialization'}
    result = []
    
    # ${currentLanguage === 'ru' ? 'Основная логика' : 'Main logic'}
    for i in range(10):
        if i % 2 == 0:
            result.append(i ** 2)
    
    # ${currentLanguage === 'ru' ? 'Возвращаем результат' : 'Return result'}
    return result

# ${currentLanguage === 'ru' ? 'Пример использования' : 'Usage example'}
if __name__ == "__main__":
    output = solve_problem()
    print(f"${currentLanguage === 'ru' ? 'Результат:' : 'Result:'} {output}")`,

        'react': `import React, { useState } from 'react';

const SolutionComponent = () => {
    const [state, setState] = useState({
        // ${currentLanguage === 'ru' ? 'Инициализация состояния' : 'State initialization'}
        data: [],
        loading: false
    });
    
    const handleSolve = async () => {
        // ${currentLanguage === 'ru' ? 'Решение задачи:' : 'Problem solution:'} ${userMessage}
        setState(prev => ({ ...prev, loading: true }));
        
        try {
            const result = await someAsyncFunction();
            setState(prev => ({ 
                ...prev, 
                data: result,
                loading: false 
            }));
        } catch (error) {
            console.error('${currentLanguage === 'ru' ? 'Ошибка:' : 'Error:'}', error);
            setState(prev => ({ ...prev, loading: false }));
        }
    };
    
    return (
        <div className="solution-container">
            <h2>${currentLanguage === 'ru' ? 'Решение задачи' : 'Problem Solution'}</h2>
            <button onClick={handleSolve} disabled={state.loading}>
                {state.loading ? '${currentLanguage === 'ru' ? 'Загрузка...' : 'Loading...'}' : '${currentLanguage === 'ru' ? 'Решить' : 'Solve'}'}
            </button>
            {state.data.length > 0 && (
                <div className="result">
                    {JSON.stringify(state.data)}
                </div>
            )}
        </div>
    );
};

export default SolutionComponent;`
    };
    
    // Выбираем случайный пример
    const languages = Object.keys(responses);
    const randomLang = languages[Math.floor(Math.random() * languages.length)];
    return responses[randomLang];
}

function updateMessageCount() {
    const freeMessagesCount = document.getElementById('freeMessagesCount');
    const progressFill = document.getElementById('messageProgress');
    
    if (freeMessagesCount) {
        const remaining = MAX_FREE_MESSAGES - messagesCount;
        freeMessagesCount.textContent = remaining;
        
        if (remaining <= 0) {
            freeMessagesCount.style.color = '#EA4335';
        } else if (remaining <= 3) {
            freeMessagesCount.style.color = '#FBBC05';
        } else {
            freeMessagesCount.style.color = '#34A853';
        }
    }
    
    if (progressFill) {
        const percentage = ((MAX_FREE_MESSAGES - messagesCount) / MAX_FREE_MESSAGES) * 100;
        progressFill.style.width = `${percentage}%`;
        
        if (percentage <= 0) {
            progressFill.style.background = '#EA4335';
        } else if (percentage <= 30) {
            progressFill.style.background = '#FBBC05';
        } else {
            progressFill.style.background = '#34A853';
        }
    }
}

function getCurrentTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

// Система оплаты
function initPaymentSystem() {
    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', processPayment);
    }
}

function processPayment() {
    const payButton = document.getElementById('confirmPaymentBtn');
    const originalText = payButton.innerHTML;
    
    payButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${currentLanguage === 'ru' ? 'Обработка...' : 'Processing...'}`;
    payButton.disabled = true;
    
    showNotification(translations[currentLanguage].paymentProcessing);
    
    setTimeout(() => {
        const isSuccess = Math.random() > 0.2; // 80% успешных платежей
        
        if (isSuccess) {
            isSubscribed = true;
            localStorage.setItem('codequery_subscribed', 'true');
            
            // Обновляем статус подписки у текущего пользователя
            if (currentUser) {
                currentUser.isSubscribed = true;
                localStorage.setItem('codequery_current_user', JSON.stringify(currentUser));
                
                // Обновляем в массиве пользователей
                const userIndex = registeredUsers.findIndex(u => u.id === currentUser.id);
                if (userIndex !== -1) {
                    registeredUsers[userIndex].isSubscribed = true;
                    localStorage.setItem('codequery_users', JSON.stringify(registeredUsers));
                }
            }
            
            showNotification(translations[currentLanguage].paymentSuccess);
            closeModal('paymentModal');
            
            // Обновляем UI
            document.getElementById('freeMessagesCount').textContent = '∞';
            document.getElementById('freeMessagesCount').style.color = '#34A853';
            document.getElementById('messageProgress').style.width = '100%';
            document.getElementById('messageProgress').style.background = '#34A853';
            
            const statsInfo = document.querySelector('.stats-info');
            if (statsInfo) {
                const span = statsInfo.querySelector('span:first-child');
                if (span) {
                    span.textContent = currentLanguage === 'ru' ? 'Подписка активна' : 'Subscription active';
                }
            }
        } else {
            showNotification(translations[currentLanguage].paymentError);
        }
        
        payButton.innerHTML = originalText;
        payButton.disabled = false;
    }, 2000);
}

// Уведомления
function showNotification(message) {
    // Удаляем старые уведомления
    const oldNotifications = document.querySelectorAll('.notification');
    oldNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
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

// Добавляем стили для анимации
if (!document.querySelector('#notification-animation')) {
    const style = document.createElement('style');
    style.id = 'notification-animation';
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

console.log('CodeQuery инициализирован успешно!');
// Функция для просмотра пользователей (вызывать из консоли)
function showUsers() {
    const users = JSON.parse(localStorage.getItem('codequery_users')) || [];
    
    if (users.length === 0) {
        console.log('Нет зарегистрированных пользователей');
        return;
    }
    
    console.log('=== ЗАРЕГИСТРИРОВАННЫЕ ПОЛЬЗОВАТЕЛИ ===');
    console.log(`Всего пользователей: ${users.length}`);
    console.log('----------------------------------------');
    
    users.forEach((user, index) => {
        console.log(`\nПользователь #${index + 1}:`);
        console.log(`ID: ${user.id}`);
        console.log(`Имя: ${user.name}`);
        console.log(`Email: ${user.email}`);
        console.log(`Пароль: ${user.password}`);
        console.log(`Дата регистрации: ${new Date(user.createdAt).toLocaleString('ru-RU')}`);
        console.log(`Подписка: ${user.isSubscribed ? 'АКТИВНА' : 'неактивна'}`);
        console.log(`Сообщений использовано: ${user.freeMessagesUsed || 0}`);
        console.log('----------------------------------------');
    });
    
    return users;
}
// Добавь эти функции в самый конец файла script.js (перед console.log)

// ============== АДМИН ФУНКЦИИ ДЛЯ КОНСОЛИ ==============
// Эти функции нужно вызывать из консоли разработчика (F12)

// 1. Показать всех пользователей
window.showAllUsers = function() {
    const users = JSON.parse(localStorage.getItem('codequery_users')) || [];
    
    if (users.length === 0) {
        console.log('%c📭 Нет зарегистрированных пользователей', 'color: #ea4335; font-size: 16px; font-weight: bold;');
        return [];
    }
    
    console.log('%c👥 СПИСОК ЗАРЕГИСТРИРОВАННЫХ ПОЛЬЗОВАТЕЛЕЙ', 'color: #1a73e8; font-size: 18px; font-weight: bold;');
    console.log('%c=========================================', 'color: #666;');
    console.log(`%cВсего пользователей: ${users.length}`, 'color: #34a853; font-weight: bold;');
    console.log(' ');
    
    users.forEach((user, index) => {
        console.log(`%c👤 Пользователь #${index + 1}:`, 'color: #1a73e8; font-weight: bold;');
        console.log(`   ID: ${user.id}`);
        console.log(`   Имя: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Пароль: ${user.password}`);
        console.log(`   Дата регистрации: ${new Date(user.createdAt).toLocaleString('ru-RU')}`);
        console.log(`   Подписка: ${user.isSubscribed ? '✅ АКТИВНА' : '❌ неактивна'}`);
        console.log(`   Сообщений использовано: ${user.freeMessagesUsed || 0}`);
        console.log('   ---');
    });
    
    console.log('%c=========================================', 'color: #666;');
    console.log('%c📋 КОМАНДЫ ДЛЯ УПРАВЛЕНИЯ:', 'color: #fbbc05; font-weight: bold;');
    console.log('%c1. findUser("email@example.com") - найти пользователя', 'color: #34a853;');
    console.log('%c2. resetPassword("email@example.com") - сбросить пароль', 'color: #1a73e8;');
    console.log('%c3. deleteUser("email@example.com") - удалить пользователя', 'color: #ea4335;');
    console.log('%c4. exportUsers() - экспорт всех пользователей', 'color: #fbbc05;');
    
    return users;
};

// 2. Найти пользователя по email
window.findUser = function(email) {
    const users = JSON.parse(localStorage.getItem('codequery_users')) || [];
    const user = users.find(u => u.email === email);
    
    if (user) {
        console.log('%c🔍 ПОЛЬЗОВАТЕЛЬ НАЙДЕН:', 'color: #34a853; font-size: 16px; font-weight: bold;');
        console.log(' ');
        console.log(`   Имя: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Пароль: ${user.password}`);
        console.log(`   Дата регистрации: ${new Date(user.createdAt).toLocaleString('ru-RU')}`);
        console.log(`   Подписка: ${user.isSubscribed ? '✅ АКТИВНА' : '❌ неактивна'}`);
        console.log(`   Сообщений использовано: ${user.freeMessagesUsed || 0}`);
        console.log(' ');
        console.log('%c📋 КОМАНДЫ ДЛЯ ЭТОГО ПОЛЬЗОВАТЕЛЯ:', 'color: #fbbc05; font-weight: bold;');
        console.log(`%c1. resetPassword("${email}") - сбросить пароль`, 'color: #1a73e8;');
        console.log(`%c2. deleteUser("${email}") - удалить пользователя`, 'color: #ea4335;');
        
        return user;
    } else {
        console.log(`%c❌ Пользователь с email "${email}" не найден`, 'color: #ea4335; font-weight: bold;');
        return null;
    }
};

// 3. Сбросить пароль пользователя
window.resetPassword = function(email, newPassword = '123456') {
    const users = JSON.parse(localStorage.getItem('codequery_users')) || [];
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex !== -1) {
        const oldPassword = users[userIndex].password;
        users[userIndex].password = newPassword;
        localStorage.setItem('codequery_users', JSON.stringify(users));
        
        console.log('%c✅ ПАРОЛЬ СБРОШЕН УСПЕШНО!', 'color: #34a853; font-size: 16px; font-weight: bold;');
        console.log(' ');
        console.log(`   Email: ${email}`);
        console.log(`   Старый пароль: ${oldPassword}`);
        console.log(`   Новый пароль: ${newPassword}`);
        console.log(' ');
        console.log('%c⚠️ Сообщите пользователю новый пароль', 'color: #fbbc05; font-weight: bold;');
        
        return true;
    } else {
        console.log(`%c❌ Пользователь с email "${email}" не найден`, 'color: #ea4335; font-weight: bold;');
        return false;
    }
};

// 4. Удалить пользователя
window.deleteUser = function(email) {
    const users = JSON.parse(localStorage.getItem('codequery_users')) || [];
    const user = users.find(u => u.email === email);
    
    if (user) {
        if (confirm(`Удалить пользователя ${email}?`)) {
            const filteredUsers = users.filter(u => u.email !== email);
            localStorage.setItem('codequery_users', JSON.stringify(filteredUsers));
            
            console.log('%c🗑️ ПОЛЬЗОВАТЕЛЬ УДАЛЕН:', 'color: #ea4335; font-size: 16px; font-weight: bold;');
            console.log(' ');
            console.log(`   Имя: ${user.name}`);
            console.log(`   Email: ${user.email}`);
            console.log(`   Дата регистрации: ${new Date(user.createdAt).toLocaleString('ru-RU')}`);
            console.log(' ');
            
            return true;
        }
        return false;
    } else {
        console.log(`%c❌ Пользователь с email "${email}" не найден`, 'color: #ea4335; font-weight: bold;');
        return false;
    }
};

// 5. Экспорт пользователей в формат для копирования
window.exportUsers = function() {
    const users = JSON.parse(localStorage.getItem('codequery_users')) || [];
    
    if (users.length === 0) {
        console.log('%c📭 Нет пользователей для экспорта', 'color: #ea4335; font-weight: bold;');
        return;
    }
    
    console.log('%c📤 ЭКСПОРТ ПОЛЬЗОВАТЕЛЕЙ:', 'color: #1a73e8; font-size: 16px; font-weight: bold;');
    console.log('%c=========================================', 'color: #666;');
    console.log('Скопируйте этот текст для поддержки:');
    console.log(' ');
    
    const exportText = users.map(user => {
        return `👤 ${user.name} (${user.email}) - Зарегистрирован: ${new Date(user.createdAt).toLocaleDateString('ru-RU')} - Подписка: ${user.isSubscribed ? 'Активна' : 'Нет'} - Сообщений: ${user.freeMessagesUsed || 0}/10`;
    }).join('\n');
    
    console.log(exportText);
    console.log(' ');
    console.log('%c=========================================', 'color: #666;');
    console.log('%c📋 Всего пользователей:', 'color: #34a853; font-weight: bold;', users.length);
    
    // Автоматическое копирование в буфер обмена
    const textToCopy = `Список пользователей CodeQuery (${new Date().toLocaleString('ru-RU')}):\n\n${exportText}\n\nВсего пользователей: ${users.length}`;
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log('%c✅ Текст скопирован в буфер обмена!', 'color: #34a853; font-weight: bold;');
        })
        .catch(err => {
            console.log('%c⚠️ Не удалось скопировать в буфер обмена', 'color: #fbbc05; font-weight: bold;');
        });
    
    return exportText;
};

// 6. Автоматическая загрузка тестовых пользователей (для демо)
window.addTestUsers = function() {
    const testUsers = [
        {
            id: Date.now() + 1,
            name: "Иван Петров",
            email: "ivan@example.com",
            password: "password123",
            createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 дней назад
            isSubscribed: true,
            freeMessagesUsed: 3
        },
        {
            id: Date.now() + 2,
            name: "Мария Сидорова",
            email: "maria@example.com",
            password: "secure456",
            createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 дня назад
            isSubscribed: false,
            freeMessagesUsed: 8
        },
        {
            id: Date.now() + 3,
            name: "Алексей Иванов",
            email: "alex@example.com",
            password: "alex789",
            createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 день назад
            isSubscribed: false,
            freeMessagesUsed: 2
        }
    ];
    
    const currentUsers = JSON.parse(localStorage.getItem('codequery_users')) || [];
    const newUsers = [...currentUsers, ...testUsers];
    localStorage.setItem('codequery_users', JSON.stringify(newUsers));
    
    console.log('%c🧪 ТЕСТОВЫЕ ПОЛЬЗОВАТЕЛИ ДОБАВЛЕНЫ!', 'color: #34a853; font-size: 16px; font-weight: bold;');
    console.log('%c=========================================', 'color: #666;');
    console.log('Добавлено 3 тестовых пользователя:');
    console.log('1. Иван Петров (ivan@example.com) - с подпиской');
    console.log('2. Мария Сидорова (maria@example.com) - без подписки');
    console.log('3. Алексей Иванов (alex@example.com) - без подписки');
    console.log(' ');
    console.log('%c📋 Используйте команды:', 'color: #fbbc05; font-weight: bold;');
    console.log('%cshowAllUsers() - просмотреть всех пользователей', 'color: #1a73e8;');
    
    return testUsers;
};