export const DisplayPoliticians = async () => {
    const politicians = await fetch("http://localhost:8088/politicians").then(res => res.json());

    const politicianCards = politicians.map((politician) => {
        return `
            <section class="politician">
                <header class="politician_name">
                    <h1>${politician.name.first} ${politician.name.last}</h1>
                </header>
                <div class="politician_info">
                    <div>Age: ${politician.age}</div>
                    <div>Represents: ${politician.district}</div>
                </div>
            </section>
        `;
    }).join("");

    const politiciansHTML = `
        <article class="politicians">
            ${politicianCards}
        </article>
    `;

    return politiciansHTML;
}