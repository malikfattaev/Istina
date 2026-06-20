import { MessageCategory, prisma } from "@istina/db";

export type MessageInput = {
  category: string;
  name: string;
  contact: string;
  prayerType: "health" | "repose" | null;
  baptized: boolean | null;
  names: string | null;
  body: string | null;
};

export type SubmitResult = { ok: true } | { error: string };

const categories: Record<string, MessageCategory> = {
  prayer: MessageCategory.PRAYER,
  help: MessageCategory.HELP,
  donate: MessageCategory.DONATE,
  question: MessageCategory.QUESTION,
  other: MessageCategory.OTHER,
};

/** Валидирует и сохраняет обращение с формы «Контакты». Редакция видит его в ERP («Письма»). */
export async function createMessage(
  input: Partial<MessageInput>,
): Promise<SubmitResult> {
  const category = categories[input.category ?? ""];
  const name = input.name?.trim() ?? "";
  const contact = input.contact?.trim() ?? "";

  if (!category) return { error: "Выберите тему обращения." };
  if (name.length < 2) return { error: "Укажите, как к вам обращаться." };
  if (contact.length < 3) return { error: "Укажите почту или телефон для ответа." };

  const isPrayer = category === MessageCategory.PRAYER;
  const names = input.names?.trim() || null;
  const body = input.body?.trim() || null;

  if (isPrayer && !names) return { error: "Укажите имена для поминовения." };
  if (!isPrayer && !body) return { error: "Напишите сообщение." };

  try {
    await prisma.message.create({
      data: {
        category,
        name,
        contact,
        prayerType: isPrayer ? input.prayerType ?? null : null,
        baptized: isPrayer ? input.baptized ?? null : null,
        names: isPrayer ? names : null,
        body,
      },
    });
  } catch (e) {
    console.error("[createMessage] failed:", e);
    return {
      error: "Не удалось отправить. Попробуйте позже или напишите на help@istina.uz.",
    };
  }

  return { ok: true };
}
