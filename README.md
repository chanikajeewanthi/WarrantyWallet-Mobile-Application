WarrantyWallet – Mobile Application

WarrantyWallet is a mobile application built using Expo (React Native) that helps users store, manage, and track product warranties in one place.
Users can add warranty details, attach a product image using the device camera, view expiry dates, edit warranties, and delete them when no longer needed.

This app focuses on simplicity, offline-friendly local image storage, and a clean user experience.

🚀Features

 User Authentication (Firebase Authentication)

 Add new warranties

 Edit existing warranties

 Delete warranties with confirmation

 Capture product images using the device camera

 Store images locally on the device (no Firebase Storage required)

 Track warranty expiry dates

 View detailed warranty information

 Smooth navigation using Expo Router

🛠️ Technologies Used

Expo

React Native

Expo Router

Firebase Authentication

Firebase Firestore

Expo Camera

Expo Image Picker

Expo File System

TypeScript

📂 Project Structure (Simplified)
app/
 └── dashboard/
     └── warranties/
         ├── index.tsx        # Warranty list
         ├── form.tsx          # Add warranty details form
         ├── [id].tsx         # Warranty details
         └── edit/
             └── [id].tsx     # Edit warranty

services/
 └── warrantyService.ts
 └── firebase.ts

types/
 └── warranty.ts

context/
 └── AuthContext.tsx

⚙️ Setup Instructions

Install Dependencies
 npm install

Install Expo CLI (if not installed)
 npm install -g expo-cli

Firebase Configuration

 Create a Firebase project and enable

 Firebase Authentication (Email/Password)

 Cloud Firestore

Add my Firebase configuration inside my project (example: services/firebase.ts).

⚠️ Firebase Storage is NOT used in this project.

Run the Application
npx expo start & npm start

Then:
Scan the QR code using Expo Go (Android)

Or run on an emulator

📷 Camera & Permissions

The app uses the device camera to capture warranty images.

Required permissions:

Camera access

Permissions are handled automatically using Expo Camera and Expo Image Picker.

🧪 How to Use

Login or register

Navigate to Warranties

Tap Add Warranty

Enter warranty details

Capture a product image (optional)

Save the warranty

View, edit, or delete warranties anytime

Track warranty expiry status
