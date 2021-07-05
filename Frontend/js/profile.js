if(!localStorage.getItem("token")) {
    window.location.href="/Frontend/login.html"
}

const regexPassword = /^(?=.*[A-ZÀÂÇÉÈÊËÎÏÔÛÙÜŸÑÆŒ])(?=.*[a-zàâçéèêëîïôûùüÿñæœ])(?=.*[0-9])(?=.*[*\/#@!$%^&*()_|\\\[\]\{\}:"'`~?.<,>+=-]).{8,}$/

async function fetchProfile() {
    let userId = localStorage.getItem('userId')
    let getProfile = await fetch('http://localhost:3000/api/user/'+userId, {
        method: "GET",
        headers: {
            Authorization: "Bearer "+localStorage.getItem("token"),
            Accept: "application/json"
        }
    })
    const body = await getProfile.json();
    let profileContainer = document.getElementById("profileContainer");
    const postElement = document.createElement("article");
    postElement.innerHTML=/*html*/`
        <div>
            <span>${body.user.lastname}</span>
            <span>${body.user.firstname}</span>
            <span>${body.user.email}</span>
        </div>
        <label for="password"></label>
        <input type="text" placeholder="Tapez votre nouveau mot de passe" id="password" name="password">
        <input type="submit" id="modifyPwdBtn" value="Modifier votre mot de passe">
        <input type="button" id="deleteAccount" value="Supprimer votre compte">
    `
    profileContainer.appendChild(postElement);
    let passwordBtn = document.getElementById("modifyPwdBtn");
    passwordBtn.addEventListener('click', modifyPassword);

    let deleteBtn = document.getElementById("deleteAccount")
    deleteBtn.addEventListener("click", deleteAccount)
}
fetchProfile();

async function modifyPassword() {
    let password = document.getElementById('password').value;
    if(!regexPassword.test(password)) {
        error = true
        console.log('Mot de passe incorrect')
        alert("Mot de passe incorrect")
    }

    try {
        let userId = localStorage.getItem("userId");
        const putPassword = await fetch('http://localhost:3000/api/user/'+userId, {
            method: "PUT", 
            headers: {
                Authorization: "Bearer "+localStorage.getItem("token"),
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password
            })
        });
        const body = await putPassword.json();
        if(body.message == "OK") {
            window.location.href="/Frontend/"
        }
    } catch(error) {
        throw new Error(error)
    }
}

async function deleteAccount() {

    try {
        let userId = localStorage.getItem("userId");
        const deleteUser = await fetch('http://localhost:3000/api/user/'+userId, {
            method: "DELETE", 
            headers: {
                Authorization: "Bearer "+localStorage.getItem("token"),
                Accept: "application/json",
            },
        });
        const body = await deleteUser.json();
        if(body.message == "OK") {
            localStorage.clear();
            window.location.href="/Frontend/"

        }
    } catch(error) {
        throw new Error(error)
    }
}

let logoutClick = getElementById("lougoutBtn");
logoutClick.addEventListener("click", logout)

function logout() {
    localStorage.clear();
    window.location.href="/Frontend/"
}


