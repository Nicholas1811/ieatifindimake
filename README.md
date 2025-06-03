## App Overview
ieatifindimake is a mobile application that helps users discover, review, and recreate home-cooked meals with ease. Designed to promote home cooking, especially during times like the COVID-19 lockdown, the app allows users to browse curated recipes, watch instructional videos, and even locate nearby stores for ingredients.

## Application Screens
![alt text](https://nicholassohdelin-bucket-smu.s3.ap-southeast-1.amazonaws.com/ieatifindimake1)
![alt text](https://nicholassohdelin-bucket-smu.s3.ap-southeast-1.amazonaws.com/ieatifindimake2)


## 🚀 Features
- 🔍 **Browse Recipes**: Explore a wide range of dishes across different cuisines like Chinese, Malay, Indian cuisine.
- 🎥 **Video Instructions**: Watch YouTube tutorials directly in-app.
- 🗣️ **Speech-to-Text Reviews**: By speaking, the application will read whatever said, and transform it to text.
- 📝 **Write & Read Reviews**: Evaluate recipes or learn from other users' experiences.
- 📍 **Ingredient Locator**: Get directions to nearby stores to buy what you need through Google Maps API.
- ❤️ **Favourites Page**: Save your go-to or must-try recipes for easy access.
- 🔐 **Authentication System**:
    - Email/password authentication (Firebase Auth)
    - Google Sign-In support
    - Reauthentication for secure actions
- 🔎 **Smart Search**: Search recipes by name, ingredient, or cuisine.

## 🛠️ Tech Stack

| Component         | Technology                             |
| ----------------- | -------------------------------------- |
| Frontend          | Ionic Angular Framework                |
| Backend           | Firebase Cloud Functions               |
| Database          | Firebase Firestore                     |
| Authentication    | Firebase Authentication + Google Login |
| Video Integration | Youtube API                            |
| Location Services | Geolocation via Google Maps API        |
| Voice Input       | Web Speech API by Ionic Native         |

## 🏗️ Architecture Overview
The app uses a **hybrid mobile frontend** built with **Ionic + Angular**, which interacts directly with Firebase services:
- **Firestore** stores recipe metadata, user reviews, and favourites.
- **Firebase Authentication** handles login and session management.
- **YouTube Data API** provides recipe video content.
- **Geolocation APIs** suggest ingredient store locations.
- **Speech-to-text** allows hands-free review input on supported devices.
The app is fully serverless and scalable via Firebase’s cloud infrastructure.

## 🌱 Future Improvements
- ✨ Enhanced UI/UX with modern design patterns
- 🌐 Web deployment via Firebase Hosting for cross-platform access
- 🧠 Smart food recommendations based on user's cooking history
- 🔔 Push notifications for saved recipe updates or trending dishes
- 📦 Offline support for saved videos and ingredients

