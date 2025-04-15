# 🌊 Code Blue – Seeing the Unseen: Protecting Oceans from Afar

## 📌 Problem Statement

Oceans cover over 70% of our planet, playing a vital role in regulating climate, sustaining biodiversity, and supporting billions of lives. Yet, their vastness makes them one of the least observed and most exploited ecosystems on Earth.

From illegal fishing and coral reef destruction to plastic pollution and unregulated marine traffic, our oceans are under constant threat—especially in areas far from shore, where monitoring is costly or nearly impossible.

**So how do we protect what we can’t always see?**

---

## 🎯 Our Solution

**Code Blue** is a data-driven digital platform that detects and predicts threats to marine ecosystems using AI-powered modeling and publicly available data—without relying on physical sensors or IoT devices.

We address **three major marine threats**:
1. 🛢 Oil Spills  
2. 🐟 Illegal Fishing  
3. 🚢 Oceanic Trafficking  

---

## 🧩 How It Works

### 1. 🛢 Oil Spill Detection
- Upload satellite images
- A computer vision model detects the presence of oil spills
- Output: `Oil Spill Detected` or `Clean Ocean`

### 2. 🐟 Illegal Fishing Detection
- User inputs vessel attributes:
  - MMSI, Timestamp (UTC), Speed (knots), Latitude, Longitude, Distance from shore/port, Course
- FastAPI backend sends this data to a trained model
- Output: Suspicion level or threat status

### 3. 🚢 Vessel Intelligence (Oceanic Trafficking)
- Inputs:
  - Vessel ID, Initial Risk Score, Last/Next Port, Cargo Type, Latitude, Longitude, Flag State
- Predicts vessel involvement in trafficking
- Output: `ALERT`, `You are in the current zone`, or `Improper Credentials`

---

## 🏗 Backend Architecture

Built with **FastAPI**, the backend serves as a prediction engine for the frontend.

### 📁 `repository.py`
- Loads vessel data from `alert.xlsx` and `safe.xlsx`
- Filters unnecessary columns (like model predictions)
- Performs matching logic with incoming data

### 📁 `service.py`
- Business logic layer for deciding risk status
- Interprets repository results into user-friendly messages

### 📁 `models.py`
- Pydantic schemas to validate and serialize/deserialize data

### 📁 `main.py`
- Defines RESTful API endpoints
- Connects frontend with backend logic

---

## 🎨 Frontend

Built using **React + Vite** with dynamic visuals and motion, the UI:
- Accepts user inputs (vessel & image data)
- Displays model predictions and threat levels
- Uses interactive maps for visualization (via `react-leaflet` and `leaflet`)

---

## ⚙️ Technologies Used

| Layer         | Tools/Frameworks |
|-------------- |------------------|
| Frontend      | React, Vite, Leaflet, GSAP, Framer Motion |
| Backend       | FastAPI, Uvicorn |
| Machine Learning | PyTorch, Keras, Hugging Face Transformers |
| Data Handling | Pandas, Pydantic |
| Database      | PostgreSQL       |

---

## 📦 Dependencies

### Frontend (`package.json`)
```json
{
  "@studio-freight/lenis": "^1.0.42",
  "axios": "^1.8.4",
  "framer-motion": "^12.6.5",
  "gl-matrix": "^3.4.3",
  "gsap": "^3.12.7",
  "leaflet": "^1.9.4",
  "lenis": "^1.2.3",
  "lucide-react": "^0.488.0",
  "motion": "^12.6.5",
  "ogl": "^1.0.11",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-icons": "^5.5.0",
  "react-leaflet": "^5.0.0",
  "react-router-dom": "^7.5.0",
  "split-type": "^0.3.4"
}

🛠 How to Run the Project
✅ Prerequisites
Node.js (v18+)

Python (3.8+)

PostgreSQL (optional but recommended)

pip (Python package manager)

🖥️ Step 1: Clone the Repository
bash
Copy
Edit
git clone <your-repo-url>
cd your-project-directory
🧠 Step 2: Run the Backend (FastAPI)
bash
Copy
Edit
cd backend/

# Create virtual environment (optional)
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
uvicorn main:app --reload
Backend URL: http://localhost:8000

💻 Step 3: Run the Frontend (React + Vite)
bash
Copy
Edit
cd frontend/

# Install dependencies
npm install

# Start development server
npm run dev
Frontend URL: http://localhost:5173