if(!localStorage.getItem("token")) {
    window.location.href="/Frontend/login.html"
}

async function sendComment(e) {
    e.preventDefault()
    e.stopPropagation()
    let comment = document.getElementById('comment').value;
    let userId = localStorage.getItem('userId');
    const urlData = new URLSearchParams(window.location.search);
    let postId = urlData.get('postId');

    try {
        let postComment = await fetch("http://localhost:3000/api/comment/", {
            method: "POST",
            headers: {
                Authorization: "Bearer "+localStorage.getItem("token"),
                Accept: "application/json",
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                comment, userId, postId
            })
        });
        const body = await postComment.json();
        if(body.message == "OK") {
            window.location.href="/Frontend/"
        }
    } catch(error) {
        throw new Error(error)
    }
}

let commentSubmit = document.getElementById('commentBtn')
commentSubmit.addEventListener('click', sendComment);

let formSubmit = document.getElementById('formComment')
formSubmit.addEventListener('submit', sendComment);

let logoutClick = document.getElementById("logoutBtn");
logoutClick.addEventListener("click", logout)

function logout() {
    localStorage.clear();
    window.location.href="/Frontend/"
}


