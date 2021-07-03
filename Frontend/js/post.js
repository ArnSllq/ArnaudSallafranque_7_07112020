if(!localStorage.getItem("token")) {
    window.location.href="/Frontend/login.html"
}

async function fetchPost() { 

    let getPost = await fetch("http://localhost:3000/api/post/1", {
        method: "GET",
        headers: {
            Authorization: "Bearer "+localStorage.getItem("token"),
            Accept: "application/json"
        }
    })
    const body = await getPost.json();
    console.log(body);
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
        const postElement = document.createElement("article");
        postElement.innerHTML=/*html*/`
            <div>
                <span>${userInfo.user.firstname + ' ' + userInfo.user.lastname}</span>
                <span>${new Date(body.post.createdAt).toLocaleDateString('fr-FR', { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
            <p>${body.post.description}</p>
            <div>0</div>
        `
        postContainer.appendChild(postElement);
}
fetchPost();
