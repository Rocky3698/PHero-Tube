fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    .then((res) => res.json())
    .then((data) => creatBtn(data.data));

const creatBtn = (data) => {
    data.forEach(Object => {
        const btn_section = document.getElementById("btn-section");
        const btn = document.createElement("span")
        btn.innerHTML = `
        <button onclick="loaddata(${Object.category_id})" type="button" class="btn btn-outline-danger m-2">${Object.category}</button>
        `
        btn_section.append(btn);
    });
}

const loaddata = (category) => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${category}`)
        .then((res) => res.json())
        .then((data) => creatCard(data.data));
}
const creatCard = (data) => {
    const cards = document.getElementById("cards");
    cards.innerHTML = ``;
    if (data.length >= 1) {
        data.forEach(Object => {
            const card = document.createElement("div");
            card.classList.add('col-md-6', 'col-lg-3', 'g-3')
            card.innerHTML = `
            <div class=" border-0">
                <div>
                    <img class="img-fluid thumbnail" src="${Object.thumbnail}" alt="thumbnail">
                </div>
                
                <div class="d-flex pt-3">
                    <img class="profile img-fluid" src="${Object.authors[0].profile_picture}" alt="profile">
                    <div class="text-start ps-3">
                        <p class="fw-bold m-0">${Object.title}</p>
                        <p class="m-0 pb-1">${Object.authors[0].profile_name}  <i class="bi bi-check-circle"></i></p>
                        <p>${Object.others.views}</p>
                    </div>
                </div>
            </div>
            `
            cards.append(card);
        });
    } else{
        const test = document.createElement("h1");
        test.innerText = "Hello World";
        cards.append(test);
    }

}