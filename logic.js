function startQuiz() {
  let categoryElement = document.getElementById("categorySelect");
  let selectedCategory = categoryElement.value;
  console.log("starting Category: " + selectedCategory);

  categoryElement.addEventListener("change", () => {
    selectedCategory =
      categoryElement.options[categoryElement.selectedIndex].text;
    console.log("Selected category: " + selectedCategory);
  });

  let difficultyElement = document.getElementById("difficultySelect");
  let selectedDifficulty = difficultyElement.value;
  console.log("starting Category:" + selectedDifficulty);
  difficultyElement.addEventListener("change", () => {
    selectedDifficulty =
      difficultyElement.options[difficultyElement.selectedIndex].text;
    console.log("Selected difficulty: " + selectedDifficulty);
  });

  let radioElement = document.querySelectorAll('input[name="count"]');
  let limit = document.querySelector('input[name="count"]:checked').value;
  console.log("starting question count: " + limit);
  radioElement.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      limit = event.target.value;
      console.log(`Selected question count: ${event.target.value}`);
    });
  });
  let startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", async () => {
    let data = getQuiz(selectedCategory, selectedDifficulty, limit);
    localStorage.clear();
    let questionData = await data.then((data1) => data1);

    localStorage.setItem("questionData", JSON.stringify(questionData));

    window.location.href = "question.html";
  });
}

startQuiz();

async function getQuiz(category, difficulty, limit) {
  let apiKey = "iunRQQuxtnACE1N3idvZ1zXTrn8HyGLha7ZkL76q";
  let api = "";
  if (
    category == "anyCategory" &&
    difficulty == "anyDifficulty" &&
    limit == "5"
  ) {
    api = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=5`;
  } else if (
    category == "anyCategory" &&
    difficulty != "anyDifficulty" &&
    limit == "5"
  ) {
    api = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&difficulty=${difficulty}&limit=5`;
  } else if (
    category != "anyCategory" &&
    difficulty == "anyDifficulty" &&
    limit == "5"
  ) {
    api = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&category=${category}&limit=5`;
  } else if (
    category == "anyCategory" &&
    difficulty == "anyDifficulty" &&
    limit != "5"
  ) {
    api = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=${limit}`;
  } else if (
    category == "anyCategory" &&
    difficulty != "anyDifficulty" &&
    limit != "5"
  ) {
    api = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&difficulty=${difficulty}&limit=${limit}`;
  } else if (
    category != "anyCategory" &&
    difficulty == "anyDifficulty" &&
    limit != "5"
  ) {
    api = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&category=${category}&limit=${limit}`;
  } else {
    api = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&category=${category}&difficulty=${difficulty}&limit=${limit}`;
  }
  console.log(api);

  let response = await fetch(api, {
    method: "GET",
  });
  let promise = response.json();
  let questionData = await promise.then((data) => data);
  console.log(questionData);
  return questionData;
}
