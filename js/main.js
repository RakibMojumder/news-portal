

// load spinner
const loadSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
}


// fetch todays pick news
const fetchForTodaysPickNews = async (id) => {
    loadSpinner(true);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        const result = await res.json()
        showTodaysPickNews(result.data)
    }
    catch (err) {
        console.log(err);
    }
};



// show todays pick news
const showTodaysPickNews = (allNews) => {
    // get news setion div
    const newsSectionDiv = document.getElementById('news-section');
    newsSectionDiv.innerHTML = '';

    // sorted news
    const sortedNews = allNews.sort((a, b) => b.total_view - a.total_view);
    // console.log(sortedNews[0].others_info.is_todays_pick)
    const todaysPick = sortedNews.filter((news) => {
        return news.others_info.is_todays_pick
    });

    // todays pick news field
    const newsNumberInputFeild = document.getElementById('news-number-input-feild');
    newsNumberInputFeild.value = 'Todays Pick news';

    // console.log(todaysPick)
    todaysPick.forEach(news => {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container', 'mx-auto', 'm-5');
        containerDiv.innerHTML = `
        <div class="row grid grid-cols-1 lg:grid-cols-12 gap-4 p-5 shadow-md rounded-lg">
            <div class="col lg:col-span-2">
                <img src="${news.thumbnail_url}" class="mx-auto" alt="">
            </div>
            <div class="col lg:col-span-10 p-5">
                <h3 class="text-2xl font-semibold mb-4">${news.title}</h3>
                <p class="text-gray-400">${news.details.length > 500 ? news.details.slice(0, 500) + '...' : news.details}</p>

                <div class="grid grid-cols-2 lg:grid-cols-4 mt-5">
                    <div class="col-span-1 flex items-center">
                        <img class="h-10 w-10 rounded-full" src="${news.author.img}" alt="">
                        <h5 class="ml-3 font-semibold">${news.author.name ? news.author.name : 'no data found'}</h5>
                    </div>
                    <div class="col-span-1 flex items-center justify-center">
                        <div><i class="fa-solid fa-eye"></i></div>
                        <h5 class="ml-3 font-semibold">${news.total_view ? news.total_view + 'M' : 'no data found'}</h5>
                    </div>
                    <div class="col-span-1 flex justify-center items-center">
                        <div class="hidden lg:block">
                            <span><i class="fa-solid fa-star-half-stroke"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                        </div>
                    </div>
                    <div class="text-center lg:text-right col-span-12 lg:col-span-1 mt-4 lg:mt-0">
                    <label onclick="fetchNewsDetails('${news._id}')" for="my-modal-3" class="btn modal-button bg-blue-600 border border-blue-600 hover:bg-blue-600 px-6 rounded-full text-white">Details <span><i class="fa-solid fa-arrow-right-long ml-2"></i></span></label> 
                    </div>
                </div>
            </div>
        </div>
        `;

        newsSectionDiv.appendChild(containerDiv)
    });

    loadSpinner(false);
}




// fetch trending news
const fetchForTrendingNews = async (id) => {
    loadSpinner(true);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        const result = await res.json()
        showTrendingNews(result.data)
    }
    catch (err) {
        console.log(err);
    }
}




// show trending news
const showTrendingNews = (allNews) => {
    // get news setion div
    const newsSectionDiv = document.getElementById('news-section');
    newsSectionDiv.innerHTML = '';

    // sorted news
    const sortedNews = allNews.sort((a, b) => b.total_view - a.total_view);
    // console.log(sortedNews[0].others_info.is_todays_pick)
    const trending = sortedNews.filter((news) => {
        return news.others_info.is_trending
    });

    // trending news field
    const newsNumberInputFeild = document.getElementById('news-number-input-feild');
    newsNumberInputFeild.value = trending.length + ' Trending news found';

    trending.forEach(news => {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container', 'mx-auto', 'm-5');
        containerDiv.innerHTML = `
        <div class="row grid grid-cols-1 lg:grid-cols-12 gap-4 p-5 shadow-md rounded-lg">
            <div class="col lg:col-span-2">
                <img src="${news.thumbnail_url}" class="mx-auto" alt="">
            </div>
            <div class="col lg:col-span-10 p-5">
                <h3 class="text-2xl font-semibold mb-4">${news.title}</h3>
                <p class="text-gray-400">${news.details.length > 500 ? news.details.slice(0, 500) + '...' : news.details}</p>

                <div class="grid grid-cols-2 lg:grid-cols-4 mt-5">
                    <div class="col-span-1 flex items-center">
                        <img class="h-10 w-10 rounded-full" src="${news.author.img}" alt="">
                        <h5 class="ml-3 font-semibold">${news.author.name ? news.author.name : 'no data found'}</h5>
                    </div>
                    <div class="col-span-1 flex items-center justify-center">
                        <div><i class="fa-solid fa-eye"></i></div>
                        <h5 class="ml-3 font-semibold">${news.total_view ? news.total_view + 'M' : 'no data found'}</h5>
                    </div>
                    <div class="col-span-1 flex justify-center items-center">
                        <div class="hidden lg:block">
                            <span><i class="fa-solid fa-star-half-stroke"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                        </div>
                    </div>
                    <div class="text-center lg:text-right col-span-12 lg:col-span-1 mt-4 lg:mt-0">
                    <label onclick="fetchNewsDetails('${news._id}')" for="my-modal-3" class="btn modal-button bg-blue-600 border border-blue-600 hover:bg-blue-600 px-6 rounded-full text-white">Details <span><i class="fa-solid fa-arrow-right-long ml-2"></i></span></label> 
                    </div>
                </div>
            </div>
        </div>
        `;

        newsSectionDiv.appendChild(containerDiv)
    });

    loadSpinner(false);
}
