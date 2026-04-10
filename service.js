export function sendRecommendation(username, assocId, message) {

    const formData = new URLSearchParams();

    formData.append("rece", username);
    formData.append("item_type", "l");
    formData.append("assoc_id", assocId);
    formData.append("reason", message);

    return fetch("https://rateyourmusic.com/recommend/rec_2", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
    });
}

export async function fetchFriends(username) {

    if (!username) return [];

    try {
        const res = await fetch(
            `https://rateyourmusic.com/friends/${username}/`,
            {
                credentials: "include"
            }
        );

        if (!res.ok) {
            console.error("Failed to fetch friends page");
            return [];
        }

        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, "text/html");

        const users = Array.from(doc.querySelectorAll("a.user"));

        const usernames = users
            .map(u => u.getAttribute("href"))
            .filter(Boolean)
            .map(href => href.replace("/~", ""))
            .filter(Boolean);

        // 🧼 remove duplicates
        return [...new Set(usernames)];

    } catch (err) {
        console.error("fetchFriends error:", err);
        return [];
    }
}