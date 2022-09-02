

// fetch news catagories
const fetchNewsCatagories = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
        const result = await res.json()
        showCatagories(result.data.news_category);
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
        <button onclick="fetchNews('${catagories.category_id}')" class="focus:underline underline-offset-4 focus:text-blue-600">${catagories.category_name}</button>
        `;

        catagoriesDiv.appendChild(div);
    });
}


// fetch news
const fetchNews = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        const result = await res.json()
        showNews(result.data)
    }
    catch (err) {
        console.log(err);
    }
}

// show news
const showNews = (newsList) => {
    // console.log(newsList)

    // sorted all news
    const sortNewsList = newsList.sort((a, b) => b.total_view - a.total_view);

    // get news setion div
    const newsSectionDiv = document.getElementById('news-section');
    newsSectionDiv.innerHTML = '';


    //get news number input feild
    const newsNumberInputFeild = document.getElementById('news-number-input-feild');
    newsNumberInputFeild.value = `${newsList.length === 0 ? 'No data found' : newsList.length + ' items found'}`;
    newsNumberInputFeild.classList.add('font-semibold', 'text-xl');

    sortNewsList.forEach(news => {
        // console.log(news);
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container', 'mx-auto', 'm-5');
        containerDiv.innerHTML = `
        <div class="row grid grid-cols-12 gap-4 p-5 shadow-md rounded-lg">
            <div class="col-span-2">
                <img src="${news.thumbnail_url}" alt="">
            </div>
            <div class="col-span-10 p-5">
                <h3 class="text-2xl font-semibold mb-4">${news.title}</h3>
                <p class="text-gray-400">${news.details.length > 500 ? news.details.slice(0, 500) + '...' : news.details}</p>

                <div class="grid grid-cols-4 mt-5">
                    <div class="flex items-center">
                        <img class="h-10 w-10 rounded-full" src="${news.author.img}" alt="">
                        <h5 class="ml-3">${news.author.name ? news.author.name : 'no data found'}</h5>
                    </div>
                    <div class="flex items-center justify-center">
                        <div><i class="fa-solid fa-eye"></i></div>
                        <h5 class="ml-3 font-semibold">${news.total_view ? news.total_view + 'M' : 'no data found'}</h5>
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
                    <label onclick="fetchNewsDetails('${news._id}')" for="my-modal-3" class="btn modal-button bg-blue-600 border border-blue-600 hover:bg-blue-600 px-6 rounded-full text-white">open modal <span><i class="fa-solid fa-arrow-right-long ml-2"></i></span></label> 
                    </div>
                </div>
            </div>
        </div>
        `;

        newsSectionDiv.appendChild(containerDiv);
    })
}



// fetch news details
const fetchNewsDetails = async (newsId) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        const result = await res.json()
        console.log(result.data[0])
    }
    catch (err) {
        console.log(err);
    }
}


fetchNewsCatagories();
