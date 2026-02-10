📱 WarrantyWallet – Mobile Application
A Digital Warranty Management System

📌 1. Introduction

WarrantyWallet is a mobile application developed using Expo (React Native) to provide a digital solution for managing product warranties.
In traditional practices, physical warranty cards are often misplaced, damaged, or forgotten. WarrantyWallet addresses this problem by allowing users to securely store warranty details and track expiry dates using a mobile-friendly interface.

The application enables users to add, view, update, and delete warranty records, along with capturing product images using the device camera. The system is designed to be simple, cost-effective, and offline-friendly, as images are stored locally without using Firebase Storage.

🎯 2. Objectives

The primary objectives of this project are:

✅ To digitize product warranty management

✅ To provide a user-friendly mobile experience

✅ To reduce dependency on physical warranty documents

✅ To track warranty expiry dates effectively

✅ To demonstrate mobile application development skills using modern frameworks

🚀 3. Core Features

🔐 User Authentication

Secure login and registration using Firebase Authentication

🧾 Warranty Management

Add new warranty details

Edit existing warranties

Delete warranties with confirmation prompts

📷 Camera Integration

Capture product images using the device camera

Store images locally on the device (no cloud storage)

⏰ Expiry Tracking

Display warranty expiry dates

Visual status indicators (Active / Expiring Soon / Expired)

🧭 Navigation

Smooth and structured navigation using Expo Router

🛠️ 4. Technologies Used

Technology			Purpose
⚛️ Expo			Mobile app framework
📱 React Native		UI development
🧭 Expo Router		File-based navigation
🔐 Firebase Authentication	User authentication
☁️ Firebase Firestore		Warranty data storage
📷 Expo Camera		Capture product images
🖼️ Expo Image Picker	Image selection
📂 Expo File System		Local image storage
🧪 TypeScript			Type safety

🧱 5. System Architecture

Frontend: React Native (Expo)

Backend Services: Firebase Authentication & Firestore

Storage: Local device storage (images)

Routing: File-based routing using Expo Router

📂 6. Project Structure

app/
 └── dashboard/
     └── warranties/
         ├── index.tsx        # Warranty list screen
         ├── form.tsx         # Add warranty form
         ├── [id].tsx         # Warranty details screen
         └── edit/
             └── [id].tsx     # Edit warranty screen

services/
 ├── warrantyService.ts      # Firestore CRUD logic
 └── firebase.ts             # Firebase configuration

types/
 └── warranty.ts             # Warranty type definition

context/
 └── AuthContext.tsx         # Authentication context

⚙️ 7. Setup and Installation

📥 Step 1: Install Dependencies
npm install

🧰 Step 2: Install Expo CLI (If Required)
npm install -g expo-cli

🔥 Step 3: Firebase Configuration

Create a Firebase project and enable:

🔐 Firebase Authentication (Email & Password)

☁️ Cloud Firestore

Add your Firebase configuration inside:

services/firebase.ts

▶️ Step 4: Run the Application
npx expo start


or

npm start


📲 Run options:

Scan QR code using Expo Go

Android Emulator

📷 8. Permissions Handling

The application requests the following permission:

📸 Camera access

Permissions are handled automatically using Expo Camera and Expo Image Picker.

🧪 9. User Guide

🔑 Register or log in

🏠 Navigate to Dashboard

➕ Add a new warranty

📝 Enter warranty details

📷 Capture a product image (optional)

💾 Save the warranty

👁️ View, ✏️ edit, or 🗑️ delete warranties

⏳ Monitor expiry status

🔗 10. Build Link

Built in firebase:

application-fb12d903-dbc8-450e-aa41-e1fa51af76ff.aab


