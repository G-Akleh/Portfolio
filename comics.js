// 'g.akleh@innopolis.university'
//'https://fwd.innopolis.university/api/hw2'
// 'https://fwd.innopolis.university/api/comic?id=comic_id'

const button = document.getElementById('get-comic-btn');

async function fetch_ID() {
    const email = 'g.akleh@innopolis.university';
    const url = 'https://fwd.innopolis.university/api/hw2?';
    const apiParams = new URLSearchParams();
    apiParams.append('email', email);
    const response = await fetch(url + apiParams.toString());
    return await response.json();  
}

async function fetch_comic(){
    const id = await fetch_ID();
    const imageParams = new URLSearchParams();
    imageParams.append('id', id);
    const imageUrl = 'https://fwd.innopolis.university/api/comic?';
    const imageResponse = await fetch(imageUrl + imageParams.toString());
    return await imageResponse.json();
}

button.addEventListener('click', async () => {
    try {
    const data = await fetch_comic();
    
    const comic_title = document.getElementById('comic-title');
    const comic_date = document.getElementById('comic-date');
    let comic_img = document.getElementById('comic-image')

    comic_img.src = data.img;
    comic_img.alt = data.title;
    comic_title.textContent = data.safe_title;

    let date = new Date(Date.UTC(data.year, data.month, data.day));
    date = date.toLocaleDateString({ weekday: "long", year: "numeric", month: "long", day: "numeric" });
    comic_date.textContent = date;

    } catch (error) {
    console.error('Error:', error);
    }
});