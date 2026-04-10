export function getAssocId() {

    try {
        const match = window.location.href.match(/\/release\/album\/.*\/(\d+)/);
        if (match?.[1]) return match[1];

        const html = document.body?.innerHTML || "";
        const idMatch = html.match(/assoc_id.?(\d+)/);

        if (idMatch?.[1]) return idMatch[1];

        return null;

    } catch (err) {
        console.error("getAssocId error:", err);
        return null;
    }
}

export function getCurrentUsername() {

    try {
        const link = document.querySelector("a[href^='/~']");
        const href = link?.getAttribute("href");

        if (!href) return null;

        const username = href.replace("/~", "").trim();

        return username || null;

    } catch (err) {
        console.error("getCurrentUsername error:", err);
        return null;
    }
}