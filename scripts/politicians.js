export const DisplayPoliticians = async () => {

    const [
        politicians,
        pacDonations,
        legislations,
        corporatedonations
    ] = await Promise.all([
        fetch("http://localhost:8088/politicians").then(res => res.json()),
        fetch("http://localhost:8088/pacdonations?_expand=pac").then(res => res.json()),
        fetch("http://localhost:8088/politicianlegislations?_expand=legislation").then(res => res.json()),
        fetch("http://localhost:8088/corporatedonations?_expand=corporation").then(res => res.json())
    ]);

    const politicianCards = politicians.map((politician) => {
        const politicianPacs = pacDonations.filter(pacDon => pacDon.politicianId === politician.id);

        const donations = politicianPacs.map(pol => {
            const amount = pol.amount.toLocaleString("en-US", { 
                style: "currency", 
                currency: "USD" 
            });
            return `<li>${pol.pac.registeredName} (${amount})</li>`
        }).join("");

        const politicianLegislations = legislations.filter(leg => leg.politicianId === politician.id)
        
        const bills = politicianLegislations.map((polLeg) => 
            `<ul>${polLeg.legislation.name}</ul>`
        ).join("");

        const politicianPACIds = politicianPacs.map(p => p.pacId);

        const relatedCorpDonations = corporatedonations.filter(corpDon =>
            politicianPACIds.includes(corpDon.pacId)
        );

        // Extract unique corporations using a Map
        const uniqueCorporations = [
            ...new Map(
                relatedCorpDonations.map(don => [don.corporation.id, don.corporation])
            ).values()
        ];

        const corporationsHTML = uniqueCorporations.map(corp => `<li>${corp.company}</li>`).join("");

        return `
            <section class="politician">
                <header class="politician_name">
                    <h2>${politician.name.first} ${politician.name.last}</h2>
                </header>
                <div class="politician_info">
                    <div>Age: ${politician.age}</div>
                    <div>Represents: ${politician.district}</div>
                </div>
                <div class="politician_bills">
                    <h1>Sponsored Bills</h1>
                    <ul>
                        ${bills}
                    </ul>
                </div>
                <div class="politician_funders">
                    <h1>Related PACs</h1>
                    <ul>
                        ${donations}
                    </ul>
                </div>
                <div class="politician_influencers">
                    <h1>Influencing Corporations</h1>
                    <ul>
                        ${corporationsHTML}
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