# EleGuard Defending System Monitor v4.0

An advanced, real-time IoT defense dashboard with automated threat detection and mitigation.

## 🚀 Deployment Instructions

### 1. Firebase Project Setup
1. Create a new project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password).
3. Create a **Realtime Database** and set the location.
4. Go to Project Settings and copy your **Web App Config**.

### 2. Configure the Dashboard
1. Open `index.html`.
2. Locate the `firebaseConfig` constant in the `<script>` tag.
3. Replace the placeholder values with your actual Firebase config keys.

### 3. Deploy Security Rules
1. Install Firebase Tools: `npm install -g firebase-tools`.
2. Login: `firebase login`.
3. Initialize: `firebase init database`.
4. Use the provided `firebase-database-rules.json` file.
5. Deploy: `firebase deploy --only database`.

### 4. Deploy Cloud Functions
1. Initialize Functions: `firebase init functions`.
2. Choose `JavaScript`.
3. Copy the content of `cloud-functions/index.js` into your local `functions/index.js`.
4. Deploy: `firebase deploy --only functions`.

### 5. Deploy Hosting
1. Initialize Hosting: `firebase init hosting`.
2. Set the public directory to the folder containing `index.html`.
3. Deploy: `firebase deploy --only hosting`.

---

## 🛠️ System Logic Reference

### Automated Trigger Rules
- **LOW Severity**: Triggers defense after 10 alerts in the same zone.
- **MEDIUM/HIGH Severity**: Triggers defense after 5 alerts in the same zone.

### Card Indicators
- 🔴 **Red Glow**: Both Buzzer and Impulse Wave are ACTIVE.
- 🟠 **Orange Border**: Only Buzzer is ACTIVE.
- 🟡 **Yellow Border**: Only Impulse Wave is ACTIVE.
- 🌑 **Dark Grey**: All systems standby/inactive.

### Real-time Features
- **Live Duration**: Counts up from the moment a device is activated.
- **Activity Log**: Displays the last 20 automated or manual defense actions.
- **Global Search**: Filter sensors by ID (S1-S14) or Zone Name.

---

## ⚠️ Security Notice
Ensure that you create an **Admin User** in the `users` node of your database to manage configuration changes:
```json
{
  "users": {
    "YOUR_USER_UID": {
      "role": "ADMIN"
    }
  }
}
```
