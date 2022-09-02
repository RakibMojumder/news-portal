

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
const showCatagories = catagoriesList => {
    // console.log(catagoriesList);
    const catagoriesDiv = document.getElementById('catagories-div');
    catagoriesList.forEach(catagories => {
        const div = document.createElement('div');
        div.classList.add('text-center', 'font-semibold')
        div.innerHTML = `
        <button onclick="fetchNews('${catagories.category_id}')">${catagories.category_name}</button>
        `;

        catagoriesDiv.appendChild(div);
    });
}


// fetch news

const fetchNews = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    const result = await res.json()
    showNews(result.data)
}

const showNews = newsList => {
    // console.log(newsList);

    newsList.forEach(news => {
        console.log(news)
    })
}

// fetchNews()
fetchNewsCatagories()