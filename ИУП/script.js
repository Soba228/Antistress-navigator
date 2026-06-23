document.addEventListener('DOMContentLoaded', function() {
    // 1. ТРЕНАЖЕР ДЛЯ ДЫХАЛКИ
    const breathBtn = document.getElementById('startBreathing');
    const timerDisplay = document.getElementById('breathingTimer');
    let breathInterval;

    if (breathBtn) {
        breathBtn.addEventListener('click', function() {
            // СБРОС ТАЙМЕРА ТИПА
            if (breathInterval) clearInterval(breathInterval);
            
            let step = 0; // 0 - вдох, 1 - задержка после вдоха, 2 - выдох, 3 - задержка после выдоха
            const phases = ['Вдох', 'Задержка', 'Выдох', 'Задержка'];
            let counter = 4;
            
            timerDisplay.textContent = `${phases[step]}: ${counter}`;
            
            breathInterval = setInterval(() => {
                counter--;
                timerDisplay.textContent = `${phases[step]}: ${counter}`;
                
                if (counter === 0) {
                    step = (step + 1) % 4;
                    counter = 4;
                }
            }, 1000);

            setTimeout(() => {
                clearInterval(breathInterval);
                timerDisplay.textContent = 'Упражнение завершено';
            }, 64000);
        });
    }

    // 2. ЧЕК ЛИСТ
    const checkboxes = document.querySelectorAll('.check-item');
    const resetBtn = document.getElementById('resetChecklist');

    checkboxes.forEach((cb, index) => {
        const saved = localStorage.getItem(`checklist_${index}`);
        if (saved === 'true') {
            cb.checked = true;
        }
        
        cb.addEventListener('change', function() {
            localStorage.setItem(`checklist_${index}`, this.checked);
        });
    });

    // Сброс чек-листа
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            checkboxes.forEach((cb, index) => {
                cb.checked = false;
                localStorage.setItem(`checklist_${index}`, false);
            });
        });
    }

    // 3. ТЕСТ НА СТРЕСС
    const submitTest = document.getElementById('submitTest');
    const testResult = document.getElementById('testResult');

    if (submitTest) {
        submitTest.addEventListener('click', function() {
            const q1 = document.querySelector('input[name="q1"]:checked');
            const q2 = document.querySelector('input[name="q2"]:checked');
            const q3 = document.querySelector('input[name="q3"]:checked');
            const q4 = document.querySelector('input[name="q4"]:checked');
            
            if (!q1 || !q2 || !q3 || !q4) {
                alert('Пожалуйста, ответь на все вопросы!');
                return;
            }
            
            const score = parseInt(q1.value) + parseInt(q2.value) + parseInt(q3.value) + parseInt(q4.value);
            let message = '';
            
            if (score <= 2) {
                message = 'У тебя низкий уровень стресса. Продолжай использовать техники релаксации для профилактики.';
            } else if (score <= 4) {
                message = 'Средний уровень стресса. Попробуй дыхательные упражнения и метод заземления.';
            } else if (score <= 6) {
                message = 'Повышенный уровень стресса. Рекомендуем регулярно выполнять антистресс-практики и обратиться к психологу (можно анонимно по телефону доверия).';
            } else {
                message = 'Высокий уровень стресса. Важно поговорить с родителями или специалистом. Не держи всё в себе!';
            }
            
            testResult.style.display = 'block';
            testResult.textContent = `Твой результат: ${score} баллов. ${message}`;
        });
    }

    // 4. НАВИГАЦИЯ
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});