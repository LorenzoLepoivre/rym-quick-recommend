console.log("RYM extension active");

// éviter duplication
if (!document.getElementById("rym-reco-btn")) {

    const btn = document.createElement("div"); // RYM utilise <div> et non <button>
    btn.id = "rym-reco-btn";
    btn.className = "track_rating_btn"; // style RYM
    btn.innerText = "Recommander";

    const container = document.querySelector("#my_catalog .release_my_catalog");
    if (container) {
        console.log(container);
        container.appendChild(btn);
    }

    function sendRecommendation(username, assocId, message) {
        const formData = new URLSearchParams();

        formData.append("rece", username);
        formData.append("item_type", "l");
        formData.append("assoc_id", assocId);
        formData.append("reason", message);

        fetch("https://rateyourmusic.com/recommend/rec_2", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        })
            .then(res => {
                if (res.ok) {
                    alert("✅ Recommandation envoyée !");
                } else {
                    alert("❌ Erreur");
                }
            })
            .catch(err => {
                console.error(err);
                alert("❌ Erreur réseau");
            });
    }

    function getAssocId() {
        const match = window.location.href.match(/\/release\/album\/.*\/(\d+)/);
        if (match) return match[1];

        // fallback bourrin (cherche dans le HTML)
        const html = document.body.innerHTML;
        const idMatch = html.match(/assoc_id.?(\d+)/);
        if (idMatch) return idMatch[1];

        return null;
    }

    btn.onclick = () => {
        const username = prompt("À qui recommander ?");
        if (!username) return;

        const message = prompt("Message ?");
        if (!message) message = "";

        const assocId = getAssocId();
        if (!assocId) {
            alert("❌ Impossible de trouver l'ID de l'album");
            return;
        }

        sendRecommendation(username, assocId, message);
    };
}