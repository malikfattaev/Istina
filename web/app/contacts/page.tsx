import type { Metadata } from "next";
import { Mail, Phone, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { HoverArrow } from "@/components/hover-arrow";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Как связаться с редакцией портала «Истина».",
};

type Contact = {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
};

const contacts: Contact[] = [
  {
    icon: Mail,
    label: "Электронная почта",
    value: "help@istina.uz",
    href: "mailto:help@istina.uz",
  },
  {
    icon: Phone,
    label: "Телефон",
    value: "+998 91 225 80 08",
    href: "tel:+998912258008",
  },
];

function ContactCard({ contact }: { contact: Contact }) {
  const Icon = contact.icon;
  return (
    <a
      href={contact.href}
      className="group flex items-start gap-4 rounded-2xl border border-sand-200 bg-white p-5 transition-all hover:border-clay-300 hover:shadow-sm"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-clay-600 transition-colors group-hover:bg-clay-100">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-sand-600">{contact.label}</p>
        <p className="mt-0.5 flex items-center gap-1 font-medium text-sand-900">
          {contact.value}
          <HoverArrow className="text-clay-500" />
        </p>
      </div>
    </a>
  );
}

export default function ContactsPage() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <PageHeader
          title="Контакты"
          description="Свяжитесь с редакцией портала по любым вопросам - публикации и помощь."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {contacts.map((contact) => (
            <ContactCard key={contact.label} contact={contact} />
          ))}
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-sand-900">Написать нам</h2>
        <p className="mt-1 text-sm text-sand-600">
          Заполните форму - просьба о молитве, о помощи или вопрос священнику.
        </p>
        <div className="mt-4">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
