<h1 align="center">🌱 Diab — Make a garden through your journey</h1>

<p align="center">
  <img width="430" alt="Diab app" src="https://github.com/user-attachments/assets/e84d2815-7088-485a-9a7b-a81ed88d41c9" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-54-000020?logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Zustand-state-443E38" alt="Zustand" />
</p>

**Gamified health-tracking mobile app for people with diabetes** — healthy habits grow a personal garden.
Built at the **PEXILIS Hackathon** (Open Mind Club, February 2026).

## 🧩 The Problem

Living with diabetes means tracking glucose, diet, water, exercise, sleep and many medical appointments every day. The main obstacle is **motivation**: without a central place to follow their progress, patients lose track, reset to zero and fall into a negative feedback loop.

## 💡 The Solution

Diab turns daily care into a game. Every good outcome — balanced glucose, staying hydrated, walking, visiting a specialist on time — earns **seeds** to plant and upgrade plants in your personal garden. The healthier you are, the more your garden grows.

## ✨ Features

- 📊 **Daily dashboard** — bento cards for glucose, diet, water, activity, sleep and streaks
- ✅ **Daily tasks** that reset every day, fully offline
- 📝 **Records** — log capillary glucose (fasting and 2h after meals), sugar, water, minutes walked and sleep
- 🏆 **Achievements and personal goals**, rewarded with seeds
- 🌻 **Garden** — plant, upgrade and inspect plants from your inventory
- 👤 **Profile**, mock authentication (welcome, sign up, login) and local cache reset
- 💡 Health tips throughout the app

### Tracked metrics

| Daily | Periodic |
|-------|----------|
| Capillary glucose (fasting + 2h after each meal) | Venous glucose (every 3 months) |
| Foot care (twice a day) | HbA1c test (every 3 months) |
| Sugar eaten · Water drunk | General check-up (every 6 months) |
| Minutes walked | Ophthalmologist (yearly) |
| Sleep time and duration | Cardiologist (yearly) |

## 🎮 Gamification

Plants represent achievements across the four sides of diabetes care — **diet, exercise, glucose and medicine**. Some plants require streaks or compound achievements, encouraging a balanced life rather than a single metric.

| Plant | Achievement |
|-------|-------------|
| Aloe Vera | Keep a balanced glucose for a day |
| Weeping Bonsai | Stay hydrated for 8 days straight |
| Perfect Daisy | Have all your stats perfect |
| Olive Bonsai | Rebalance your glucose after a bad day |
| Lavender Field | Walk or run at least 30 minutes a day for a week |
| Garlic | Visit the cardiologist |
| Ice Plant | Complete 10 appointments on time |
| Carrion Flower | Keep a 1-year streak |

> Most metrics come from user input: there is no benefit in cheating, the garden only reflects your own commitment.

## 👤 User Persona

**Bouzidi Mounir**, 38, type 2 diabetes — wants to keep his nutrition in check and follow his monthly and yearly appointments, but lacks a single place to track everything and keeps losing motivation.

<p align="center">
  <img width="560" alt="User flow" src="https://github.com/user-attachments/assets/9928f856-1a58-4336-b01b-abca288e9edb" />
</p>

## 🛠️ Tech Stack

| | |
|--|--|
| Framework | Expo 54 (Expo Router, file-based navigation) · React Native 0.81 · React 19 |
| Language | TypeScript |
| State & storage | Zustand · AsyncStorage (offline-first) |
| UI | React Native StyleSheet · Expo Image · Reanimated · Expo Vector Icons · bottom-tab navigation |

## 📂 Project Structure

```
frontend/
├── app/            # Screens: (auth) welcome/login/signup, (tabs) home/records/progress/garden/profile
├── components/     # Tracker bento cards, record views, garden grid & docks, achievements
├── lib/            # Stores and logic: daily tasks, records, goals, achievements, garden
└── config/         # Types, colors and health tips
docs/               # Pitch deck and demo video
```

## 🚀 Getting Started

Requirements: Node.js 18+ and the **Expo Go** app on your phone.

```bash
git clone https://github.com/adelmerad/diab-garden.git
cd diab-garden/frontend
npm install
npx expo start
```

Scan the QR code with Expo Go to run the app.

## 🎬 Demo & Pitch

- [Demo video](docs/demo.mp4)
- [Pitch deck](docs/pitch-deck.pdf)

## 👥 Team

Built as a team at the PEXILIS Hackathon.

- **Adel Merad** — [GitHub](https://github.com/adelmerad)
