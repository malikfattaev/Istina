# Graph Report - .  (2026-07-01)

## Corpus Check
- 113 files · ~67,077 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 805 nodes · 1067 edges · 53 communities (41 shown, 12 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 1% AMBIGUOUS · INFERRED: 72 edges (avg confidence: 0.81)
- Token cost: 306,240 input · 102,079 output

## Community Hubs (Navigation)
- [[_COMMUNITY_ERP Auth & EmployeeMessage Admin|ERP: Auth & Employee/Message Admin]]
- [[_COMMUNITY_Faith & Prayers Content|Faith & Prayers Content]]
- [[_COMMUNITY_Articles, Saints & Feasts|Articles, Saints & Feasts]]
- [[_COMMUNITY_UI Package & Web Config|UI Package & Web Config]]
- [[_COMMUNITY_Web Home, Nav & Daily Verse|Web Home, Nav & Daily Verse]]
- [[_COMMUNITY_Media Storage & Upload API|Media Storage & Upload API]]
- [[_COMMUNITY_ERP Article & Media Management|ERP: Article & Media Management]]
- [[_COMMUNITY_webpackage.json Dependencies|web/package.json Dependencies]]
- [[_COMMUNITY_Root package.json Scripts|Root package.json Scripts]]
- [[_COMMUNITY_dbpackage.json|db/package.json]]
- [[_COMMUNITY_Turborepo Pipeline Config|Turborepo Pipeline Config]]
- [[_COMMUNITY_ERP Admin Components (duplicate cluster)|ERP Admin Components (duplicate cluster)]]
- [[_COMMUNITY_Bible Reading Feature|Bible Reading Feature]]
- [[_COMMUNITY_UI ButtonContainer Components|UI Button/Container Components]]
- [[_COMMUNITY_App Shell & Navigation (secondary)|App Shell & Navigation (secondary)]]
- [[_COMMUNITY_Admin Shell & Rich Editor|Admin Shell & Rich Editor]]
- [[_COMMUNITY_Admin Dashboard & DB SeedMigrations|Admin Dashboard & DB Seed/Migrations]]
- [[_COMMUNITY_tsconfigbase Compiler Options|tsconfig/base Compiler Options]]
- [[_COMMUNITY_erppackage.json Dependencies|erp/package.json Dependencies]]
- [[_COMMUNITY_@istinaconfig Package|@istina/config Package]]
- [[_COMMUNITY_erppackage.json devDependencies|erp/package.json devDependencies]]
- [[_COMMUNITY_Railway Deploy Config (erp)|Railway Deploy Config (erp)]]
- [[_COMMUNITY_Railway Deploy Config (web)|Railway Deploy Config (web)]]
- [[_COMMUNITY_Railway Deploy Config (root)|Railway Deploy Config (root)]]
- [[_COMMUNITY_tsconfignextjs Preset|tsconfig/nextjs Preset]]
- [[_COMMUNITY_Monorepo Root Pipeline|Monorepo Root Pipeline]]
- [[_COMMUNITY_erp Next.jsESLint Config|erp Next.js/ESLint Config]]
- [[_COMMUNITY_erptsconfig.json|erp/tsconfig.json]]
- [[_COMMUNITY_tsconfigreact-library Preset|tsconfig/react-library Preset]]
- [[_COMMUNITY_Contact Form Route & Messages|Contact Form Route & Messages]]
- [[_COMMUNITY_dbturbo.json|db/turbo.json]]
- [[_COMMUNITY_Admin Session Sign-out|Admin Session Sign-out]]
- [[_COMMUNITY_dbtsconfig.json|db/tsconfig.json]]
- [[_COMMUNITY_erppackage.json Scripts|erp/package.json Scripts]]
- [[_COMMUNITY_erp App Layout|erp App Layout]]
- [[_COMMUNITY_Prisma DB Seed Script|Prisma DB Seed Script]]
- [[_COMMUNITY_weblibstorage.ts|web/lib/storage.ts]]
- [[_COMMUNITY_Addiction Warning Imagery|Addiction Warning Imagery]]
- [[_COMMUNITY_Media Route Handlers|Media Route Handlers]]
- [[_COMMUNITY_create-admin Script|create-admin Script]]
- [[_COMMUNITY_Articles & Content Sanitization|Articles & Content Sanitization]]
- [[_COMMUNITY_Avatar Utils|Avatar Utils]]
- [[_COMMUNITY_MediaStats Type|MediaStats Type]]
- [[_COMMUNITY_Prisma Client Singleton|Prisma Client Singleton]]
- [[_COMMUNITY_Railway Config (duplicate)|Railway Config (duplicate)]]
- [[_COMMUNITY_articles formatDate|articles formatDate]]
- [[_COMMUNITY_Health Route GET (duplicate)|Health Route GET (duplicate)]]
- [[_COMMUNITY_VerificationToken Table Migration|VerificationToken Table Migration]]
- [[_COMMUNITY_SmoothScroll Component|SmoothScroll Component]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 23 edges
2. `requireAdmin()` - 18 edges
3. `scripts` - 15 edges
4. `compilerOptions` - 15 edges
5. `faithTopics` - 13 edges
6. `prayerSets` - 12 edges
7. `scripts` - 10 edges
8. `POST()` - 9 edges
9. `HoverArrow()` - 9 edges
10. `AdminLayout()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `getObject` --conceptually_related_to--> `banner.jpeg - Orthodox cathedral with blue-and-gold bell tower and fountain`  [AMBIGUOUS]
  erp/lib/storage.ts → web/public/banner.jpeg
- `GitHub Actions CI workflow` --conceptually_related_to--> `turbo.json (Turborepo pipeline config)`  [INFERRED]
  .github/workflows/ci.yml → turbo.json
- `rubricIcon()` --shares_data_with--> `categories (seed data)`  [INFERRED]
  erp/lib/rubric-icons.ts → packages/db/prisma/seed.ts
- `uploadFile()` --conceptually_related_to--> `Media table`  [INFERRED]
  erp/lib/upload-client.ts → packages/db/prisma/migrations/20260620060000_media/migration.sql
- `Brand()` --calls--> `cn()`  [EXTRACTED]
  web/components/app-shell.tsx → packages/ui/src/cn.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **ERP admin section pages sharing AdminLayout shell and Prisma-backed dashboard data** — admin_layout_adminlayout, admin_page_dashboardpage, employees_page_employeespage, media_page_mediapage, messages_page_messagespage [INFERRED 0.85]
- **Monorepo build/deploy configuration chain (workspace, turbo pipeline, CI, Railway deploy)** — istina_pnpm_workspace, istina_turbo, workflows_ci, istina_railway [INFERRED 0.85]
- **Substance-harm warning images used as article content (alcohol and nicotine)** — content_alco, content_nicotine, concept_addiction_warning_imagery [INFERRED 0.75]
- **Media upload pipeline (client convert -> API upload -> storage -> DB -> proxy read)** — upload_client_uploadfile, upload_route_post, media_mediaitem, key_route_get [INFERRED 0.85]
- **Auth session lifecycle across login, guarded actions, and logout** — actions_signinaction, auth_createsession, auth_requireadmin, actions_signout, auth_destroysession [EXTRACTED 1.00]
- **Article authoring UI composed of form, rich text editor, and media picker** — article_form_articleform, rich_editor_richeditor, media_picker_mediapicker, article_actions_savearticle [EXTRACTED 1.00]
- **Message inbox lifecycle (status update / delete / schema)** — lib_message_actions_setmessagestatus, lib_message_actions_deletemessage, migration_messages_message_table, migration_message_join_join_enum_value [INFERRED 0.85]
- **Media upload pipeline (client WebP conversion -> upload API -> S3 storage -> Media table)** — lib_upload_client_uploadfile, lib_upload_client_towebp, lib_storage_putobject, migration_media_media_table [INFERRED 0.85]
- **Shared monorepo config consumed by web/erp/db packages** — config_package_istina_config, tsconfig_base_config, nextjs_nextjs_config, react_library_react_library_config, tailwind_preset_design_tokens, db_package_istina_db [EXTRACTED 1.00]
- **Next.js dynamic route pages with generateMetadata pattern** — page_chapterpage, page_generatemetadata_chapter, page_rubricpage, page_generatemetadata_rubric, page_articlepage, page_generatemetadata_article [INFERRED 0.85]
- **Форум -> клуб ребрендинг: редиректы и новые маршруты** — web_next_config_redirects, page_rubricpage, page_articlepage [INFERRED 0.75]
- **Shared UI button component (cva variants + cn merge) consumed across pages** — button_button, button_buttonvariants, cn_cn, page_homepage [EXTRACTED 1.00]
- **Detail-page navigation pattern (slug lookup + prev/next + generateStaticParams)** — set_page_prayersetpage, topic_page_faithtopicpage, prayers_getprayerset, faith_getfaithtopic [INFERRED 0.85]
- **Tashkent-timezone daily content rotation (verse of day, saints of day, feast-of-day highlight)** — daily_verse_tashkentdaynumber, saints_tashkenttoday, prazdniki_page_tashkentdaymonth, daily_verse_getdailyverse, saints_getdailycommemoration [INFERRED 0.85]
- **AppShell sidebar navigation aggregating primary nav, rubrics, and useful links** — app_shell_sidebarcontent, navigation_primarynav, navigation_rubrics, navigation_usefullinks, rubrics_articlerubrics [EXTRACTED 1.00]

## Communities (53 total, 12 thin omitted)

### Community 0 - "ERP: Auth & Employee/Message Admin"
Cohesion: 0.05
Nodes (49): AdminLayout(), AddEmployeeModal(), EmployeeData, EmployeeForm(), Force-dynamic rendering pattern for session/DB-backed admin pages, main (create-admin script), Avatar(), EmployeesPage() (+41 more)

### Community 1 - "Faith & Prayers Content"
Cohesion: 0.06
Nodes (52): getPublishedArticles, «Кратчайший катихизис» игумена Силуана (Туманова), azbyka.ru, azbyka.ru molitvoslov (prayer book source), Церковь (Church: unity, holiness, catholicity, apostolicity), Десять заповедей (Ten Commandments), Молитва Господня / Отче наш (Lord's Prayer), Правило прп. Серафима Саровского (Rule of St. Seraphim of Sarov), Псалом 50 (Psalm 50) (+44 more)

### Community 2 - "Articles, Saints & Feasts"
Cohesion: 0.05
Nodes (43): metadata, resources, values, generateMetadata(), PageProps, RubricPage(), categories, Category (+35 more)

### Community 3 - "UI Package & Web Config"
Cohesion: 0.05
Nodes (36): layout metadata export, RootLayout component, dependencies, class-variance-authority, clsx, tailwind-merge, devDependencies, @istina/config (+28 more)

### Community 4 - "Web Home, Nav & Daily Verse"
Cohesion: 0.08
Nodes (27): serif, AppShell(), Brand(), SidebarLink(), SmoothScroll(), DailyVerse, fallback, formatReference() (+19 more)

### Community 5 - "Media Storage & Upload API"
Cohesion: 0.08
Nodes (31): LoginState, signInAction, authenticate, createSession, getSession, SessionUser, content/main.jpeg (deleted, formerly site banner/hero image), content/street.jpg (deleted, formerly street/entrance image) (+23 more)

### Community 6 - "ERP: Article & Media Management"
Cohesion: 0.11
Nodes (22): statusLabel, ArticleData, ArticleForm(), Category, translit, MediaLibrary(), MediaPicker(), EditArticlePage() (+14 more)

### Community 7 - "web/package.json Dependencies"
Cohesion: 0.06
Nodes (32): extends, dependencies, @aws-sdk/client-s3, @istina/db, @istina/ui, lenis, lucide-react, next (+24 more)

### Community 8 - "Root package.json Scripts"
Cohesion: 0.07
Nodes (29): description, engines, node, name, packageManager, prettier, plugins, printWidth (+21 more)

### Community 9 - "db/package.json"
Cohesion: 0.07
Nodes (28): dependencies, bcryptjs, @prisma/client, devDependencies, @istina/config, prisma, tsx, @types/bcryptjs (+20 more)

### Community 10 - "Turborepo Pipeline Config"
Cohesion: 0.07
Nodes (28): devDependencies, prettier, prettier-plugin-tailwindcss, turbo, typescript, dependsOn, env, outputs (+20 more)

### Community 11 - "ERP Admin Components (duplicate cluster)"
Cohesion: 0.08
Nodes (28): AddEmployeeModal, Dialog, articleSchema, deleteArticle, saveArticle, ArticleForm, slugify, translit table (+20 more)

### Community 12 - "Bible Reading Feature"
Cohesion: 0.13
Nodes (19): Group(), metadata, ChapterPage(), ChapterRef, generateMetadata(), neighbour(), PageProps, BibleBook (+11 more)

### Community 13 - "UI Button/Container Components"
Cohesion: 0.10
Nodes (23): Button component, ButtonProps interface, buttonVariants (cva), cn() class merge utility, Container component, AboutPage component, ArticlePage component, BibliaPage component (+15 more)

### Community 14 - "App Shell & Navigation (secondary)"
Cohesion: 0.10
Nodes (22): AppShell, Brand, NavGroup, SidebarContent, SidebarLink, bibleBooks, booksOfGroup, getBook (+14 more)

### Community 15 - "Admin Shell & Rich Editor"
Cohesion: 0.16
Nodes (11): AdminShell(), Category, ShellUser, SidebarLink(), Btn(), COLORS, RichEditor(), ButtonProps (+3 more)

### Community 16 - "Admin Dashboard & DB Seed/Migrations"
Cohesion: 0.11
Nodes (19): DashboardPage(), QuickLink(), @istina/config package, @istina/db package, db tsconfig, db turbo.json build task config, EditArticlePage (erp/app/(admin)/articles/[id]/page.tsx), icons (+11 more)

### Community 17 - "tsconfig/base Compiler Options"
Cohesion: 0.11
Nodes (18): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, lib, module, moduleResolution (+10 more)

### Community 18 - "erp/package.json Dependencies"
Cohesion: 0.11
Nodes (18): dependencies, @aws-sdk/client-s3, image-size, @istina/db, @istina/ui, jose, lucide-react, next (+10 more)

### Community 19 - "@istina/config Package"
Cohesion: 0.18
Nodes (10): devDependencies, tailwindcss, exports, ./tailwind, ./tsconfig/*, files, name, private (+2 more)

### Community 20 - "erp/package.json devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, autoprefixer, eslint, eslint-config-next, @istina/config, postcss, tailwindcss, @types/node (+3 more)

### Community 21 - "Railway Deploy Config (erp)"
Cohesion: 0.18
Nodes (10): build, builder, dockerfilePath, deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType (+2 more)

### Community 22 - "Railway Deploy Config (web)"
Cohesion: 0.18
Nodes (10): build, builder, dockerfilePath, deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType (+2 more)

### Community 23 - "Railway Deploy Config (root)"
Cohesion: 0.20
Nodes (9): build, builder, dockerfilePath, deploy, healthcheckPath, healthcheckTimeout, restartPolicyMaxRetries, restartPolicyType (+1 more)

### Community 24 - "tsconfig/nextjs Preset"
Cohesion: 0.20
Nodes (9): compilerOptions, allowJs, jsx, lib, noEmit, plugins, display, extends (+1 more)

### Community 25 - "Monorepo Root Pipeline"
Cohesion: 0.31
Nodes (7): configurations, version, Turborepo + pnpm workspace monorepo build pipeline, Root package.json (istina monorepo), railway.json (Railway deploy config), turbo.json (Turborepo pipeline config), GitHub Actions CI workflow

### Community 26 - "erp Next.js/ESLint Config"
Cohesion: 0.22
Nodes (6): extends, monorepoRoot, nextConfig, name, private, version

### Community 27 - "erp/tsconfig.json"
Cohesion: 0.25
Nodes (7): compilerOptions, baseUrl, paths, exclude, extends, include, @/*

### Community 28 - "tsconfig/react-library Preset"
Cohesion: 0.25
Nodes (7): compilerOptions, jsx, lib, noEmit, display, extends, $schema

### Community 29 - "Contact Form Route & Messages"
Cohesion: 0.38
Nodes (5): POST(), categories, createMessage(), MessageInput, SubmitResult

### Community 30 - "db/turbo.json"
Cohesion: 0.29
Nodes (6): cache, outputs, extends, $schema, tasks, build

### Community 31 - "Admin Session Sign-out"
Cohesion: 0.33
Nodes (6): signOut, AdminShell, NavGroup, SidebarContent, SidebarLink, destroySession

### Community 32 - "db/tsconfig.json"
Cohesion: 0.33
Nodes (5): compilerOptions, noEmit, exclude, extends, include

### Community 33 - "erp/package.json Scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, start, typecheck

### Community 36 - "web/lib/storage.ts"
Cohesion: 0.67
Nodes (3): getObject(), s3(), StoredObject

### Community 37 - "Addiction Warning Imagery"
Cohesion: 1.00
Nodes (3): Addiction warning imagery (alcohol/nicotine harm illustration), alco.webp (man drinking alcohol among bottles), nicotine.jpg (open cigarette pack with 'Smoking kills' warning)

### Community 38 - "Media Route Handlers"
Cohesion: 0.67
Nodes (3): GET /api/health handler, GET /api/media/[...key] handler, POST /api/contact handler

## Ambiguous Edges - Review These
- `Avatar()` → `RowActions()`  [AMBIGUOUS]
  erp/app/(admin)/employees/page.tsx · relation: semantically_similar_to
- `DashboardPage()` → `EditArticlePage (erp/app/(admin)/articles/[id]/page.tsx)`  [AMBIGUOUS]
  erp/app/(admin)/page.tsx · relation: references
- `Root package.json (istina monorepo)` → `railway.json (Railway deploy config)`  [AMBIGUOUS]
  railway.json · relation: conceptually_related_to
- `getObject` → `banner.jpeg - Orthodox cathedral with blue-and-gold bell tower and fountain`  [AMBIGUOUS]
  web/lib/storage.ts · relation: conceptually_related_to
- `getPublishedArticles` → `createMessage`  [AMBIGUOUS]
  web/lib/messages.ts · relation: conceptually_related_to
- `getArticle` → `sanitizeContent`  [AMBIGUOUS]
  web/lib/sanitize.ts · relation: conceptually_related_to

## Knowledge Gaps
- **387 isolated node(s):** `version`, `configurations`, `extends`, `roleLabel`, `categoryLabel` (+382 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Avatar()` and `RowActions()`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **What is the exact relationship between `DashboardPage()` and `EditArticlePage (erp/app/(admin)/articles/[id]/page.tsx)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Root package.json (istina monorepo)` and `railway.json (Railway deploy config)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `getObject` and `banner.jpeg - Orthodox cathedral with blue-and-gold bell tower and fountain`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `getPublishedArticles` and `createMessage`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `getArticle` and `sanitizeContent`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `Admin Shell & Rich Editor` to `Articles, Saints & Feasts`, `Bible Reading Feature`, `Web Home, Nav & Daily Verse`, `ERP: Article & Media Management`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._