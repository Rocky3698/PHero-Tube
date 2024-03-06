fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    .then((res) => res.json())
    .then((data) => creatBtn(data.data));

const creatBtn = (data) => {
    data.forEach(Object => {
        const btn_section = document.getElementById("btn-section");
        const btn = document.createElement("span")
        btn.innerHTML = `
        <button onclick="loaddata(${Object.category_id})" type="button"id="btn" class="btn btn-outline-danger m-2">${Object.category}</button>
        `
        btn_section.append(btn);
    });
}

function openBlog() {
    window.open('blog.html', '_blank');
}

const getTime = (sec) => {
    return (sec) ? Math.floor(sec / 3600) + " hrs " + Math.floor((sec % 3600) / 60) + " min ago" : " ";
}
var categoryID = null;
const loaddata = (category) => {
    categoryID = category;
    fetch(`https://openapi.programming-hero.com/api/videos/category/${category}`)
        .then((res) => res.json())
        .then((data) => creatCard(data.data))
        .catch((error) => console.log('Error to load data', error));
}
const sortData = () => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`)
        .then((res) => res.json())
        .then((data) => {
            const d = data.data.sort(function (a, b) { return parseInt(b.others.views) - parseInt(a.others.views) });
            creatCard(d);
        })
        .catch((error) => console.log('Error to sort data', error));

}

loaddata("1000");
const creatCard = (data) => {
    const cards = document.getElementById("cards");
    cards.innerHTML = ``;
    if (data.length >= 1) {
        data.forEach(Object => {
            var time = getTime(parseInt(Object.others.posted_date));
            const sortbtn = document.getElementById("sortbtn");
            sortbtn.classList.remove('d-none');
            const card = document.createElement("div");
            card.classList.add('col-xsm-6','col-md-4','col-lg-3', 'g-3','c');
            card.innerHTML = `
            <div class=" border-0">
                
                <div class="vdo">
                    <img class="img-fluid thumbnail " src="${Object.thumbnail}" alt="thumbnail">
                    <p class="time m-0 fw-light bg-dark text-light">${time}</p>
                </div>
                <div class="d-flex pt-3 ">
                    <img class="profile img-fluid" src="${Object.authors[0].profile_picture}" alt="profile">
                    <div class="text-start ps-3">
                        <p class="fw-bold m-0">${Object.title}</p>
                        <p class="m-0 pb-1">${Object.authors[0].profile_name} ${Object.authors[0].verified ? '<i class="fa-solid fa-circle-check fa-xs" style="color: #0000ff;"></i>' : ''}</p>
                        <p>${Object.others.views}</p>
                    </div>
                </div>  
            </div>
            `
            cards.append(card);
        });
    } else {
        const sortbtn = document.getElementById("sortbtn");
        sortbtn.classList.add('d-none');
        cards.innerHTML = `
        <div class="d-flex flex-column align-items-center mt-5 text-center">
            <img class="img-fluid" src="Icon.png" alt="Error">
            <h2 class="p-4">Oops!! Sorry, There is no content here.</h2>
        </div>
        `
    }

}

