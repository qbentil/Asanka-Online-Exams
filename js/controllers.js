$(function(){
    // Navigations
    $("#start-quiz").on("click", function(){
        $("#page1").addClass("hidden")
        $("#page2").removeClass("hidden")
    })
    $("#continue").on("click", function(){
        $("#page3").addClass("hidden")
        $("#page4").removeClass("hidden")
    })
    $("#review").on("click", function(){
        $("#page6").addClass("hidden")
        $("#page7").removeClass("hidden")
        let screen = $(".screen3")
        reviewQuiz(screen);
    })
    $("#r-back").on("click", function(){
        $("#page6").removeClass("hidden")
        $("#page7").addClass("hidden")
        $(".screen3").html(`<button id="r-back" class="btn-bottom">&#10094; Back</button>`);
        
    })
    $("#begin").on("click", function(){
        $("#page4").addClass("hidden")
        $("#page5").removeClass("hidden")
        setInterval(timer, 1000); //Counter set for 1 sec interval
    })
    // $("#submit-all").on("click", function(){
    //     alert("Functionality not ready")
    //    //QUit Quiz
    // })
    $("#detailed-report").on("click", function(){
        $(".detailed-report").toggleClass("hidden")
        $(".def-report").toggleClass("hidden")
        // $('.classA').removeClass('classA').addClass('classB');
    })
    // if(!$("input[type=radio]").is(":checked")){
    //     $(".submit-box").addClass("hidden")
    // }else{
    //     $(".submit-box").removeClass("hidden")
    // }

    // Questions Dropdown
    $(".list button").on("click", function(){
        $(".dropdown").toggle(function() 
        {
                $('#target').removeClass("hidden") //Adds 'a', removes 'b'
    
        }, function() {
                $('#target').addClass("hidden"); //Adds 'b', removes 'a'
    
        });
    })
    $(".dropdown ul li").on("click", function(){
        $(".dropdown").toggle(function() 
        {
                $('#target').removeClass("hidden") //Adds 'a', removes 'b'
    
        }, function() {
                $('#target').addClass("hidden"); //Adds 'b', removes 'a'
    
        });
    })



    // check if user enter name
    let username;
    $("#submit").on("click", function(){
        username = $("#username").val();
        if(username === "")
        {
            $(".err").fadeIn()
        }
        else{
            // show username on pagwe 3
            $(".username-holder").text(username)
            $("#page2").addClass("hidden")
            $("#page3").removeClass("hidden")
        }
        // alert(username)
    })
    // remove error message when typing
    $("#username").on("keyup", function(){
        username = $("#username").val();
        if(username === "")
        {
            $(".err").fadeIn()
        }else{
            $(".err").fadeOut();  
        }
    })
})
// $("#username").focus();

// timer
let totalTime =350;  //350 seconds total
let min = 0;
let sec = 0;
let counter = 0;
function timer(){
    counter++;
    min = Math.floor( (totalTime - counter) / 60) //calculating minutes
    sec = totalTime - (min * 60) - counter //calculating seconds

    // display on screen
    $(".time span").eq(1).text("00 : "+min +" : "+sec)
    if(counter == totalTime)
    {
        alert("Time is up, press 'OK' to see results")
        result();
    }
}
