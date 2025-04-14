export const DisplayPoliticians = async () => {
    const politicians = await fetch("http://localhost:8088/politicians").then(res => res.json());

    const pacDonations = await fetch("http://localhost:8088/pacdonations?_expand=pac").then(res => res.json());

    const politicianCards = politicians.map((politician) => {
        const politicianPacs = pacDonations.filter(pacDon => pacDon.politicianId === politician.id);

        const donations = politicianPacs.map(pol => {
            const amount = pol.amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
            return `<li>${pol.pac.registeredName} (${amount})</li>`
        }).join("");


        return `
            <section class="politician">
                <header class="politician_name">
                    <h2>${politician.name.first} ${politician.name.last}</h2>
                </header>
                <div class="politician_info">
                    <div>Age: ${politician.age}</div>
                    <div>Represents: ${politician.district}</div>
                </div>
                <div class="pac_donations">
                    <h1>PAC Donations</h1>
                    <ul>
                        ${donations}
                    </ul>
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