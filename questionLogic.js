var score = 0;

async function printQuestions() {
  let data = JSON.parse(localStorage.getItem("questionData"));
  console.log(data);
  let count = 1;
  let totalQuestions = data.length;

  for (let d of data) {
    let seconds = 10;
    let question = d.question;
    let options = d.answers;
    let currectAnwsers = d.correct_answers;
    let currectOptionCount = 0;
    let finalSelectedAnswer = null;
    for (let i in currectAnwsers) {
      currectOptionCount += 1;
      if (currectAnwsers[i] == "true") {
        break;
      }
    }

    let questionEle = document.createElement("h2");
    questionEle.textContent = count + ") " + question;
    count++;
    let quiz = document.getElementById("quiz");
    quiz.appendChild(questionEle);
    let label;
    let optionEle = document.getElementById("options");
    let currectOption;
    let documentOptionCount = 0;
    for (let o in options) {
      documentOptionCount += 1;
      label = document.createElement("label");
      let optionBtn = document.createElement("input");
      optionBtn.type = "radio";
      optionBtn.name = "options";
      optionBtn.value = options[o];

      label.appendChild(optionBtn);
      if (currectOptionCount == documentOptionCount) {
        console.log(currectOptionCount, documentOptionCount);

        currectOption = options[o];
      }
      if (options[o] != null) {
        label.innerHTML += options[o];
        optionEle.appendChild(label);
      }
    }

    let radioElements = document.querySelectorAll('input[type="radio"]');
    radioElements.forEach((radio) => {
      radio.addEventListener("change", (event) => {
        finalSelectedAnswer = event.target.value;
      });
      radio.removeEventListener("click", this);
    });

    for (let i = 0; i < 10; i++) {
      let secEle = document.getElementById("sec");
      secEle.textContent = seconds;

      await delay(1000);
      seconds--;
    }

    if (finalSelectedAnswer === currectOption) {
      score += 1;
    }
    while (optionEle.firstChild) {
      optionEle.removeChild(optionEle.firstChild);
    }
    quiz.removeChild(questionEle);
  }

  const scoreContainer = document.getElementById("scoreContainer");
  const finalScore = document.getElementById("finalScore");
  const quiz = document.getElementById("quiz");
  const options = document.getElementById("options");
  const timeDiv = document.querySelector(".time");

  quiz.style.display = "none";
  options.style.display = "none";
  timeDiv.style.display = "none";

  scoreContainer.style.display = "block";
  finalScore.textContent = `Your Score: ${score}/${totalQuestions}`;

  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

function delay(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds));
}
printQuestions();
