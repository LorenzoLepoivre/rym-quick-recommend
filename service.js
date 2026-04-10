async function sendRecommendation(username, assocId, message) {
    const formData = new URLSearchParams();

    formData.append("rece", username);
    formData.append("item_type", "l");
    formData.append("assoc_id", assocId);
    formData.append("reason", message);

    const response = await fetch("https://rateyourmusic.com/recommend/rec_2", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
    });

    if (!response.ok) {
        return { success: false, error: `HTTP error! status: ${response.status}` };
    }

    return { success: true };
}

async function fetchFriends(username) {
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

        // remove duplicates
        return [...new Set(usernames)];

    } catch (err) {
        console.error("fetchFriends error:", err);
        return [];
    }
}

async function searchUsers(query) {
    if (!query || query.trim().length === 0) return [];

    const res = await fetch(
        `https://rateyourmusic.com/api/1/search/autocomplete?searchterm=${encodeURIComponent(query)}&searchtype=u`,
        {
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Accept-Language": "en-US,en;q=0.9",
                "X-Requested-With": "XMLHttpRequest"
            }
        }
    );

    const data = await res.json();

    return (data || []);
}