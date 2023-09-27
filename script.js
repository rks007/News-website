const API_KEY = 'd202df876877462d9c4c73d4d5d17cda';
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener("load",()=> fetchNews("india"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data =  await res.json()
    bindData(data.articles);
}

function bindData(articles){
    const cardscontainer = document.getElementById('cards-container')
    const newscardTemplate = document.getElementById('template-news-card')

    cardscontainer.innerHTML = "";

    articles.forEach(article =>{
        if(!article.urlToImage) return;
        const cardClone = newscardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article)
        cardscontainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    })

    newsSource.innerHTML = `${article.source.name} 🕛 ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank")
    })
}
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchbutton = document.getElementById('search-button')
const searchtext = document.getElementById('search-text')

searchbutton.addEventListener('click',()=>{
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active")
    curSelectedNav = null;
})