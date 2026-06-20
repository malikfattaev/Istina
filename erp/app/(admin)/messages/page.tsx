import { Check, Mail, RotateCcw, Trash2 } from "lucide-react";
import { MessageCategory, MessageStatus, prisma } from "@istina/db";
import { requireAdmin } from "@/lib/auth";
import { deleteMessage, setMessageStatus } from "@/lib/message-actions";

const categoryLabel: Record<MessageCategory, string> = {
  JOIN: "Хочу присоединиться",
  HELP: "Нужна помощь",
  DONATE: "Хочу помочь",
  OTHER: "Другое",
  // legacy
  PRAYER: "Просьба помолиться",
  QUESTION: "Вопрос священнику",
};

// Цветовой акцент по теме - чтобы важные письма было видно сразу.
const categoryBadge: Record<MessageCategory, string> = {
  JOIN: "bg-clay-100 text-clay-800",
  HELP: "bg-amber-100 text-amber-800",
  DONATE: "bg-emerald-100 text-emerald-800",
  OTHER: "bg-sand-100 text-sand-700",
  PRAYER: "bg-sand-100 text-sand-700",
  QUESTION: "bg-sky-100 text-sky-800",
};

function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function contactHref(contact: string): string | null {
  if (contact.includes("@")) return `mailto:${contact}`;
  if (/[+\d]/.test(contact)) return `tel:${contact.replace(/[^\d+]/g, "")}`;
  return null;
}

export default async function MessagesPage() {
  await requireAdmin();
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });
  const newCount = messages.filter((m) => m.status === "NEW").length;

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-xl font-semibold text-sand-900 sm:text-2xl">
            Письма
          </h1>
          <p className="mt-1 text-sand-600">
            Обращения с формы «Контакты» на сайте.
            {newCount > 0 ? (
              <span className="ml-1 font-medium text-clay-700">
                Новых: {newCount}.
              </span>
            ) : null}
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-sand-300 bg-white px-4 py-10 text-center sm:px-6 sm:py-16">
          <Mail className="h-8 w-8 text-sand-400" aria-hidden />
          <p className="mt-3 font-medium text-sand-800">Писем пока нет</p>
          <p className="mt-1 text-sm text-sand-600">
            Здесь появятся обращения, отправленные через форму на сайте.
          </p>
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {messages.map((m) => {
            const isNew = m.status === MessageStatus.NEW;
            const href = contactHref(m.contact);
            return (
              <li
                key={m.id}
                className={`rounded-2xl border bg-white p-5 transition-colors ${
                  isNew ? "border-clay-300 ring-1 ring-clay-200" : "border-sand-200"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryBadge[m.category]}`}
                  >
                    {categoryLabel[m.category]}
                  </span>
                  {isNew ? (
                    <span className="rounded-full bg-clay-500 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
                      Новое
                    </span>
                  ) : null}
                  <span className="ml-auto text-xs text-sand-500">
                    {formatDateTime(m.createdAt)}
                  </span>
                </div>

                <div className="mt-3">
                  <p className="font-medium text-sand-900">{m.name}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-clay-600 underline-offset-2 hover:underline"
                    >
                      {m.contact}
                    </a>
                  ) : (
                    <p className="text-sm text-sand-600">{m.contact}</p>
                  )}
                </div>

                {m.category === MessageCategory.PRAYER ? (
                  <dl className="mt-3 grid gap-1 rounded-xl bg-sand-50 px-4 py-3 text-sm text-sand-700 sm:grid-cols-[auto_1fr] sm:gap-x-3">
                    <dt className="font-medium text-sand-600">О ком:</dt>
                    <dd>
                      {m.prayerType === "repose" ? "О упокоении" : "О здравии"}
                    </dd>
                    <dt className="font-medium text-sand-600">Крещён(а):</dt>
                    <dd>{m.baptized ? "Да" : "Нет"}</dd>
                    <dt className="font-medium text-sand-600">Имена:</dt>
                    <dd>{m.names ?? "-"}</dd>
                  </dl>
                ) : null}

                {m.body ? (
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-sand-700">
                    {m.body}
                  </p>
                ) : null}

                <div className="mt-4 flex items-center justify-end gap-2 border-t border-sand-100 pt-3">
                  <form action={setMessageStatus}>
                    <input type="hidden" name="id" value={m.id} />
                    <input
                      type="hidden"
                      name="status"
                      value={isNew ? "READ" : "NEW"}
                    />
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-lg border border-sand-200 px-3 py-1.5 text-sm text-sand-700 transition-colors hover:border-clay-300 hover:text-clay-700"
                    >
                      {isNew ? (
                        <>
                          <Check className="h-4 w-4" aria-hidden />
                          Прочитано
                        </>
                      ) : (
                        <>
                          <RotateCcw className="h-4 w-4" aria-hidden />
                          В новые
                        </>
                      )}
                    </button>
                  </form>
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <button
                      type="submit"
                      aria-label="Удалить"
                      className="rounded-lg border border-sand-200 p-2 text-red-600 transition-colors hover:border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
