const apikey = '4c7ef8a3799a3258888671664a3f47ce';
const ipl = document.querySelector('#ipl')
const finance = document.querySelector('#finance')
const politics = document.querySelector('#politics')
const technology = document.querySelector('#technology')
const searchInput = document.querySelector('#searchInput')
const searchBtn = document.querySelector('#searchBtn')

// diplay articles on website load
window.addEventListener('load', () => fetchNews('India'));
ipl.addEventListener('click', () => {
    fetchNews('ipl');
})
finance.addEventListener('click', () => {
    fetchNews('finance');
})
politics.addEventListener('click', () => {
    fetchNews('politics');
})
technology.addEventListener('click', () => {
    fetchNews('technology');
})
searchBtn.addEventListener('click', () => {
    let value = searchInput.value.toLowerCase()
    fetchNews(value); 
})

// fetch news
function fetchNews(query) {
    fetch(`https://gnews.io/api/v4/search?q=${query}&lang=en&country=us&max=10&apikey=${apikey}`).
    then((response) => {
      return response.json();
    }).then((response) => {
        const articles = response.articles;
        bindData(articles)
    }).catch((error) => {
        console.log(error);
    })
}

// clone div into main section

function bindData(articles) {
    const cardsContainer = document.querySelector('#cards-container');
    const cardTemplate = document.querySelector('#card-template');

    cardsContainer.innerHTML = '';

    articles.forEach((article) => {
        const cardClone = cardTemplate.content.cloneNode(true);
        fillData(cardClone, article);
        cardsContainer.append(cardClone);
    });
}

// fill data into cards
function fillData(cardClone, article) {

    const newsImg = cardClone.querySelector('#cardImg');
    const newsHeading = cardClone.querySelector('#cardHeading');
    const newsDate = cardClone.querySelector('#CardDate');
    const newsDes = cardClone.querySelector('#cardDespription');

    newsImg.src = article.image;
    newsHeading.textContent = article.title;
    newsDes.textContent = article.description

    
    const source = article.source.name;
    cardClone.querySelector('#cardScouce').textContent = source;

    const date = new Date(article.publishedAt).toLocaleString();
    newsDate.textContent = date;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url);
    })
}

