if(!localStorage.getItem("token")) {
    window.location.href="/Frontend/login.html"
}

async function fetchPost() { 
    const urlData = new URLSearchParams(window.location.search);
    let postId = urlData.get('id');
    let getPost = await fetch('http://localhost:3000/api/post/' +postId, {
        method: "GET",
        headers: {
            Authorization: "Bearer "+localStorage.getItem("token"),
            Accept: "application/json"
        }
    })
    const body = await getPost.json();
    let postContainer = document.getElementById("postContainer");
    if(!body.post) {
        let emptyMessage = document.createElement("p");
        emptyMessage.innerHTML="Ce post n'existe plus, <a href=\"/Frontend/\">Découvrez d'autres posts sur la page d'accueil</a>"
        postContainer.appendChild(emptyMessage) 
        return
    }
    const userFetch = await fetch('http://localhost:3000/api/user/'+body.post.userId,{
        method: "GET",
        headers: {
            Authorization: "Bearer "+localStorage.getItem("token"),
            Accept: "application/json"
        }
    });

    const userInfo = await userFetch.json();
    // const commentsInfo = await commentsFetch.json()
    const postElement = document.createElement("article");
    postElement.innerHTML=/*html*/`
        <div>
            <span>${userInfo.user.firstname + ' ' + userInfo.user.lastname}</span>
            <span>${new Date(body.post.createdAt).toLocaleDateString('fr-FR', { year: "numeric", month: "long", day: "numeric" })}</span>
        </div>
        <p>${body.post.description}</p>

        <div><input type="button" id="commentBtn" value="Ajouter un commentaire"></div>
        <div id="commentsContainer"></div>
    `
    postContainer.appendChild(postElement);
    let addComment = document.getElementById('commentBtn');
    addComment.addEventListener('click', newComment);  

    fetchAllComments(postId);
}
fetchPost();

async function fetchAllComments(postId) {
    let getAllComments = await fetch("http://localhost:3000/api/comment/"+postId, {
        method: "GET", 
        headers: {
            Authorization: "Bearer "+localStorage.getItem("token"),
            Accept: "application/json"
        }
    })
    const body2 = await getAllComments.json();
    let commentContainer = document.getElementById("commentsContainer");
    if(body2.comments.length == 0) {
        let emptyMessage = document.createElement("p");
        emptyMessage.innerHTML="Oups, personne n'a fait de post, <a href=\"#\">souhaitez-vous faire un nouveau poste ?</a>"
        commentContainer.appendChild(emptyMessage) 
        return
    }
    body2.comments.forEach( async function(comment){
        const userFetch2 = await fetch('http://localhost:3000/api/user/'+comment.userId,{
            method: "GET",
            headers: {
                Authorization: "Bearer "+localStorage.getItem("token"),
                Accept: "application/json"
            }
        });
        const userInfo2 = await userFetch2.json();
        const commentElement = document.createElement("article");
        commentElement.innerHTML=/*html*/`
            <div>
                <span>${userInfo2.user.firstname + ' ' + userInfo2.user.lastname}</span>
                <span>${new Date(comment.createdAt).toLocaleDateString('fr-FR', { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
            <p>${comment.comment}</p>
        `
        commentContainer.appendChild(commentElement);
    })
}

function newComment() {
    const urlData = new URLSearchParams(window.location.search);
    let postId = urlData.get('id');
    window.location.href=`/Frontend/newcomment.html?postId=${postId}`
};