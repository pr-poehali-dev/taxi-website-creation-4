import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ─── Данные тарифов ─── */
const tariffs = [
  {
    name: "Эконом",
    icon: "Car",
    price: "от 30 ₽/км",
    desc: "Бюджетные поездки по городу",
    color: "#FFD600",
    iconColor: "#111",
    popular: false,
  },
  {
    name: "Комфорт",
    icon: "CarFront",
    price: "40 ₽/км",
    desc: "Просторный салон, кондиционер",
    color: "#111111",
    iconColor: "#fff",
    popular: true,
  },
  {
    name: "Комфорт+",
    icon: "Star",
    price: "45 ₽/км",
    desc: "Премиальные авто среднего класса",
    color: "#333333",
    iconColor: "#fff",
    popular: false,
  },
  {
    name: "Бизнес",
    icon: "Crown",
    price: "от 100 ₽/км",
    desc: "Представительские автомобили",
    color: "#1a1a1a",
    iconColor: "#FFD600",
    popular: false,
  },
  {
    name: "Минивэн",
    icon: "Bus",
    price: "55 ₽/км",
    desc: "До 7 пассажиров, багаж",
    color: "#444444",
    iconColor: "#fff",
    popular: false,
  },
  {
    name: "Новые территории",
    icon: "MapPin",
    price: "от 100 ₽/км",
    desc: "ЛНР, ДНР, Запорожская обл.",
    color: "#222222",
    iconColor: "#FFD600",
    popular: false,
  },
];

/* ─── Шаги "Как заказать" ─── */
const steps = [
  { num: "01", title: "Позвоните или напишите", desc: "Оставьте заявку через форму, позвоните или напишите в Telegram" },
  { num: "02", title: "Укажите маршрут", desc: "Откуда и куда вам нужно ехать, желаемое время подачи" },
  { num: "03", title: "Ждите водителя", desc: "Водитель прибудет в среднем за 5–10 минут" },
  { num: "04", title: "Поездка", desc: "Комфортная поездка до вашего пункта назначения" },
];

/* ─── Хук анимации при появлении блока ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─── Навигация ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Главная", href: "#home" },
    { label: "Тарифы", href: "#tariffs" },
    { label: "Как заказать", href: "#how" },
    { label: "О нас", href: "#about" },
    { label: "Контакты", href: "#contacts" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2">
            <span
              className="flex items-center justify-center w-9 h-9 rounded-lg font-black text-lg"
              style={{ backgroundColor: "#FFD600", color: "#111" }}
            >
              Т
            </span>
            <span className="font-bold text-xl" style={{ color: scrolled ? "#111" : "#fff" }}>
              ТаксиСервис
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium transition-colors"
                style={{ color: scrolled ? "#555" : "#ccc" }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+78001234567"
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: "#FFD600", color: "#111" }}
            >
              <Icon name="Phone" size={15} />
              8 800 123-45-67
            </a>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: scrolled ? "#111" : "#fff" }}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+78001234567"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold"
              style={{ backgroundColor: "#FFD600", color: "#111" }}
            >
              <Icon name="Phone" size={16} />
              8 800 123-45-67
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

const SEND_ORDER_URL = "https://functions.poehali.dev/9d9ff72d-d04b-4782-9117-6bd9b8fd2e7f";

/* ─── Hero секция ─── */
function HeroSection() {
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

/* ─── Тарифы ─── */
function TariffsSection() {
  const { ref, visible } = useInView();

  return (
    <section id="tariffs" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: "rgba(255,214,0,0.2)", color: "#7a6500" }}
            >
              Наши тарифы
            </span>
            <h2 className="text-4xl font-black text-gray-900 mb-3">Выберите свой класс</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Все цены прозрачны — никаких скрытых платежей и доплат
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tariffs.map((t, i) => (
              <div
                key={t.name}
                className={`relative bg-white rounded-3xl p-6 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group ${
                  t.popular ? "border-yellow-400 shadow-lg" : "border-gray-100"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {t.popular && (
                  <div
                    className="absolute -top-3 left-6 px-4 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "#FFD600", color: "#111" }}
                  >
                    Популярный
                  </div>
                )}

                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: t.color }}
                >
                  <Icon name={t.icon} size={22} style={{ color: t.iconColor }} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">{t.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{t.desc}</p>

                <div className="text-2xl font-black text-gray-900">{t.price}</div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a
                    href="#home"
                    className="flex items-center gap-2 text-sm font-semibold transition-colors"
                    style={{ color: "#7a6500" }}
                  >
                    Заказать
                    <Icon name="ArrowRight" size={15} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Автопарк / Статистика ─── */
function FleetSection() {
  const { ref, visible } = useInView();

  const stats = [
    { icon: "Car", value: "1000+", label: "автомобилей в парке" },
    { icon: "MapPin", value: "6", label: "тарифных зон" },
    { icon: "Clock", value: "5 мин", label: "среднее время подачи" },
    { icon: "Users", value: "50 000+", label: "довольных клиентов" },
  ];

  return (
    <section
      className="py-20"
      style={{ background: "linear-gradient(135deg, #111 0%, #1a1a1a 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-3">
              В нашем автопарке{" "}
              <span style={{ color: "#FFD600" }}>более 1000</span>
              {" "}автомобилей
            </h2>
            <p className="text-gray-400">Современный, ухоженный флот для вашего комфорта</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="text-center p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(255,214,0,0.15)" }}
                >
                  <Icon name={s.icon} size={22} style={{ color: "#FFD600" }} />
                </div>
                <div className="text-3xl font-black text-white mb-1">{s.value}</div>
                <div className="text-gray-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Как заказать ─── */
function HowSection() {
  const { ref, visible } = useInView();

  return (
    <section id="how" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: "rgba(255,214,0,0.2)", color: "#7a6500" }}
            >
              Инструкция
            </span>
            <h2 className="text-4xl font-black text-gray-900 mb-3">Как заказать такси</h2>
            <p className="text-gray-500">Всего 4 простых шага</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="relative group">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gray-200 z-0" />
                )}
                <div className="relative z-10 bg-gray-50 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: "#FFD600", color: "#111" }}
                  >
                    {s.num}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#home"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-lg"
              style={{ backgroundColor: "#FFD600", color: "#111" }}
            >
              <Icon name="PhoneCall" size={20} />
              Заказать сейчас
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── О нас ─── */
function AboutSection() {
  const { ref, visible } = useInView();

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: "rgba(255,214,0,0.2)", color: "#7a6500" }}
              >
                О компании
              </span>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Надёжная служба такси с опытом
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Мы работаем на рынке пассажирских перевозок уже много лет. За это время
                  перевезли сотни тысяч пассажиров и заслужили репутацию надёжного перевозчика.
                </p>
                <p>
                  Наш автопарк — более 1000 современных автомобилей различных классов: от
                  доступного эконома до представительских машин бизнес-класса.
                </p>
                <p>
                  Мы также работаем на новых территориях — ЛНР, ДНР и Запорожской области,
                  обеспечивая безопасные перевозки в этих регионах.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: "Shield", title: "Безопасность", desc: "Все водители проверены, страховка включена" },
                { icon: "Clock", title: "Пунктуальность", desc: "Подача в оговорённое время" },
                { icon: "CreditCard", title: "Удобная оплата", desc: "Наличные и безналичный расчёт" },
                { icon: "Headphones", title: "Поддержка 24/7", desc: "Всегда на связи, всегда поможем" },
              ].map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(255,214,0,0.15)" }}
                  >
                    <Icon name={f.icon} size={20} style={{ color: "#7a6500" }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{f.title}</h4>
                    <p className="text-gray-500 text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Контакты ─── */
function ContactsSection() {
  const { ref, visible } = useInView();

  return (
    <section id="contacts" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-14">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: "rgba(255,214,0,0.2)", color: "#7a6500" }}
            >
              Связаться
            </span>
            <h2 className="text-4xl font-black text-gray-900 mb-3">Контакты</h2>
            <p className="text-gray-500">Мы всегда на связи</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: "Phone",
                title: "Телефон",
                value: "8 800 123-45-67",
                sub: "Бесплатно по России",
                href: "tel:+78001234567",
                bg: "#FFD600",
                fg: "#111",
              },
              {
                icon: "Send",
                title: "Telegram",
                value: "@your_taxi_bot",
                sub: "Пишите в любое время",
                href: "https://t.me/your_taxi_bot",
                bg: "#229ED9",
                fg: "#fff",
              },
              {
                icon: "Clock",
                title: "Режим работы",
                value: "24/7",
                sub: "Без выходных и праздников",
                href: null,
                bg: "#111",
                fg: "#FFD600",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-3xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: c.bg }}
                >
                  <Icon name={c.icon} size={24} style={{ color: c.fg }} />
                </div>
                <p className="text-gray-400 text-sm font-medium mb-1">{c.title}</p>
                {c.href ? (
                  <a
                    href={c.href}
                    className="text-xl font-black text-gray-900 hover:underline block mb-1"
                  >
                    {c.value}
                  </a>
                ) : (
                  <span className="text-xl font-black text-gray-900 block mb-1">{c.value}</span>
                )}
                <p className="text-gray-400 text-sm">{c.sub}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl p-10 text-center" style={{ backgroundColor: "#FFD600" }}>
            <h3 className="text-3xl font-black text-gray-900 mb-3">Готовы поехать?</h3>
            <p className="text-gray-700 mb-6">
              Заказывайте такси прямо сейчас — мы приедем быстро
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+78001234567"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-base transition-all hover:scale-105 active:scale-95"
              >
                <Icon name="Phone" size={20} />
                Позвонить
              </a>
              <a
                href="https://t.me/your_taxi_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-base transition-all hover:scale-105 active:scale-95"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#229ED9">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                </svg>
                Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const links = ["Главная", "Тарифы", "Как заказать", "О нас", "Контакты"];
  const hrefs = ["#home", "#tariffs", "#how", "#about", "#contacts"];

  return (
    <footer style={{ backgroundColor: "#111" }} className="py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              className="flex items-center justify-center w-8 h-8 rounded-lg font-black"
              style={{ backgroundColor: "#FFD600", color: "#111" }}
            >
              Т
            </span>
            <span className="text-white font-bold">ТаксиСервис</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-4">
            {links.map((item, i) => (
              <a
                key={item}
                href={hrefs[i]}
                className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <p className="text-gray-600 text-sm">© 2024 ТаксиСервис</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Главный компонент ─── */
export default function Index() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      <Navbar />
      <HeroSection />
      <TariffsSection />
      <FleetSection />
      <HowSection />
      <AboutSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}