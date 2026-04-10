# RYM Quick Recommend

A Chrome extension that lets you recommend a release directly from a RateYourMusic release page.

---

## 📚 Table of Contents

- [Problem](#problem)
- [Solution](#solution)
- [Features](#features)
- [How It Works](#how-it-works)
- [Permissions](#permissions)
- [Installation](#installation)
- [Patch Notes](#patch-notes)
- [License](#license)

---

## ❗ Problem

On RateYourMusic, recommending a release to another user requires multiple steps and navigating through forms.

This process is:
- Slow
- Repetitive
- Not user-friendly for quick sharing

---

## 💡 Solution

RYM Quick Recommend simplifies the workflow by adding a **"Recommend" button** directly on release pages.

With one click, you can:
- Select a username (or multiple friends or not)
- Write a message
- Send recommendations instantly

---

## 🚀 Features

- Injects a native-style button into release pages
- Automatically retrieves the release ID (`assoc_id`)
- Sends recommendations via POST request
- Allows selecting friends directly from your friend list
- Works across all RYM release pages
- No data storage or tracking

---

## ⚙️ How It Works

1. The extension runs on:
https://rateyourmusic.com/release/


2. It injects a "Recommend" button into the page UI

3. When clicked:
- You can select one or multiple friends (or users)
- Write a message
- The extension extracts the release ID (`assoc_id`)

4. A request is sent to:
https://rateyourmusic.com/recommend/rec_2


5. The recommendation is sent using your active session

---

## 🔐 Permissions

### `activeTab`
Used to:
- Access the current release page
- Inject the recommendation button
- Read necessary data from the page

### Host permission: `https://rateyourmusic.com/release/*`
Used to:
- Extract release information (`assoc_id`)
- Interact with RateYourMusic’s recommendation system

> No data is collected, stored, or shared externally.

---

## 📦 Installation

1. Download or clone this repository
2. Go to `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the extension folder

---

## 📝 Patch Notes

### V1.0
- Initial release
- Inject "Recommend" button into release pages
- Prompt-based user input (username + message)
- Automatic release ID (`assoc_id`) detection
- Send recommendation via POST request

### V2.0
- Added friend list selection UI
- Added user search & selection UI
- Added multi-user recommendation support
- Improved UX flow
- Expanded support to all release pages (`/release/*`)

---

## 📌 Notes

This extension is not affiliated with RateYourMusic.  
It simply enhances usability for personal convenience.

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.