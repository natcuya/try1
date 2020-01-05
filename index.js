//will run once DOM is ready for js to be executed
$(document).ready(function (){
    startQuiz();
    chooseAnswer();
    nextQuestion();
    restartQuiz();
    
  });
  //starts quiz by clicking start button
  function startQuiz () {
    $(`#start-button`).on(`click`, function (event) {
  //emptying quiz-box and presents question number/score
    $(`#quiz-box`).empty();
    renderQuestion();
    chooseAnswer();
    questionNumber=1;
    $(`#question`).text(`Question: `+ questionNumber+ `/10`);
    score=0;
    $(`#score`).text(`Score: ` +score+`/10`);
    });
  
  }
  //generates question and answer choices
  function generateQuestion(){ if (questionNumber-1 <STORE.length) {
    let newQuestion= 
    `<div id="question${questionNumber}">
    <h2>${STORE[questionNumber-1].question}</h2>
    <form id="js-questions">
    <fieldset>
    <h3 class="instructions">
    Choose an answer from the options below:</h3>`;
  //loops through STORE 
    for (i=0; i<STORE[questionNumber-1].answers.length; i++) {
  //adding new value to newQuestion: radio required buttons with answer choice in STORE assigned as value. 
    newQuestion+=`<div class="answerChoice">
      <input type="radio" value="${STORE[questionNumber-1].answers[i]}" name="answer" required>
      <span>${STORE[questionNumber-1].answers[i]}</span>
      </div>`;
      }
  //adding submit button to newQuestion
    newQuestion+=`<button type="submit" id="submit-button">Submit</button>
    </fieldset>
    </form>
  </div>`;
      
    return newQuestion;
  
    } 
    else {
      renderResults();
    }
  }
  
  // render question in DOM
  //will insert the generated question into quizbox
  function renderQuestion () {
    $(`#quiz-box`).append(generateQuestion());
  }
  
  //cancel default action when submit is clicked
  function chooseAnswer () {
    $('#js-questions').on('submit', function (event) {
    event.preventDefault();
  // Matches elements that are checked; depending on answer chosen will decide message. :checked used for button when a choice has be checked.
      let chosen = $
      ('input:checked');
      let answer = chosen.val();
      let correctAnswer = `${STORE[questionNumber-1].correctAnswer}`;
      //if right answer is chosen
      if (answer === correctAnswer) {
       $('#quiz-box').append('<p>Great job! That was the correct answer!</p><img src="images/Correct.jpg"><button type="button" id="next">Next</button>');
       score++;
       $('#score').text('Score ' + score+`/10`);
      } 
    //if wrong this message will appear
      else {
        $('#quiz-box').append('<p> Oops! That was incorrect. The right answer was: '+ correctAnswer+' </p><img src="images/wrong.jpg"><button type="button" id="next">Next</button>');
      }
      questionNumber++;
      nextQuestion();
    });
    //This will disable the submit button after answer has been submitted
     $('#js-questions').submit(function(){
  //.prop disables submit
    $(this).find(':input[type=submit]').prop('disabled', true);
  });
   
   
  
  }
  //will empty quiz box for next question once next is clicked
  function nextQuestion (){
    $('#next').on('click',function(){
      $('#quiz-box').empty();
       $('#question').text(`Question: `+ questionNumber+`/10`);
      renderQuestion();
      chooseAnswer();
    });
  }
  
  //final results depends on final score
  function renderResults () {
    if (score >= 10) {
      $('#quiz-box').append(`<div class="finalResult"><h2>'Impressive!You really know your stuff!'</h2>
      <p>'Your final score is: ${score} / 10'</p>
      <p>which means you got ${score} out of 10 questions correct. A perfect score!</p>
      <button id="restart-button">'Restart Quiz'</button></div>`);
    } 
    else if (score < 10 && score >= 7) {
       $('#quiz-box').append(`<div class="finalResult"><h2>Good Job! Almost a perfect score! Try the quiz again</h2>
       <p>You final score is: ${score} / 10</p>
       <p>which means you got ${score} out of 10 questions correct. Nice! </p>
       <button id="restart-button">Restart Quiz</button></div>`);
    } 
    else {
       $('#quiz-box').append(`<div class="finalResult"><h2>Oh no! You failed. Practice makes perfect, take the quiz again!</h2>
       <p>You final score is: ${score} / 10</p>
       <p>which means you got ${score} out of 10 questions correct.</p>
       <button id="restart-button">Restart Quiz</button></div>`);
    }
    $('#question').hide();
    $('#score').hide();
    startQuiz();
  }
  
  //to display restart button 
  function restartQuiz (){
    $(`#quiz-box`).on(`click`, `#restart-button`, function(event){
      event.preventDefault();
      reloadStartPage();
  
    });
  }
  //to reload page when restart button is clicked
  function reloadStartPage(){
    location.reload();
  }
  function handleQuiz(){
    startQuiz();
    
  }
  
  $(handleQuiz);