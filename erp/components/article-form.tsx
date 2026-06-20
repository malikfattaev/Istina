"use client";

import { useActionState, useState } from "react";
import { Button } from "@istina/ui";
import { saveArticle, type ArticleFormState } from "@/lib/article-actions";
import { MediaPicker } from "./media-picker";
import { RichEditor } from "./rich-editor";
import type { MediaItem } from "@/lib/media";

type Category = { id: string; name: string };

export type ArticleData = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categoryId: string;
  status: "DRAFT" | "PUBLISHED";
};

const field =
  "w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm text-sand-900 placeholder:text-sand-400 focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-500/30";
const label = "mb-1.5 block text-sm font-medium text-sand-800";

const translit: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts",
  ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map((ch) => translit[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ArticleForm({
  article,
  categories,
  lockedCategory,
  mediaItems,
}: {
  article?: ArticleData;
  categories?: Category[];
  lockedCategory?: { id: string; name: string };
  mediaItems?: MediaItem[];
}) {
  const [state, action, pending] = useActionState<ArticleFormState, FormData>(
    saveArticle,
    null,
  );
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugLocked, setSlugLocked] = useState(Boolean(article));
  const [cover, setCover] = useState(article?.coverImage ?? "");

  return (
    <form
      action={action}
      className="rounded-2xl border border-sand-200 bg-white p-4 sm:p-6 lg:p-8"
    >
      {article ? <input type="hidden" name="id" value={article.id} /> : null}

      <div className="flex flex-col gap-5">
        <div>
          <label className={label} htmlFor="title">
            Заголовок
          </label>
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(event) => {
              const next = event.target.value;
              setTitle(next);
              if (!slugLocked) setSlug(slugify(next));
            }}
            className={field}
            placeholder="Например: Праздник Святой Троицы"
          />
        </div>

        <div>
          <label className={label} htmlFor="slug">
            Slug (адрес)
          </label>
          <input
            id="slug"
            name="slug"
            required
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value);
              setSlugLocked(true);
            }}
            className={field}
            placeholder="prazdnik-svyatoy-troitsy"
          />
        </div>

        {lockedCategory ? (
          <div>
            <input type="hidden" name="categoryId" value={lockedCategory.id} />
            <span className={label}>Рубрика</span>
            <p className="rounded-xl border border-sand-200 bg-sand-50 px-4 py-2.5 text-sm text-sand-700">
              {lockedCategory.name}
            </p>
          </div>
        ) : (
          <div>
            <label className={label} htmlFor="categoryId">
              Рубрика
            </label>
            <select
              id="categoryId"
              name="categoryId"
              required
              defaultValue={article?.categoryId ?? ""}
              className={field}
            >
              <option value="" disabled>
                Выберите рубрику
              </option>
              {(categories ?? []).map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className={label} htmlFor="excerpt">
            Краткое описание
          </label>
          <input
            id="excerpt"
            name="excerpt"
            required
            defaultValue={article?.excerpt ?? ""}
            className={field}
            placeholder="Одно-два предложения - покажется на баннере и в списке"
          />
        </div>

        <div>
          <span className={label}>Текст</span>
          <RichEditor name="content" defaultValue={article?.content ?? ""} />
        </div>

        <div>
          <span className={label}>Обложка (по желанию)</span>
          <input type="hidden" name="coverImage" value={cover} />
          <MediaPicker
            value={cover}
            onChange={setCover}
            mediaItems={mediaItems ?? []}
          />
        </div>

        <fieldset>
          <legend className={label}>Статус</legend>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-sand-800">
              <input
                type="radio"
                name="status"
                value="DRAFT"
                defaultChecked={(article?.status ?? "DRAFT") === "DRAFT"}
                className="accent-clay-600"
              />
              Черновик
            </label>
            <label className="flex items-center gap-2 text-sm text-sand-800">
              <input
                type="radio"
                name="status"
                value="PUBLISHED"
                defaultChecked={article?.status === "PUBLISHED"}
                className="accent-clay-600"
              />
              Опубликовать
            </label>
          </div>
        </fieldset>

        {state?.error ? (
          <p className="text-sm text-red-600">{state.error}</p>
        ) : null}

        <div>
          <Button type="submit" disabled={pending}>
            {pending ? "Сохранение..." : "Сохранить"}
          </Button>
        </div>
      </div>
    </form>
  );
}
