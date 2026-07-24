// Injected by the Galaxy webhook framework. Runs in the global page scope
// wrapped in an IIFE, so it must be self-contained vanilla JS -- Backbone,
// underscore and jQuery are no longer available as globals in the Galaxy client.
const root = typeof Galaxy !== "undefined" && Galaxy.root ? Galaxy.root : "/";
const container = document.getElementById("iframe");

if (container) {
    container.innerHTML = '<div id="webhook-iframe-parent"></div>';
    const parent = document.getElementById("webhook-iframe-parent");

    (async () => {
        const url = `${root}api/webhooks/iframe/data`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            const header = document.createElement("div");
            header.id = "iframe-header";
            const name = document.createElement("div");
            name.id = "iframe-name";
            name.textContent = data.title;
            header.appendChild(name);

            const frame = document.createElement("iframe");
            frame.id = "webhook-iframe";
            frame.src = data.src;
            frame.style.width = "100%";
            frame.style.height = `${data.height}px`;
            frame.style.border = "none";

            parent.replaceChildren(header, frame);
        } catch (e) {
            console.error(`[iframe webhook] request to "${url}" failed`, e);
        }
    })();
}
