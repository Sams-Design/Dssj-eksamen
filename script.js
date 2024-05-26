

    // Scroll Event Listener
    window.addEventListener("scroll", function() {
        const header = document.querySelector(".header");
        if (header && window.scrollY > 50) {
            header.classList.add("header--scrolled");
            header.classList.remove("header--transparent");
        } else if (header) {
            header.classList.add("header--transparent");
            header.classList.remove("header--scrolled");
        }
    });

    // Menu Button Click Event Listener
    const menuButton = document.querySelector(".menu-button");
    if (menuButton) {
        menuButton.addEventListener("click", function() {
            const navMenu = document.querySelector(".nav-menu");
            if (navMenu) {
                navMenu.classList.add("nav-menu--open");
            }
        });
    }

    // Close Button Click Event Listener
    const closeButton = document.querySelector(".close-button");
    if (closeButton) {
        closeButton.addEventListener("click", function() {
            const navMenu = document.querySelector(".nav-menu");
            if (navMenu) {
                navMenu.classList.remove("nav-menu--open");
            }
        });
    }


     // Quiz 
    document.addEventListener('DOMContentLoaded', function() {
        let answeredQuestions = 0;
        let totalQuestions = 0;

   
    fetch('quizCastleSon.json')
      .then(response => response.json())
      .then(quizData => {
        totalQuestions = quizData.length;
        updateProgress();

        const quizContainer = document.querySelector('#quiz');

        quizData.forEach(question => {
          const questionElement = document.createElement('section');
          questionElement.classList.add('question');

          const questionNumberElement = document.createElement('h1');
          questionNumberElement.textContent = question.questionNumber;
          questionNumberElement.classList.add('question-number');
          questionElement.appendChild(questionNumberElement);

          const questionTextElement = document.createElement('h2');
          questionTextElement.textContent = question.questionText;
          questionTextElement.classList.add('question-text');
          questionElement.appendChild(questionTextElement);

          const imgElement = document.createElement('img');
          imgElement.src = question.imageUrl;
          imgElement.classList.add('question-image');
          questionElement.appendChild(imgElement);

          const subtitleSection = document.createElement('section'); // Neues section-Element für Untertitel
          subtitleSection.classList.add('subtitle-section'); // Klasse für die neue section hinzufügen
          
          const subtitleElement = document.createElement('h3');
          subtitleElement.textContent = question.questionSubtitle;
          subtitleElement.classList.add('question-subtitle');
          
          // ? tegn
          const questionMarkElement = document.createElement('span');
          questionMarkElement.classList.add('question-mark');
          questionMarkElement.textContent = '?';
          subtitleElement.appendChild(questionMarkElement);
          
          subtitleSection.appendChild(subtitleElement); // 
          questionElement.appendChild(subtitleSection);

          const optionsElement = document.createElement('ul');
          optionsElement.classList.add('options');
          question.options.forEach(option => {
            const optionElement = document.createElement('li');
            optionElement.classList.add('option');
          
            const optionLetterClass = `option-letter-${option.optionLetter}`;
            optionElement.classList.add(optionLetterClass);
          
            const buttonElement = document.createElement('button');
            buttonElement.classList.add('button__quiz');
            buttonElement.textContent = `${option.optionLetter}. ${option.optionText}`;
            buttonElement.onclick = () => {
              handleAnswerClick(buttonElement, question.options);
            };
            optionElement.appendChild(buttonElement);
            optionsElement.appendChild(optionElement);
          });
          questionElement.appendChild(optionsElement);
          
          quizContainer.appendChild(questionElement);
        });

        function handleAnswerClick(selectedButton, options) {
            if (!selectedButton.classList.contains('answered')) {
                answeredQuestions++;
                selectedButton.classList.add('answered');
            }

            options.forEach(option => {
              const buttons = Array.from(selectedButton.parentNode.parentNode.querySelectorAll('.option button'));
              const button = buttons.find(b => b.textContent.includes(option.optionLetter));
              if (button === selectedButton) {
                if (option.isCorrect) {
                  button.classList.add('correct');
                } else {
                  button.classList.add('incorrect');
                  // find correct answer
                  const correctButton = buttons.find(b => b.textContent.includes(options.find(opt => opt.isCorrect).optionLetter));
                  correctButton.classList.add('correct');
                }
              }
            });

            updateProgress();
        }

        function updateProgress() {
            const progressElement = document.querySelector('.Answers');
            progressElement.textContent = `${answeredQuestions}/${totalQuestions}`;
        }
      })
      .catch(error => console.error('Error fetching quiz data:', error));
});