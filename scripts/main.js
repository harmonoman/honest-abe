import { DisplayPoliticians } from "./politicians.js";

const container = document.querySelector("#container");

const render = async () => {

    const politicans = await DisplayPoliticians();

    const composedHTML = `
        <h1>Honest Abe</h1>
        ${politicans}

    `

    container.innerHTML = composedHTML;
}

render();