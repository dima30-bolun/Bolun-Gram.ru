from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
import jwt
import time
import hashlib

SECRET_KEY = "CHANGE_THIS_TO_RANDOM_SECRET"

app = FastAPI(title="Messenger Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

users = {}
connections: Dict[str, WebSocket] = {}

class Register(BaseModel):
    username: str
    password: str

class Login(BaseModel):
    username: str
    password: str


def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()


def create_token(username: str):
    payload = {
        "username": username,
        "exp": int(time.time()) + 86400
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


@app.get("/")
async def root():
    return {
        "name": "Messenger",
        "status": "online"
    }


@app.post("/register")
async def register(data: Register):

    if data.username in users:
        raise HTTPException(400, "User already exists")

    users[data.username] = hash_password(data.password)

    return {
        "success": True
    }


@app.post("/login")
async def login(data: Login):

    if data.username not in users:
        raise HTTPException(401, "User not found")

    if users[data.username] != hash_password(data.password):
        raise HTTPException(401, "Wrong password")

    token = create_token(data.username)

    return {
        "token": token
    }


@app.websocket("/ws/{username}")
async def websocket_endpoint(ws: WebSocket, username: str):

    await ws.accept()

    connections[username] = ws

    try:

        while True:

            text = await ws.receive_text()

            for user, conn in connections.items():
                if user != username:
                    await conn.send_text(f"{username}: {text}")

    except WebSocketDisconnect:

        connections.pop(username, None)
