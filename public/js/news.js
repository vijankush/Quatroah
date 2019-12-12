//render news to the page
async function getNews() {
    var today = new Date();
    today.setDate(today.getDate() -7);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    let results = await axios({
        method: 'get',
        url: 'https://newsapi.org/v2/everything?' +
        'sources=bleacher-report&' +
        'q=NBA&' +
        'from=' +today +
        'sortBy=popularity&' +
        'apiKey=8f3a0442a29d4456b8eb58c8f5b8e6d4'
    });

    for(let i =0; i <20; i++){
        let link = results.data.articles[i].url;
        $('#newsFeed').append(`<div class="card headlineCard newsCards">` +
        `<i class="icon-check text-info mr-2"></i> <span>`+
        `<img src="${results.data.articles[i].urlToImage}" alt="Avatar" class="md-avatar rounded">`+
        `<a href="${link}" target="_blank"> ${results.data.articles[i].title} </a> </span></div>`);
    }

}

async function getNews2() {
    var today = new Date();
    today.setDate(today.getDate() -7);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    let results = await axios({
        method: 'get',
        url: 'https://newsapi.org/v2/everything?' +
        'sources=bleacher-report&' +
        'q=NBA&' +
        'from=' +today +
        'sortBy=popularity&' +
        'apiKey=8f3a0442a29d4456b8eb58c8f5b8e6d4'
    });

    console.log(results.data);
    for(let i=0; i<20; i++){
       
        $('#newsFeed2').append(`
        <div class="blog-card">
        <div class="meta">
        <div class="photo" style="background-image: url(${results.data.articles[i].urlToImage})"></div>
        <ul class="details">
          <li class="author"><a href="#">${results.data.articles[i].author}</a></li>
          <li class="date">${results.data.articles[i].publishedAt}</li>
        </ul>
      </div>
      <div class="description">
        <h1>${results.data.articles[i].title}</h1>
        <p>${results.data.articles[i].description}</p>
        <p class="read-more">
          <a href="${results.data.articles[i].url}">Read More</a>
        </p>
      </div>
    </div>
        `);
    }

}


$(document).ready(() => {
    // getNews();
    getNews2()
});