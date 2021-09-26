import { connectDatabase } from './connect.js'
import{loginForm, signupForm, overlayLog, logoutBtn, loginBtn, signupBtn, toDoList, closeForm, auth} from './variables.js'


export function authentication(){
	
	function showForm(form, val){
		form.style.display = val
		overlayLog.style.display = val
	}

	closeForm[0].addEventListener("click", () => {
		showForm(signupForm, 'none');
		signupForm.reset();
		signupForm.querySelector('.form-error').innerHTML = '';
	})
	closeForm[1].addEventListener("click", () => {
		showForm(loginForm, 'none');
		loginForm.reset();
		loginForm.querySelector('.form-error').innerHTML = '';
	})

	//listen for auth status chenges
	auth.onAuthStateChanged((user) => {
		if(user){
		let id = user.uid;
		// console.log(user.email)	
		connectDatabase(id);
		toDoList.style.display = 'block'
		} else{
		toDoList.style.display = 'none';
		}
		
	})
	///////////////sign up/////
	signupForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const email = signupForm['signup-email'].value;
		const password = signupForm['signup-password'].value;
		

		auth.createUserWithEmailAndPassword(email, password)
			.then(() => {
			signupForm.querySelector('.form-error').innerHTML = '';
			signupForm.reset();
			showForm(signupForm, 'none');
			})
			.catch((error) => {
				signupForm.querySelector('.form-error').innerHTML = error.message;
			})
	})

	signupBtn.addEventListener("click", (e) => {
		e.preventDefault();
		showForm(signupForm, 'block')
	})
	////logout ///////////////////////////////////////
	logoutBtn.addEventListener("click", (e) => {
		e.preventDefault();
		auth.signOut()
		
		
	})
	//loginform/////////////
	loginBtn.addEventListener("click", (e) => {
		e.preventDefault();
		showForm(loginForm, 'block')
	})

	loginForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const email = loginForm['login-email'].value;
		const password = loginForm['login-password'].value;

		auth.signInWithEmailAndPassword(email, password)
		.then(() => {
		loginForm.querySelector('.form-error').innerHTML = '';
		loginForm.reset();
		showForm(loginForm, 'none');
		})
		.catch((error) => {
			loginForm.querySelector('.form-error').innerHTML = error.message;
		})
	})
	
}









