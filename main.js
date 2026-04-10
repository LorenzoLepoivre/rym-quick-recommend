console.log("RYM extension active");

(function init() {
    if (!document.getElementById("rym-reco-btn")) {

        const container = document.querySelector("#my_catalog .release_my_catalog");
        if (!container) return;

        const btn = createButton(async () => {
            const currentUser = getCurrentUsername();

            if (!currentUser) {
                alert("Error went getting current username. Are you sure you're logged in?");
                return;
            }

            const friends = await fetchFriends(currentUser);

            if (!friends.length) {
                alert("No friends found to recommend to.");
                return;
            }

            createFriendSelector(friends, async (selected, message) => {
                const assocId = getAssocId();
                if (!assocId) {
                    alert("Error went getting album ID. Are you sure you're on an album page?");
                    return;
                }

                var successCount = 0;
                var errorCount = 0;

                for (const user of selected) {
                    const result = await sendRecommendation(user, assocId, message);
                    if (result.success) {
                        successCount++;
                    } else {
                        errorCount++;
                    }
                }

                if (errorCount === 0) {
                    alert(`✅ All recommendations sent successfully to ${successCount} friend(s)!`);
                } else {
                    alert(`✅ Recommendations sent: ${successCount}, skipped because they were already recommended: ${errorCount}`);
                }
            });

        });

        container.appendChild(btn);
    }

})();