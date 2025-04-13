export const DisplayPacs = async () => {
    const pacs = await fetch("http://localhost:8088/pacs").then(res => res.json());
    const corporatedonations = await fetch("http://localhost:8088/corporatedonations?_expand=corporation").then(res => res.json());

    const pacCards = pacs.map((pac) => {
        const donations = corporatedonations.filter(donation => donation.pacId === pac.id);

        const companies = donations.map(don => {
            const amount = don.amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
            return `<li>${don.corporation.company} (${amount})</li>`;
        }).join("");

        return `
            <section class="pac">
                <header class="pac_name">
                    <h1>${pac.registeredName}</h1>
                </header>
                <div class="pac_info">
                    <div>${pac.address}</div>
                </div>
                <div class="pac_donors">
                    <h1>Donors</h1>
                    <ul>
                        ${companies}
                    </ul>
                </div>
            </section>
        `;
    }).join("");

    const pacHTML = `
        <article class="pacs">
            ${pacCards}
        </article>
    `;

    return pacHTML;
}
