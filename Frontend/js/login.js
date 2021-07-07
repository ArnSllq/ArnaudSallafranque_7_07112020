async function login(e) {
    e.preventDefault()
    e.stopPropagation()
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    const regexEmail = /^[A-Za-zÀÂÇÉÈÊËÎÏÔÛÙÜŸÑÆŒàâçéèêëîïôûùüÿñæœ0-9!#$%&'*+\/=?^_`{|}~.-]{2,64}@groupomania\.fr$/
    const regexPassword = /^(?=.*[A-ZÀÂÇÉÈÊËÎÏÔÛÙÜŸÑÆŒ])(?=.*[a-zàâçéèêëîïôûùüÿñæœ])(?=.*[0-9])(?=.*[*\/#@!$%^&*()_|\\\[\]\{\}:"'`~?.<,>+=-]).{8,}$/
    let error = false;
    if(!regexEmail.test(email)) {
        error = true
        console.log('une erreur est survenue, merci de renseigner un email correct');
        alert('une erreur est survenue, merci de renseigner un email correct');
    }
    if(!regexPassword.test(password)) {
        error = true
        console.log('Mot de passe incorrect')
        alert("Mot de passe incorrect")
    }
    if(error) { 
        return
    }
    try {
        let postLogin = await fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            headers: { 
                Accept: "application/json",
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                email, password
            })
        });
        const body = await postLogin.json();
        if(body.token) {
            localStorage.setItem("token", body.token)
            localStorage.setItem("userId", body.userId)
            localStorage.setItem("isAdmin", body.isAdmin)
            window.location.href="/Frontend/"
        }
    } catch(error) {
        throw new Error(error)
    }
}

let loginSubmit = document.getElementById('login-btn')
loginSubmit.addEventListener('click', login);