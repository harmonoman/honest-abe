export const DisplayCorporations = async () => {
    const corporations = await fetch("http://localhost:8088/corporations").then(res => res.json());

    const corporationsHTML = corporations.map((corporation) => {

        return `
            <article class="corporations">
                <section class="corporation">
                    <header class="corporation_name">
                        <h1>${corporation.company}</h1>
                    </header>
                    <div class="corporation_info">
                        <div>Address: ${corporation.address}</div>
                    </div>
                </section>
            </article>
        `
    }).join("");

    return corporationsHTML;
}