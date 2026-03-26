import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export function Navbar() {
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

export function Footer() {
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
