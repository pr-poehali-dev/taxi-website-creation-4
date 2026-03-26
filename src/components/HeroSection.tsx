import { useState } from "react";
import Icon from "@/components/ui/icon";

const SEND_ORDER_URL = "https://functions.poehali.dev/9d9ff72d-d04b-4782-9117-6bd9b8fd2e7f";

export function HeroSection() {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 6) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(SEND_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Ошибка отправки. Попробуйте позвонить.");
      }
    } catch {
      setError("Нет связи. Попробуйте позвонить.");
    } finally {
      setLoading(false);
    }
  };

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    if (digits.length === 0) return "";
    let result = "+7";
    if (digits.length > 1) result += " (" + digits.slice(1, 4);
    if (digits.length >= 4) result += ") " + digits.slice(4, 7);
    if (digits.length >= 7) result += "-" + digits.slice(7, 9);
    if (digits.length >= 9) result += "-" + digits.slice(9, 11);
    return result;
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #111 0%, #222 60%, #2a2a2a 100%)" }}
    >
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-10"
        style={{ background: "radial-gradient(ellipse at 80% 20%, #FFD600 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-20 left-0 w-64 h-64 rounded-full opacity-5"
        style={{ background: "#FFD600", filter: "blur(60px)" }}
      />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: "#FFD600" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-28 grid md:grid-cols-2 gap-12 items-center w-full">
        <div className="animate-fade-in-up">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ backgroundColor: "rgba(255,214,0,0.15)", color: "#FFD600" }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            Работаем 24/7
          </div>

          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-4">
            Такси{" "}
            <span style={{ color: "#FFD600" }}>быстро</span>
            <br />и надёжно
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Более 1000 автомобилей по всему региону. Эконом, Комфорт, Бизнес — любой класс за минуты.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { num: "1000+", label: "автомобилей" },
              { num: "5 мин", label: "среднее ожидание" },
              { num: "24/7", label: "поддержка" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black" style={{ color: "#FFD600" }}>
                  {s.num}
                </div>
                <div className="text-gray-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-in-up delay-200">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            {!submitted ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Заказать такси</h2>
                <p className="text-gray-500 text-sm mb-6">Оставьте номер — мы перезвоним за 1 минуту</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ваш телефон</label>
                    <div className="relative">
                      <Icon name="Phone" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 font-medium text-base focus:outline-none focus:border-yellow-400 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-60 disabled:scale-100"
                    style={{ backgroundColor: "#FFD600", color: "#111" }}
                  >
                    <Icon name={loading ? "Loader" : "PhoneCall"} size={20} className={loading ? "animate-spin" : ""} />
                    {loading ? "Отправляем..." : "Заказать звонок"}
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-gray-400 text-sm">или</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  <a
                    href="https://t.me/your_taxi_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    style={{ backgroundColor: "#229ED9" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                    </svg>
                    Написать в Telegram
                  </a>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(255,214,0,0.15)" }}
                >
                  <Icon name="CheckCircle" size={32} style={{ color: "#FFD600" }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Заявка принята!</h3>
                <p className="text-gray-500 mb-6">Мы перезвоним вам в течение 1 минуты</p>
                <button
                  onClick={() => { setSubmitted(false); setPhone(""); }}
                  className="text-sm font-medium underline text-gray-400 hover:text-gray-600"
                >
                  Отправить ещё раз
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 bg-white/10 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-2 flex-shrink-0">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://t.me/your_taxi_bot&bgcolor=ffffff&color=111111"
                alt="QR Telegram"
                className="w-16 h-16 rounded-lg"
              />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Сканируйте QR-код</p>
              <p className="text-gray-400 text-xs mt-1">Откроется наш Telegram чат</p>
              <a
                href="https://t.me/your_taxi_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium mt-1 inline-block"
                style={{ color: "#FFD600" }}
              >
                @your_taxi_bot →
              </a>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#tariffs"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors"
      >
        <span className="text-xs font-medium">Тарифы</span>
        <Icon name="ChevronDown" size={20} className="animate-bounce" />
      </a>
    </section>
  );
}
