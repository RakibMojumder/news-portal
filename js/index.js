

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
    const newsSectionDiv = document.getElementById('news-section');
    newsSectionDiv.textContent = '';
    newsList.forEach(news => {
        console.log(news)
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container', 'mx-auto');
        containerDiv.innerHTML = `
        <div class="row grid grid-cols-12 gap-4 p-5 shadow-md rounded-lg">
            <div class="col-span-2">
                <img src="../img/unsplash_EhTcC9sYXsw.png" alt="">
            </div>
            <div class="col-span-10 p-5">
                <h3 class="text-2xl font-semibold mb-4">The best fashion influencers to follow for sartorial
                    inspiration
                </h3>
                <p class="text-gray-400">From our favourite UK influencers to the best missives from Milan and the
                    coolest New Yorkers, read
                    on some of the best fashion blogs out there, and for even more inspiration, do head to our separate
                    black fashion influencer round-up.

                    Fancy some shopping deals? Check out these amazing sales: Zara Black Friday, ASOS Black Friday,
                    Missoma Black Friday and Gucci Black FridayThe best fashion influencers to follow for sartorial</p>

                <div class="grid grid-cols-4 mt-5">
                    <div class="flex items-center">
                        <img src="../img/Avatar.png" alt="">
                        <h5 class="ml-3">Rakib</h5>
                    </div>
                    <div class="flex items-center justify-center">
                        <div><i class="fa-solid fa-eye"></i></div>
                        <h5 class="ml-3">1.5M</h5>
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