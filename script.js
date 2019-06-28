import './news-article.js';
import { topHeadlinesUrl } from './newsApi.js';

window.addEventListener('load', () => {
    fetchNews();

    // registering service worker
    registerSW();
});

async function fetchNews() {
    const res = await fetch(topHeadlinesUrl);
    const json = await res.json();

console.log(json);

    const main = document.querySelector('main');

    json.articles.forEach(article => {
        const elem = document.createElement('news-article');

        elem.article = article;
        main.appendChild(elem);
    });
}

// registering of SW
async function registerSW() {
    // checking if the browser supports SW before trying to register it
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./sw.js');
        } catch (e) {
            console.log(`SW registration failed`);
        }
    }
}