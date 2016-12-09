// A $( document ).ready() block.
var count = 1;
var questionKey;
let questBody;
var qu;
var score=0;
var QuestionBank;
var allQuesAns = [];

$( document ).ready(function() {
	$('#start').show();
	$('#previous').hide();
	$('#next').hide();
	$('#submit').hide();
	 $.getJSON("https://quiz-application-1ad79.firebaseio.com/0/QuestionBank.json", function(result){
		QuestionBank = result;
   	});

	$('#submit').on('click', function () {
		if(document.getElementById('submit').innerHTML == 'Play Again'){
 			$('#submit').html('Submit');
 			count=1;
 			score=0;
 			$("#container").remove();
 			getquestion();
 		} else {
 			getResult();
 		}
  		
 	});

});

function getquestion(){

    let rand = Math.floor(Math.random()*(20-1+1)+1);

	questionKey = "question"+rand;

	questBody =  '<div id = "container">'; 
	questBody += '<p id = "question">'+count + ' ' + QuestionBank[questionKey][0]+'</>';
	questBody += '<form id = "myQuiz">';
	questBody +=  '<input type = "radio" name = "myradio" id = "a" value = "a" />'+QuestionBank[questionKey][1]+'<br/>';
	questBody +=  '<input type = "radio" name = "myradio" id = "b" value = "b" />'+QuestionBank[questionKey][2]+'<br/>';
	questBody +=  '<input type = "radio" name = "myradio" id = "c" value = "c" />'+QuestionBank[questionKey][3]+'<br/>';
	questBody +=  '<input type = "radio" name = "myradio" id = "d" value = "d" />'+QuestionBank[questionKey][4]+'<br/>';
	questBody += '</form></div>';
	$('#question-holder').append(questBody);
	
	count=count+1; 

	$('#start').hide();
	$('#previous').hide();
	$('#next').show();
	$('#submit').show();

 }


function preQuestion(){
	let ans = null;
	switch(QuestionBank[questionKey][5]){
		case 'a':
		ans = QuestionBank[questionKey][1];
		break;
		case 'b':
		ans = QuestionBank[questionKey][2];
		break;
		case 'c':
		ans = QuestionBank[questionKey][3]
		break;
		case 'd':
		ans = QuestionBank[questionKey][4]
	}
	allQuesAns.push('<br>Question: '+QuestionBank[questionKey][0]+'<br>  Answer: '+ans);


	if(document.getElementById('a').checked){
  		console.log('You selected A');
  		if(QuestionBank[questionKey][5]==='a'){
  			score ++;
  		}
	} 
	else if(document.getElementById('b').checked){
  		console.log('You selected b');
   		if(QuestionBank[questionKey][5]==='b'){
  			score ++;
  		}
	} 
	else if(document.getElementById('c').checked){
  		console.log('You selected c');
  		if(QuestionBank[questionKey][5]==='c'){
  			score ++;
  		}
	} 
	else if(document.getElementById('d').checked){
  		console.log('You selected d');
   		if(QuestionBank[questionKey][5]==='d'){
  			score ++;
  		}
	} 

	$("#container").remove();
	if(count === 11){
		getResult();
	} else{
		getquestion();
	}
}

function getResult(){
	count=1;
	$('#next').hide();
    $('#submit').html('Play Again');
	$('#container').remove();
	let resultTag = '<div id = "container"><p>your result is '+score+'/10</p><br><p>'+allQuesAns+'</p></div>';
	$('#question-holder').append(resultTag);
}
