if(!localStorage.getItem("token")) {
    window.location.href="/Frontend/login.html"
}

async function sendPost(e) {
    try {
        e.preventDefault()
        e.stopPropagation()
        let description = document.getElementById('post').value;
        let userId = localStorage.getItem('userId');
        let image = document.getElementById('image').files[0];
        let headers = {
            Authorization: "Bearer "+localStorage.getItem("token"),
            Accept: "application/json"
        };
        let body = null;
        if(image) {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("post", JSON.stringify({
                description: description,
                userId: userId,
            }))
            body=formData;
        } else {
            headers["Content-Type"]="application/json"
            body = JSON.stringify({
                description: description,
                userId: userId,
            });
        }
        console.log(image);


        let postPost = await fetch("http://localhost:3000/api/post/", {
            method: "POST",
            headers: headers,
            body: body
        });
        const bodyPost = await postPost.json();
        if(bodyPost.message == "OK") {
            window.location.href="/Frontend/"
        }
    } catch(error) {
        throw new Error(error)
    }
}

let postSubmit = document.getElementById('addPostBtn')
postSubmit.addEventListener('click', sendPost);

let logoutClick = document.getElementById("logoutBtn");
logoutClick.addEventListener("click", logout)

function logout() {
    localStorage.clear();
    window.location.href="/Frontend/"
}