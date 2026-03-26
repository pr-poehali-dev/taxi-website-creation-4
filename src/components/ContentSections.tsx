import Icon from "@/components/ui/icon";
import { useInView } from "@/hooks/useInView";

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

const steps = [
  { num: "01", title: "Позвоните или напишите", desc: "Оставьте заявку через форму, позвоните или напишите в Telegram" },
  { num: "02", title: "Укажите маршрут", desc: "Откуда и куда вам нужно ехать, желаемое время подачи" },
  { num: "03", title: "Ждите водителя", desc: "Водитель прибудет в среднем за 5–10 минут" },
  { num: "04", title: "Поездка", desc: "Комфортная поездка до вашего пункта назначения" },
];

export function TariffsSection() {
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

export function FleetSection() {
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

export function HowSection() {
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

export function AboutSection() {
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

export function ContactsSection() {
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
