# 💧 Smart Irrigation System 🌱

An AI-powered smart irrigation platform that predicts whether irrigation is needed based on crop data and weather conditions. It provides dynamic water requirement calculations, disease detection, and personalized recommendations using integrated machine learning models and real-time environmental APIs.

---

## 🚀 Features

- 🔐 User registration & login (MERN Auth)
- 📍 Auto-farm location detection via OpenStreetMap
- 🌿 Inputs: Crop Type, Crop Days, and Location
- 🧠 Logistic Regression model predicts if irrigation is required
- 💡 If irrigation is **not needed**:
  - Gives reason, influencing factors, and crop care tips
- 💧 If irrigation **is needed**:
  - Redirects to water-flow page
  - Predicts water amount via Random Forest model
  - Displays D3.js gauge chart
  - Gemini AI explains prediction and gives irrigation timing
- 🦠 Plant disease detection via CNN model
  - Adjusts irrigation based on disease
  - Provides Gemini AI-powered crop suggestions

---

## 📸 Screenshots

### 🌾 Crop Data Input Page


### 🧠 Prediction: No Irrigation Needed


### 💧 Prediction: Irrigation Needed

### 🦠 Disease Detection Output


---

## ⚙️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Machine Learning (Flask):**
  - Logistic Regression for irrigation need
  - Random Forest for water amount prediction
  - CNN for disease detection
- **APIs:**
  - OpenStreetMap API
  - Open-Meteo API
  - Weatherbit API
- **Visualization:** D3.js (Gauge Chart)
- **AI Insights:** Google Gemini API

---

## 🛠️ Installation & Setup

### 🔧 Frontend
```bash
cd frontend
npm install
npm start
```

### 🛠️ Backend
```bash
cd backend
npm install
npm run server
```

### 🧠 Flask AI Server
```bash
cd flask
pip install -r requirements.txt
python app.py
```

---

## 👥 Contributors

- **Aishwarya Sreejith**  
- **Claven Coutinho**   
- **Saparya Dey**

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

We welcome contributions!  
Feel free to fork the repository and submit pull requests to improve functionality or fix bugs.

---

## 📫 Contact

Have questions or feedback?  
📧 saparyadey2019@gmail.com  
---
