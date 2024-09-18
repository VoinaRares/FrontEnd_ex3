const API_URL = 'https://picsum.photos/v2/list';
const POSTS_PER_PAGE = 6;


async function fetchImages(url) {
    const response =  await fetch(url);
    const posts = response.json();
    return posts;
}


async function showAllPosts(author, pageNumber){

    const dataUnsliced = (await fetchImages(API_URL)).filter(item => ((item.author == author) || (author =="")));
    const container = document.getElementById("container");
    const initialPost = document.getElementById("postTemplate");

    console.log(pageNumber);
    console.log(dataUnsliced.length);
    console.log(dataUnsliced.length / POSTS_PER_PAGE)

    if(pageNumber > Math.round(dataUnsliced.length / POSTS_PER_PAGE) && pageNumber != 1){
        return;
    }

    if(pageNumber < 1){
        return;
    }

    let postCounter = 0;
    container.innerHTML = '';
    const data = dataUnsliced.slice((pageNumber - 1) * POSTS_PER_PAGE);
    
    paginate(pageNumber);

    for(item of data){
        const newPost = initialPost.content.cloneNode(true);
        newPost.querySelector(".image").src = item.download_url;
        newPost.querySelector(".author").textContent = item.author;
        container.appendChild(newPost);
        postCounter++;
        if(postCounter == POSTS_PER_PAGE){
            break;
        }
    }
    
}

function paginate(currentPage){
    const paginationContainer = document.getElementById("pagination");
    const paginationPage = paginationContainer.querySelector(".paginationPage");
    paginationPage.textContent = currentPage;

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

function changePage(amount){
    const dropDown = document.getElementById("authorDropDown");
    const paginationContainer = document.getElementById("pagination");
    const pageNumber = paginationContainer.querySelector(".paginationPage").textContent;
    showAllPosts(dropDown.value, Number(pageNumber) + amount);
}

function addDropDownListener(dropDown){
    dropDown.addEventListener('change', () => showAllPosts(dropDown.value, 1));
}

function addPrevListener(prev){
    prev.addEventListener('click', () => changePage(-1));
}

function addNextListener(next){
    next.addEventListener('click', () => changePage(1));
}

async function init(){
    const data = await fetchImages(API_URL);
    populateDropDownOptions(data.map(item => item.author));
    showAllPosts("", 1);


    const dropDown = document.getElementById("authorDropDown");
    addDropDownListener(dropDown);

    const paginationContainer = document.getElementById("pagination");
    const next = paginationContainer.querySelector("#paginationNext");
    const prev = paginationContainer.querySelector("#paginationPrev");
    addPrevListener(prev);
    addNextListener(next);
}

init();