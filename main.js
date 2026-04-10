import { createButton, createFriendSelector } from "./components.js";
import { getAssocId, getCurrentUsername } from "./utils.js";
import { sendRecommendation, fetchFriends } from "./service.js";

console.log("RYM extension active");

if (!document.getElementById("rym-reco-btn")) {

    const container = document.querySelector("#my_catalog .release_my_catalog");
    console.log("Container ");
    console.log(container);
    if (!container) return;

    const btn = createButton(async () => {

        const currentUser = getCurrentUsername();

        if (!currentUser) {
            alert("❌ Impossible de récupérer ton username");
            return;
        }

        const friends = await fetchFriends(currentUser);

        if (!friends.length) {
            alert("❌ Aucun ami trouvé");
            return;
        }

        createFriendSelector(friends, async (selected, message) => {

            const assocId = getAssocId();

            if (!assocId) {
                alert("❌ Impossible de trouver l'ID");
                return;
            }

            for (const user of selected) {
                await sendRecommendation(user, assocId, message);
            }

            alert("✅ Recommandations envoyées !");
        });

    });

    container.appendChild(btn);
}