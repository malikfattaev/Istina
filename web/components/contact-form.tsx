"use client";

import { useState } from "react";
import { Button } from "@istina/ui";
import { submitMessage } from "@/lib/message-actions";

type Category = "prayer" | "help" | "donate" | "question" | "other";

const categories: { value: Category; label: string }[] = [
  { value: "prayer", label: "Просьба помолиться" },
  { value: "help", label: "Просьба о помощи" },
  { value: "donate", label: "Хочу помочь" },
  { value: "question", label: "Вопрос священнику" },
  { value: "other", label: "Другое" },
];

const fieldClassName =
  "w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm text-sand-900 placeholder:text-sand-400 focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-500/30";
const labelClassName = "block text-sm font-medium text-sand-800";

export function ContactForm() {
  const [category, setCategory] = useState<Category>("prayer");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [prayerType, setPrayerType] = useState<"health" | "repose">("health");
  const [baptized, setBaptized] = useState<"yes" | "no">("yes");
  const [names, setNames] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPrayer = category === "prayer";
  const isDonate = category === "donate";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const result = await submitMessage({
      category,
      name,
      contact,
      prayerType: isPrayer ? prayerType : null,
      baptized: isPrayer ? baptized === "yes" : null,
      names: isPrayer ? names : null,
      body: message.trim() || null,
    });

    setPending(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }

    setSubmitted(true);
    setName("");
    setContact("");
    setNames("");
    setMessage("");
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

        {/* Поля для просьбы о молитве */}
        {isPrayer ? (
          <>
            <fieldset>
              <legend className={labelClassName}>О ком молитва</legend>
              <div className="mt-2 flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm text-sand-800">
                  <input
                    type="radio"
                    name="prayerType"
                    value="health"
                    checked={prayerType === "health"}
                    onChange={() => setPrayerType("health")}
                    className="accent-clay-600"
                  />
                  О здравии
                </label>
                <label className="flex items-center gap-2 text-sm text-sand-800">
                  <input
                    type="radio"
                    name="prayerType"
                    value="repose"
                    checked={prayerType === "repose"}
                    onChange={() => setPrayerType("repose")}
                    className="accent-clay-600"
                  />
                  О упокоении
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className={labelClassName}>
                Крещён(а) в Православной Церкви
              </legend>
              <div className="mt-2 flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm text-sand-800">
                  <input
                    type="radio"
                    name="baptized"
                    value="yes"
                    checked={baptized === "yes"}
                    onChange={() => setBaptized("yes")}
                    className="accent-clay-600"
                  />
                  Да
                </label>
                <label className="flex items-center gap-2 text-sm text-sand-800">
                  <input
                    type="radio"
                    name="baptized"
                    value="no"
                    checked={baptized === "no"}
                    onChange={() => setBaptized("no")}
                    className="accent-clay-600"
                  />
                  Нет
                </label>
              </div>
            </fieldset>

            <div>
              <label className={labelClassName} htmlFor="names">
                Имена для поминовения
              </label>
              <textarea
                id="names"
                required
                rows={2}
                value={names}
                onChange={(event) => setNames(event.target.value)}
                placeholder="Иоанна, Марии, Сергия"
                className={`${fieldClassName} mt-1.5`}
              />
              <p className="mt-1 text-xs leading-relaxed text-sand-600">
                Имена крещёных православных христиан в родительном падеже,
                например: «о здравии Иоанна, Марии».
              </p>
            </div>
          </>
        ) : null}

        {/* Подсказка для тех, кто хочет помочь */}
        {isDonate ? (
          <p className="rounded-xl border border-clay-200 bg-clay-50 px-4 py-3 text-sm leading-relaxed text-sand-700">
            Спасибо за желание помочь! Напишите, чем хотели бы поддержать -
            пожертвование, волонтёрство или помощь делом. Мы свяжемся с вами и
            расскажем, как это сделать.
          </p>
        ) : null}

        {/* Сообщение */}
        <div>
          <label className={labelClassName} htmlFor="message">
            {isPrayer
              ? "Дополнительно (по желанию)"
              : isDonate
                ? "Чем хотите помочь"
                : "Сообщение"}
          </label>
          <textarea
            id="message"
            rows={4}
            required={!isPrayer}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={
              isPrayer
                ? "Если есть что добавить"
                : isDonate
                  ? "Например: хочу сделать пожертвование или помочь как волонтёр"
                  : "Опишите вашу просьбу или вопрос"
            }
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
