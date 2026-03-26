import json
import os
import urllib.request
import urllib.parse
from datetime import datetime


def handler(event: dict, context) -> dict:
    """Принимает заявку с сайта такси и отправляет уведомление в Telegram."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    phone = body.get("phone", "").strip()
    name = body.get("name", "").strip()

    if not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Телефон обязателен"}),
        }

    bot_token = os.environ["TELEGRAM_BOT_TOKEN"].strip()
    chat_id = os.environ["TELEGRAM_CHAT_ID"].strip()

    now = datetime.now().strftime("%d.%m.%Y %H:%M")

    text = (
        "🚕 *Новая заявка с сайта такси!*\n\n"
        f"📞 *Телефон:* `{phone}`\n"
    )
    if name:
        text += f"👤 *Имя:* {name}\n"
    text += f"🕐 *Время:* {now}"

    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown",
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"https://api.telegram.org/bot{bot_token}/sendMessage",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=10) as resp:
        resp.read()

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True, "message": "Заявка отправлена"}),
    }