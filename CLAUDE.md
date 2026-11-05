# CLAUDE.md — MECSTEAM Website

ไฟล์นี้คือบริบทที่ Claude Code จะอ่านอัตโนมัติทุกครั้งที่เปิดโปรเจกต์นี้ (ต้องอยู่ที่ root ของ repo)

ก่อนเริ่มงานทุกครั้ง อ่าน:
1. `docs/PRINCIPLES.md` — กฎการทำงานของ AI ทุกตัว (บังคับ)
2. `docs/FEATURE_MAP.md` — ฟีเจอร์, หลักฐานว่าทำงาน, **Business facts** (แหล่งข้อมูลบริษัทที่เดียว)

**Done means** = Guardian checklist ผ่าน + push ขึ้น `main` + เปิด `https://mecsteam.com` แล้วเห็นของใหม่ (`Ctrl+Shift+R`) + Console ไม่มี error + อัปเดต README / FEATURE_MAP · **ปิดงานตอน push ไม่ได้** (เคยค้างโค้ดไม่ขึ้นเว็บมาแล้ว)

## เกี่ยวกับโปรเจกต์

เว็บไซต์บริษัท B2B **MECSTEAM** — รับเหมาติดตั้งระบบเครื่องกลและระบบท่อไอน้ำ
เป็น Single Page เขียนด้วย HTML / CSS / JavaScript ล้วน **ไม่ใช้ Framework และไม่ใช้ build tool**

เจ้าของโปรเจกต์ชื่อ **นัวร์ (Noir)** ทำเว็บนี้เป็นผลงานสำหรับ Portfolio สาย IT / Digital Media

## โครงสร้างไฟล์

```
MID/
├── index.html          โครงสร้างหน้าเว็บ (อยู่ชั้นนอกสุดเสมอ เพื่อให้ GitHub Pages ใช้ได้)
├── CSS/style.css       Design Token + Layout + Responsive
├── JAVASCRIPT/script.js  Smart Header · Scrollspy · Conditional CTA
├── README.md
├── CLAUDE.md
├── docs/PRINCIPLES.md  กฎของทีม AI
├── docs/FEATURE_MAP.md ฟีเจอร์ + Business facts
├── CNAME               โดเมน mecsteam.com
└── .gitignore
```

## กฎที่ต้องรักษาไว้

- **ตั้งชื่อไฟล์ใหม่เป็นตัวพิมพ์เล็กเสมอ** — GitHub Pages รันบน Linux ที่แยกตัวพิมพ์เล็ก-ใหญ่
- **ห้ามใส่ค่าระยะเป็นตัวเลขสดในโค้ด** ให้ใช้ตัวแปรจากบล็อก `:root` ของ `style.css` เท่านั้น (ระบบ 8pt grid)
- **Animation ให้ใช้ `transform` และ `opacity` เท่านั้น** ห้ามใช้ `font-size` / `width` / `top` เพราะทำให้เกิด reflow แล้วหน้าเว็บกระตุก
- ขนาดตัวอักษรใช้ `clamp()` ไม่เขียน media query แยกทีละขนาด
- ทุก Section ต้องมีทางออก ห้ามมีหน้าที่ผู้ใช้เข้าไปแล้วไปต่อไม่ได้ (No Dead-End)
- ข้อมูลสำคัญห้ามซ่อนไว้ใต้ `:hover` อย่างเดียว ต้องมี fallback สำหรับจอสัมผัสเสมอ

## ตัวแปรที่ปรับบ่อย (อยู่ใน `:root` ของ style.css)

| ตัวแปร | ความหมาย |
| --- | --- |
| `--dur-slide` | ความเร็วสไลด์ของ Header และ Overlay (transform ล้วน ไม่มี opacity) |
| `--ease-slide` | เส้นโค้งจังหวะของสไลด์นั้น |
| `--delay-hide` / `--delay-show` | หน่วงก่อน Header/Overlay เริ่มเลื่อนซ่อน/เลื่อนกลับมาโชว์ |
| `--c-accent` | สีหลักของแบรนด์ |
| `--container` | ความกว้างสูงสุดของเนื้อหา — เนื้อหาจัดกึ่งกลางด้วยตัวแปรนี้เสมอทุก viewport (ไม่มีการยึดขอบซ้ายที่จอกว้างอีกต่อไป) |

## พฤติกรรมหลักของ JavaScript

| ฟีเจอร์ | ลอจิก |
| --- | --- |
| Smart Sticky Header | เลื่อนลงเกิน 2 เท่าของความสูง header → สไลด์ขึ้นซ่อนพ้นจอ (translateY -100%) · เลื่อนขึ้น → สไลด์ลงกลับมา (transform ล้วน ไม่มี opacity) |
| Scrollspy | ใช้ "เส้นตัดสิน" ที่ 28% จากขอบบนจอ เลือก section **สุดท้าย** ที่ผ่านเส้น (ห้ามกลับไปใช้ IntersectionObserver แบบเรียงตาม top เพราะทำให้ข้าม section) |
| Overlay Sidebar | หน้าที่หลักคือบอกว่ากำลังอ่านอยู่ตรงไหน จึงผูกกับ **ขอบเขต Hero เท่านั้น** (ไม่ใช่ทิศทางสกรอลล์แบบ Header เพราะจะทำให้หายวับทุกครั้งที่เลื่อนขึ้นนิดเดียว ขัดหน้าที่ตัวเอง): พ้น Hero แล้ว → `.sidebar__panel` สไลด์ออกไปทางขวา (โชว์ค้างไว้) · เลื่อนกลับเข้า Hero → สไลด์ไปทางซ้ายพ้นกรอบตัวเอง (ซ่อนจริง ไม่ใช่แค่ขยับนิดเดียว) · ตัว `.sidebar` เอง `position:fixed;left:var(--s-4)` เกาะขอบซ้ายจอจริง (viewport) ตายตัว ไม่ผูกกับ container — ซูมเข้า/ออกแค่ไหนก็ยังชิดขอบจอเท่าเดิม และปักกึ่งกลางแนวตั้งตลอด (คนละกลไกกับการโชว์/ซ่อน) · `display:none` เมื่อจอ ≤1024px |
| Conditional CTA | ปุ่มลอยเปลี่ยนข้อความตาม section ที่กำลังอ่าน |

## วิธีทดสอบ

เปิด `index.html` ด้วย Live Server แล้วเช็คทุกครั้งที่แก้:

1. ย่อจอเหลือ 375px — ต้องไม่มี horizontal scroll
2. เลื่อนขึ้น-ลงผ่านทุก section — Scrollspy ต้องไม่ข้ามหัวข้อ
3. เปิด Console — ต้องไม่มี error

4. จอ 1366 / 1920 / 2560px — element `fixed` ต้องไม่ทับการ์ด

## ที่ยังไม่เสร็จ

ดูรายการเต็ม + ลำดับความสำคัญใน `docs/FEATURE_MAP.md` → "งานค้าง" (มาจาก Audit 5 พ.ย. 2026)

- ข้อมูลติดต่อใส่ของจริงแล้ว แต่อีเมลยังเป็น Gmail ส่วนตัว (Audit #2)
- `--dur-slide` ยังเป็น 2000ms เกินช่วง 150–320ms (Audit #4)
- รูปภาพผลงาน + Hero ยังเป็นกล่อง placeholder (รอข้อมูลจากเจ้าของบริษัท)
