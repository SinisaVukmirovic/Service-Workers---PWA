class NewsArticle extends HTMLElement {

    // shadow DOM
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }

    set article(article) {
        this.root.innerHTML = `
            <style>
                h2 {
                    font-family: 'Times New Roman', serif;
                    font-size: 1.5rem;
                    color: #fff;
                    text-align: center;
                    padding: 0 1em;
                }
                a, a:visited {
                    text-decoration: none;
                    color: inherit;
                }
                img {
                    width: 100%;
                }
                P {
                    font-size: 1.25rem;
                    padding: 0 1em;
                    text-align: justify;
                }
            </style>

            <a href="${article.url}">
                <h2>${article.title}</h2>
                <img src="${article.urlToImage || ''}" />
                <p>${article.description || ''}</p>
            </a>
            <hr>
        `;
    }
}

customElements.define('news-article', NewsArticle);