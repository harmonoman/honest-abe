export const DisplayCorporations = async () => {
    const corporations = await fetch("http://localhost:8088/corporations").then(res => res.json());

    const corporationCards = corporations.map((corporation) => {
        return `
            <section class="corporation">
                <header class="corporation_name">
                    <h1>${corporation.company}</h1>
                </header>
                <div class="corporation_info">
                    <div>Address: ${corporation.address}</div>
                </div>
            </section>
        `;
    }).join("");

    const corporationsHTML = `
        <article class="corporations">
            ${corporationCards}
        </article>
    `;

    return corporationsHTML;
}
