export function createButton(onClick) {
    const btn = document.createElement("div");
    btn.id = "rym-reco-btn";
    btn.className = "track_rating_btn";
    btn.innerText = "Recommander";

    btn.onclick = onClick;

    return btn;
}

export function createFriendSelector(friends, onSubmit, onCancel) {

    // ❌ évite doublons UI
    const existing = document.getElementById("rym-friend-selector");
    if (existing) existing.remove();

    const wrapper = document.createElement("div");
    wrapper.id = "rym-friend-selector";

    wrapper.innerHTML = `
        <div class="rym-box">
            <h3>Recommend to:</h3>

            <div class="rym-list"></div>

            <textarea 
                placeholder="Message..." 
                class="rym-message"
            ></textarea>

            <div class="rym-actions">
                <button class="rym-send">Send</button>
                <button class="rym-cancel">Cancel</button>
            </div>
        </div>
    `;

    const list = wrapper.querySelector(".rym-list");

    // 🔥 safer + compatible
    Array.from(friends).forEach(friend => {
        const item = document.createElement("label");
        item.className = "rym-item";

        item.innerHTML = `
            <input type="checkbox" value="${friend}">
            <span>${friend}</span>
        `;

        list.appendChild(item);
    });

    // 🚀 SEND
    wrapper.querySelector(".rym-send").onclick = () => {

        const selected = Array.from(
            wrapper.querySelectorAll("input:checked")
        ).map(i => i.value);

        const message = wrapper.querySelector(".rym-message").value.trim();

        if (!selected.length) {
            alert("Select at least one friend");
            return;
        }

        if (!message) {
            alert("Enter a message");
            return;
        }

        onSubmit(selected, message);

        wrapper.remove();
    };

    // ❌ CANCEL
    wrapper.querySelector(".rym-cancel").onclick = () => {
        wrapper.remove();
        if (onCancel) onCancel();
    };

    // 🧼 safety: avoid multiple mounts
    document.body.appendChild(wrapper);
}