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

				     function myFunction(min, max)
											{


											document.getElementById("captcharandomno").innerHTML=Math.floor(Math.random() * (max - min + 1) + min);
											}