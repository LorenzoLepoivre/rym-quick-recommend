# RYM Quick Recommend

A Chrome extension that lets you recommend an album directly from a RateYourMusic album page.

---

## 📚 Table of Contents

- [Problem](#problem)
- [Solution](#solution)
- [Features](#features)
- [How It Works](#how-it-works)
- [Permissions](#permissions)
- [Installation](#installation)
- [Usage](#usage)
- [Patch Notes](#patch-notes)

---

## ❗ Problem

On RateYourMusic, recommending an album to another user requires multiple steps and navigating through forms.

This makes the process:
- Slow
- Repetitive
- Not user-friendly for quick sharing

---

## 💡 Solution

RYM Quick Recommend simplifies the workflow by adding a **"Recommend" button** directly on album pages.

With one click, you can:
- Enter a username
- Write a message
- Send the recommendation instantly

---

## 🚀 Features

- Injects a native-style button into album pages
- Automatically retrieves the album ID (`assoc_id`)
- Sends recommendations via POST request
- Works directly within RateYourMusic
- No data storage or tracking

---

## ⚙️ How It Works

1. The extension runs on:
https://rateyourmusic.com


2. It injects a "Recommend" button into the page UI

3. When clicked:
- Prompts the user for:
  - Target username
  - Message
- Extracts the album ID (`assoc_id`)
- Sends a request to:
  ```
  https://rateyourmusic.com/recommend/rec_2
  ```

4. The recommendation is sent using your active session

---

## 🔐 Permissions

### `activeTab`
Used to:
- Access the current album page
- Inject the recommendation button
- Read necessary data from the page

### Host: `https://rateyourmusic.com/release/album/*`
Used to:
- Extract album information (`assoc_id`)
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

## 🧪 Usage

1. Go to any album page on RateYourMusic
2. Click the **"Recommend"** button
3. Enter:
- Username
- Message
4. Confirm → Recommendation sent ✅

---

## 📝 Patch Notes

### V1.0

#### ✨ Features
- Initial release
- Inject "Recommend" button into album pages
- Prompt-based user input (username + message)
- Automatic album ID (`assoc_id`) detection
- Send recommendation via POST request

---

## 📌 Notes

This extension is not affiliated with RateYourMusic.  
It simply enhances usability for personal convenience.