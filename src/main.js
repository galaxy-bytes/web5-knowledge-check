(function() {
  var questions = [
    {
      question: "What does Web5.connect() do in the application?",
      choices: [
        "Connects to the internet",
        "Connects to a Web Socket",
        "Creates or connects to a DID",
        "Connects to a database"
      ],
      correctAnswer: 2
    },
    {
      question: "What is the role of the .send() method in the application",
      choices: [
        "To send an email",
        "To immediately push a message to the recipient's remote DWNs",
        " To send a request to an API"
      ],
      correctAnswer: 1
    },
    {
      question:
        "What happens if the protocol is not configured or installed in the application?",
      choices: [
        "The application will not have a user interface",
        "The application will not have routing",
        "The application will not be able to interact with the DWN properly"
      ],
      correctAnswer: 2
    }
  ];

  var questionCounter = 0;
  var selections = [];
  var quiz = document.getElementById("quiz");

  displayNext();

  document.getElementById("next").addEventListener("click", function (e) {
    e.preventDefault();

    choose();

    if (isNaN(selections[questionCounter])) {
      alert("Please make a selection!");
    } else {
      questionCounter++;
      displayNext();
    }
  });

  document.getElementById("prev").addEventListener("click", function (e) {
    e.preventDefault();

    choose();
    questionCounter--;
    displayNext();
  });

  document.getElementById("start").addEventListener("click", function (e) {
    e.preventDefault();

    questionCounter = 0;
    selections = [];
    displayNext();
    document.getElementById("start").style.display = "none";
  });

  function createQuestionElement(index) {
    var qElement = document.createElement("div");
    qElement.id = "question";

    var header = document.createElement("h2");
    header.textContent = "Question " + (index + 1) + ":";
    qElement.appendChild(header);

    var question = document.createElement("p");
    question.textContent = questions[index].question;
    qElement.appendChild(question);

    var radioButtons = createRadios(index);
    qElement.appendChild(radioButtons);

    return qElement;
  }

  function createRadios(index) {
    var radioList = document.createElement("ul");
    var item;
    var input = "";
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = document.createElement("li");
      input = '<input type="radio" name="answer" value=' + i + " />";
      input += questions[index].choices[i];
      item.innerHTML = input;
      radioList.appendChild(item);
    }
    return radioList;
  }

  function choose() {
    var radios = document.getElementsByName("answer");
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        selections[questionCounter] = +radios[i].value;
      }
    }
  }

  function displayNext() {
    quiz.style.display = "none";
    while (quiz.firstChild) {
      quiz.removeChild(quiz.firstChild);
    }

    if (questionCounter < questions.length) {
      var nextQuestion = createQuestionElement(questionCounter);
      quiz.appendChild(nextQuestion);
      quiz.style.display = "block";

      if (!isNaN(selections[questionCounter])) {
        document.querySelector(
          'input[name="answer"][value="' + selections[questionCounter] + '"]'
        ).checked = true;
      }

      if (questionCounter === 1) {
        document.getElementById("prev").style.display = "block";
      } else if (questionCounter === 0) {
        document.getElementById("prev").style.display = "none";
        document.getElementById("next").style.display = "block";
      }
    } else {
      var scoreElem = displayScore();
      quiz.appendChild(scoreElem);
      quiz.style.display = "block";
      document.getElementById("next").style.display = "none";
      document.getElementById("prev").style.display = "none";
      document.getElementById("start").style.display = "block";
    }
  }

  function displayScore() {
    var score = document.createElement("p");
    score.id = "question";

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.textContent =
      "You got " +
      numCorrect +
      " questions out of " +
      questions.length +
      " right!!!";
    return score;
  }
})();
