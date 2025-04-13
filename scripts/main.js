import { DisplayCorporations } from "./corporations.js";
import { DisplayPoliticians } from "./politicians.js";

const container = document.querySelector("#container");

const render = async () => {

    const politicans = await DisplayPoliticians();
    const corporations = await DisplayCorporations();

    const composedHTML = `
        <h1>Honest Abe</h1>
        ${politicans}
        ${corporations}
    `

    container.innerHTML = composedHTML;
}

render();