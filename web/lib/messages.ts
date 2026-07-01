import { MessageCategory, prisma } from "@vnls/db";

export type MessageInput = {
  category: string;
  name: string;
  contact: string;
  body: string | null;
};

export type SubmitResult = { ok: true } | { error: string };

const categories: Record<string, MessageCategory> = {
  join: MessageCategory.JOIN,
  help: MessageCategory.HELP,
  donate: MessageCategory.DONATE,
  other: MessageCategory.OTHER,
};

/** Валидирует и сохраняет обращение с формы «Контакты». Команда видит его в ERP («Письма»). */
export async function createMessage(
  input: Partial<MessageInput>,
): Promise<SubmitResult> {
  const category = categories[input.category ?? ""];
  const name = input.name?.trim() ?? "";
  const contact = input.contact?.trim() ?? "";
  const body = input.body?.trim() || null;

  if (!category) return { error: "Выберите тему обращения." };
  if (name.length < 2) return { error: "Укажите, как к вам обращаться." };
  if (contact.length < 3) return { error: "Укажите почту или телефон для ответа." };
  if (!body) return { error: "Напишите сообщение." };

  try {
    await prisma.message.create({
      data: { category, name, contact, body },
    });
  } catch (e) {
    console.error("[createMessage] failed:", e);
    return {
      error: "Не удалось отправить. Попробуйте позже или напишите на help@vnls.uz.",
    };
  }

  return { ok: true };
}
