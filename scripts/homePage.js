async function getPostsJSON(url) {
    const response =  await fetch(url);
    const posts = response.json();
    return posts;
}




async function showAllPosts(){

    let data = await getPostsJSON('https://picsum.photos/v2/list');
    dropDownOptions(data.map(item => item.author));
    
    let container = document.getElementById("container");
    const initialPost = document.getElementsByClassName("post");

    initialPost[0].children[0].src = data[0].download_url;
    initialPost[0].children[1].innerHTML = data[0].author;


    for(let i = 1; i < data.length; i++){
        const new_post = initialPost[0].cloneNode(true);
        container.appendChild(new_post);
        new_post.children[0].src = data[i].download_url;
        new_post.children[1].innerHTML = data[i].author;
    }
    
}

function filterPosts(filterAuthor){
    let container = document.getElementById("container");
    if(filterAuthor == ''){
        for(let i = 0; i < container.children.length; i++){
            container.children[i].style.display = "block";
        }
    }
    else{
        for(let i = 0; i < container.children.length; i++){
            if(container.children[i].children[1].innerHTML != filterAuthor)
            {   
                container.children[i].style.display = "none";
            }
            else{
                container.children[i].style.display = "block";
            }
        }
    }
}

function dropDownOptions(authors){
    authors = new Set(authors);
    const dropDown = document.getElementById("authorDropDown");
    authors.forEach(author => {
        const opt = document.createElement('option');
        opt.value = author;
        opt.innerHTML = author;
        dropDown.appendChild(opt);
    });
}

showAllPosts();