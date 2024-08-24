// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBLJO_gIWa8C01V0UJy8bfFXEXj1sdqEUg",
    authDomain: "ido-e-learning.firebaseapp.com",
    projectId: "ido-e-learning",
    storageBucket: "ido-e-learning.appspot.com",
    messagingSenderId: "509162903340",
    appId: "1:509162903340:web:bec2b4d1d4ae93701d3e89"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    const authContent = document.getElementById('auth-content');
    const mainContent = document.getElementById('main-content');
    const container = document.querySelector('.container');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const loginError = document.getElementById('login-error');
    const signupError = document.getElementById('signup-error');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');

    if (splashScreen) {
        setTimeout(() => {
            splashScreen.style.display = 'none';
            authContent.style.display = 'flex';
        }, 2000); // 2000ms = 2 seconds
    }

    if (showSignup && showLogin) {
        showSignup.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        showLogin.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }

    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            auth.signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    // Save the user ID to localStorage for later use
                    localStorage.setItem('userId', userCredential.user.uid);
                    // Redirect to dashboard.html
                    window.location.href = 'dashboard.html';
                })
                .catch(error => {
                    loginError.style.display = 'block';
                    if (error.code === 'auth/wrong-password') {
                        loginError.textContent = 'Invalid password. Please try again.';
                    } else {
                        loginError.textContent = error.message;
                    }
                });
        });
    }

    if (signupButton) {
        signupButton.addEventListener('click', (e) => {
            e.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const username = document.getElementById('signup-username').value;

            auth.createUserWithEmailAndPassword(email, password)
                .then(userCredential => {
                    const user = userCredential.user;
                    return db.collection('users').doc(user.uid).set({
                        username: username,
                        email: email
                    });
                })
                .then(() => {
                    signupError.style.display = 'block';
                    signupError.textContent = 'Sign up successful!';
                    setTimeout(() => {
                        signupError.style.display = 'none';
                        container.classList.remove("right-panel-active");
                    }, 3000); // 3000ms = 3 seconds

                    // Optional: You can also clear the sign-up form fields here
                    document.getElementById('signup-email').value = '';
                    document.getElementById('signup-password').value = '';
                    document.getElementById('signup-username').value = '';
                })
                .catch(error => {
                    signupError.style.display = 'block';
                    signupError.textContent = error.message;
                });
        });
    }
});
