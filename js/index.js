

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

// show news
const showNews = newsList => {
    console.log(newsList)
    const newsSectionDiv = document.getElementById('news-section');
    newsSectionDiv.textContent = '';
    newsList.forEach(news => {
        console.log(news);
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container', 'mx-auto');
        containerDiv.innerHTML = `
        <div class="row grid grid-cols-12 gap-4 p-5 shadow-md rounded-lg">
            <div class="col-span-2">
                <img src="${news.thumbnail_url}" alt="">
            </div>
            <div class="col-span-10 p-5">
                <h3 class="text-2xl font-semibold mb-4">${news.title}</h3>
                <p class="text-gray-400">${news.details.length > 400 ? news.details.slice(0, 400) + '...' : news.details}</p>

                <div class="grid grid-cols-4 mt-5">
                    <div class="flex items-center">
                        <img src="../img/Avatar.png" alt="">
                        <h5 class="ml-3">Rakib</h5>
                    </div>
                    <div class="flex items-center justify-center">
                        <div><i class="fa-solid fa-eye"></i></div>
                        <h5 class="ml-3">${news.total_view}</h5>
                    </div>
                    <div class="flex justify-center items-center">
                        <div>
                            <span><i class="fa-solid fa-star-half-stroke"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                        </div>
                    </div>
                    <div class="text-right">
                        <button class="bg-blue-600 py-2 px-6 rounded-full text-white">show all <span><i
                                    class="fa-solid fa-arrow-right-long ml-2"></i></span></button>
                    </div>
                </div>
            </div>
        </div>
        `;

        newsSectionDiv.appendChild(containerDiv);
    })
}

// fetchNews()
fetchNewsCatagories()