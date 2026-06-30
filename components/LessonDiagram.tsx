import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  Code2,
  Database,
  GitBranch,
  Monitor,
  Server,
  Smartphone
} from "lucide-react";
import type { LessonDiagramType } from "@/lib/lessons";

type LessonDiagramProps = {
  type: LessonDiagramType;
};

const diagramTitles: Record<LessonDiagramType, string> = {
  "html-document": "โครงสร้างเอกสาร HTML",
  "html-page-elements": "ส่วนประกอบในหน้าเว็บ",
  "html-form": "ลำดับการกรอกฟอร์ม",
  "css-box-model": "CSS Box Model",
  "css-flexbox": "Flexbox: Row และ Column",
  "css-responsive": "หน้าเดียวบนสองขนาดจอ",
  "git-workflow": "จากไฟล์ในเครื่องไปสู่ Commit",
  "git-branch": "Branch แยกงานและรวมกลับ",
  "git-push": "Workflow ส่งโปรเจกต์ขึ้น GitHub",
  "react-tree": "React Component Tree",
  "react-props": "Props ไหลจาก Parent ไป Child",
  "react-state": "State เปลี่ยนแล้ว UI เปลี่ยน",
  "next-app-router": "โครงสร้าง Next.js App Router",
  "next-server-client": "Server และ Client Components",
  "next-request-flow": "Flow เมื่อเปิดหน้า Next.js",
  "sql-table": "ตาราง users: Column และ Row",
  "sql-relation": "Relation ระหว่าง User กับ PaymentSlip",
  "sql-query": "SELECT กรองข้อมูลเป็นผลลัพธ์",
  "project-roadmap": "Roadmap ทำเว็บจริง",
  "project-sitemap": "Sitemap เว็บคอร์ส",
  "project-user-flow": "User Flow จากสมัครจนเริ่มเรียน"
};

export function LessonDiagram({ type }: LessonDiagramProps) {
  return (
    <figure className="mt-5 overflow-hidden rounded-lg border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-lavender-50 p-4 sm:p-6">
      <figcaption className="mb-5 flex items-center gap-2 text-sm font-black text-brand-800">
        <Code2 className="h-4 w-4" />
        {diagramTitles[type]}
      </figcaption>
      <DiagramContent type={type} />
    </figure>
  );
}

function DiagramContent({ type }: LessonDiagramProps) {
  if (type === "html-document") return <HtmlDocumentDiagram />;
  if (type === "html-page-elements") return <HtmlPageDiagram />;
  if (type === "html-form") return <HtmlFormDiagram />;
  if (type === "css-box-model") return <BoxModelDiagram />;
  if (type === "css-flexbox") return <FlexboxDiagram />;
  if (type === "css-responsive") return <ResponsiveDiagram />;
  if (type === "git-branch") return <BranchDiagram />;
  if (type === "react-tree") return <ComponentTreeDiagram />;
  if (type === "react-props") return <PropsDiagram />;
  if (type === "react-state") return <StateDiagram />;
  if (type === "next-app-router") return <AppRouterDiagram />;
  if (type === "next-server-client") return <ServerClientDiagram />;
  if (type === "sql-table") return <UsersTable />;
  if (type === "sql-relation") return <RelationDiagram />;
  if (type === "sql-query") return <QueryDiagram />;
  if (type === "project-sitemap") return <SitemapDiagram />;

  const flows: Partial<Record<LessonDiagramType, string[]>> = {
    "git-workflow": ["Working Directory", "Staging Area", "Commit", "GitHub"],
    "git-push": ["แก้ไฟล์", "git add", "git commit", "git push", "GitHub"],
    "next-request-flow": ["Browser", "Route", "Session", "Data", "Response"],
    "project-roadmap": ["เป้าหมาย", "MVP", "Design", "Build", "Test", "Deploy"],
    "project-user-flow": ["สมัคร", "Login", "เลือกคอร์ส", "ชำระเงิน", "เริ่มเรียน"]
  };

  return <FlowDiagram steps={flows[type] || []} />;
}

function Node({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "purple" | "slate" | "green" | "amber" }) {
  const tones = {
    blue: "border-blue-200 bg-white text-brand-800",
    purple: "border-violet-200 bg-white text-violet-800",
    slate: "border-slate-300 bg-white text-slate-800",
    green: "border-emerald-200 bg-white text-emerald-800",
    amber: "border-amber-200 bg-white text-amber-800"
  };

  return (
    <div className={`min-w-0 rounded-lg border px-3 py-3 text-center text-xs font-black shadow-sm sm:text-sm ${tones[tone]}`}>
      {children}
    </div>
  );
}

function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
      {steps.map((step, index) => (
        <div key={step} className="contents sm:flex sm:items-center sm:gap-2">
          <Node tone={index === steps.length - 1 ? "purple" : "blue"}>{step}</Node>
          {index < steps.length - 1 ? (
            <span className="grid place-items-center text-brand-400" aria-hidden="true">
              <ArrowDown className="h-4 w-4 sm:hidden" />
              <ArrowRight className="hidden h-4 w-4 sm:block" />
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function HtmlDocumentDiagram() {
  return (
    <div className="mx-auto max-w-2xl rounded-lg border-2 border-orange-300 bg-orange-50 p-3 text-xs font-black text-orange-900 sm:p-5 sm:text-sm">
      &lt;html&gt;
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-300 bg-white p-3">
          &lt;head&gt;
          <div className="mt-2 rounded bg-slate-100 p-2 text-slate-600">title, meta</div>
        </div>
        <div className="rounded-lg border border-brand-200 bg-white p-3">
          &lt;body&gt;
          <div className="mt-2 space-y-2">
            <div className="rounded bg-brand-100 p-2">heading</div>
            <div className="rounded bg-violet-100 p-2">paragraph</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HtmlPageDiagram() {
  return (
    <div className="mx-auto max-w-xl overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm">
      <div className="flex items-center gap-1 border-b bg-slate-100 px-3 py-2"><i className="h-2 w-2 rounded-full bg-rose-400" /><i className="h-2 w-2 rounded-full bg-amber-400" /><i className="h-2 w-2 rounded-full bg-emerald-400" /></div>
      <div className="space-y-3 p-4 sm:p-6">
        <div className="rounded bg-brand-700 px-4 py-3 text-lg font-black text-white">Heading: ชื่อคอร์ส</div>
        <div className="rounded bg-slate-100 p-3 text-sm font-bold text-slate-600">Paragraph: รายละเอียดที่ช่วยให้ผู้อ่านเข้าใจ</div>
        <div className="grid h-24 place-items-center rounded border-2 border-dashed border-lavender-300 bg-lavender-50 text-sm font-black text-lavender-700">Image</div>
        <span className="inline-flex text-sm font-black text-brand-700 underline">Link: ดูบทเรียน</span>
      </div>
    </div>
  );
}

function HtmlFormDiagram() {
  return (
    <div className="mx-auto max-w-md space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      {["ชื่อที่แสดง", "อีเมล"].map((label) => <div key={label}><div className="mb-1 text-xs font-black text-slate-700">Label: {label}</div><div className="h-10 rounded-lg border border-slate-300 bg-slate-50" /></div>)}
      <div className="rounded-lg bg-gradient-to-r from-brand-600 to-lavender-600 px-4 py-3 text-center text-sm font-black text-white">Button: ส่งข้อมูล</div>
    </div>
  );
}

function BoxModelDiagram() {
  return (
    <div className="mx-auto max-w-xl rounded-lg border-2 border-dashed border-violet-300 bg-violet-50 p-3 text-center text-xs font-black text-violet-800 sm:p-5">MARGIN
      <div className="mt-2 rounded-lg border-4 border-brand-500 bg-brand-50 p-3 text-brand-800">BORDER
        <div className="mt-2 rounded-lg bg-blue-200 p-3">PADDING
          <div className="mt-2 rounded-lg bg-white p-5 text-slate-800 shadow-sm">CONTENT</div>
        </div>
      </div>
    </div>
  );
}

function FlexboxDiagram() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-brand-200 bg-white p-4"><p className="mb-3 text-xs font-black text-brand-700">flex-direction: row</p><div className="flex gap-2">{[1, 2, 3].map((n) => <div key={n} className="grid h-12 flex-1 place-items-center rounded bg-brand-100 font-black text-brand-700">{n}</div>)}</div></div>
      <div className="rounded-lg border border-violet-200 bg-white p-4"><p className="mb-3 text-xs font-black text-violet-700">flex-direction: column</p><div className="flex flex-col gap-2">{[1, 2, 3].map((n) => <div key={n} className="grid h-10 place-items-center rounded bg-violet-100 font-black text-violet-700">{n}</div>)}</div></div>
    </div>
  );
}

function ResponsiveDiagram() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-end">
      <div className="w-36"><div className="mb-2 flex items-center justify-center gap-2 text-xs font-black text-slate-700"><Smartphone className="h-4 w-4" /> Mobile</div><div className="space-y-2 rounded-[20px] border-4 border-slate-800 bg-white p-3">{[1, 2, 3].map((n) => <div key={n} className="h-10 rounded bg-brand-100" />)}</div></div>
      <div className="w-full max-w-sm"><div className="mb-2 flex items-center justify-center gap-2 text-xs font-black text-slate-700"><Monitor className="h-4 w-4" /> Desktop</div><div className="grid grid-cols-3 gap-2 rounded-lg border-4 border-slate-800 bg-white p-4">{[1, 2, 3].map((n) => <div key={n} className="h-20 rounded bg-violet-100" />)}</div></div>
    </div>
  );
}

function BranchDiagram() {
  return (
    <div className="mx-auto max-w-xl space-y-5 text-xs font-black">
      <div className="flex items-center gap-2"><GitBranch className="h-5 w-5 text-slate-700" /><span className="w-16 text-slate-700">main</span><div className="h-1 flex-1 rounded bg-slate-700" /><i className="h-4 w-4 rounded-full bg-slate-800" /></div>
      <div className="ml-8 flex items-center gap-2 sm:ml-20"><span className="w-16 text-violet-700">feature</span><div className="h-1 flex-1 rounded bg-violet-500" /><i className="h-4 w-4 rounded-full bg-violet-600" /><ArrowRight className="h-4 w-4 text-violet-500" /><span className="rounded bg-violet-100 px-2 py-1 text-violet-700">merge</span></div>
    </div>
  );
}

function ComponentTreeDiagram() {
  return <TreeDiagram root="App" branches={[{ title: "Header", children: ["Logo", "Nav"] }, { title: "CourseList", children: ["CourseCard", "CourseCard"] }]} />;
}

function TreeDiagram({ root, branches }: { root: string; branches: { title: string; children: string[] }[] }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mx-auto max-w-40"><Node tone="purple">{root}</Node></div><ArrowDown className="mx-auto my-2 h-5 w-5 text-violet-400" />
      <div className="grid gap-4 sm:grid-cols-2">{branches.map((branch) => <div key={branch.title}><Node>{branch.title}</Node><ArrowDown className="mx-auto my-2 h-4 w-4 text-brand-400" /><div className="grid grid-cols-2 gap-2">{branch.children.map((child, index) => <Node key={`${child}-${index}`} tone="slate">{child}</Node>)}</div></div>)}</div>
    </div>
  );
}

function PropsDiagram() {
  return (
    <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
      <Node tone="purple">App (Parent)<div className="mt-2 text-[11px] font-bold">title + minutes</div></Node>
      <div className="flex items-center justify-center gap-2 text-xs font-black text-brand-600"><span>props</span><ArrowDown className="h-4 w-4 sm:hidden" /><ArrowRight className="hidden h-4 w-4 sm:block" /></div>
      <Node>CourseCard (Child)<div className="mt-2 text-[11px] font-bold">อ่านและแสดงข้อมูล</div></Node>
    </div>
  );
}

function StateDiagram() {
  return <FlowDiagram steps={["ผู้ใช้กดปุ่ม", "Event", "setState", "React render", "UI ค่าใหม่"]} />;
}

function AppRouterDiagram() {
  return (
    <div className="mx-auto max-w-xl space-y-2 rounded-lg border border-slate-200 bg-white p-4 font-mono text-xs font-bold text-slate-700 sm:text-sm">
      <div className="font-black text-slate-950">app/</div>
      <div className="pl-4">├─ <b>layout.tsx</b> <span className="text-slate-400">กรอบร่วม</span></div>
      <div className="pl-4">├─ <b>page.tsx</b> <span className="text-brand-600">/</span></div>
      <div className="pl-4">└─ courses/</div>
      <div className="pl-8">├─ <b>page.tsx</b> <span className="text-brand-600">/courses</span></div>
      <div className="pl-8">└─ [slug]/</div>
      <div className="pl-12">└─ <b>page.tsx</b> <span className="text-brand-600">/courses/:slug</span></div>
    </div>
  );
}

function ServerClientDiagram() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-brand-200 bg-white p-5"><Server className="h-6 w-6 text-brand-700" /><h3 className="mt-3 font-black text-brand-900">Server Component</h3><ul className="mt-3 space-y-2 text-xs font-bold text-slate-600"><li>อ่าน session / database</li><li>เก็บ secret ฝั่ง server</li><li>ส่งข้อมูลเท่าที่จำเป็น</li></ul></div>
      <div className="rounded-lg border border-violet-200 bg-white p-5"><Monitor className="h-6 w-6 text-violet-700" /><h3 className="mt-3 font-black text-violet-900">Client Component</h3><ul className="mt-3 space-y-2 text-xs font-bold text-slate-600"><li>onClick และ event</li><li>useState</li><li>Browser API</li></ul></div>
    </div>
  );
}

function UsersTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-[420px] text-left text-xs sm:text-sm"><thead className="bg-brand-700 text-white"><tr>{["id (column)", "name (column)", "membership (column)"].map((h) => <th key={h} className="px-3 py-3">{h}</th>)}</tr></thead><tbody className="font-bold text-slate-700">{[["1", "มะลิ", "free"], ["2", "นนท์", "paid"]].map((row, index) => <tr key={row[0]} className={index ? "bg-brand-50" : ""}>{row.map((cell) => <td key={cell} className="px-3 py-3">{cell}</td>)}</tr>)}</tbody></table>
      <div className="border-t px-3 py-2 text-center text-xs font-black text-brand-700">แต่ละแนวนอนคือ 1 row</div>
    </div>
  );
}

function RelationDiagram() {
  return (
    <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
      <MiniTable title="User" rows={["id (PK)", "name", "email"]} />
      <div className="flex items-center justify-center gap-2 text-xs font-black text-brand-700"><span>1</span><ArrowDown className="h-4 w-4 md:hidden" /><ArrowRight className="hidden h-4 w-4 md:block" /><span>หลาย</span></div>
      <MiniTable title="PaymentSlip" rows={["id (PK)", "userId (FK)", "status"]} />
    </div>
  );
}

function MiniTable({ title, rows }: { title: string; rows: string[] }) {
  return <div className="overflow-hidden rounded-lg border border-slate-200 bg-white"><div className="bg-slate-900 px-4 py-3 font-black text-white"><Database className="mr-2 inline h-4 w-4" />{title}</div>{rows.map((row) => <div key={row} className="border-t px-4 py-2 text-xs font-bold text-slate-600">{row}</div>)}</div>;
}

function QueryDiagram() {
  return (
    <div className="grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr]">
      <div><p className="mb-2 text-xs font-black text-slate-600">users ทั้งหมด</p><UsersTable /></div>
      <div className="flex items-center justify-center gap-2 text-xs font-black text-emerald-700"><span>WHERE free</span><ArrowDown className="h-4 w-4 lg:hidden" /><ArrowRight className="hidden h-4 w-4 lg:block" /></div>
      <div className="rounded-lg border border-emerald-200 bg-white p-4"><p className="text-xs font-black text-emerald-700">ผลลัพธ์</p><div className="mt-3 grid grid-cols-2 rounded bg-emerald-50 p-3 text-xs font-bold text-slate-700"><span>มะลิ</span><span>free</span></div></div>
    </div>
  );
}

function SitemapDiagram() {
  return <TreeDiagram root="Home" branches={[{ title: "Courses", children: ["Course Detail", "Lesson"] }, { title: "Account", children: ["Login", "Dashboard"] }]} />;
}
