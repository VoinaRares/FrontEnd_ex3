const API_URL = 'https://picsum.photos/v2/list'

async function getPostsJSON(url) {
    const response =  await fetch(url);
    const posts = response.json();
    return posts;
}


async function showAllPosts(author){
    const data = (await getPostsJSON(API_URL)).filter(item => ((item.author == author) || (author =="")));
    
    const container = document.getElementById("container");
    container.innerHTML = '';
    const initialPost = document.getElementById("postTemplate");

    for(item of data){
        const newPost = initialPost.content.cloneNode(true);
        newPost.querySelector(".image").src = item.download_url;
        newPost.querySelector(".author").textContent = item.author;
        container.appendChild(newPost);
    }
    
}

function populateDropDownOptions(authors){
    authors = new Set(authors);
    const dropDown = document.getElementById("authorDropDown");
    authors.forEach(author => {
        const opt = document.createElement('option');
        opt.value = author;
        opt.innerHTML = author;
        dropDown.appendChild(opt);
    });
}

function addDropDownListener(dropDown){
    dropDown.addEventListener('change', () => showAllPosts(dropDown.value));

}

async function init(){
    const data = await getPostsJSON(API_URL);
    const dropDown = document.getElementById("authorDropDown");
    populateDropDownOptions(data.map(item => item.author));
    showAllPosts("");
    addDropDownListener(dropDown);
}

init();