const app = {
    state: {
        currentView: 'home',
        lang: 'ru',
        exam: null,
        testId: null,
        questions: [],
        currentIdx: 0,
        userAnswers: [],
        timeLeft: 3600,
        timer: null,
        lastResult: null,
        isReviewMode: false,
        githubToken: localStorage.getItem('mc_gh_token') || '',
        user: JSON.parse(localStorage.getItem('lp_user')) || null,
        currentModule: 1,
        totalModules: 1,
        isBreakTime: false,
        scratchpad: {
            active: false,
            canvas: null,
            ctx: null,
            isDrawing: false,
            lastX: 0,
            lastY: 0
        }
    },

    // SAT Scaled Score Table (Raw 0-44 to Scaled 200-800)
    getSATScaledScore(rawScore) {
        if (rawScore === 0) return 200;
        if (rawScore >= 44) return 800;
        // Approximation: 200 + (raw/44 * 600), typical for Math section
        return Math.round(200 + (rawScore / 44) * 600);
    },

    translations: {
        en: {
            pageTitle: 'LambdaPi - Academy of Exact Sciences',
            navResults: 'Results',
            navAdmin: 'Admin',
            heroTag: 'PREPARATION PLATFORM',
            heroTitle: 'Calm and collected <span class="text-accent">exam</span> preparation',
            heroSubtitle: 'Professional educational environment for effective math learning. Preparation for DTM, National Certificate, and SAT.',
            heroCTA: 'Start Learning',
            heroDemo: 'Demo Test',
            heroStatTests: 'tests in database',
            heroStatQuestions: 'questions available',
            heroStatMode: 'preparation mode',
            heroStatModeValue: 'online',
            examSelect: 'Select Category',
            examSubtitle: 'Specialized preparation trajectories adapted to specific exam requirements.',
            advantageLabel: 'LAMBDAPI ADVANTAGE',
            advantageTitle: 'Precision in every detail of learning',
            advantageAnalytics: 'Analytics',
            advantageAnalyticsDesc: 'Detailed breakdown of every mistake after the test.',
            advantageRelevance: 'Relevance',
            advantageRelevanceDesc: 'Content perfectly matches the latest exam standards.',
            examCountLabel: 'tests',
            questionCountLabel: 'questions',
            openExam: 'Open section',
            navCurriculum: 'Curriculum',
            navResources: 'Resources',
            navPricing: 'Pricing',
            navSign: 'Sign In',
            navGetStarted: 'Get Started',
            listTitle: 'Tests by category',
            back: 'Back',
            demoBadge: 'Demo',
            regularBadge: 'Exam',
            demoTitle: 'Demo Test',
            testTitle: 'Test',
            start: 'Start test',
            quizQuestion: 'Question',
            timerLabel: 'Time left',
            next: 'Next',
            prev: 'Prev',
            finish: 'Finish',
            resultTitle: 'Test Result',
            resultSubtitle: 'Test is finished. Below are your score, percentage, and remaining time.',
            scoreLabel: 'Score',
            percentLabel: 'Percentage',
            timeLabel: 'Time left',
            homeButton: 'Home',
            historyButton: 'History',
            reviewButton: 'Review answers',
            historyTitle: 'Results Archive',
            clearHistory: 'Clear history',
            dateCol: 'Date',
            examCol: 'Exam',
            testCol: 'Test',
            scoreCol: 'Score',
            percentCol: 'Percentage',
            emptyHistory: 'History is empty.',
            clearConfirm: 'Delete all results?',
            quizMetaTitle: 'Progress control',
            quizMetaSubtitle: 'Enter your answer and move to the next question.',
            adminTitle: 'Dashboard',
            adminPassLabel: 'Admin Password',
            adminLogin: 'Login',
            adminTokenLabel: 'GitHub Token',
            adminUploadTitle: 'Add new test',
            adminExamSelect: 'Category',
            adminTestNum: 'Test Number',
            adminFilesLabel: 'Select files (.tex, .txt, images)',
            adminSave: 'Save to GitHub',
            adminStatus: 'Status',
            confirmExit: 'Test is not finished. Exit?',
            openAnswerPlaceholder: 'Enter answer...',
            satReference: 'Reference Sheet',
            navProfile: 'Profile',
            loginTitle: 'Sign In',
            registerTitle: 'Register',
            emailLabel: 'Email',
            passLabel: 'Password',
            nameLabel: 'Name',
            noAccount: 'No account? Register',
            hasAccount: 'Have an account? Sign In',
            logout: 'Logout',
            statsTitle: 'Your Progress',
            totalTests: 'Total tests',
            avgScore: 'Average score',
            recentActivity: 'Recent activity',
            nextModule: 'Next Module',
            moduleTitle: 'Module',
            breakTitle: 'Break',
            breakDesc: 'The first module is complete. You can take a break before starting the second module.',
            footerContact: 'Contact Admin',
            footerTelegram: 'Telegram',
            footerPhone: 'Phone',
            footerIntegrity: 'Integrity',
            footerPrivacy: 'Privacy',
            footerTerms: 'Terms',
            footerAdmin: 'Admin Panel'
        },
        ru: {
            pageTitle: 'LambdaPi - Академия точных наук',
            navResults: 'Результаты',
            navAdmin: 'Админ',
            heroTag: 'ПЛАТФОРМА ПОДГОТОВКИ',
            heroTitle: 'Собранная и спокойная подготовка к <span class="text-accent">экзаменам</span>',
            heroSubtitle: 'Профессиональная образовательная среда для эффективного освоения математики. Подготовка к DTM, Milliy Sertifikat и квалификационной аттестации педагогов.',
            heroCTA: 'Начать обучение',
            heroDemo: 'Демо-тест',
            heroStatTests: 'тестов в базе',
            heroStatQuestions: 'вопросов доступно',
            heroStatMode: 'режим подготовки',
            heroStatModeValue: 'онлайн',
            examSelect: 'Выберите направление',
            examSubtitle: 'Специализированные траектории подготовки, адаптированные под конкретные требования экзаменов.',
            advantageLabel: 'LAMBDAPI ADVANTAGE',
            advantageTitle: 'Точность в каждой детали обучения',
            advantageAnalytics: 'Аналитика',
            advantageAnalyticsDesc: 'Подробный разбор каждой ошибки после теста.',
            advantageRelevance: 'Актуальность',
            advantageRelevanceDesc: 'Контент соответствует последним стандартам DTM.',
            examCountLabel: 'тестов',
            questionCountLabel: 'вопросов',
            openExam: 'Перейти к блоку',
            navCurriculum: 'Программы',
            navResources: 'Ресурсы',
            navPricing: 'Тарифы',
            navSign: 'Войти',
            navGetStarted: 'Начать',
            listTitle: 'Тесты по направлению',
            back: 'Назад',
            demoBadge: 'Демо',
            regularBadge: 'Экзамен',
            demoTitle: 'Демо-тест',
            testTitle: 'Тест',
            start: 'Начать тест',
            quizQuestion: 'Вопрос',
            timerLabel: 'Осталось времени',
            next: 'Далее',
            prev: 'Назад',
            finish: 'Завершить',
            resultTitle: 'Результат теста',
            resultSubtitle: 'Работа завершена. Ниже показаны баллы, процент и оставшееся время.',
            scoreLabel: 'Баллы',
            percentLabel: 'Процент',
            timeLabel: 'Остаток времени',
            homeButton: 'На главную',
            historyButton: 'История',
            reviewButton: 'Просмотр ответов',
            historyTitle: 'Архив результатов',
            clearHistory: 'Очистить историю',
            dateCol: 'Дата',
            examCol: 'Экзамен',
            testCol: 'Тест',
            scoreCol: 'Баллы',
            percentCol: 'Процент',
            emptyHistory: 'История пока пуста.',
            clearConfirm: 'Удалить все результаты?',
            quizMetaTitle: 'Контроль прогресса',
            quizMetaSubtitle: 'Выберите формат ответа и двигайтесь дальше без перегрузки интерфейса.',
            adminTitle: 'Панель управления',
            adminPassLabel: 'Пароль администратора',
            adminLogin: 'Войти',
            adminTokenLabel: 'GitHub Token',
            adminUploadTitle: 'Добавить новый тест',
            adminExamSelect: 'Направление',
            adminTestNum: 'Номер теста',
            adminFilesLabel: 'Выберите файлы (.tex, .txt, фотографии)',
            adminSave: 'Сохранить на GitHub',
            adminStatus: 'Статус',
            confirmExit: 'Тест не закончен. Выйти?',
            openAnswerPlaceholder: 'Введите ответ...',
            satReference: 'Справочные материалы',
            navProfile: 'Профиль',
            loginTitle: 'Вход в аккаунт',
            registerTitle: 'Регистрация',
            emailLabel: 'Email',
            passLabel: 'Пароль',
            nameLabel: 'Имя',
            noAccount: 'Нет аккаунта? Регистрация',
            hasAccount: 'Уже есть аккаунт? Войти',
            logout: 'Выйти',
            statsTitle: 'Ваш прогресс',
            totalTests: 'Пройдено тестов',
            avgScore: 'Средний балл',
            recentActivity: 'Последняя активность',
            nextModule: 'К следующему модулю',
            moduleTitle: 'Модуль',
            breakTitle: 'Перерыв',
            breakDesc: 'Первый модуль завершен. Вы можете отдохнуть перед началом второго модуля.',
            footerContact: 'Связаться с админом',
            footerTelegram: 'Телеграм',
            footerPhone: 'Телефон',
            footerIntegrity: 'Честность',
            footerPrivacy: 'Приватность',
            footerTerms: 'Условия',
            footerAdmin: 'Панель управления'
        },
        uz: {
            pageTitle: 'LambdaPi - Matematika imtihonlariga tayyorgarlik',
            navResults: 'Natijalar',
            navAdmin: 'Admin',
            heroEyebrow: 'Matematika bo‘yicha tayyorgarlik platformasi',
            heroTitle: 'Imtihonlarga puxta va tartibli <span class="text-accent">tayyorgarlik</span>',
            heroSubtitle: 'DTM, Milliy sertifikat va Attestatsiya yo‘nalishlari bo‘yicha mashq qiling, tilni almashtiring va testlarni qulay interfeysda yeching.',
            heroStatTests: 'ta test mavjud',
            heroStatQuestions: 'Savollar soni',
            heroStatMode: 'Tayyorlov rejimi',
            heroStatModeValue: 'Onlayn',
            examSelect: 'Yo‘nalishni tanlang',
            examCountLabel: 'ta test',
            questionCountLabel: 'Savollar soni',
            openExam: 'Bo‘limni ochish',
            listTitle: 'Yo‘nalish bo‘yicha testlar',
            back: 'Orqaga',
            demoBadge: 'Demo',
            regularBadge: 'Imtihon',
            demoTitle: 'Demo test',
            testTitle: 'Test',
            start: 'Testni boshlash',
            quizQuestion: 'Savol',
            timerLabel: 'Qolgan vaqt',
            next: 'Keyingisi',
            prev: 'Orqaga',
            finish: 'Tugatish',
            resultTitle: 'Test natijasi',
            resultSubtitle: 'Test tugadi. Quyida ball, foiz va qolgan vaqt ko‘rsatilgan.',
            scoreLabel: 'Ball',
            percentLabel: 'Foiz',
            timeLabel: 'Qolgan vaqt',
            homeButton: 'Bosh sahifa',
            historyButton: 'Tarix',
            reviewButton: 'Javoblarni ko\'rish',
            historyTitle: 'Natijalar arxivi',
            clearHistory: 'Tarixni tozalash',
            dateCol: 'Sana',
            examCol: 'Imtihon',
            testCol: 'Test',
            scoreCol: 'Ball',
            percentCol: 'Foiz',
            emptyHistory: 'Hozircha tarix bo‘sh.',
            clearConfirm: 'Barcha natijalar o‘chirilsinmi?',
            quizMetaTitle: 'Jarayon nazorati',
            quizMetaSubtitle: 'Javobni kiriting va ortiqcha chalg‘imasdan keyingi savolga o‘ting.',
            adminTitle: 'Boshqaruv paneli',
            adminPassLabel: 'Admin paroli',
            adminLogin: 'Kirish',
            adminTokenLabel: 'GitHub Token',
            adminUploadTitle: 'Yangi test qo\'shish',
            adminExamSelect: 'Yo\'nalish',
            adminTestNum: 'Test raqami',
            adminFilesLabel: 'Fayllarni tanlang (.tex, .txt, rasmlar)',
            adminSave: 'GitHubga saqlash',
            adminStatus: 'Holati',
            navGetStarted: 'Boshlash',
            heroTag: 'TAYYORLOV PLATFORMASI',
            heroTitle: 'Imtihonlarga puxta va tartibli <span class="text-accent">tayyorgarlik</span>',
            heroSubtitle: 'Matematika bo‘yicha professional ta’lim muhiti. DTM, Milliy sertifikat va o‘qituvchilar attestatsiyasiga samarali tayyorlaning.',
            heroCTA: 'O‘qishni boshlash',
            heroDemo: 'Demo test',
            heroStatTests: 'bazadagi testlar',
            heroStatQuestions: 'savollar mavjud',
            heroStatMode: 'tayyorlov rejimi',
            heroStatModeValue: 'onlayn',
            examSelect: 'Yo‘nalishni tanlang',
            examSubtitle: 'Imtihon talablariga moslashtirilgan ixtisoslashtirilgan tayyorgarlik yo‘nalishlari.',
            advantageLabel: 'LAMBDAPI AFZALLIGI',
            advantageTitle: 'Ta’limdagi har bir detalda aniqlik',
            advantageAnalytics: 'Analitika',
            advantageAnalyticsDesc: 'Testdan so‘ng har bir xato ustida batafsil ishlash imkoniyati.',
            advantageRelevance: 'Dolzarblik',
            advantageRelevanceDesc: 'Kontent DTM ning oxirgi standartlariga to‘la mos keladi.',
            openExam: 'Bo\'limga o\'tish',
            confirmExit: 'Test hali tugamadi. Chiqasizmi?',
            openAnswerPlaceholder: 'Javobni kiriting...',
            satReference: 'Ma\'lumotnoma',
            navProfile: 'Profil',
            loginTitle: 'Tizimga kirish',
            registerTitle: 'Ro\'yxatdan o\'tish',
            emailLabel: 'Email',
            passLabel: 'Parol',
            nameLabel: 'Ism',
            noAccount: 'Akkauntingiz yo\'qmi? Ro\'yxatdan o\'ting',
            hasAccount: 'Akkauntingiz bormi? Kirish',
            logout: 'Chiqish',
            statsTitle: 'Sizning natijalaringiz',
            totalTests: 'Topshirilgan testlar',
            avgScore: 'O\'rtacha ball',
            recentActivity: 'Oxirgi faollik',
            nextModule: 'Keyingi modulga',
            moduleTitle: 'Modul',
            breakTitle: 'Tanaffus',
            breakDesc: 'Birinchi modul tugadi. Ikkinchi modulni boshlashdan oldin dam olishingiz mumkin.',
            footerContact: 'Admin bilan bog‘lanish',
            footerTelegram: 'Telegram',
            footerPhone: 'Telefon',
            footerIntegrity: 'Xavfsizlik',
            footerPrivacy: 'Maxfiylik',
            footerTerms: 'Shartlar'
        }
    },

    examMeta: {
        en: {
            DTM: {
                title: 'DTM',
                subtitle: 'State testing preparation. Core math concepts.',
                icon: 'check-badge',
                accent: 'accent-cyan'
            },
            MS: {
                title: 'National Certificate',
                subtitle: 'General mathematics. Preparation for the national competence certificate.',
                icon: 'medal',
                accent: 'accent-gold'
            },
            Attestatsiya: {
                title: 'Attestation',
                subtitle: 'Teacher certification preparation. Advanced math concepts.',
                icon: 'shield',
                accent: 'accent-emerald'
            },
            SAT: {
                title: 'SAT',
                subtitle: 'The international standard for college admissions. Focus on Algebra, Problem Solving, and Advanced Math.',
                icon: 'globe-alt',
                accent: 'accent-indigo'
            }
        },
        ru: {
            DTM: {
                title: 'ДТМ',
                subtitle: 'Базовый поток для абитуриентов. Подготовка к государственному тестированию.',
                icon: 'check-badge',
                accent: 'accent-cyan'
            },
            MS: {
                title: 'Национальный сертификат',
                subtitle: 'Общая математика. Подготовка к получению национального сертификата компетенции.',
                icon: 'medal',
                accent: 'accent-gold'
            },
            Attestatsiya: {
                title: 'Аттестация',
                subtitle: 'Профильный блок для преподавателей. Повышение квалификационной категории.',
                icon: 'shield',
                accent: 'accent-emerald'
            },
            SAT: {
                title: 'SAT',
                subtitle: 'The international standard for college admissions. Focus on Algebra, Problem Solving, and Advanced Math.',
                icon: 'globe-alt',
                accent: 'accent-indigo'
            }
        },
        uz: {
            DTM: {
                title: 'DTM',
                subtitle: 'Davlat test markazi imtihonlari. Abituriyentlar uchun asosiy yo\'nalish.',
                icon: 'check-badge',
                accent: 'accent-cyan'
            },
            MS: {
                title: 'Milliy sertifikat',
                subtitle: 'Matematika bo\'yicha milliy sertifikat. Umumiy kompetensiya bahosi.',
                icon: 'medal',
                accent: 'accent-gold'
            },
            Attestatsiya: {
                title: 'Attestatsiya',
                subtitle: 'O\'qituvchilar attestatsiyasi. Malaka toifasini oshirish uchun tayyorgarlik.',
                icon: 'shield',
                accent: 'accent-emerald'
            },
            SAT: {
                title: 'SAT',
                subtitle: 'Xalqaro universitetlarga kirish standarti. Algebra, Problem Solving va Advanced Math bo\'limlari.',
                icon: 'globe-alt',
                accent: 'accent-indigo'
            }
        }
    },

    async init() {
        this.bindEvents();
        this.syncHeader();
        this.renderView('home', {}, { instant: true });

        // Load user results from localStorage if logged in
        if (this.state.user) {
            this.loadUserHistory();
        }

        window.addEventListener('beforeunload', (e) => {
            if (this.state.currentView === 'quiz' && !this.state.isReviewMode) {
                e.preventDefault();
                e.returnValue = this.t().confirmExit;
                return this.t().confirmExit;
            }
        });
    },

    toggleReference() {
        const modal = document.getElementById('reference-modal');
        if (modal) modal.classList.toggle('active');
    },

    toggleCalculator() {
        const panel = document.getElementById('sat-calculator-panel');
        if (panel) panel.classList.toggle('hidden');
    },

    toggleScratchpad() {
        const container = document.getElementById('scratchpad-container');
        const btn = document.getElementById('scratchpad-btn');
        this.state.scratchpad.active = !this.state.scratchpad.active;
        
        if (this.state.scratchpad.active) {
            container.classList.add('active');
            btn.classList.add('active');
            this.initScratchpad();
        } else {
            container.classList.remove('active');
            btn.classList.remove('active');
        }
    },

    initScratchpad() {
        const canvas = document.getElementById('scratchpad-canvas');
        if (!canvas) return;
        
        // Match canvas size to window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#22d3ee'; // Cyan color
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        this.state.scratchpad.canvas = canvas;
        this.state.scratchpad.ctx = ctx;

        const startDrawing = (e) => {
            this.state.scratchpad.isDrawing = true;
            const pos = this.getMousePos(e);
            [this.state.scratchpad.lastX, this.state.scratchpad.lastY] = [pos.x, pos.y];
        };

        const draw = (e) => {
            if (!this.state.scratchpad.isDrawing) return;
            const pos = this.getMousePos(e);
            ctx.beginPath();
            ctx.moveTo(this.state.scratchpad.lastX, this.state.scratchpad.lastY);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            [this.state.scratchpad.lastX, this.state.scratchpad.lastY] = [pos.x, pos.y];
        };

        const stopDrawing = () => this.state.scratchpad.isDrawing = false;

        canvas.onmousedown = startDrawing;
        canvas.onmousemove = draw;
        canvas.onmouseup = stopDrawing;
        canvas.onmouseout = stopDrawing;

        // Touch support
        canvas.ontouchstart = (e) => startDrawing(e.touches[0]);
        canvas.ontouchmove = (e) => { e.preventDefault(); draw(e.touches[0]); };
        canvas.ontouchend = stopDrawing;
    },

    getMousePos(e) {
        const rect = this.state.scratchpad.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    },

    clearScratchpad() {
        if (this.state.scratchpad.ctx && this.state.scratchpad.canvas) {
            this.state.scratchpad.ctx.clearRect(0, 0, this.state.scratchpad.canvas.width, this.state.scratchpad.canvas.height);
        }
    },

    bindEvents() {
        document.querySelectorAll('.lang-btn').forEach((btn) => {
            btn.addEventListener('click', (event) => {
                this.setLanguage(event.currentTarget.dataset.lang);
            });
        });
    },


    t() {
        return this.translations[this.state.lang];
    },

    getExamMeta(exam) {
        return this.examMeta[this.state.lang][exam];
    },

    getExamName(exam) {
        return this.getExamMeta(exam)?.title || exam;
    },

    getGlobalStats() {
        const exams = Object.keys(EXAMS_METADATA);
        let testsCount = 0;
        let questionsCount = 0;
        exams.forEach(exam => {
            const data = EXAMS_METADATA[exam];
            const testIds = Object.keys(data);
            testsCount += testIds.length;
            testIds.forEach(id => {
                questionsCount += data[id];
            });
        });
        return { tests: testsCount, totalQuestions: questionsCount };
    },

    setLanguage(lang) {
        if (lang === this.state.lang) return;
        this.state.lang = lang;
        this.syncHeader();

        if (this.state.currentView === 'quiz') {
            this.renderQuizContent();
        } else {
            this.renderView(this.state.currentView, { exam: this.state.exam, testId: this.state.testId }, { instant: true });
        }
    },

    syncHeader() {
        const current = this.t();
        document.title = current.pageTitle;
        document.documentElement.lang = this.state.lang;

        document.querySelectorAll('.lang-btn').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.lang === this.state.lang);
        });

        const navLogin = document.getElementById('nav-login');
        const headerActions = document.querySelector('.header-actions');
        
        if (navLogin) {
            if (this.state.user) {
                navLogin.textContent = this.state.user.name;
                navLogin.onclick = () => this.renderView('profile');
                navLogin.className = 'btn-glow user-btn';
            } else {
                navLogin.textContent = current.navSign;
                navLogin.onclick = () => this.renderView('login');
                navLogin.className = 'btn-glow';
            }
        }

        // Add Admin link to header if not already there
        let adminLink = document.getElementById('nav-admin-link');
        if (!adminLink && headerActions) {
            adminLink = document.createElement('button');
            adminLink.id = 'nav-admin-link';
            adminLink.className = 'btn-ghost';
            adminLink.style.marginRight = '0.5rem';
            adminLink.onclick = () => this.renderView('admin-login');
            headerActions.insertBefore(adminLink, navLogin);
        }
        if (adminLink) {
            adminLink.textContent = current.navAdmin;
        }
    },

    handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        // Simple local storage mock auth
        const users = JSON.parse(localStorage.getItem('lp_users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            this.state.user = { name: user.name, email: user.email };
            localStorage.setItem('lp_user', JSON.stringify(this.state.user));
            this.syncHeader();
            this.renderView('home');
        } else {
            alert('Неверный email или пароль');
        }
    },

    handleRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        const users = JSON.parse(localStorage.getItem('lp_users')) || [];
        if (users.find(u => u.email === email)) {
            alert('Пользователь с таким email уже существует');
            return;
        }

        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('lp_users', JSON.stringify(users));

        this.state.user = { name, email };
        localStorage.setItem('lp_user', JSON.stringify(this.state.user));
        this.syncHeader();
        this.renderView('home');
    },

    handleLogout() {
        this.state.user = null;
        localStorage.removeItem('lp_user');
        this.syncHeader();
        this.renderView('home');
    },

    getUserHistory() {
        if (!this.state.user) return [];
        const history = JSON.parse(localStorage.getItem(`lp_history_${this.state.user.email}`)) || [];
        return history.sort((a, b) => b.timestamp - a.timestamp);
    },

    saveResult(result) {
        if (!this.state.user) return;
        const history = this.getUserHistory();
        history.push({
            ...result,
            timestamp: Date.now()
        });
        localStorage.setItem(`lp_history_${this.state.user.email}`, JSON.stringify(history));
    },

    loadUserHistory() {
        // Just to ensure storage keys exist
        this.getUserHistory();
    },

    async loadTestData(exam, testId) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `js/data/${exam}/${testId}.js`;
            script.onload = () => {
                const data = window.TEST_DATA;
                // delete window.TEST_DATA; // Keep if needed for multiple loads, but usually safer to delete
                resolve(data);
            };
            script.onerror = () => reject(new Error(`Failed to load ${exam}/${testId}`));
            document.head.appendChild(script);
        });
    },

    async renderView(viewId, params = {}, options = {}) {
        const root = document.getElementById('app-root');
        const doRender = async () => {
            this.state.currentView = viewId;
            root.innerHTML = this.getViewHTML(viewId, params);

            if (viewId === 'test-list') this.renderTestList(params.exam || this.state.exam);
            if (viewId === 'quiz') {
                if (!options.preserveQuiz) {
                    try {
                        const exam = params.exam || this.state.exam;
                        const testId = params.testId || this.state.testId;
                        const data = await this.loadTestData(exam, testId);
                        this.startQuiz(exam, testId, data);
                    } catch (e) {
                        console.error(e);
                        this.renderView('home');
                        return;
                    }
                } else {
                    this.renderQuizContent();
                }
            }
            if (viewId === 'history') this.renderHistoryTable();
            if (viewId === 'admin-login') this.attachAdminLoginEvents();
            if (viewId === 'admin') this.attachAdminEvents();
            
            // Re-render math if footer or other content has LaTeX
            if (window.renderMathInElement) {
                renderMathInElement(root, {
                    delimiters: [
                        { left: '\\(', right: '\\)', display: false },
                        { left: '\\[', right: '\\]', display: true }
                    ]
                });
            }
        };

        if (options.instant) {
            await doRender();
            return;
        }

        root.classList.add('fade-out');
        setTimeout(async () => {
            await doRender();
            root.classList.remove('fade-out');
        }, 180);
    },

    getViewHTML(viewId, params = {}) {
        const isSAT = (params.exam || this.state.exam) === 'SAT' && ['quiz', 'break', 'results'].includes(viewId);
        const current = isSAT ? this.translations.en : this.t();
        const footer = this.getFooterHTML(isSAT ? 'en' : this.state.lang);

        switch (viewId) {
            case 'home': {
                const stats = this.getGlobalStats();
                return `
                    <section class="hero-landing">
                        <div class="hero-content">
                            <div class="hero-tag">${current.heroTag}</div>
                            <h1 class="hero-title">${current.heroTitle}</h1>
                            <p class="hero-description">${current.heroSubtitle}</p>
                            <div class="hero-btns">
                                <button class="btn-glow" onclick="document.getElementById('selection').scrollIntoView({behavior:'smooth'})">${current.heroCTA}</button>
                                <button class="btn-ghost" onclick="app.startDemo()">${current.heroDemo}</button>
                            </div>
                        </div>
                        <div class="hero-visual">
                            <div class="stats-card">
                                <div class="stats-card-header">
                                    <span class="icon">💻</span>
                                    <span>System Status</span>
                                </div>
                                <div class="stat-item">
                                    <span class="label">${current.heroStatTests}</span>
                                    <span class="value">${stats.tests}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="label">${current.heroStatQuestions}</span>
                                    <span class="value">${stats.totalQuestions}+</span>
                                </div>
                                <div class="platform-load">
                                    <div class="stat-item">
                                        <span class="label">Platform Load</span>
                                        <div style="display:flex; justify-content:space-between; align-items:center;">
                                            <span style="font-size:0.8rem; font-weight:700;">Active</span>
                                            <span style="font-size:0.8rem; color:var(--accent);">24%</span>
                                        </div>
                                    </div>
                                    <div class="load-bar"><div class="load-fill"></div></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="selection-section" id="selection">
                        <div class="section-header">
                            <div>
                                <h2>${current.examSelect}</h2>
                                <p style="color:var(--text-secondary); margin-top:1rem;">${current.examSubtitle}</p>
                            </div>
                        </div>
                        <div class="selection-grid">
                            ${this.renderExamCards()}
                        </div>
                    </section>

                    <section class="advantage-section">
                        <div class="advantage-grid">
                            <div class="advantage-content">
                                <span class="advantage-label">${current.advantageLabel}</span>
                                <h2 class="advantage-title">${current.advantageTitle}</h2>
                                <div class="advantage-features">
                                    <div class="feature-item">
                                        <h4>${current.advantageAnalytics}</h4>
                                        <p>${current.advantageAnalyticsDesc}</p>
                                    </div>
                                    <div class="feature-item">
                                        <h4>${current.advantageRelevance}</h4>
                                        <p>${current.advantageRelevanceDesc}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="advantage-graphic" id="advantage-graphic">
                                <img src="assets/advantage.png" alt="LambdaPi Advantage">
                            </div>
                        </div>
                    </section>
                    ${footer}
                `;
            }
            case 'test-list':
                return `
                    <section class="section-top">
                        <button class="btn-secondary" onclick="app.renderView('home')">${current.back}</button>
                        <div class="section-heading section-heading-tight">
                            <h2>${current.listTitle}</h2>
                            <p>${this.getExamName(params.exam || this.state.exam)}</p>
                        </div>
                    </section>
                    <section class="test-grid" id="test-grid"></section>
                    ${footer}
                `;
            case 'quiz': {
                const quizT = (params.exam || this.state.exam) === 'SAT' ? this.translations.en : current;
                return `
                    <section class="quiz-layout">
                        <div class="quiz-dashboard">
                            <div class="quiz-pill">
                                <span class="quiz-pill-label">${quizT.timerLabel}</span>
                                <strong id="timer-val">00:00</strong>
                            </div>
                            <div class="progress-box">
                                <div class="progress-container"><div class="progress-fill" id="progress-fill"></div></div>
                                <div id="quiz-map" class="quiz-map"></div>
                            </div>
                            <div class="quiz-pill">
                                <span class="quiz-pill-label">${quizT.quizQuestion}</span>
                                <strong id="quiz-count">1 / 1</strong>
                            </div>
                            ${(params.exam || this.state.exam) === 'SAT' ? `
                                <button class="btn-secondary sat-ref-btn" onclick="app.toggleReference()">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                                    ${quizT.satReference}
                                </button>
                                <button class="btn-secondary sat-calc-btn" onclick="app.toggleCalculator()">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px"><path d="M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2zM8 9h0M12 9h0M16 9h0M8 13h0M12 13h0M16 13h0M8 17h0M12 17h0M16 17h0"/></svg>
                                    Calculator
                                </button>
                            ` : ''}
                        </div>
                        <div class="question-view glass-container">
                            <div id="sat-calculator-panel" class="sat-calculator-panel hidden">
                                <div class="ref-header">
                                    <h3>Graphing Calculator</h3>
                                    <button class="close-ref" onclick="app.toggleCalculator()">×</button>
                                </div>
                                <div class="ref-content no-padding">
                                    <iframe src="https://www.desmos.com/testing/cb-digital-sat/graphing" style="width:100%; height:100%; border:none;"></iframe>
                                </div>
                            </div>

                            ${(params.exam || this.state.exam) === 'SAT' ? `
                            <div class="quiz-extra-tools">
                                <button class="tool-btn" id="scratchpad-btn" onclick="app.toggleScratchpad()">
                                    <i class="fas fa-pen"></i> Scratchpad
                                </button>
                            </div>
                            ` : ''}

                            <div class="question-meta">
                                <div>
                                    <span class="question-kicker" id="question-kicker"></span>
                                    <h2 id="question-text"></h2>
                                </div>
                                <div class="question-note">
                                    <strong>${quizT.quizMetaTitle}</strong>
                                    <span>${quizT.quizMetaSubtitle}</span>
                                </div>
                            </div>
                            <div id="question-image-wrap"></div>
                            <div class="options-list" id="options-list"></div>
                            <div class="quiz-actions">
                                <button class="btn-secondary" id="prev-btn" onclick="app.handlePrev()">${quizT.prev}</button>
                                <button class="btn-primary" id="next-btn" onclick="app.handleNext()">${quizT.next}</button>
                            </div>
                        </div>
                    </section>

                    ${(params.exam || this.state.exam) === 'SAT' ? `
                    <!-- Reference Modal -->
                    <div class="modal-overlay" id="reference-modal">
                        <div class="modal-content">
                            <button class="modal-close" onclick="app.toggleReference()">&times;</button>
                            <h3 style="margin-bottom: 1.5rem; text-align:center;">SAT Math Reference Sheet</h3>
                            <div style="max-height:75vh; overflow-y:auto; padding:0.5rem 1rem;">
                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.8rem;">
                                    <div>
                                        <h4 style="color:var(--cyan); margin-bottom:0.6rem; font-size:1rem;">Areas</h4>
                                        <p style="margin:0.4rem 0;">Circle: \\( A = \\pi r^2 \\)</p>
                                        <p style="margin:0.4rem 0;">Rectangle: \\( A = \\ell w \\)</p>
                                        <p style="margin:0.4rem 0;">Triangle: \\( A = \\frac{1}{2}bh \\)</p>
                                    </div>
                                    <div>
                                        <h4 style="color:var(--cyan); margin-bottom:0.6rem; font-size:1rem;">Volumes</h4>
                                        <p style="margin:0.4rem 0;">Rectangular Prism: \\( V = \\ell wh \\)</p>
                                        <p style="margin:0.4rem 0;">Cylinder: \\( V = \\pi r^2 h \\)</p>
                                        <p style="margin:0.4rem 0;">Sphere: \\( V = \\frac{4}{3}\\pi r^3 \\)</p>
                                        <p style="margin:0.4rem 0;">Cone: \\( V = \\frac{1}{3}\\pi r^2 h \\)</p>
                                        <p style="margin:0.4rem 0;">Pyramid: \\( V = \\frac{1}{3}\\ell wh \\)</p>
                                    </div>
                                    <div>
                                        <h4 style="color:var(--cyan); margin-bottom:0.6rem; font-size:1rem;">Circles</h4>
                                        <p style="margin:0.4rem 0;">Circumference: \\( C = 2\\pi r \\)</p>
                                        <p style="margin:0.4rem 0;">Arc length: \\( s = r\\theta \\)</p>
                                        <p style="margin:0.4rem 0;">Degrees in a circle: \\( 360^\\circ \\)</p>
                                        <p style="margin:0.4rem 0;">Radians in a circle: \\( 2\\pi \\)</p>
                                    </div>
                                    <div>
                                        <h4 style="color:var(--cyan); margin-bottom:0.6rem; font-size:1rem;">Right Triangles</h4>
                                        <p style="margin:0.4rem 0;">Pythagorean: \\( a^2 + b^2 = c^2 \\)</p>
                                        <p style="margin:0.4rem 0;">30-60-90: \\( x,\\; x\\sqrt{3},\\; 2x \\)</p>
                                        <p style="margin:0.4rem 0;">45-45-90: \\( x,\\; x,\\; x\\sqrt{2} \\)</p>
                                    </div>
                                    <div>
                                        <h4 style="color:var(--cyan); margin-bottom:0.6rem; font-size:1rem;">Algebra</h4>
                                        <p style="margin:0.4rem 0;">Quadratic Formula:</p>
                                        <p style="margin:0.4rem 0; text-align:center;">\\( x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\)</p>
                                        <p style="margin:0.4rem 0;">Slope: \\( m = \\frac{y_2 - y_1}{x_2 - x_1} \\)</p>
                                        <p style="margin:0.4rem 0;">Slope-intercept: \\( y = mx + b \\)</p>
                                    </div>
                                    <div>
                                        <h4 style="color:var(--cyan); margin-bottom:0.6rem; font-size:1rem;">Key Facts</h4>
                                        <p style="margin:0.4rem 0;">Triangle angles: \\( 180^\\circ \\)</p>
                                        <p style="margin:0.4rem 0;">Distance:</p>
                                        <p style="margin:0.4rem 0; text-align:center;">\\( d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2} \\)</p>
                                        <p style="margin:0.4rem 0;">Midpoint:</p>
                                        <p style="margin:0.4rem 0; text-align:center;">\\( M = \\left(\\frac{x_1+x_2}{2},\\, \\frac{y_1+y_2}{2}\\right) \\)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Scratchpad Canvas -->
                    <div id="scratchpad-container">
                        <canvas id="scratchpad-canvas"></canvas>
                        <div class="scratchpad-controls">
                            <button class="btn btn-secondary" onclick="app.clearScratchpad()">Clear</button>
                            <button class="btn btn-primary" onclick="app.toggleScratchpad()">Close</button>
                        </div>
                    </div>
                    ` : ''}
                `;
            }
            case 'login': {
                return `
                    <section class="auth-section">
                        <div class="auth-container glass-container animate-fade-in">
                            <h2 class="auth-title">${current.loginTitle}</h2>
                            <form id="login-form" onsubmit="app.handleLogin(event)">
                                <div class="form-group">
                                    <label>${current.emailLabel}</label>
                                    <input type="email" name="email" required placeholder="example@mail.com">
                                </div>
                                <div class="form-group">
                                    <label>${current.passLabel}</label>
                                    <input type="password" name="password" required>
                                </div>
                                <button type="submit" class="btn-primary w-100">${current.loginTitle}</button>
                            </form>
                            <p class="auth-footer" onclick="app.renderView('register')">${current.noAccount}</p>
                        </div>
                    </section>
                    ${footer}
                `;
            }
            case 'register': {
                return `
                    <section class="auth-section">
                        <div class="auth-container glass-container animate-fade-in">
                            <h2 class="auth-title">${current.registerTitle}</h2>
                            <form id="register-form" onsubmit="app.handleRegister(event)">
                                <div class="form-group">
                                    <label>${current.nameLabel}</label>
                                    <input type="text" name="name" required placeholder="Ваше имя">
                                </div>
                                <div class="form-group">
                                    <label>${current.emailLabel}</label>
                                    <input type="email" name="email" required placeholder="example@mail.com">
                                </div>
                                <div class="form-group">
                                    <label>${current.passLabel}</label>
                                    <input type="password" name="password" required>
                                </div>
                                <button type="submit" class="btn-primary w-100">${current.registerTitle}</button>
                            </form>
                            <p class="auth-footer" onclick="app.renderView('login')">${current.hasAccount}</p>
                        </div>
                    </section>
                    ${footer}
                `;
            }
            case 'profile': {
                const history = this.getUserHistory();
                const totalTests = history.length;
                const avgScore = totalTests > 0 ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / totalTests) : 0;

                return `
                    <section class="profile-section">
                        <div class="profile-header">
                            <div class="profile-info">
                                <div class="user-avatar">${this.state.user.name[0]}</div>
                                <div>
                                    <h1>${this.state.user.name}</h1>
                                    <p>${this.state.user.email}</p>
                                </div>
                            </div>
                            <button class="btn-secondary" onclick="app.handleLogout()">${current.logout}</button>
                        </div>

                        <div class="stats-grid">
                            <div class="stat-card glass-container">
                                <div class="stat-value">${totalTests}</div>
                                <div class="stat-label">${current.totalTests}</div>
                            </div>
                            <div class="stat-card glass-container">
                                <div class="stat-value">${avgScore}%</div>
                                <div class="stat-label">${current.avgScore}</div>
                            </div>
                        </div>

                        <div class="dashboard-grid">
                            <div class="chart-card glass-container">
                                <h4>Progress Trend (%)</h4>
                                <canvas id="progressChart"></canvas>
                            </div>
                            <div class="chart-card glass-container">
                                <h4>Category Distribution</h4>
                                <canvas id="categoryChart"></canvas>
                            </div>
                        </div>

                        <div class="history-list glass-container">
                            <h3>${current.recentActivity}</h3>
                            <div class="history-items">
                                ${history.length > 0 ? history.slice(0, 10).map(h => `
                                    <div class="history-item">
                                        <div class="history-meta">
                                            <span class="history-exam">${h.exam}</span>
                                            <span class="history-date">${new Date(h.timestamp).toLocaleDateString()}</span>
                                        </div>
                                        <div class="history-score ${h.score >= 70 ? 'score-high' : 'score-low'}">
                                            ${h.correct} / ${h.total} (${h.score}%)
                                            ${h.exam === 'SAT' && h.scaledScore ? `<span class="scaled-score-badge">${h.scaledScore}</span>` : ''}
                                        </div>
                                    </div>
                                `).join('') : '<p class="empty-msg">No tests completed yet.</p>'}
                            </div>
                        </div>
                    </section>
                    ${footer}
                `;
            }
            case 'break': {
                const breakT = this.state.exam === 'SAT' ? this.translations.en : current;
                const nextMod = this.state.currentModule + 1;
                return `
                    <section class="break-section">
                        <div class="break-card glass-container animate-fade-in">
                            <div class="break-icon">☕</div>
                            <h2>${breakT.breakTitle}</h2>
                            <p>${breakT.breakDesc}</p>
                            <button class="btn-primary" onclick="app.startModule(${nextMod})">${breakT.nextModule}</button>
                        </div>
                    </section>
                    ${footer}
                `;
            }
            case 'results': {
                const result = this.state.lastResult;
                const resT = result.exam === 'SAT' ? this.translations.en : current;
                const remaining = this.formatTime(result?.timeLeft || 0);
                return `
                    <section class="glass-container results-panel">
                        <span class="hero-eyebrow">${this.getExamName(result.exam)}</span>
                        <h1 class="result-title">${resT.resultTitle}</h1>
                        <p class="result-subtitle">${resT.resultSubtitle}</p>
                        <div class="stats-summary">
                            <div class="stat-box">
                                <span class="val">${result.score} / ${result.total}</span>
                                <span class="label">${resT.scoreLabel}</span>
                            </div>
                            ${result.exam === 'SAT' ? `
                                <div class="stat-box">
                                    <span class="val accent-text">${result.scaledScore}</span>
                                    <span class="label">Scaled Score (200-800)</span>
                                </div>
                            ` : `
                                <div class="stat-box">
                                    <span class="val">${result.percent}%</span>
                                    <span class="label">${resT.percentLabel}</span>
                                </div>
                            `}
                            <div class="stat-box">
                                <span class="val">${remaining}</span>
                                <span class="label">${resT.timeLabel}</span>
                            </div>
                        </div>
                        <div class="result-actions">
                            <button class="btn-primary" onclick="app.renderView('home')">${resT.homeButton}</button>
                            <button class="btn-secondary" onclick="app.startReview()">${resT.reviewButton}</button>
                            <button class="btn-secondary" onclick="app.renderView('history')">${resT.historyButton}</button>
                        </div>
                    </section>
                    ${footer}
                `;
            }
            case 'history':
                return `
                    <section class="section-top">
                        <button class="btn-secondary" onclick="app.renderView('home')">${current.back}</button>
                        <div class="section-heading section-heading-tight">
                            <h2>${current.historyTitle}</h2>
                            <p>${current.navResults}</p>
                        </div>
                        <button class="btn-secondary danger" onclick="app.clearHistory()">${current.clearHistory}</button>
                    </section>
                    <section class="glass-container history-panel">
                        <table class="history-table">
                            <thead>
                                <tr>
                                    <th>${current.dateCol}</th>
                                    <th>${current.examCol}</th>
                                    <th>${current.testCol}</th>
                                    <th>${current.scoreCol}</th>
                                    <th>${current.percentCol}</th>
                                </tr>
                            </thead>
                            <tbody id="history-body"></tbody>
                        </table>
                        <div id="history-empty" class="history-empty" style="display: none;">${current.emptyHistory}</div>
                    </section>
                    ${footer}
                `;
            case 'admin-login':
                return `
                    <section class="glass-container results-panel small-auth">
                        <h2>${current.adminTitle}</h2>
                        <div class="auth-form">
                            <label>${current.adminPassLabel}</label>
                            <input type="password" id="admin-pass" class="glass-input">
                            <button class="btn-primary" id="login-btn">${current.adminLogin}</button>
                        </div>
                    </section>
                    ${footer}
                `;
            case 'admin':
                return `
                    <section class="section-top">
                        <button class="btn-secondary" onclick="app.renderView('home')">${current.back}</button>
                        <div class="section-heading section-heading-tight">
                            <h2>${current.adminUploadTitle}</h2>
                        </div>
                    </section>
                    <section class="glass-container admin-panel-ui">
                        <div class="admin-tabs">
                            <button class="admin-tab-btn active" onclick="app.switchAdminTab('add')">${current.adminUploadTitle}</button>
                            <button class="admin-tab-btn" onclick="app.switchAdminTab('manage')">${this.state.lang === 'ru' ? 'Управление тестами' : (this.state.lang === 'uz' ? 'Testlarni boshqarish' : 'Manage Tests')}</button>
                        </div>
                        
                        <div id="admin-tab-add" class="admin-tab-content active">
                            <div class="admin-grid-form">
                                <div class="input-shell full">
                                    <label>${current.adminExamSelect}</label>
                                    <div class="admin-category-grid">
                                        <div class="admin-category-item active" data-exam="Attestatsiya">
                                            <span class="cat-icon">🛡️</span>
                                            <span>Attestation</span>
                                        </div>
                                        <div class="admin-category-item" data-exam="DTM">
                                            <span class="cat-icon">✔️</span>
                                            <span>DTM</span>
                                        </div>
                                        <div class="admin-category-item" data-exam="MS">
                                            <span class="cat-icon">🎖️</span>
                                            <span>MS</span>
                                        </div>
                                        <div class="admin-category-item" data-exam="SAT">
                                            <span class="cat-icon">🌐</span>
                                            <span>SAT</span>
                                        </div>
                                    </div>
                                    <input type="hidden" id="admin-exam" value="Attestatsiya">
                                </div>
                                <div class="input-shell">
                                    <label>${current.adminTokenLabel}</label>
                                    <input type="password" id="gh-token" class="glass-input" value="${this.state.githubToken}">
                                </div>
                                <div class="input-shell">
                                    <label>${current.adminTestNum}</label>
                                    <input type="number" id="admin-test-id" class="glass-input" placeholder="e.g. 11">
                                </div>
                                <div class="input-shell full">
                                    <label>${current.adminFilesLabel}</label>
                                    <input type="file" id="admin-files" class="glass-input" multiple>
                                    <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem;">
                                        ${this.state.lang === 'ru' ? 'Для SAT: eng.tex + .txt. Для остальных: rus.tex + uzb.tex + .txt' : 
                                          (this.state.lang === 'uz' ? 'SAT uchun: eng.tex + .txt. Boshqalar uchun: rus.tex + uzb.tex + .txt' : 
                                          'For SAT: eng.tex + .txt. For others: rus.tex + uzb.tex + .txt')}
                                    </p>
                                </div>
                                <button class="btn-primary full" id="admin-save-btn">${current.adminSave}</button>
                                <div id="admin-log" class="admin-log"></div>
                            </div>
                        </div>

                        <div id="admin-tab-manage" class="admin-tab-content">
                            <div class="admin-test-manager" id="admin-test-list">
                                <!-- Populated by renderAdminTestList -->
                            </div>
                        </div>
                    </section>
                    ${footer}
                `;
            default:
                return '';
        }
    },

    renderExamCards() {
        const current = this.translations[this.state.lang];
        const meta = this.examMeta[this.state.lang];

        return Object.entries(EXAMS_METADATA).map(([key, data]) => {
            const m = meta[key];
            const icons = { 'shield': '🛡️', 'medal': '🎖️', 'check-badge': '✔️', 'globe-alt': '🌐' };
            const icon = icons[m.icon] || '📦';
            const points = m.points || [`${Object.keys(data).length} ${current.examCountLabel}`, `${Object.values(data).reduce((a, b) => a + b, 0)} ${current.questionCountLabel}`];

            return `
                <div class="exam-card ${m.accent}" onclick="app.renderView('test-list', {exam: '${key}'})">
                    <div class="card-icon">${icon}</div>
                    <h3 class="card-title">${m.title}</h3>
                    <p class="card-desc">${m.subtitle}</p>
                    <div class="card-points">
                        ${points.map(p => `
                            <div class="card-point">
                                <span class="dot">✦</span>
                                <span>${p}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="card-cta">
                        <span>${current.openExam}</span>
                        <span>→</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    getFooterHTML(forceLang) {
        const lang = forceLang || this.state.lang;
        const current = this.translations[lang];
        return `
            <footer>
                <div class="footer-top">
                    <div class="footer-col">
                        <div class="logo">
                            <div class="logo-icon">λπ</div>
                            <span class="logo-wordmark">LambdaPi</span>
                        </div>
                        <p class="footer-tagline">Precision in Pedagogy.</p>
                    </div>
                    
                    <div class="footer-col footer-contact-info">
                        <h4>${current.footerContact}</h4>
                        <div class="footer-contact-links">
                            <a href="https://t.me/Abd_mardon" target="_blank" class="footer-link-item">
                                <span class="contact-icon">💬</span> ${current.footerTelegram}: @Abd_mardon
                            </a>
                            <a href="tel:+998915502025" class="footer-link-item">
                                <span class="contact-icon">📞</span> ${current.footerPhone}: +998 91 550 20 25
                            </a>
                        </div>
                    </div>

                    <div class="footer-col footer-links">
                        <span class="footer-link">${current.footerIntegrity}</span>
                        <span class="footer-link">${current.footerPrivacy}</span>
                        <span class="footer-link">${current.footerTerms}</span>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <div class="footer-bottom-left">
                        <span>© 2026 LambdaPi. All rights reserved.</span>
                    </div>
                </div>
            </footer>
        `;
    },

    renderTestList(exam) {
        this.state.exam = exam;
        const current = this.t();
        const tests = EXAMS_METADATA[exam] || {};
        const grid = document.getElementById('test-grid');
        grid.innerHTML = '';

        Object.keys(tests).forEach((id) => {
            const count = tests[id];
            const isDemo = id === 'demo';
            const card = document.createElement('article');
            card.className = 'glass-container test-card';
            card.innerHTML = `
                <div class="test-badge">${isDemo ? current.demoBadge : current.regularBadge}</div>
                <h3>${isDemo ? current.demoTitle : `${current.testTitle} #${id}`}</h3>
                <p>${count} ${current.questionCountLabel}</p>
                <div class="exam-cta">${current.start}</div>
            `;
            card.onclick = () => this.renderView('quiz', { exam, testId: id });
            grid.appendChild(card);
        });
    },

    startQuiz(exam, testId, data) {
        this.state.exam = exam;
        this.state.testId = testId;
        this.state.allQuestions = data;
        this.state.questions = data;
        this.state.currentIdx = 0;
        this.state.userAnswers = [];
        this.state.allUserAnswers = new Array(data.length).fill(null);
        this.state.currentModule = 1;

        if (this.state.exam === 'SAT') {
            this.setLanguage('en');
            this.state.totalModules = 2; // 2 blocks requested
            this.state.timeLeft = 2100;
            this.state.questions = data.filter(q => q.module === 1);
            this.state.userAnswers = new Array(this.state.questions.length).fill(null);
        } else {
            this.state.totalModules = 1;
            this.state.timeLeft = 3600;
        }

        this.state.isReviewMode = false;
        this.startTimer();
        this.renderQuizContent();
    },

    saveCurrentModuleAnswers() {
        if (this.state.exam !== 'SAT') return;
        const firstQuestionId = this.state.questions[0].id;
        const offset = this.state.allQuestions.findIndex(q => q.id === firstQuestionId);
        if (offset !== -1) {
            for (let i = 0; i < this.state.userAnswers.length; i++) {
                this.state.allUserAnswers[offset + i] = this.state.userAnswers[i];
            }
        }
    },

    startModule(moduleNum) {
        this.saveCurrentModuleAnswers();
        this.state.currentModule = moduleNum;
        this.state.currentIdx = 0;
        this.state.questions = this.state.allQuestions.filter(q => q.module === moduleNum);
        this.state.userAnswers = new Array(this.state.questions.length).fill(null);
        this.state.timeLeft = 2100;
        this.state.isBreakTime = false;
        this.startTimer();
        this.renderView('quiz', {}, { preserveQuiz: true });
    },

    startModule2() { this.startModule(2); },
    startModule3() { this.startModule(3); },

    startTimer() {
        if (this.state.timer) clearInterval(this.state.timer);
        this.state.timer = setInterval(() => {
            this.state.timeLeft -= 1;
            this.updateTimer();
            if (this.state.timeLeft <= 0) this.finishQuiz();
        }, 1000);
    },

    formatTime(totalSeconds) {
        const safe = Math.max(0, totalSeconds);
        const minutes = Math.floor(safe / 60);
        const seconds = safe % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    },

    updateTimer() {
        const timer = document.getElementById('timer-val');
        if (timer) timer.textContent = this.formatTime(this.state.timeLeft);
    },

    getOptionLabels(count) {
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, count).split('');
    },

    renderQuizContent() {
        const current = this.state.exam === 'SAT' ? this.translations.en : this.t();
        const question = this.state.questions[this.state.currentIdx];
        const isSAT = this.state.exam === 'SAT';
        const variant = isSAT ? (question.variants.en || question.variants[this.state.lang]) : question.variants[this.state.lang];
        const userAnswer = this.state.userAnswers[this.state.currentIdx];

        document.getElementById('question-kicker').textContent = question.category || this.getExamName(this.state.exam);
        document.getElementById('question-text').innerHTML = variant.text;
        document.getElementById('quiz-count').textContent = `${this.state.currentIdx + 1} / ${this.state.questions.length}`;
        document.getElementById('progress-fill').style.width = `${((this.state.currentIdx + 1) / this.state.questions.length) * 100}%`;
        this.updateTimer();
        this.renderQuestionMap();

        const imageWrap = document.getElementById('question-image-wrap');
        if (question.image) {
            const path = `${this.state.exam}/${this.state.testId}/${question.image}`;
            imageWrap.innerHTML = `
                <figure class="question-image-shell">
                    <img src="${path}" class="question-image" alt="${current.quizQuestion} ${this.state.currentIdx + 1}">
                </figure>
            `;
        } else {
            imageWrap.innerHTML = '';
        }

        const list = document.getElementById('options-list');
        list.innerHTML = '';

        const isMultipleChoice = /^[A-D]$/i.test(question.correct);

        if (isMultipleChoice) {
            const labels = this.getOptionLabels(variant.options.length);
            variant.options.forEach((option, index) => {
                const label = labels[index];
                const button = document.createElement('button');
                button.className = 'option-btn regular';
                if (userAnswer === label) button.classList.add('selected');

                if (this.state.isReviewMode) {
                    button.disabled = true;
                    if (label === question.correct) button.classList.add('correct-answer');
                    if (userAnswer === label && label !== question.correct) button.classList.add('wrong-answer');
                }

                button.innerHTML = `
                    <span class="opt-idx">${label}</span>
                    <span class="opt-val">${option}</span>
                `;
                button.onclick = () => !this.state.isReviewMode && this.selectOption(label);
                list.appendChild(button);
            });
        } else {
            const inputContainer = document.createElement('div');
            inputContainer.className = 'open-answer-container';
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'glass-input open-answer-input';
            input.placeholder = current.openAnswerPlaceholder;
            input.value = userAnswer || '';
            input.disabled = this.state.isReviewMode;

            if (this.state.isReviewMode) {
                const isCorrect = this.compareNumericalAnswers(userAnswer, question.correct);
                input.classList.add(isCorrect ? 'correct-answer' : 'wrong-answer');
                const feedback = document.createElement('div');
                feedback.className = 'answer-feedback';
                feedback.innerHTML = `Correct: <strong>${question.correct}</strong>`;
                inputContainer.appendChild(feedback);
            }

            input.oninput = (e) => !this.state.isReviewMode && this.saveOpenAnswer(e.target.value);
            inputContainer.prepend(input);
            list.appendChild(inputContainer);
        }

        const prevBtn = document.getElementById('prev-btn');
        prevBtn.disabled = this.state.currentIdx === 0;

        const nextButton = document.getElementById('next-btn');
        nextButton.textContent = this.state.currentIdx === this.state.questions.length - 1 ? (this.state.isReviewMode ? current.homeButton : current.finish) : current.next;

        if (this.state.isReviewMode) {
            nextButton.disabled = false;
        } else {
            nextButton.disabled = !userAnswer;
        }

        if (window.renderMathInElement) {
            renderMathInElement(document.getElementById('app-root'), {
                delimiters: [
                    { left: '\\(', right: '\\)', display: false },
                    { left: '\\[', right: '\\]', display: true }
                ]
            });
        }
    },

    renderQuestionMap() {
        const map = document.getElementById('quiz-map');
        if (!map) return;
        map.innerHTML = '';
        this.state.questions.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.className = 'map-dot';
            if (idx === this.state.currentIdx) dot.classList.add('current');
            if (this.state.userAnswers[idx]) dot.classList.add('answered');
            if (this.state.isReviewMode) {
                const isCorrect = this.checkAnswerCorrectness(idx);
                dot.classList.add(isCorrect ? 'correct' : 'wrong');
            }
            dot.textContent = idx + 1;
            dot.onclick = () => {
                this.state.currentIdx = idx;
                this.renderQuizContent();
            };
            map.appendChild(dot);
        });
    },

    checkAnswerCorrectness(idx) {
        const q = this.state.questions[idx];
        const ans = this.state.userAnswers[idx];
        if (!ans) return false;
        if (/^[A-D]$/i.test(q.correct)) return ans.toUpperCase() === q.correct.toUpperCase();
        return this.compareNumericalAnswers(ans, q.correct);
    },

    compareNumericalAnswers(user, correct) {
        if (!user || !correct) return false;
        const norm = (s) => parseFloat(s.toString().replace(',', '.').trim());
        const uVal = norm(user);
        const cVal = norm(correct);
        if (isNaN(uVal) || isNaN(cVal)) return user.toString().toLowerCase().trim() === correct.toString().toLowerCase().trim();
        return Math.abs(uVal - cVal) < 0.001;
    },

    selectOption(label) {
        this.state.userAnswers[this.state.currentIdx] = label;
        this.renderQuizContent();
    },

    saveOpenAnswer(val) {
        this.state.userAnswers[this.state.currentIdx] = val;
        document.getElementById('next-btn').disabled = !val;
        this.renderQuestionMap();
    },

    handleNext() {
        if (this.state.currentIdx < this.state.questions.length - 1) {
            this.state.currentIdx++;
            this.renderQuizContent();
        } else {
            if (this.state.exam === 'SAT' && this.state.currentModule < this.state.totalModules) {
                this.state.isBreakTime = true;
                clearInterval(this.state.timer);
                this.renderView('break');
            } else {
                this.finishQuiz();
            }
        }
    },

    handlePrev() {
        if (this.state.currentIdx > 0) {
            this.state.currentIdx -= 1;
            this.renderQuizContent();
        }
    },

    finishQuiz() {
        clearInterval(this.state.timer);

        if (this.state.exam === 'SAT') {
            this.saveCurrentModuleAnswers();
            this.state.questions = this.state.allQuestions.filter(q => q.module <= this.state.totalModules);
            this.state.userAnswers = this.state.allUserAnswers.slice(0, this.state.questions.length);
        }

        let score = 0;
        this.state.questions.forEach((_, idx) => {
            if (this.checkAnswerCorrectness(idx)) score += 1;
        });

        const result = {
            exam: this.state.exam,
            testId: this.state.testId,
            score,
            total: this.state.questions.length,
            percent: Math.round((score / this.state.questions.length) * 100),
            timeLeft: this.state.timeLeft,
            timestamp: new Date().toISOString()
        };

        if (this.state.exam === 'SAT') {
            result.scaledScore = this.getSATScaledScore(score);
        }

        this.state.lastResult = result;
        this.saveResult(result);
        this.renderView('results');
    },

    startReview() {
        this.state.isReviewMode = true;
        this.state.currentIdx = 0;
        this.renderView('quiz', {}, { preserveQuiz: true });
    },

    renderHistoryTable() {
        const history = this.getUserHistory();
        const body = document.getElementById('history-body');
        const empty = document.getElementById('history-empty');

        body.innerHTML = '';
        if (!history.length) {
            empty.style.display = 'block';
            return;
        }

        empty.style.display = 'none';
        history.forEach((item) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(item.timestamp).toLocaleDateString()}</td>
                <td>${this.getExamName(item.exam)}</td>
                <td>${item.testId === 'demo' ? this.t().demoTitle : `#${item.testId}`}</td>
                <td>${item.score} / ${item.total}</td>
                <td class="${item.percent >= 70 ? 'success' : 'warning'}">${item.percent}%</td>
            `;
            body.appendChild(row);
        });
    },

    clearHistory() {
        if (!this.state.user) return;
        if (confirm(this.t().clearConfirm)) {
            localStorage.removeItem(`lp_history_${this.state.user.email}`);
            this.renderHistoryTable();
        }
    },

    attachAdminLoginEvents() {
        const btn = document.getElementById('login-btn');
        const pass = document.getElementById('admin-pass');
        const login = () => {
            if (pass.value === 'TestMath002') {
                this.renderView('admin');
            } else {
                alert('Wrong password');
            }
        };
        btn.onclick = login;
        pass.onkeyup = (e) => e.key === 'Enter' && login();
    },

    attachAdminEvents() {
        const saveBtn = document.getElementById('admin-save-btn');
        const tokenInput = document.getElementById('gh-token');
        if (tokenInput) {
            tokenInput.onchange = (e) => {
                this.state.githubToken = e.target.value;
                localStorage.setItem('mc_gh_token', e.target.value);
            };
        }

        const catItems = document.querySelectorAll('.admin-category-item');
        const examInput = document.getElementById('admin-exam');
        catItems.forEach(item => {
            item.onclick = () => {
                catItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                if (examInput) examInput.value = item.dataset.exam;
            };
        });

        if (saveBtn) {
            saveBtn.onclick = async () => {
                const exam = document.getElementById('admin-exam').value;
                const testId = document.getElementById('admin-test-id').value;
                const files = document.getElementById('admin-files').files;

                if (!testId || files.length === 0) return alert('Fill all fields');
                if (!this.state.githubToken) return alert('GitHub Token required');

                this.adminLog('Starting process...', 'info');
                try {
                    const testData = await this.parseAdminFiles(files, testId, exam);
                    await this.saveTestToGitHub(exam, testId, testData, files);
                    this.adminLog('Success! GitHub repository updated.', 'success');
                    this.renderAdminTestList();
                } catch (e) {
                    this.adminLog('Error: ' + e.message, 'error');
                }
            };
        }

        this.renderAdminTestList();
    },

    switchAdminTab(tab) {
        document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.admin-tab-content').forEach(content => content.classList.remove('active'));

        event.currentTarget.classList.add('active');
        document.getElementById(`admin-tab-${tab}`).classList.add('active');
    },

    renderAdminTestList() {
        const list = document.getElementById('admin-test-list');
        if (!list) return;

        list.innerHTML = '';
        Object.keys(EXAMS_METADATA).forEach(exam => {
            const section = document.createElement('div');
            section.className = 'admin-manage-section';
            section.innerHTML = `
                <h4 class="admin-manage-exam-title">${exam}</h4>
                <div class="admin-manage-grid"></div>
            `;
            const grid = section.querySelector('.admin-manage-grid');
            
            const tests = EXAMS_METADATA[exam];
            Object.keys(tests).forEach(testId => {
                const item = document.createElement('div');
                item.className = 'admin-manage-item';
                item.innerHTML = `
                    <div class="item-info">
                        <span class="item-name">Test #${testId}</span>
                        <span class="item-count">${tests[testId]} questions</span>
                    </div>
                    <button class="btn-icon-delete" onclick="app.handleDeleteTest('${exam}', '${testId}')" title="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>
                    </button>
                `;
                grid.appendChild(item);
            });
            list.appendChild(section);
        });
    },

    async handleDeleteTest(exam, testId) {
        if (!confirm(`Вы уверены, что хотите удалить тест ${exam} #${testId}?`)) return;
        if (!this.state.githubToken) return alert('GitHub Token required');

        const owner = 'mardon0207';
        const repo = 'lambdapi';

        try {
            this.adminLog(`Deleting ${exam} #${testId}...`, 'info');

            // 1. Remove from Metadata
            delete EXAMS_METADATA[exam][testId];
            const metaContent = `const EXAMS_METADATA = ${JSON.stringify(EXAMS_METADATA, null, 2)};`;
            await this.githubCommit(owner, repo, 'js/metadata.js', metaContent, `Delete metadata for ${exam} #${testId}`);

            // 2. Delete test data file
            try {
                await this.githubDelete(owner, repo, `js/data/${exam}/${testId}.js`, `Delete data file for ${exam} #${testId}`);
            } catch (e) {
                console.warn('Data file not found or already deleted', e);
            }

            this.adminLog(`Test ${testId} deleted successfully.`, 'success');
            this.renderAdminTestList();
        } catch (e) {
            this.adminLog('Error: ' + e.message, 'error');
        }
    },

    async githubDelete(owner, repo, path, message) {
        const token = this.state.githubToken;
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

        const resGet = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
        if (!resGet.ok) throw new Error(`Could not find file to delete: ${path}`);

        const data = await resGet.json();
        const sha = data.sha;

        const resDel = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message, sha })
        });

        if (!resDel.ok) {
            const err = await resDel.json();
            throw new Error(err.message);
        }
    },

    adminLog(msg, type) {
        const log = document.getElementById('admin-log');
        log.innerHTML = `<span class="${type}">${msg}</span>`;
    },

    async parseAdminFiles(fileList, testId, examType) {
        const files = Array.from(fileList);
        const rusFile = files.find(f => f.name === 'rus.tex');
        const uzbFile = files.find(f => f.name === 'uzb.tex');
        const engFile = files.find(f => f.name === 'eng.tex');
        const ansFile = files.find(f => f.name.endsWith('.txt'));

        if (examType === 'SAT') {
            if (!engFile || !ansFile) throw new Error('SAT requires eng.tex and answers .txt');
        } else {
            if (!rusFile || !uzbFile || !ansFile) throw new Error('Missing rus.tex, uzb.tex or answers .txt');
        }

        const ansText = await ansFile.text();
        const answers = this.parseAnswerKey(ansText);
        
        let rusQs = [], uzbQs = [], engQs = [];
        if (rusFile) rusQs = this.parseLaTeX(await rusFile.text());
        if (uzbFile) uzbQs = this.parseLaTeX(await uzbFile.text());
        if (engFile) engQs = this.parseLaTeX(await engFile.text());

        const count = examType === 'SAT' ? engQs.length : Math.min(rusQs.length, uzbQs.length);
        const finalCount = Math.min(count, answers.length);
        const questions = [];

        for (let i = 0; i < finalCount; i++) {
            const q = {
                id: i + 1,
                image: examType === 'SAT' ? engQs[i].image : (rusQs[i].image || uzbQs[i].image),
                correct: answers[i].correct,
                variants: {}
            };

            if (examType === 'SAT') {
                q.variants.en = { text: engQs[i].text, options: engQs[i].options };
                q.module = (i < 22) ? 1 : 2;
            } else {
                q.variants.ru = { text: rusQs[i].text, options: rusQs[i].options };
                q.variants.uz = { text: uzbQs[i].text, options: uzbQs[i].options };
            }
            
            questions.push(q);
        }
        return questions;
    },

    parseAnswerKey(text) {
        const lines = text.split('\n');
        const answers = [];
        lines.forEach(line => {
            const match = line.trim().match(/^(\d+)\s+(\S+)$/);
            if (match) {
                answers.push({ id: parseInt(match[1]), correct: match[2] });
            }
        });
        return answers.sort((a, b) => a.id - b.id);
    },

    parseLaTeX(text) {
        const questions = [];
        const clean = (t) => t.replace(/\\tg/g, '\\tan').replace(/\\ctg/g, '\\cot').replace(/\\begin\{options\}|\\end\{options\}|\\begin\{enumerate\}|\\end\{enumerate\}/g, '').trim();

        const qBlocks = text.split(/\\begin\{questionbox\}\{\d+\}/).slice(1);
        qBlocks.forEach(block => {
            const end = block.indexOf('\\end{questionbox}');
            const content = end === -1 ? block : block.substring(0, end);

            const imgMatch = content.match(/\\includegraphics.*?\{([^}]+)\}/);
            const optMatch = [...content.matchAll(/\\item\s+([\s\S]*?)(?=\\item|$)/g)];

            const qTextPart = content.split(/\\begin\{options\}|\\begin\{enumerate\}/)[0];
            const qText = clean(qTextPart);
            const options = optMatch ? optMatch.map(o => clean(o[1])) : [];

            questions.push({
                text: qText,
                image: imgMatch ? imgMatch[1].split('/').pop() : null,
                options: options
            });
        });
        return questions;
    },

    async saveTestToGitHub(exam, testId, testData, files) {
        const token = this.state.githubToken;
        const owner = 'mardon0207';
        const repo = 'lambdapi';

        const jsPath = `js/data/${exam}/${testId}.js`;
        const jsContent = `TEST_DATA = ${JSON.stringify(testData, null, 2)};`;
        await this.githubCommit(owner, repo, jsPath, jsContent, `Add test ${exam} #${testId}`);

        // Update Metadata
        if (!EXAMS_METADATA[exam]) EXAMS_METADATA[exam] = {};
        EXAMS_METADATA[exam][testId] = testData.length;
        const metaContent = `const EXAMS_METADATA = ${JSON.stringify(EXAMS_METADATA, null, 2)};`;
        await this.githubCommit(owner, repo, 'js/metadata.js', metaContent, `Update metadata for ${exam} #${testId}`);

        // Upload images
        for (const file of Array.from(files)) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                const base64 = await new Promise((res) => {
                    reader.onload = () => res(reader.result.split(',')[1]);
                    reader.readAsDataURL(file);
                });
                await this.githubCommit(owner, repo, `${exam}/${testId}/${file.name}`, base64, `Add image for ${exam} #${testId}`, true);
            }
        }
    },

    async githubCommit(owner, repo, path, content, message, isBase64 = false) {
        const token = this.state.githubToken;
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

        const resGet = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
        let sha = null;
        if (resGet.ok) {
            const data = await resGet.json();
            sha = data.sha;
        }

        const body = {
            message,
            content: isBase64 ? content : this.toBase64(content),
            sha
        };

        const resPut = await fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github+json'
            },
            body: JSON.stringify(body)
        });

        if (!resPut.ok) {
            const err = await resPut.json();
            console.error('GitHub API Error:', err);
            throw new Error(`${err.message} (${path})`);
        }
    },

    toBase64(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)));
    },

    initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        const context = canvas.getContext('2d');
        let width, height;
        const particles = [];
        const resize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
        window.addEventListener('resize', resize);
        resize();
        for (let i = 0; i < 40; i++) particles.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18, size: Math.random() * 1.8 + 0.5 });
        const animate = () => {
            context.clearRect(0, 0, width, height);
            context.fillStyle = 'rgba(125, 211, 252, 0.45)';
            particles.forEach((p) => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
                context.beginPath(); context.arc(p.x, p.y, p.size, 0, Math.PI * 2); context.fill();
            });
            requestAnimationFrame(animate);
        };
        animate();
    },

    startDemo() {
        // Find the first exam that has a demo test
        for (const exam of Object.keys(EXAMS_METADATA)) {
            if (EXAMS_METADATA[exam]['demo']) {
                this.state.exam = exam;
                this.renderView('quiz', { exam, testId: 'demo' });
                return;
            }
        }
        // If no demo, go to home
        this.renderView('home');
    },


};

window.onload = () => app.init();
