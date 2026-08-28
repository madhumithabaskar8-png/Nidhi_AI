"""
Nidhi AI — Personal Finance Assistant Backend
FastAPI + SQLite + SQLModel + Pydantic
"""

from __future__ import annotations

import math
from datetime import date, datetime, timedelta, timezone
from enum import Enum
from typing import Optional

from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlmodel import Field as SQLField
from sqlmodel import Session, SQLModel, create_engine, select

# ---------------------------------------------------------------------------
# Database setup
# ---------------------------------------------------------------------------

DATABASE_URL = "sqlite:///nidhi.db"
engine = create_engine(DATABASE_URL, echo=False, connect_args={"check_same_thread": False})


def create_db_and_tables() -> None:
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


# ---------------------------------------------------------------------------
# Database Models
# ---------------------------------------------------------------------------


class ExpenseStatusEnum(str, Enum):
    pending = "pending"
    paid = "paid"


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: Optional[int] = SQLField(default=None, primary_key=True)
    name: str
    job: str = ""
    phone: str = ""
    language: str = "en"
    monthly_salary: float = 0.0
    monthly_savings: float = 0.0


class Expense(SQLModel, table=True):
    __tablename__ = "expenses"

    id: Optional[int] = SQLField(default=None, primary_key=True)
    user_id: int = SQLField(foreign_key="users.id", index=True)
    title: str
    amount: float
    due_date: date
    status: str = ExpenseStatusEnum.pending.value


# ---------------------------------------------------------------------------
# Pydantic Request / Response Schemas
# ---------------------------------------------------------------------------


class UserCreate(BaseModel):
    name: str
    job: str = ""
    phone: str = ""
    language: str = "en"
    monthly_salary: float = 0.0
    monthly_savings: float = 0.0


class UserRead(BaseModel):
    id: int
    name: str
    job: str
    phone: str
    language: str
    monthly_salary: float
    monthly_savings: float


class FinancialsUpdate(BaseModel):
    monthly_salary: float
    monthly_savings: float


class ExpenseCreate(BaseModel):
    title: str
    amount: float
    due_date: date
    status: str = ExpenseStatusEnum.pending.value


class ExpenseBatchCreate(BaseModel):
    expenses: list[ExpenseCreate]


class ExpenseRead(BaseModel):
    id: int
    user_id: int
    title: str
    amount: float
    due_date: date
    status: str


class StatusUpdate(BaseModel):
    status: str  # "paid" or "pending"


class DashboardResponse(BaseModel):
    risk_score: int
    risk_level: str
    recommendations: list[str]
    rewards: list[str]
    projected_savings: list[float]


class NotificationItem(BaseModel):
    expense_id: int
    title: str
    amount: float
    due_date: date
    hours_remaining: float


class NotificationsResponse(BaseModel):
    pending_soon: list[NotificationItem]


class ChatbotRequest(BaseModel):
    user_id: int
    message: str


class ChatbotResponse(BaseModel):
    reply: str


# ---------------------------------------------------------------------------
# Multilingual string helpers
# ---------------------------------------------------------------------------

TRANSLATIONS: dict[str, dict[str, str]] = {
    "en": {
        "greeting": "Hello {name}! I'm Nidhi, your personal finance assistant.",
        "salary_info": "Your monthly salary is {salary} and your savings target is {savings}.",
        "expense_total": "Your total pending expenses add up to {total}.",
        "risk_low": "Great news — your financial risk is LOW (score: {score}/100). Keep it up!",
        "risk_high": "Heads-up — your financial risk is HIGH (score: {score}/100). Consider cutting discretionary spending.",
        "no_expenses": "You have no pending expenses. Well done!",
        "savings_ratio_good": "You're saving {pct}% of your income — that's excellent!",
        "savings_ratio_warn": "You're only saving {pct}% of your income. Aim for at least 20%.",
        "fallback": "I'm here to help with your finances. Ask me about your expenses, savings, or risk score!",
    },
    "hi": {
        "greeting": "नमस्ते {name}! मैं निधि हूँ, आपकी व्यक्तिगत वित्त सहायक।",
        "salary_info": "आपकी मासिक वेतन {salary} है और बचत लक्ष्य {savings} है।",
        "expense_total": "आपके कुल लंबित खर्चे {total} हैं।",
        "risk_low": "अच्छी खबर — आपका वित्तीय जोखिम कम है (स्कोर: {score}/100)। ऐसे ही जारी रखें!",
        "risk_high": "ध्यान दें — आपका वित्तीय जोखिम अधिक है (स्कोर: {score}/100)। ग़ैर-ज़रूरी खर्चे कम करें।",
        "no_expenses": "आपके कोई लंबित खर्चे नहीं हैं। बहुत अच्छे!",
        "savings_ratio_good": "आप अपनी आय का {pct}% बचा रहे हैं — यह उत्कृष्ट है!",
        "savings_ratio_warn": "आप अपनी आय का केवल {pct}% बचा रहे हैं। कम से कम 20% लक्ष्य रखें।",
        "fallback": "मैं आपकी वित्तीय सहायता के लिए यहाँ हूँ। अपने खर्चे, बचत या जोखिम स्कोर के बारे में पूछें!",
    },
    "ta": {
        "greeting": "வணக்கம் {name}! நான் நிதி, உங்கள் தனிப்பட்ட நிதி உதவியாளர்.",
        "salary_info": "உங்கள் மாத சம்பளம் {salary} மற்றும் சேமிப்பு இலக்கு {savings}.",
        "expense_total": "உங்கள் மொத்த நிலுவை செலவுகள் {total} ஆகும்.",
        "risk_low": "நல்ல செய்தி — உங்கள் நிதி ஆபத்து குறைவு (மதிப்பெண்: {score}/100). தொடருங்கள்!",
        "risk_high": "கவனம் — உங்கள் நிதி ஆபத்து அதிகம் (மதிப்பெண்: {score}/100). தேவையற்ற செலவுகளைக் குறைக்கவும்.",
        "no_expenses": "உங்களிடம் நிலுவை செலவுகள் இல்லை. மிகவும் நல்லது!",
        "savings_ratio_good": "நீங்கள் உங்கள் வருமானத்தில் {pct}% சேமிக்கிறீர்கள் — அருமை!",
        "savings_ratio_warn": "நீங்கள் உங்கள் வருமானத்தில் {pct}% மட்டுமே சேமிக்கிறீர்கள். குறைந்தது 20% ஐ இலக்காகக் கொள்ளுங்கள்.",
        "fallback": "உங்கள் நிதி தொடர்பாக உதவ நான் இங்கே இருக்கிறேன். செலவுகள், சேமிப்பு அல்லது ஆபத்து மதிப்பெண் பற்றி கேளுங்கள்!",
    },
    "te": {
        "greeting": "నమస్కారం {name}! నేను నిధి, మీ వ్యక్తిగత ఆర్థిక సహాయకురాలిని.",
        "salary_info": "మీ నెలవారీ జీతం {salary} మరియు పొదుపు లక్ష్యం {savings}.",
        "expense_total": "మీ మొత్తం పెండింగ్ ఖర్చులు {total}.",
        "risk_low": "శుభవార్త — మీ ఆర్థిక ప్రమాదం తక్కువ (స్కోర్: {score}/100). అలాగే కొనసాగించండి!",
        "risk_high": "జాగ్రత్త — మీ ఆర్థిక ప్రమాదం ఎక్కువ (స్కోర్: {score}/100). అనవసర ఖర్చులు తగ్గించండి.",
        "no_expenses": "మీకు పెండింగ్ ఖర్చులు లేవు. చాలా బాగా!",
        "savings_ratio_good": "మీరు మీ ఆదాయంలో {pct}% ఆదా చేస్తున్నారు — అద్భుతం!",
        "savings_ratio_warn": "మీరు మీ ఆదాయంలో కేవలం {pct}% ఆదా చేస్తున్నారు. కనీసం 20% లక్ష్యంగా పెట్టుకోండి.",
        "fallback": "మీ ఆర్థిక విషయాలలో సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. మీ ఖర్చులు, పొదుపు లేదా ప్రమాద స్కోర్ గురించి అడగండి!",
    },
}


def t(lang: str, key: str, **kwargs) -> str:
    """Return a translated string, falling back to English."""
    strings = TRANSLATIONS.get(lang, TRANSLATIONS["en"])
    template = strings.get(key, TRANSLATIONS["en"].get(key, ""))
    return template.format(**kwargs)


# ---------------------------------------------------------------------------
# Dashboard / Risk helpers
# ---------------------------------------------------------------------------


def _compute_dashboard(user: User, expenses: list[Expense]) -> DashboardResponse:
    """
    Risk Score (0-100):
      • expense_ratio  = total_pending / salary  → contributes 60 pts
      • savings_ratio  = 1 - (savings_target / salary) → contributes 30 pts
      • overdue_penalty = 10 pts if any pending expense is past due
    """
    salary = user.monthly_salary if user.monthly_salary > 0 else 1.0
    savings_target = user.monthly_savings

    pending = [e for e in expenses if e.status == ExpenseStatusEnum.pending.value]
    total_pending = sum(e.amount for e in pending)
    today = date.today()

    # --- expense ratio component (0-60) ---
    expense_ratio = min(total_pending / salary, 1.0)
    expense_component = round(expense_ratio * 60)

    # --- savings adequacy component (0-30) ---
    if salary > 0 and savings_target > 0:
        savings_pct = savings_target / salary
        savings_gap = max(1.0 - savings_pct / 0.30, 0.0)  # 30 % benchmark
        savings_component = round(savings_gap * 30)
    else:
        savings_component = 30  # no savings info → worst case

    # --- overdue penalty (0-10) ---
    overdue = any(e.due_date < today for e in pending)
    overdue_component = 10 if overdue else 0

    risk_score = min(expense_component + savings_component + overdue_component, 100)
    risk_level = "HIGH" if risk_score >= 50 else "LOW"

    # --- recommendations ---
    recommendations: list[str] = []
    if expense_ratio > 0.5:
        recommendations.append("Your pending expenses exceed 50% of your salary. Prioritize high-interest payments.")
    if savings_target < salary * 0.2 and salary > 0:
        recommendations.append("Increase your savings target to at least 20% of your monthly salary.")
    if overdue:
        recommendations.append("You have overdue expenses. Clear them as soon as possible to avoid penalties.")
    if total_pending == 0:
        recommendations.append("No pending expenses — great job! Consider investing your surplus.")
    if not recommendations:
        recommendations.append("You're on a healthy financial track. Keep monitoring your expenses regularly.")

    # --- rewards ---
    rewards: list[str] = []
    if risk_score < 30:
        rewards.append("🏆 Financial Rockstar — Risk score under 30!")
    if risk_score < 50:
        rewards.append("⭐ Responsible Spender — Risk score under 50.")
    if total_pending == 0:
        rewards.append("🎯 Zero Pending — All bills cleared!")
    paid_count = sum(1 for e in expenses if e.status == ExpenseStatusEnum.paid.value)
    if paid_count >= 5:
        rewards.append(f"🔥 Bill Crusher — {paid_count} expenses marked paid!")
    if not rewards:
        rewards.append("💪 Keep going — build better habits to unlock rewards!")

    # --- 6-month projected savings ---
    monthly_net = salary - total_pending  # simplified monthly disposable
    projected_savings: list[float] = []
    cumulative = 0.0
    for month in range(1, 7):
        cumulative += max(monthly_net * (savings_target / salary if salary > 0 else 0), 0.0)
        projected_savings.append(round(cumulative, 2))

    return DashboardResponse(
        risk_score=risk_score,
        risk_level=risk_level,
        recommendations=recommendations,
        rewards=rewards,
        projected_savings=projected_savings,
    )


# ---------------------------------------------------------------------------
# Chatbot logic
# ---------------------------------------------------------------------------


def _build_chatbot_reply(user: User, expenses: list[Expense], message: str) -> str:
    """
    Rule-based multilingual chatbot. Detects intent keywords and responds
    using the user's preferred language.
    """
    lang = user.language if user.language in TRANSLATIONS else "en"
    msg = message.lower().strip()

    pending = [e for e in expenses if e.status == ExpenseStatusEnum.pending.value]
    total_pending = sum(e.amount for e in pending)
    salary = user.monthly_salary if user.monthly_salary > 0 else 0.0
    savings = user.monthly_savings

    # Keyword-based intent matching
    greeting_kw = {"hi", "hello", "hey", "namaste", "vanakkam", "namaskar", "hola"}
    if any(kw in msg for kw in greeting_kw):
        return t(lang, "greeting", name=user.name)

    salary_kw = {"salary", "income", "earning", "वेतन", "சம்பளம்", "జీతం"}
    if any(kw in msg for kw in salary_kw):
        return t(lang, "salary_info", salary=salary, savings=savings)

    expense_kw = {"expense", "spending", "bill", "dues", "खर्च", "செலவு", "ఖర్చు"}
    if any(kw in msg for kw in expense_kw):
        if total_pending == 0:
            return t(lang, "no_expenses")
        return t(lang, "expense_total", total=total_pending)

    risk_kw = {"risk", "score", "health", "जोखिम", "ஆபத்து", "ప్రమాదం"}
    if any(kw in msg for kw in risk_kw):
        dashboard = _compute_dashboard(user, expenses)
        if dashboard.risk_level == "LOW":
            return t(lang, "risk_low", score=dashboard.risk_score)
        return t(lang, "risk_high", score=dashboard.risk_score)

    savings_kw = {"saving", "save", "बचत", "சேமிப்பு", "పొదుపు"}
    if any(kw in msg for kw in savings_kw):
        if salary > 0:
            pct = round((savings / salary) * 100, 1)
            if pct >= 20:
                return t(lang, "savings_ratio_good", pct=pct)
            return t(lang, "savings_ratio_warn", pct=pct)
        return t(lang, "salary_info", salary=salary, savings=savings)

    return t(lang, "fallback")


# ---------------------------------------------------------------------------
# FastAPI Application
# ---------------------------------------------------------------------------

app = FastAPI(
    title="Nidhi AI",
    description="Personal Finance Assistant API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    create_db_and_tables()


# ---- User endpoints -------------------------------------------------------


@app.post("/api/users", response_model=UserRead, status_code=201)
def create_user(payload: UserCreate, session: Session = Depends(get_session)):
    user = User(**payload.model_dump())
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@app.get("/api/users/{user_id}", response_model=UserRead)
def get_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.put("/api/users/{user_id}/financials", response_model=UserRead)
def update_financials(user_id: int, payload: FinancialsUpdate, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.monthly_salary = payload.monthly_salary
    user.monthly_savings = payload.monthly_savings
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


# ---- Expense endpoints -----------------------------------------------------


@app.post("/api/users/{user_id}/expenses", response_model=list[ExpenseRead], status_code=201)
def batch_create_expenses(user_id: int, payload: ExpenseBatchCreate, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    created: list[Expense] = []
    for item in payload.expenses:
        if item.status not in {ExpenseStatusEnum.pending.value, ExpenseStatusEnum.paid.value}:
            raise HTTPException(status_code=422, detail=f"Invalid status '{item.status}'. Must be 'pending' or 'paid'.")
        expense = Expense(user_id=user_id, **item.model_dump())
        session.add(expense)
        created.append(expense)

    session.commit()
    for exp in created:
        session.refresh(exp)
    return created


@app.get("/api/users/{user_id}/expenses", response_model=list[ExpenseRead])
def get_user_expenses(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    statement = select(Expense).where(Expense.user_id == user_id).order_by(Expense.due_date)
    return session.exec(statement).all()


@app.patch("/api/expenses/{expense_id}/status", response_model=ExpenseRead)
def toggle_expense_status(expense_id: int, payload: StatusUpdate, session: Session = Depends(get_session)):
    if payload.status not in {ExpenseStatusEnum.pending.value, ExpenseStatusEnum.paid.value}:
        raise HTTPException(status_code=422, detail="Status must be 'pending' or 'paid'.")
    expense = session.get(Expense, expense_id)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    expense.status = payload.status
    session.add(expense)
    session.commit()
    session.refresh(expense)
    return expense


# ---- Dashboard endpoint ----------------------------------------------------


@app.get("/api/users/{user_id}/dashboard", response_model=DashboardResponse)
def get_dashboard(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    expenses = session.exec(select(Expense).where(Expense.user_id == user_id)).all()
    return _compute_dashboard(user, list(expenses))


# ---- Notifications endpoint ------------------------------------------------


@app.get("/api/users/{user_id}/notifications", response_model=NotificationsResponse)
def get_notifications(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    now = datetime.now(timezone.utc)
    cutoff = now + timedelta(hours=24)
    today = now.date()
    tomorrow = cutoff.date()

    statement = (
        select(Expense)
        .where(Expense.user_id == user_id)
        .where(Expense.status == ExpenseStatusEnum.pending.value)
        .where(Expense.due_date >= today)
        .where(Expense.due_date <= tomorrow)
        .order_by(Expense.due_date)
    )
    upcoming = session.exec(statement).all()

    items: list[NotificationItem] = []
    for exp in upcoming:
        # Hours remaining from now until end-of-day of the due date
        due_datetime = datetime.combine(exp.due_date, datetime.max.time(), tzinfo=timezone.utc)
        remaining = (due_datetime - now).total_seconds() / 3600
        if remaining < 24:
            items.append(
                NotificationItem(
                    expense_id=exp.id,  # type: ignore[arg-type]
                    title=exp.title,
                    amount=exp.amount,
                    due_date=exp.due_date,
                    hours_remaining=round(remaining, 2),
                )
            )

    return NotificationsResponse(pending_soon=items)


# ---- Chatbot endpoint ------------------------------------------------------


@app.post("/api/chatbot", response_model=ChatbotResponse)
def chatbot(payload: ChatbotRequest, session: Session = Depends(get_session)):
    user = session.get(User, payload.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    expenses = session.exec(select(Expense).where(Expense.user_id == user.id)).all()
    reply = _build_chatbot_reply(user, list(expenses), payload.message)
    return ChatbotResponse(reply=reply)


# ---------------------------------------------------------------------------
# Run with: uvicorn main:app --reload
# ---------------------------------------------------------------------------
