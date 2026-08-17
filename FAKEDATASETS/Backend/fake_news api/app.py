import joblib
import sqlite3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from werkzeug.security import generate_password_hash, check_password_hash

# -----------------------
# APP SETUP
# -----------------------

app = FastAPI(title="TruthLens AI Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# LOAD MODEL
# -----------------------

model = joblib.load("fake_news_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# -----------------------
# DB HELPER
# -----------------------

def get_db():
    conn = sqlite3.connect("fake_news.db", check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

# -----------------------
# PYDANTIC SCHEMAS
# -----------------------

class UserRegister(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class NewsInput(BaseModel):
    text: str
    user_email: str = "guest"

# -----------------------
# ENDPOINTS
# -----------------------

@app.get("/")
def home():
    return {"status": "TruthLens AI API working successfully"}

@app.post("/register")
def register(user: UserRegister):
    conn = get_db()
    cursor = conn.cursor()

    try:
        hashed_pw = generate_password_hash(user.password)
        cursor.execute(
            "INSERT INTO users(email, password) VALUES (?, ?)",
            (user.email, hashed_pw),
        )
        conn.commit()
        return {"message": "Registration successful", "email": user.email}

    except sqlite3.IntegrityError:
        return {"error": "Email already exists"}

    finally:
        conn.close()

@app.post("/login")
def login(user: UserLogin):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email=?", (user.email,))
    db_user = cursor.fetchone()
    conn.close()

    if not db_user:
        return {"error": "User not found"}

    if not check_password_hash(db_user["password"], user.password):
        return {"error": "Invalid password"}

    return {
        "message": "Login successful",
        "email": user.email
    }

@app.post("/detect")
@app.post("/predict")
def predict(news: NewsInput):
    vector = vectorizer.transform([news.text])
    prediction = model.predict(vector)[0]

    result = "fake" if prediction == 0 else "real"

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO predictions(user_email, news_text, prediction) VALUES (?, ?, ?)",
        (news.user_email, news.text, result),
    )

    conn.commit()
    conn.close()

    return {
        "verdict": result,
        "confidence": 90,
        "user_email": news.user_email
    }

@app.get("/history")
def history(user_email: str = None):
    conn = get_db()
    cursor = conn.cursor()

    if user_email:
        cursor.execute("SELECT * FROM predictions WHERE user_email=? ORDER BY id DESC", (user_email,))
    else:
        cursor.execute("SELECT * FROM predictions ORDER BY id DESC")

    rows = cursor.fetchall()
    conn.close()

    return {
        "history": [
            {
                "id": r["id"],
                "user_email": r["user_email"],
                "text": r["news_text"],
                "prediction": r["prediction"],
            }
            for r in rows
        ]
    }

@app.get("/users")
def users():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, email FROM users")
    rows = cursor.fetchall()
    conn.close()
    return {"users": [{"id": r["id"], "email": r["email"]} for r in rows]}