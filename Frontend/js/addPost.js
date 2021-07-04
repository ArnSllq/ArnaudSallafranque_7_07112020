async function sendComment(e) {
    e.preventDefault()
    e.stopPropagation()
    let description = document.getElementById('comment').value;
    let userId = localStorage.getItem('userId');

    try {
        let postComment = await fetch("http://localhost:3000/api/post/", {
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
        const body = await postComment.json();
        if(body.message == "OK") {
            window.location.href="/Frontend/index/"
        }
    } catch(error) {
        throw new Error(error)
    }
}

let commentSubmit = document.getElementById('postCommentBtn')
commentSubmit.addEventListener('click', sendComment);