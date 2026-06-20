"use client";

import { useState } from "react";
import { Button } from "@istina/ui";

type Category = "join" | "help" | "donate" | "other";

const categories: { value: Category; label: string }[] = [
  { value: "join", label: "Хочу присоединиться к команде" },
  { value: "help", label: "Нужна помощь" },
  { value: "donate", label: "Хочу помочь" },
  { value: "other", label: "Другое" },
];

const messageLabel: Record<Category, string> = {
  join: "Расскажите о себе",
  help: "Опишите, какая нужна помощь",
  donate: "Чем хотите помочь",
  other: "Сообщение",
};

const messagePlaceholder: Record<Category, string> = {
  join: "Немного о себе: возраст, чем хотели бы заниматься в команде",
  help: "Расскажите, что случилось и чем мы можем помочь",
  donate: "Например: хочу сделать пожертвование или помочь как волонтёр",
  other: "Опишите ваш вопрос или просьбу",
};

const hint: Partial<Record<Category, string>> = {
  join: "Рады новым ребятам! Напишите немного о себе - и мы свяжемся с вами, расскажем о ближайших встречах и делах команды.",
  donate:
    "Спасибо за желание помочь! Напишите, чем хотели бы поддержать - пожертвование, волонтёрство или помощь делом. Мы свяжемся с вами и расскажем, как это сделать.",
};

const fieldClassName =
  "w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm text-sand-900 placeholder:text-sand-400 focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-500/30";
const labelClassName = "block text-sm font-medium text-sand-800";

export function ContactForm() {
  const [category, setCategory] = useState<Category>("join");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    setSubmitted(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          name,
          contact,
          body: message.trim() || null,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: true; error?: string }
        | null;

      if (!response.ok || !result?.ok) {
        setError(
          result?.error ??
            "Не удалось отправить. Попробуйте позже или напишите на help@istina.uz.",
        );
        return;
      }

      setSubmitted(true);
      setName("");
      setContact("");
      setMessage("");
    } catch {
      setError(
        "Не удалось отправить. Проверьте подключение к интернету и попробуйте снова.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-sand-200 bg-white p-6 sm:p-8"
    >
      <div className="flex flex-col gap-5">
        {/* Тема обращения */}
        <div>
          <label className={labelClassName} htmlFor="category">
            Тема обращения
          </label>
          <select
            id="category"
            className={`${fieldClassName} mt-1.5`}
            value={category}
            onChange={(event) => setCategory(event.target.value as Category)}
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Имя */}
        <div>
          <label className={labelClassName} htmlFor="name">
            Ваше имя
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Как к вам обращаться"
            className={`${fieldClassName} mt-1.5`}
          />
        </div>

        {/* Контакт для ответа */}
        <div>
          <label className={labelClassName} htmlFor="contact">
            Эл. почта или телефон для ответа
          </label>
          <input
            id="contact"
            type="text"
            required
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            placeholder="help@istina.uz или +998 ..."
            className={`${fieldClassName} mt-1.5`}
          />
        </div>

        {/* Подсказка по теме */}
        {hint[category] ? (
          <p className="rounded-xl border border-clay-200 bg-clay-50 px-4 py-3 text-sm leading-relaxed text-sand-700">
            {hint[category]}
          </p>
        ) : null}

        {/* Сообщение */}
        <div>
          <label className={labelClassName} htmlFor="message">
            {messageLabel[category]}
          </label>
          <textarea
            id="message"
            rows={4}
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={messagePlaceholder[category]}
            className={`${fieldClassName} mt-1.5`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={pending}>
            {pending ? "Отправляем..." : "Отправить"}
          </Button>
          {submitted ? (
            <span className="text-sm text-sand-600">
              Спасибо! Мы получили ваше обращение и ответим на указанный контакт.
            </span>
          ) : null}
          {error ? <span className="text-sm text-red-600">{error}</span> : null}
        </div>
      </div>
    </form>
  );
}
