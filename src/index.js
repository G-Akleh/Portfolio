import { formatDistanceToNow } from "date-fns";
const button = document.getElementById('get-comic-btn');
async function fetch_ID() {
    const email = 'g.akleh@innopolis.university';
    const url = 'https://fwd.innopolis.university/api/hw2?';
    const apiParams = new URLSearchParams();
    apiParams.append('email', email);
    const res = await fetch(url + apiParams.toString());
    const id = await res.json();
    return id;
}
async function fetch_comic() {
    const id = await fetch_ID();
    const imageParams = new URLSearchParams();
    imageParams.append('id', id);
    const imageUrl = 'https://fwd.innopolis.university/api/comic?';
    const imgRes = await fetch(imageUrl + imageParams.toString());
    const data = await imgRes.json();
    return data;
}
button.addEventListener('click', async () => {
    try {
        const data = await fetch_comic();
        const comic_title = document.getElementById('comic-title');
        const comic_date = document.getElementById('comic-date');
        let comic_img = document.getElementById('comic-image');
        comic_img.src = data.img;
        comic_img.alt = data.title;
        comic_title.textContent = data.safe_title;
        const releaseDate = new Date(parseInt(data.year), parseInt(data.month) - 1, parseInt(data.day));
        const timeAgo = formatDistanceToNow(releaseDate, { addSuffix: true });
        comic_date.textContent = timeAgo;
    }
    catch (error) {
        console.error('Error:', error);
    }
});
