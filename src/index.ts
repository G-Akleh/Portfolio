import { formatDistanceToNow } from "date-fns";


interface ComicResponse {
    img: string;
    title: string;
    safe_title: string;
    num: number;
    alt: string;
    transcript: string;
    year: string;
    month: string;
    day: string;
}

const button = document.getElementById('get-comic-btn') as HTMLButtonElement;

async function fetch_ID(): Promise<string> {
    const email = 'g.akleh@innopolis.university';
    const url = 'https://fwd.innopolis.university/api/hw2?';
    const apiParams = new URLSearchParams();
    apiParams.append('email', email);
    const res: Response = await fetch(url + apiParams.toString());
    const id: string = await res.json();
    return id;
}

async function fetch_comic(): Promise<ComicResponse> {
    const id: string = await fetch_ID();
    const imageParams = new URLSearchParams();
    imageParams.append('id', id);
    const imageUrl = 'https://fwd.innopolis.university/api/comic?';
    const imgRes: Response = await fetch(imageUrl + imageParams.toString());
    const data: ComicResponse = await imgRes.json();
    return data;
}

button.addEventListener('click', async () => {
    try {
        const data: ComicResponse = await fetch_comic();

        const comic_title = document.getElementById('comic-title') as HTMLHeadingElement;
        const comic_date = document.getElementById('comic-date') as HTMLParagraphElement;
        let comic_img = document.getElementById('comic-image') as HTMLImageElement;

        comic_img.src = data.img;
        comic_img.alt = data.title;
        comic_title.textContent = data.safe_title;

        const releaseDate = new Date(
            parseInt(data.year),
            parseInt(data.month) - 1,
            parseInt(data.day)
          );
          const timeAgo = formatDistanceToNow(releaseDate, { addSuffix: true });
          comic_date.textContent = timeAgo;

    } catch (error) {
        console.error('Error:', error);
    }
});
