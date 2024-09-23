
const questions = [
    {
        question: "Which of the following statements creates an infinite loop?",
        answer: [
            
                {text: "for i in range(10)", correct: false},
                {text: "while True", correct: true},
                {text: "for i in [0]", correct: false},
                {text: "while i < 10", correct: false}

            
        ]

    }
    ,
    {
        question: "In a nested loop, how many times will the inner loop execute if the outer loop runs 3 times and the inner loop runs 2 times?",
        answer: [
            
                {text: "3", correct: false},
                {text: "2", correct: false},
                {text: "5", correct: false},
                {text: "6", correct: true}

        ]

    }
    ,
    {
        question: ` x = 0
                 while x < 5:
                 if x == 3:
                 break
                 x += 1
                 print(x)`,
        answer: [
            
                {text: "1", correct: false},
                {text: "3", correct: true},
                {text: "5", correct: false},
                {text: "0", correct: false}

            
        ]

    }
    ,
    {
        question: "How do you access the value associated with the key `name` in the following dictionary?  my_dict = {`name``: `Alice`, `age`: 25}",

        answer: [
            
                {text: `my_dict["name"]`, correct: false},
                {text: `my_dict.name`, correct: false},
                {text: `my_dict.get("name")`, correct: false},
                {text: "Both A and C", correct: true}

            
        ]


    }
    ,
    {
        question: `
                for i in range(3):
                for j in range(i):
                print(j)
                print()`,
        answer: [
            
                {text: `
                0
                01`, correct: false},
                {text: `
                  0
                  01
                  012`, correct: true},
                {text: "Error", correct: false},
                {text: `
                  1 
                  0 `, correct: false}

            
        ]

    }
    ,
    {
        question: "What is the purpose of the pass statement in Python?",
        answer: [
            
                {text: "To do nothing, acting as a placeholder", correct: true},
                {text: "To skip the current iteration", correct: false},
                {text: "To exit a loop", correct: false},
                {text: "To raise an exception", correct: false}
        ]

    }
    ,
    {
        question: "How do you merge two dictionaries in Python 3.9 and later?",
        answer: [
        
                {text: "dict1.update(dict2)", correct: false},
                {text: "dict1.merge(dict2)", correct: false},
                {text: "dict1 | dict2", correct: true},
                {text: "dict1 + dict2", correct: false}

            
        ]

    }
    ,
    {
        question: `
        my_dict = {"name": "Bob", "age": 30} 
        my_dict["city"] = "New York"
        print(my_dict)`,
        answer: [
            
                {text: `{"name": "Bob", "age": 30}`, correct: false},
                {text: ` {"name": "Bob", "age": 30, "city": "New York"}`, correct: true},
                {text: `{"city": "New York"}`, correct: false},
                {text: `Error`, correct: false}

            
        ]

    }
    ,
    {
        question: "What happens if break is used inside a nested loop?",
        answer: [
            
                {text: "It breaks only the inner loop", correct: true},
                {text: "It breaks both the inner and outer loops", correct: false},
                {text: "It raises an error", correct: false},
                {text: "It continues the outer loop", correct: false}

            
        ]

    }
    ,
    {
        question: "Which of the following is not a valid way to initialize a set?",
        answer: [
            
                {text: "set([1, 2, 3])", correct: false},
                {text: "{1, 2, 3}", correct: false},
                {text: `{1: "one", 2: "two"}`, correct: true},
                {text: "set()", correct: false}

        
        ]

    }
]

const questionId = document.getElementById('question');
const answerButton = document.getElementById('answer');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');

let currentQuestionIndex = 0;
let score=0


function startQuiz() {
    prevButton.innerHTML="Prev"
    nextButton.innerHTML = "Next";
    showAllQuestions(currentQuestionIndex);
}

function showAllQuestions(index) {
    let currentQuestion = questions[index];
    let questionNumber = index + 1;

    questionId.innerText = questionNumber + ". " + currentQuestion.question;
    answerButton.innerHTML = "";

    currentQuestion.answer.forEach((ans, i) => {
        const button = document.createElement('button');
        button.innerHTML = ans.text;
        button.classList.add("btn");
        // button.setAttribute("data-index", i);

        if(ans.correct){
            button.dataset.correct=ans.correct
        }
        button.addEventListener('click', function(e) {

            const selectBtn=e.target
            const isCorrect=selectBtn.dataset.correct==='true'
            if(isCorrect){
                selectBtn.classList.add("correct")
                score++
            }
            else{
                selectBtn.classList.add("incorrect")
            }


            Array.from(answerButton.children).forEach((bu)=>
            {
                if(bu.dataset.correct==='true'){
                    bu.classList.add("correct")
                }
                bu.disabled=true
            })
            prevButton.style.display= "block"
            // Handle user's answer selection
            // Compare the selected answer with the correct answer and update the score
            // Advance to the next question if needed
        });
        answerButton.appendChild(button);
    });
}

startQuiz();

// Event listener for the next button
nextButton.addEventListener('click', function() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showAllQuestions(currentQuestionIndex);
    } else {
        // questionId.textContent =`You Score ${score} /${questions.length}`;
        // Clear answer buttons at the end
        clearButtons()
        setValue()
    
    }
});

function setValue(){

        if(score==0){
            questionId.textContent=`< ${score}/${questions.length} > meri inti buri halat ki kya batauu`
        }
        else if(score<5){
            questionId.textContent=`< ${score}/${questions.length} > Utha le re baba..`
        }
        else if(score==5 || score==6){
            questionId.textContent=`< ${score}/${questions.length} > Haar kar jeetne wale ko baazigar kehte hai `
        }
        else if(score>6 && score<9 ){

            questionId.textContent=`< ${score}/${questions.length} > Jaa Simran, jaa Jeele apni zindegi `
        }else if (score>=9){
            questionId.textContent=`< ${score}/${questions.length} >  aag lagadi aag lagadi `
        }

    
}

function clearButtons(){
    answerButton.innerHTML = ""; 
    prevButton.innerText=""
    prevButton.style.backgroundColor="#fff"
    nextButton.innerText=""
    nextButton.style.backgroundColor='#fff'

}

// Event listener for the previous button
prevButton.addEventListener('click', function() {
    currentQuestionIndex--;
    if (currentQuestionIndex >= 0) {
        showAllQuestions(currentQuestionIndex);
    } else {
        currentQuestionIndex = 0; // Prevent going below the first question
    }
});
