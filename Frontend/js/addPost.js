if(!localStorage.getItem("token")) {
    window.location.href="/Frontend/login.html"
}

async function sendPost(e) {
    e.preventDefault()
    e.stopPropagation()
    let description = document.getElementById('comment').value;
    let userId = localStorage.getItem('userId');

    try {
        let postPost = await fetch("http://localhost:3000/api/post/", {
            method: "POST",
            headers: { 
                Authorization: "Bearer "+localStorage.getItem("token"),
                Accept: "application/json",
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                description, userId
            })
        });
        const body = await postPost.json();
        if(body.message == "OK") {
            window.location.href="/Frontend/"
        }
    } catch(error) {
        throw new Error(error)
    }
}

let postSubmit = document.getElementById('addPostBtn')
postSubmit.addEventListener('click', sendPost);