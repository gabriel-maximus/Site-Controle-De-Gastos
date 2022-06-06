function validateFields(){
	mostrarErros();
	mostrarBotoes();	
}

function isEmailValid(){
	const email=document.getElementById("email").value;
	if(!email){
		return false;
	}
	return validateEmail(email);
}

function isPasswordValid(){
	const senha=document.getElementById("senha").value;
	if(!senha){
		return false;
	}
	return true;
}

function mostrarErros(){
	const email=document.getElementById("email").value;
	if (!email){
		document.getElementById("erroEmail").style.display="block";
	} else{
		document.getElementById("erroEmail").style.display="none";
	}
	if (validateEmail(email)){
		document.getElementById("erroEmail").style.display="none";
	} else {
		document.getElementById("erroEmail").style.display="block";
	}
}

function mostrarBotoes(){
	const emailValid = isEmailValid();
	document.getElementById("recuperar").disabled = !emailValid;

	const passwordValid = isPasswordValid();
	document.getElementById("login-button").disabled = !emailValid || !passwordValid;
}


function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function login(){
	showLoading();
	firebase.auth().signInWithEmailAndPassword(document.getElementById("email").value, document.getElementById("senha").value).then(response=>{
		hideLoading();
		window.location.href = "home.html";
	}).catch(error=>{
		hideLoading();
		alert("Usuário não encontrado!");
	});
}

function register(){
	window.location.href = "register.html";
}

function recoverPassword(){
	showLoading();
	firebase.auth().sendPasswordResetEmail(document.getElementById("email").value).then(()=>{
		hideLoading();
		alert("Email enviado com sucesso!");
	}).catch(error=>{
		hideLoading();
		alert("Usuário não encontrado!");
	});
}