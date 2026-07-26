// Injected by the Galaxy webhook framework. Runs in the global page scope
// wrapped in an IIFE, so it must be self-contained vanilla JS -- Backbone,
// underscore and jQuery are no longer available as globals in the Galaxy client.
const container = document.getElementById("citation_needed");

if (container) {
    const GALAXY_CITATION = {
        title: "Galaxy for accessible, reproducible, and collaborative data analyses: 2026 update",
        meta: "Nucleic Acids Research, 54(W1):W105–W116 (2026)",
        doi: "10.1093/nar/gkag469",
    };

    const EU_ACKNOWLEDGEMENT =
        "The Galaxy server used for some calculations is partly funded by the German Federal Ministry " +
        "of Education and Research BMBF grant 031 A538A de.NBI-RBC and the Ministry of Science, " +
        "Research and the Arts Baden-Württemberg (MWK) within the framework of LIBIS/de.NBI Freiburg.";

    const PLAIN_CITATION = `${GALAXY_CITATION.title}. ${GALAXY_CITATION.meta}. doi:${GALAXY_CITATION.doi}`;

    const BIBTEX =
        "@article{galaxy2026,\n" +
        "  title   = {Galaxy for accessible, reproducible, and collaborative data analyses: 2026 update},\n" +
        "  author  = {{The Galaxy Community}},\n" +
        "  journal = {Nucleic Acids Research},\n" +
        "  volume  = {54},\n" +
        "  number  = {W1},\n" +
        "  pages   = {W105--W116},\n" +
        "  year    = {2026},\n" +
        "  doi     = {10.1093/nar/gkag469}\n" +
        "}";

    const el = (tag, props, children) => {
        const node = Object.assign(document.createElement(tag), props || {});
        (children || []).forEach((child) => node.append(child));
        return node;
    };

    // Copy-to-clipboard with transient "Copied" feedback.
    const makeCopyButton = (label, getText) => {
        const button = el("button", { type: "button", className: "cit-need-btn", textContent: label });
        button.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(getText());
                const previous = button.textContent;
                button.textContent = "Copied";
                button.classList.add("cit-need-copied");
                setTimeout(() => {
                    button.textContent = previous;
                    button.classList.remove("cit-need-copied");
                }, 1500);
            } catch (e) {
                console.error("[citation_needed webhook] clipboard write failed", e);
            }
        });
        return button;
    };

    const header = el("div", { id: "cit_need-header" }, [
        el("div", { id: "cit_need-title", textContent: "Citing Galaxy" }),
        makeCopyButton("Copy citation", () => PLAIN_CITATION),
    ]);

    const galaxyBlock = el("div", { className: "cit-need-block" }, [
        el("div", { className: "cit-need-ref-title", textContent: GALAXY_CITATION.title }),
        el("div", { className: "cit-need-ref-meta", textContent: GALAXY_CITATION.meta }),
        el("a", {
            className: "cit-need-doi",
            href: `https://doi.org/${GALAXY_CITATION.doi}`,
            target: "_blank",
            rel: "noopener noreferrer",
            textContent: `doi:${GALAXY_CITATION.doi}`,
        }),
    ]);

    const euBlock = el("div", { className: "cit-need-block" }, [
        el("div", { className: "cit-need-ref-meta", textContent: EU_ACKNOWLEDGEMENT }),
    ]);

    const body = el("div", { id: "cit_need-body" }, [
        el("p", {}, [
            document.createTextNode("If Galaxy helped with the analysis of your data, please "),
            el("b", { textContent: "cite" }),
            document.createTextNode(":"),
        ]),
        galaxyBlock,
        el("div", { className: "cit-need-divider", textContent: "Acknowledge the European Galaxy server" }),
        euBlock,
        el("div", { className: "cit-need-footer" }, [makeCopyButton("Copy BibTeX", () => BIBTEX)]),
    ]);

    container.replaceChildren(header, body);
}
