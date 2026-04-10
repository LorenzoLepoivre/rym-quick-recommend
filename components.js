function createButton(onClick) {
    const btn = document.createElement("div");
    btn.id = "rym-reco-btn";
    btn.className = "track_rating_btn";
    btn.innerText = "Recommend";
    btn.onclick = onClick;

    return btn;
}

function createFriendSelector(friends, onSubmit, onCancel) {
    const existing = document.getElementById("rym-friend-selector");
    if (existing) existing.remove();

    const wrapper = document.createElement("div");
    wrapper.id = "rym-friend-selector";

    wrapper.innerHTML = `
        <div class="rym-box">
            <h3>Recommend to:</h3>

            <input type="text" class="rym-search" placeholder="Search friends or users..." />

            <div class="rym-selected"></div>
            <div class="rym-friends"></div>
            <div class="rym-users"></div>

            <textarea placeholder="Message..." class="rym-message"></textarea>

            <div class="rym-actions">
                <button class="rym-cancel">Cancel</button>
                <button class="rym-send">Send</button>
            </div>
        </div>
    `;

    const selectedBox = wrapper.querySelector(".rym-selected");
    const friendsBox = wrapper.querySelector(".rym-friends");
    const usersBox = wrapper.querySelector(".rym-users");
    const searchInput = wrapper.querySelector(".rym-search");

    const selectedSet = new Set();

    let currentFriends = friends;
    let currentUsers = [];

    // =========================
    // CHECKBOX ITEM
    // =========================
    function createItem(name) {
        const label = document.createElement("label");
        label.className = "rym-item";

        const input = document.createElement("input");
        input.type = "checkbox";
        input.value = name;
        input.checked = selectedSet.has(name);

        const span = document.createElement("span");
        span.textContent = name;

        input.addEventListener("change", () => {
            if (input.checked) selectedSet.add(name);
            else selectedSet.delete(name);

            render();
        });

        label.appendChild(input);
        label.appendChild(span);

        return label;
    }

    // =========================
    // SECTION RENDER
    // =========================
    function renderSection(container, title, items) {
        container.innerHTML = "";

        const t = document.createElement("div");
        t.textContent = `${title} (${items.length})`;
        t.style.fontWeight = "bold";
        t.style.marginTop = "10px";
        container.appendChild(t);

        items.forEach(name => {
            container.appendChild(createItem(name));
        });
    }

    // =========================
    // MAIN RENDER
    // =========================
    function render() {
        renderSection(
            selectedBox,
            "Selected",
            Array.from(selectedSet)
        );
        renderSection(friendsBox, "Friends", currentFriends);
        renderSection(usersBox, "Other users", currentUsers);
    }

    render();

    // =========================
    // SEARCH
    // =========================
    searchInput.addEventListener("input", debounce(async (e) => {
        const value = e.target.value.trim().toLowerCase();

        if (!value) {
            currentFriends = friends;
            currentUsers = [];
            render();
            return;
        }

        currentFriends = friends.filter(f =>
            f.toLowerCase().includes(value)
        );

        currentUsers = await searchUsers(value);

        render();
    }, 300));

    // =========================
    // SEND
    // =========================
    wrapper.querySelector(".rym-send").onclick = () => {
        const message = wrapper.querySelector(".rym-message").value.trim();
        const selected = Array.from(selectedSet);

        if (!selected.length) {
            alert("Select at least one user");
            return;
        }

        onSubmit(selected, message);
        wrapper.remove();
    };

    // =========================
    // CANCEL
    // =========================
    wrapper.querySelector(".rym-cancel").onclick = () => {
        wrapper.remove();
        if (onCancel) onCancel();
    };

    document.body.appendChild(wrapper);
}