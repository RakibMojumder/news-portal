

// fetch news catagories
const fetchNewsCatagories = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
        const result = await res.json()
        showCatagories(result.data.news_category)
    }
    catch (err) {
        console.log(err)
    }
}

// show news catagories
const showCatagories = newsList => {
    console.log(newsList);
    const catagories = document.getElementById('catagories');
    newsList.forEach(news => {
        const div = document.createElement('div');
        div.classList.add('text-center', 'font-semibold')
        div.innerText = `${news.category_name}`;
        catagories.appendChild(div);
    })
    // div.innerText = `${result.data.n}`
}



fetchNewsCatagories()