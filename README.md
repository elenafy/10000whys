<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

#This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Firebase:
   - Create a `.env` file in the root directory
   - Add your Firebase configuration:
     ```
     VITE_FIREBASE_API_KEY=your-api-key-here
     VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```
   - You can find these values in your Firebase Console > Project Settings > General
   - **Important:** Make sure your Firestore Security Rules allow public read access to documents where `approved: true`

3. Run the app:
   ```bash
   npm run dev
   ```

## Firebase Setup

This application uses Firebase Firestore for data storage. The frontend has **read-only access** to approved content only.

### Firestore Collections

The app expects the following collections:
- `questions` - Question data with `approved: true` field
- `activities` - Activity data with `approved: true` field
- `videos` - Video recommendations with `approved: true` field
- `categories` - Category definitions

### Security Rules

Your Firestore Security Rules should allow public read access to approved content (with the correct field names used by the backend):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Questions: status == 'ready'
    match /questions/{questionId} {
      allow read: if resource.data.status == 'ready';
      allow write: if false; // No public writes
    }
    
    // Activities: status == 'approved'
    match /activities/{activityId} {
      allow read: if resource.data.status == 'approved';
      allow write: if false; // No public writes
    }
    
    // Videos: is_approved == true
    match /videos/{videoId} {
      allow read: if resource.data.is_approved == true;
      allow write: if false; // No public writes
    }
    
    // Themes collection (previously "categories")
    match /themes/{themeId} {
      allow read: if true; // Themes are public
      allow write: if isAdmin(); // Only admins can write
    }
  }
}
```

#### Admin access model
- The public site uses the **Firebase JS SDK in the browser** for read-only access.
- The curator UI also uses the **Firebase JS SDK** (client-side) for admin operations with authenticated curator accounts.
- The **Firebase Admin SDK is only used inside Cloud Functions** for server-side tasks; it is **not** used in the admin UI.

### Data Structure

Each document should include:
- `approved: boolean` - Must be `true` for content to be visible
- `createdAt: timestamp` - For ordering (optional but recommended)
- All fields matching the TypeScript interfaces in `types.ts`
