async function signup(e) {
    e.preventDefault()
    e.stopPropagation()
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;

    const regexEmail = /^[A-Za-zÀÂÇÉÈÊËÎÏÔÛÙÜŸÑÆŒàâçéèêëîïôûùüÿñæœ0-9!#$%&'*+\/=?^_`{|}~.-]{2,64}@groupomania\.fr$/
    const regexPassword = /^(?=.*[A-ZÀÂÇÉÈÊËÎÏÔÛÙÜŸÑÆŒ])(?=.*[a-zàâçéèêëîïôûùüÿñæœ])(?=.*[0-9])(?=.*[*\/#@!$%^&*()_|\\\[\]\{\}:"'`~?.<,>+=-]).{8,}$/
    const regexNames = /^[A-Za-zàâçéèêëîïôûùüÿñæœÀÂÇÉÈÊËÎÏÔÛÙÜŸÑÆŒ '-]{2,}/
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
    if(!regexNames.test(firstname)) {
        error = true
        console.log('Caractère non reconnu dans le prénom')
        alert("Caractère non reconnu dans le prénom")
    }
    if(!regexNames.test(lastname)) {
        error = true
        console.log('Caractère non reconnu dans le nom')
        alert("Caractère non reconnu dans le nom")
    }
    if(error) { 
        return
    }
    try {
        let postSignup = await fetch("http://localhost:3000/api/user/signup", {
            method: "POST",
            headers: { 
                Accept: "application/json",
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                email, firstname, lastname, password
            })
        });
        const body = await postSignup.json();
        if(body.message == "OK") {
            window.location.href="/Frontend/login.html"
        }
    } catch(error) {
        throw new Error(error)
    }
}

let signupSubmit = document.getElementById('signup-btn')
signupSubmit.addEventListener('click', signup);