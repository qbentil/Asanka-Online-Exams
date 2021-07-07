    // Declaring Variables
    let index =0;
    let attempt = 0;
    let score = 0;
    let wrong = 0;
    let qnum = 1;
    let totalQuestions = 10;
    let questions = quiz.sort(function(){
        return 0.5 - Math.random()
    });
    let loadedQuestions = [];
$(function(){
    qCount() // pring question number
    // Timer code

   
    
    // Timer code
    setInterval(function(){
        if(index >= 1){
            $("#prev").removeClass("disabled")
        }
        if(index <= 0){
            $("#prev").addClass("disabled")
            $("#next").removeClass("disabled")
        }
        if(index < (totalQuestions-1)){
            $("#next").removeClass("disabled")
        }
    }, 100)

    // print first question
    addAnswered(printQusetions(index))   // print question


    // Internal COntrollers
    // submit answer
    $(".submit-box").on("click", function(){
        if(index < (totalQuestions-1))
        {
            if(!$("input[type=radio]").is(":checked")){
                alert("No answer selected!")
            }else{
                checkAnswer();
                qnum++
                index++
                addAnswered(nextQuestion())
                // nextQuestion();
            }
        }else{
            // alert("No more Questions")
            checkAnswer();
            clearInterval(timer)
            result();
        }
    })

    // Move to next Question
    // $("#next").on("click", function(){
    //     showNext();
    // })
})
function nextQuestion(){
    // console.log("Question: "+qnum);
    // console.log("Wrong: "+wrong);
    // console.log("Score: "+score);
    // console.log("Attempt: "+attempt);
    // console.log("Percentage Score: "+(score * 10));
    qCount();
    return printQusetions(index);     // print question
}
// Function to print questions
function printQusetions(i){
    // console.log(quiz[i]);
    $(".quiz h2").text(questions[i].question)
    $(".option").eq(0).html(`<input type="radio" name="option" id = "1" value="1"><label for="1">${questions[i].option[0]}</label>`);
    $(".option").eq(1).html(`<input type="radio" name="option" id = "2" value="2"><label for="2">${questions[i].option[1]}</label>`);
    $(".option").eq(2).html(`<input type="radio" name="option" id = "3" value="3"><label for="3">${questions[i].option[2]}</label>`);
    $(".option").eq(3).html(`<input type="radio" name="option" id = "4" value="4"><label for="4">${questions[i].option[3]}</label>`);
    return questions[i];
}

function checkAnswer(){
    attempt++;
    let optionClicked = $("input[type=radio]:checked").val()

    if(optionClicked == questions[index].answer)
    {
        score++;
    }
    else
    {
        wrong++;
    }
    // $(".scoreBox span").text((score * 10))
    // $(".optionBox span").attr("onclick", "")
    // setTimeout(function() {
    //     showNext();
    // },1000);
}

// show next question
function showNext(elem){
    if(index < (totalQuestions-1))
    {
        // console.log(num);
        checkAnswer()
        qnum++
        index++
        
        addAnswered(nextQuestion())
    }
    else{
        $(elem).addClass("disabled")
    }
}
function showPrev(elem){
    if(index > 0 )
    {
        // console.log(num);
        checkAnswer()
        qnum--
        index--
        removeAnswered(nextQuestion())
    }
    else{
        $(elem).addClass("disabled")
    }
}

    // $("#retake").on("click", function(){
    //     retake();
    // })

// funtion get question count
function qCount()
{
    $("#qcount").text(`Question ${qnum} / ${totalQuestions}`)
}

function getQuestion(i){
    index = i-1;
    qnum = i;
    printQusetions(index)
    qCount();
}

// Print results
function result()
{
    clearInterval(timer)  // Stop timer
    $("#totalQuestion").text(totalQuestions)
    $("#page5").addClass("hidden")
    $("#score").text((score * 10))
    $("#page6").removeClass("hidden")
    $("#attempt").text(attempt)
    $("#correct").text(score)
    $("#wrong").text(wrong)
    $("#points").text(`${score*10}% (${score} Points)`)
    if((score * 10) >= 80)
    {
        $("#badge").addClass("badge-success")
        $("#msg").text("You have pass the Quiz with distinction, Keep it Up!")
        $(".def-report h2").text("You have conquered.")
        $("#teaser").text("CONGRATULATIONS!")
    }else{
        $("#badge").addClass("badge-danger") 
        $("#msg").text("You did not pass the quiz!, Keep trying.")
        $(".def-report h2").text("You will surely conquer.")
        $("#teaser").text("SORRY!")
    }
}
// retake Quiz
function retake(){
    index =0;
    attempt = 0;
    score = 0;
    wrong = 0;
    qnum = 1;
    totalQuestions = 10;
    questions = [];
    questions = quiz.sort(function(){
        return 0.5 - Math.random()
    });
    $("#page6").addClass("hidden")
    $("#page4").removeClass("hidden")
    printQusetions(index)
}

// Submit all
function showResult(){
    if(
        qnum < 10 && 
        !confirm("Quiz has not finished. Press OK to skip quiz and show results.")
    ){
        return;
    }
    loadedQuestions = questions;
    console.log(loadedQuestions);
    result();
}

function addAnswered(i)
{
    loadedQuestions.push(i);
    console.log(loadedQuestions);
}
function removeAnswered(i)
{
    loadedQuestions.pop();
    // console.log(loadedQuestions);
}
function getOption(arr, ans)
{
    let output;
    for (let j = 0; j < arr.length; j++) {
        if(i == (ans-1))
        {
            output+= `
            <div class="option">
                <input type="radio" name="option" id="${i}" checked>
                <label for="${i}">${arr[i]}</label>
            </div>
            `
        }else{
            output+= `
            <div class="option">
                <input type="radio" name="option" id="${i}">
                <label for="${i}">${arr[i]}</label>
            </div> `
        }
    }
    return output;
}
function reviewQuiz(com){
    for (let i = 0; i < loadedQuestions.length; i++) {
        com.append(
            `
        <div class="screen-alt quiz">
            <h2 class="text-dark-50 mb-4">${" "+loadedQuestions[i].question}</h2>
            <div class="options">Answer: <strong class = "ans">${loadedQuestions[i].option[(loadedQuestions[i].answer-1)]}</strong>
            </div>
        </div>
        `
        )       
    }
}
