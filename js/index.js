

// fetch news catagories
const fetchNewsCatagories = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
        const result = await res.json()
        showCatagories(result.data.news_category);
        // fetchNews("08");
    }
    catch (err) {
        console.log(err)
    }
}

// show news catagories
const showCatagories = catagoriesList => {

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
    loadSpinner(true);
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

    if (newsList.length === 0) {
        loadSpinner(false);
        const footer = document.getElementById('footer');
        footer.classList.add('fixed', 'bottom-0', 'w-full')
    } else {
        const footer = document.getElementById('footer');
        footer.classList.remove('fixed', 'bottom-0', 'w-full')
    }

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
                    <label onclick="fetchNewsDetails('${news._id}')" for="my-modal-3" class="btn modal-button bg-blue-600 border border-blue-600 hover:bg-blue-600 px-6 rounded-full text-white">Show Details <span><i class="fa-solid fa-arrow-right-long ml-2"></i></span></label> 
                    </div>
                </div>
            </div>
        </div>
        `;

        newsSectionDiv.appendChild(containerDiv);
    });

    loadSpinner(false);
}


// load spinner
const loadSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
}




// fetch news details
const fetchNewsDetails = async (newsId) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        const result = await res.json()
        showNewsDetails(result.data[0])
    }
    catch (err) {
        console.log(err);
    }
}


// show newa details 
const showNewsDetails = (newsDetails) => {
    console.log(newsDetails);
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = '';

    // Create new div
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${newsDetails.image_url}"/>
    <h3 class="text-lg font-bold my-4">${newsDetails.title}</h3>
    <p>${newsDetails.details}</p>
    <div class="grid grid-cols-12 mt-5">
                    <div class="col-span-6 lg:col-span-4 flex items-center">
                        <img class="h-10 w-10 rounded-full" src="${newsDetails.author.img}" alt="">
                        <h5 class="ml-3 font-semibold">${newsDetails.author.name ? newsDetails.author.name : 'No data found'}</h5>
                    </div>
                    <div class="col-span-6 lg:col-span-4 flex items-center justify-center">
                        <div><i class="fa-solid fa-eye"></i></div>
                        <h5 class="ml-3 font-semibold">${newsDetails.total_view ? newsDetails.total_view + 'M' : 'No data found'}</h5>
                    </div>
                    <div class="col-span-12 lg:col-span-4 flex justify-center lg:justify-end items-center">
                        <div>
                            <span><i class="fa-solid fa-star-half-stroke"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                        </div>
                    </div>
                </div>
    `;
    modalBody.appendChild(div)
}

fetchNews('08');
fetchNewsCatagories();