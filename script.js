

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

    window.addEventListener("scroll", function() {
        const header = document.querySelector(".quiz__process");
        if (header && window.scrollY > 80) {
            header.classList.add("quiz__process--scrolled");
            header.classList.remove("quiz__process--transparent");
        } else if (header) {
            header.classList.add("quiz__process--transparent");
            header.classList.remove("quiz__process--scrolled");
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

          const questionNumberElement = document.createElement('h2');
          questionNumberElement.textContent = question.questionNumber;
          questionNumberElement.classList.add('question__number');
          questionElement.appendChild(questionNumberElement);

          const imgElement = document.createElement('img');
          imgElement.src = question.imageUrl;
          imgElement.classList.add('question__image');
          questionElement.appendChild(imgElement);

          const subtitleSection = document.createElement('section');
          subtitleSection.classList.add('subtitle___section'); 
          
          const questionTextElement = document.createElement('h3');
          questionTextElement.textContent = question.questionText;
          questionTextElement.classList.add('question__text');
          questionElement.appendChild(questionTextElement);

          const subtitleElement = document.createElement('h4');
          subtitleElement.textContent = question.questionSubtitle;
          subtitleElement.classList.add('question__subtitle');
          
          subtitleSection.appendChild(subtitleElement); 
          questionElement.appendChild(subtitleSection);

          const optionsElement = document.createElement('ul');
          optionsElement.classList.add('options');
          question.options.forEach(option => {
            const optionElement = document.createElement('li');
            optionElement.classList.add('option');
          
            const buttonElement = document.createElement('button');
            buttonElement.classList.add('option__button');
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
                  const correctButton = buttons.find(b => b.textContent.includes(options.find(opt => opt.isCorrect).optionLetter));
                  correctButton.classList.add('correct');
                }
              }
            });

            updateProgress();
        }

        function updateProgress() {
            const progressElement = document.querySelector('.answers');
            progressElement.textContent = `${answeredQuestions}/${totalQuestions}`;
        }
      })
      .catch(error => console.error('Error fetching quiz data:', error));
});