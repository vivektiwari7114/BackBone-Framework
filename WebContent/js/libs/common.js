jQuery(document).ready(function($) {
	
	$('#mainlogo').click(function(){
		var height = $( window ).height();
		var finalheight = height - 300;
		$(".selfcare-ap-homemenua ul").css("height",finalheight+"px");
		$('#selfcare-menubar').slideDown({duration:1000});
		$('.selfcare-mainLogo1').slideDown({duration:10});
		
	});
	
	$('.selfcare-ap-Settingsmenu').click(function(){		
		$('.selfcare-acc-search').css("display","none");
		$("#selfcare-ap-menubar").css("display","block");
	});
		$('#bottomlogo,#mainlogo2').click(function(){		
		$('#selfcare-menubar').slideUp({duration:500});
		$('.selfcare-mainLogo1').slideUp({duration:1000});
	});
	
	
		
	var randomMessage = generateCaptcha();			
	var enteredValue='';
	$('#generatedCaptcha').text(randomMessage);
	$(".refresh").click(function(){	
		randomMessage = generateCaptcha();
		$('#generatedCaptcha').text(randomMessage);
	});
	$('#captchaText').keyup(function(){		
		enteredValue = $(this).val();
	});
	$('#captchaText').keydown(function(e){	
		if(e.ctrlKey && (e.keyCode == 88 || e.keyCode == 67 || e.keyCode == 86)){
			return false;
		}
	});	
	$(".2selfcare-nextbuttonimg").click(function(){			
		if(enteredValue == randomMessage ){	
			alert('correct');
		}else{
			alert('Incorrect value');
		}
	});
		$('#selfcare-first-productCategory').liquidcarousel({height:188, duration:100, hidearrows:false});
	$('#selfcare-second-productCategory').liquidcarousel({height:188, duration:100, hidearrows:false});
	$('#selfcare-third-productCategory').liquidcarousel({height:188, duration:100, hidearrows:false});
	$('#selfcare-fourth-productCategory').liquidcarousel({height:188, duration:100, hidearrows:false});

});

function generateCaptcha(){
	 
	
	var i = 0;
	var j = 6;
	var randomNumber = 0;
	var randomMessage = '';
	
	while(i<j)
	{
		randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
		  if ((randomNumber >=33) && (randomNumber <=47)) { continue; } 
		  if ((randomNumber >=58) && (randomNumber <=64)) { continue; }
		  if ((randomNumber >=91) && (randomNumber <=96)) { continue; }
		  if ((randomNumber >=123) && (randomNumber <=126)) { continue; }
		randomMessage += String.fromCharCode(randomNumber);
		i++;
	}	
	return randomMessage;
}
function passwordStrength(password)
{
                var desc = new Array();
                desc[0] = "Very Weak";
                desc[1] = "Weak";
                desc[2] = "Better";
                desc[3] = "Its'Safe";
                desc[4] = "Strong";
                desc[5] = "Strongest";

                var score   = 0;

                //if password bigger than 6 give 1 point
                if (password.length > 6) score++;

                //if password has both lower and uppercase characters give 1 point  
                if ( ( password.match(/[a-z]/) ) && ( password.match(/[A-Z]/) ) ) score++;

                //if password has at least one number give 1 point
                if (password.match(/\d+/)) score++;

                //if password has at least one special caracther give 1 point
                if ( password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) ) score++;

                //if password bigger than 12 give another 1 point
                if (password.length > 12) score++;

                 document.getElementById("passwordDescription").innerHTML = desc[score];
                 document.getElementById("passwordStrength").className = "strength" + score;
}

  function Winki_eyeShowPWD(){
								    var inputEl = document.getElementById('pass');
								  if(inputEl.type != "text"){
								        inputEl.type = "text";
								  }else{
								      inputEl.type = "password";
								  }
		                      }


