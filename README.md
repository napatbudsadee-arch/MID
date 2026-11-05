# MECSTEAM — เว็บไซต์บริษัทรับเหมาติดตั้งระบบเครื่องกลและระบบท่อไอน้ำ

เว็บไซต์ B2B แบบ Single Page สไตล์ Minimal/Clean เขียนด้วย HTML / CSS / JavaScript ล้วน ไม่ใช้ Framework

## ฟีเจอร์หลัก

| ฟีเจอร์ | สิ่งที่แก้ |
| --- | --- |
| **Smart Sticky Header** | จางหายเมื่อเลื่อนลง คืนพื้นที่จอให้เนื้อหา · จางกลับมาเมื่อเลื่อนขึ้น |
| **Scrollspy Overlay** | บอกตำแหน่งผู้ใช้แบบเรียลไทม์ ลดอาการ Spatial Disorientation |
| **Conditional CTA** | ปุ่มลอยเปลี่ยนข้อความตาม Section ให้ตรงกับความพร้อมของผู้ใช้ |
| **Progressive Disclosure** | การ์ดผลงานเผยรายละเอียดตอน hover พร้อม fallback สำหรับจอสัมผัส |
| **Fluid Typography** | ใช้ `clamp()` ให้ตัวอักษรอ่านได้ทุกขนาดจอโดยไม่ต้องเขียน media query ทีละขนาด |

## โครงสร้างไฟล์

```
.
├── index.html              # โครงสร้างหน้าเว็บ (HTML)
├── style.css               # Design Token + Layout + Responsive
├── script.js               # Smart Header · Scrollspy · Conditional CTA
├── figma-setup-guide.md    # คู่มือแปลงโครงนี้ไปทำต่อใน Figma
├── README.md
└── .gitignore
```

## วิธีเปิดดู

เปิด `index.html` ด้วยเบราว์เซอร์ได้เลย ไม่ต้องติดตั้งอะไร
แนะนำให้ใช้ส่วนขยาย **Live Server** ใน VS Code เพื่อให้หน้าเว็บรีเฟรชอัตโนมัติทุกครั้งที่บันทึกไฟล์

## การปรับแต่งที่ใช้บ่อย

ทุกค่าอยู่ในบล็อก `:root` ของ `style.css` — แก้ที่เดียวมีผลทั้งเว็บ

| ตัวแปร | ความหมาย |
| --- | --- |
| `--dur-slide` | ความเร็วสไลด์ของ Header และ Overlay (ค่าเริ่มต้น 320ms · ห้ามเกิน 320ms) |
| `--delay-fade` | หน่วงก่อนเริ่ม fade (ค่าเริ่มต้น 0ms) |
| `--c-accent` | สีหลักของแบรนด์ |
| `--container` | ความกว้างสูงสุดของเนื้อหา |
| `--edge` | ระยะขอบซ้ายบนจอกว้าง (≥1600px) |

## สิ่งที่ต้องแก้ก่อนใช้งานจริง

- ข้อมูลติดต่อใน section `#contact` (ที่อยู่ / โทร / อีเมล / LINE) ยังเป็น placeholder
- `src` ของ iframe แผนที่ ต้องเปลี่ยนเป็น Embed URL จริงจาก Google Maps → Share → Embed a map
- รูปภาพผลงานยังเป็นกล่อง placeholder รอใส่ภาพหน้างานจริง

---

Phase 3 — Frontend Development · MECSTEAM Website