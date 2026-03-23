# Firebase Configuration

Firebase project configuration for MetodologIA CMS backend.

## Structure

- `firebase.json` — Project config (Firestore rules, indexes, emulator ports)
- `.firebaserc` — Project alias mapping
- `firestore.rules` — Security rules (version-controlled)
- `firestore.indexes.json` — Composite indexes

## Emulator Usage

```bash
# Start Auth + Firestore emulators
firebase emulators:start --only auth,firestore --config firebase/firebase.json

# Emulator UI: http://localhost:4000
# Firestore: localhost:8080
# Auth: localhost:9099
```

## Deploy

```bash
firebase deploy --only firestore:rules --config firebase/firebase.json
firebase deploy --only firestore:indexes --config firebase/firebase.json
```
