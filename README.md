# 🕵️‍♂️ Mystry Message

> A full-stack Next.js web application that allows users to receive anonymous messages. Built with modern technologies, featuring user authentication, message submission, and AI-generated question suggestions.

![Next.js](https://img.shields.io/badge/Next.js-13/14-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-gray)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb)
![Vercel](https://img.shields.io/badge/Vercel-black?logo=vercel)

---

🔗 **Live Demo:** [View Project on Vercel](https://mystry-message-tan.vercel.app/)

---

## 📽️ About the Project

**Mystry Message** is a platform inspired by anonymous messaging apps, where users can:
- Register and verify their email.
- Receive anonymous messages from anyone.
- Explore AI-generated fun question suggestions to ask.
- Manage messages via a secure dashboard.

This project is part of a Next.js full-stack course by **Hitesh Choudhary** on his [Chai aur Code YouTube channel](https://www.youtube.com/@chaiaurcode).

---

## 🛠️ Tech Stack

| Frontend       | Backend            | Database       | Auth & Email     | Validation & Forms  | Deployment |
|----------------|--------------------|----------------|------------------|----------------------|------------|
| Next.js (App Router) | API Routes + Mongoose | MongoDB Atlas | **Auth.js (next-auth successor)** <br> Resend (for emails) | Zod + React Hook Form + Shadcn UI | Vercel     |
| React + TypeScript | Groq AI API (AI Suggestions) | Mongoose ODM | JWT + Email Verification | TailwindCSS + Shadcn UI | Vercel |

---

## ✨ Features

- ✅ Anonymous message system
- ✅ User registration & email verification
- ✅ AI-generated questions using Groq AI
- ✅ Responsive UI with TailwindCSS + Shadcn UI
- ✅ Form handling with React Hook Form + Zod
- ✅ Secure authentication via **Auth.js**
- ✅ Email services via **Resend**
- ✅ MongoDB with Mongoose
- ✅ Hosted on **Vercel**

---

## 🔐 Authentication & Email

- Authentication is handled using **Auth.js** with JWT sessions.
- **Resend** is used for sending verification emails.
- New users must verify their email before receiving messages.

---

## 🧠 AI Integration

- Integrated with Groq AI to provide random, fun, or thought-provoking question suggestions for users to ask.
- Enhances engagement and helps break the ice in anonymous interactions.

---

# 🙌 Acknowledgements

- 📚 This project was built by following the amazing Next.js course
 by Hitesh Choudhary @hiteshchoudhary on his Chai aur Code YouTube channel. @chaiaurcode

- ✨ UI powered by Shadcn UI

- 💌 Email powered by Resend

- 🤖 AI Suggestions via OpenAI
