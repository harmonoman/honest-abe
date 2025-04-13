import { DisplayCorporations } from "./corporations.js";
import { DisplayPacs } from "./pacs.js";
import { DisplayPoliticians } from "./politicians.js";

const container = document.querySelector("#container");

const render = async () => {

    const politicans = await DisplayPoliticians();
    const corporations = await DisplayCorporations();
    const pacs = await DisplayPacs();

    const composedHTML = `
        <h1>Honest Abe</h1>
            <section>
                <h2>Politicians</h2>
                ${politicans}
            </section>
            <section>
                <h2>Corporations</h2>
                ${corporations}
            </section>
            <section>
                <h2>PACs</h2>
                ${pacs}
            </section>
    
    `;

    container.innerHTML = composedHTML;
}

render();