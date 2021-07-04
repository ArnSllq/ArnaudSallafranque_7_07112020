if(!localStorage.getItem("token")) {
    window.location.href="/Frontend/login.html"
}


function newPost() {
    let error = false;
    if(!localStorage.getItem("token")) {
        window.location.href="/Frontend/login.html"
        error = true
    }
    if(error) {
        return
    }    
    window.location.href="/Frontend/addPost.html"
};

let addPost = document.getElementById("postBtn")
addPost.addEventListener('click', newPost)

async function fetchAllPosts() { 

    let getPosts = await fetch("http://localhost:3000/api/post/", {
        method: "GET",
        headers: {
            Authorization: "Bearer "+localStorage.getItem("token"),
            Accept: "application/json"
        }
    })
    const body = await getPosts.json();
    let postContainer = document.getElementById("postsContainer");
    if(body.posts.length == 0) {
        let emptyMessage = document.createElement("p");
        emptyMessage.innerHTML="Oups, personne n'a fait de post, <a href=\"#\">souhaitez-vous faire un nouveau poste ?</a>"
        postContainer.appendChild(emptyMessage) 
        return
    } 
    body.posts.forEach( async function(post){
        const userFetch = await fetch('http://localhost:3000/api/user/'+post.userId,{
            method: "GET",
            headers: {
                Authorization: "Bearer "+localStorage.getItem("token"),
                Accept: "application/json"
            }
        });
        const userInfo = await userFetch.json();
        const postElement = document.createElement("article");
        postElement.innerHTML=/*html*/`
            <a href="/Frontend/post.html?id=${post.id}">
                <div>
                    <span>${userInfo.user.firstname + ' ' + userInfo.user.lastname}</span>
                    <span>${new Date(post.createdAt).toLocaleDateString('fr-FR', { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>
                <p>${post.description}</p>
                <div>0</div>
            </a>
        `
        postContainer.appendChild(postElement);
    })
}
fetchAllPosts();

