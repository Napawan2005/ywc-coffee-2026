# สุด cool 101 · ประเมินราคาสารกาแฟ

หน้าเว็บที่ให้ผู้ใช้อัปโหลดรูปสารกาแฟ แล้วระบบแสดงเกรด สัดส่วนเมล็ดดี/เสีย และราคาประเมินเบื้องต้นจากราคาตลาด

ตอนนี้ระบบประเมินยังเป็นข้อมูลจำลอง (`src/analyze.js`) ไม่มีการวิเคราะห์รูปจริง

## เริ่มต้นใช้งาน

ต้องใช้ **Node.js 22** (Vite 8 ต้องการ Node 20.19+ หรือ 22.12+) ถ้าใช้ nvm ให้รัน `nvm use` ซึ่งจะอ่านเวอร์ชันจาก `.nvmrc`

```bash
npm install
npm run dev      # เปิดเซิร์ฟเวอร์พัฒนา
npm run build    # build สำหรับ production ไปที่ dist/
npm run lint     # ตรวจโค้ดด้วย oxlint
npm test         # รัน unit test
```

## การรัน unit test

ใช้ `node:test` ที่มาพร้อม Node.js ไม่ต้องติดตั้งเพิ่ม

```bash
npm test                                   # รันทุกไฟล์ *.test.js
```

ผลที่ควรได้เมื่อผ่านทั้งหมดคือ `ℹ fail 0` ถ้ามีเทสต์ไม่ผ่าน ผลจะแสดงชื่อเทสต์และค่าที่คาดหวังกับค่าที่ได้จริง

### เขียนเทสต์ใหม่

วางไฟล์ `*.test.js` ไว้ข้างโค้ดที่จะเทสต์ ใช้ `test` จาก `node:test` และ `assert` จาก `node:assert/strict` ดูตัวอย่างได้ที่ `src/pricing.test.js` ไฟล์ที่ import ต้องใส่นามสกุล `.js` เพราะ Node ไม่เติมให้เหมือน Vite

ไฟล์เทสต์ไม่ถูก bundle ลง `dist/` เพราะ Vite จะรวมเฉพาะไฟล์ที่ `index.html` อ้างถึงเท่านั้น

### เทสต์ที่มีอยู่

- `src/pricing.test.js` ครอบคลุม `countTotal`, `goodRatio`, `calcPrice`, `goodRatioRange` และ `priceRange`

## เทคโนโลยี

| ส่วน | ใช้อะไร | เหตุผล |
|---|---|---|
| UI | React 19 | deploy ได้ง่ายและกว้าง หน้าเว็บนี้ทำงานไม่มาก |
| Build / dev server | Vite 8 | เริ่มเร็ว และรองรับ HMR |
| CSS | Tailwind CSS v4 | ใช้ CSS เดิมของหน้าต้นฉบับได้ ดู [STYLE-LESSONS.md](STYLE-LESSONS.md) |
| Lint | oxlint | ตั้งค่าไว้ใน `.oxlintrc.json` |

โปรเจกต์นี้ไม่มี TypeScript และไม่มี router ยังไม่มี test runner

## การ deploy

`npm run build` ได้ไฟล์ static ใน `dist/` ซึ่งเอาไปวางบนโฮสต์ไหนก็ได้ `vite.config.js` ตั้ง `base` เป็น `/ywc-coffee-2026/` เมื่อรันบน GitHub Actions เพื่อให้ใช้กับ GitHub Pages ได้

### React เทียบกับ Rails เรื่องทรัพยากร

- **ฝั่งเซิร์ฟเวอร์:** React แบบ static แค่ส่งไฟล์ออกไป ไม่ต้องรันโค้ดฝั่งเซิร์ฟเวอร์ ใช้ CPU และ RAM น้อยมาก Rails ต้องรัน process Ruby ที่รับทุก request และสร้าง HTML ทำให้ใช้ RAM และ CPU ตลอดเวลา
- **ฝั่งเบราว์เซอร์:** React ส่ง JavaScript ให้เครื่องผู้ใช้รันเอง จึงใช้งานเครื่องมากกว่า Rails ที่ส่ง HTML พร้อมแสดงผล แต่สำหรับหน้าเล็กนี้ความต่างไม่มาก
- **การวิเคราะห์รูปจริง** ถ้าต่อกับโมเดลจริง โมเดลจะรันบนเซิร์ฟเวอร์แยก ไม่ว่าจะใช้ React หรือ Rails ค่าใช้จ่ายส่วนนั้นจึงไม่เปลี่ยน
- **สรุป:** สำหรับหน้าเดียวแบบนี้ React แบบ static ประหยัดกว่า Rails จะคุ้มเมื่อต้องมี backend เช่น บัญชีผู้ใช้ ฐานข้อมูล หรือ logic ฝั่งเซิร์ฟเวอร์

## โครงสร้างโฟลเดอร์

```ini
coffee/
├── index.html            หน้า HTML ที่มี <div id="root">
├── public/               ไฟล์ที่เสิร์ฟตรงๆ (ไม่ผ่าน build)
├── src/
│   ├── main.jsx          จุดเริ่มต้น: เรนเดอร์ <App /> ลงใน #root
│   ├── App.jsx           ตัวควบคุมหลัก: เก็บ state และสลับหน้า
│   ├── index.css         Tailwind + สีและฟอนต์ของแบรนด์ (@theme)
│   ├── data.js           รายการประเภทเมล็ด และผลตัวอย่าง (ไม่มี JSX จึงเป็น .js)
│   ├── analyze.js        ฟังก์ชันจำลองการวิเคราะห์รูป (fakeAnalyze)
│   ├── pricing.js        สูตรคำนวณราคาและช่วงราคา
│   ├── assets/           รูปและ SVG ที่ใช้ในหน้า
│   ├── pages/            หนึ่งไฟล์ต่อหนึ่งหน้า
│   └── components/       ชิ้นส่วน UI แยกตามหน้าที่ (ดูด้านล่าง)
│       ├── layout/       โครงของทุกหน้า: Header, Footer, Section, SectionHead
│       ├── ui/           ปุ่มที่ใช้ร่วมกัน: Button
│       ├── icons/        ไอคอนเมล็ด: BeanIcon, BeanPile
│       ├── home/         เฉพาะหน้าแรก: Uploader, PhotoTip, BeanCard
│       └── result/       เฉพาะหน้าผลลัพธ์: BeanClassBar, PriceCard, StatCard
├── LESSONS.md            บทเรียน React ทีละบท
└── STYLE-LESSONS.md      บทเรียนการจัดหน้าตาด้วย Tailwind
```

## หลักการตั้งชื่อไฟล์

- **`.jsx`** เฉพาะไฟล์ที่มี JSX (UI) ส่วนไฟล์ข้อมูลหรือ logic ล้วนใช้ **`.js`** เช่น `data.js`, `pricing.js`, `analyze.js`
- ชื่อ component บอก**โดเมน**และ**หน้าที่** เช่น `BeanClassBar` (แถบสัดส่วนของประเภทเมล็ด) ไม่ใช่ `ClassBar` ที่กว้างเกินไป
- ชื่อที่คล้ายกันต้องต่างกันชัด: `BeanIcon` = ไอคอนเมล็ด 1 ประเภทตาม `id`, `BeanPile` = กองเมล็ดหลายเมล็ดสำหรับภาพตัวอย่าง
- ชื่อไฟล์ JS บอกว่า**ทำอะไร** เช่น `analyze.js` (วิเคราะห์รูป) แทน `api.js`

## ไฟล์ใน `src/`

### ระดับบนสุด

- **`main.jsx`** เรนเดอร์ `<App />` ลงใน `#root` และโหลด `index.css`
- **`App.jsx`** เก็บ state หลัก (`view`, `file`, `result`, `errorReason`, `loading`) ฟังก์ชัน `analyze()` เรียก `fakeAnalyze` แล้วเลือกหน้าที่จะแสดง: `home`, `result` หรือ `error`
- **`index.css`** ประกาศสีและฟอนต์ของแบรนด์ด้วย `@theme` ของ Tailwind ชื่อสี เช่น `bg-accent` หรือ `text-muted` มาจากตรงนี้
- **`data.js`** รายการประเภทเมล็ด 7 แบบ (`beans`) และผลตัวอย่าง (`sampleResult`) ที่มี `counts` และ `marketPrice`
- **`analyze.js`** `fakeAnalyze(file)` รอ 100 มิลลิวินาที ถ้าชื่อไฟล์มี `dark` จะ reject ด้วย `{ reason }` ไม่เช่นนั้นคืน `sampleResult`
- **`pricing.js`** `calcPrice` คำนวณราคาจากสัดส่วนเมล็ดดี `goodRatioRange` คำนวณช่วงความเชื่อมั่น 95% ของสัดส่วนนั้นด้วยสูตร Wilson และ `priceRange` แปลงเป็นช่วงราคา

### `pages/` (หนึ่งหน้า หนึ่งไฟล์)

- **`HomePage.jsx`** หน้าแรก มีอัปโหลดรูป ประเภทเมล็ด และคำแนะนำการถ่ายรูป (`id="guide"`)
- **`ResultPage.jsx`** แสดงผลประเมิน: เกรด, สถิติ, การ์ดราคา และแถบสัดส่วนของแต่ละประเภท
- **`ErrorPage.jsx`** แสดงเมื่อรูปไม่ผ่านการตรวจ มีรายการเช็กและปุ่มกลับไปถ่ายใหม่

### `components/`

#### `layout/` โครงของทุกหน้า

| ไฟล์ | หน้าที่ | ใช้ที่ |
|---|---|---|
| `Header.jsx` | แถบหัวเว็บ ลิงก์ไปหน้าแรกและส่วนต่างๆ | `App.jsx` |
| `Footer.jsx` | ท้ายเว็บ พร้อมหมายเหตุว่าราคาเป็นการประเมินเบื้องต้น | `App.jsx` |
| `Section.jsx` | กรอบของแต่ละช่วงในหน้า กำหนดพื้นหลังด้วย `tone` | `HomePage`, `ResultPage` |
| `SectionHead.jsx` | หัวของ section: eyebrow, title, desc | `HomePage`, `ResultPage` |

#### `ui/` ปุ่มที่ใช้ร่วมกัน

| ไฟล์ | หน้าที่ | ใช้ที่ |
|---|---|---|
| `Button.jsx` | ปุ่มที่มี `variant` (primary, outline, latte, dark, ghost) | `Uploader`, `ResultPage`, `ErrorPage` |

#### `icons/` ไอคอนเมล็ด

| ไฟล์ | หน้าที่ | ใช้ที่ |
|---|---|---|
| `BeanIcon.jsx` | ไอคอน SVG ของแต่ละประเภทเมล็ด (`id` 1–7) | `BeanClassBar`, `BeanCard` |
| `BeanPile.jsx` | กองเมล็ด 5 เมล็ด ปรับสีและการวางได้ (`fill`, `stacked`) ใช้เป็นภาพตัวอย่างถูก/ผิด | `PhotoTip`, `ErrorPage` |

#### `home/` เฉพาะหน้าแรก

| ไฟล์ | หน้าที่ | ใช้ที่ |
|---|---|---|
| `Uploader.jsx` | ช่องอัปโหลด ลากวางไฟล์ พรีวิวรูป ตรวจขนาดไม่เกิน 10 MB | `HomePage` |
| `PhotoTip.jsx` | การ์ดคำแนะนำการถ่ายรูป มีตัวอย่างถูกและผิด | `HomePage` |
| `BeanCard.jsx` | การ์ดประเภทเมล็ด (ชื่อ, คำอธิบาย, ป้าย "ดี") | `HomePage` |

#### `result/` เฉพาะหน้าผลลัพธ์

| ไฟล์ | หน้าที่ | ใช้ที่ |
|---|---|---|
| `PriceCard.jsx` | การ์ดราคาประเมินหลัก พร้อมช่วงราคาและราคาตลาด | `ResultPage` |
| `StatCard.jsx` | การ์ดสถิติ เช่น เกรด หรือเปอร์เซ็นต์ของเมล็ดเสีย | `ResultPage` |
| `BeanClassBar.jsx` | การ์ดประเภทเมล็ดพร้อมแถบสัดส่วน | `ResultPage` |

## ขั้นตอนการทำงาน

1. ผู้ใช้เลือกรูปใน `Uploader` แล้วกดวิเคราะห์
2. `App.analyze()` เรียก `fakeAnalyze` ใน `analyze.js`
3. ถ้าสำเร็จ จะไปที่ `ResultPage` ที่คำนวณเกรด ราคา และสัดส่วนจาก `counts`
4. ถ้าไม่สำเร็จ จะไปที่ `ErrorPage` พร้อมเหตุผล

## State และ hooks

state หลักอยู่ที่ `App.jsx` เพราะหลายหน้าใช้ร่วมกัน แล้วส่งลงไปเป็น props ส่วนหน้าลูกแจ้งกลับผ่านฟังก์ชัน เช่น `onFileChange`, `onAnalyze`, `onRetry`

| state | เก็บอะไร | ใช้ที่ |
|---|---|---|
| `view` | หน้าที่แสดงอยู่ (`home` / `result` / `error`) | App |
| `file` | รูปที่ผู้ใช้เลือก | Uploader, ResultPage, ErrorPage |
| `loading` | กำลังวิเคราะห์อยู่หรือไม่ | Uploader |
| `result` | ผลวิเคราะห์ (`counts`, `marketPrice`) | ResultPage |
| `errorReason` | เหตุผลที่รูปไม่ผ่าน | ErrorPage |

hook อื่น

- **`useState` เฉพาะที่**: `Uploader` เก็บ `dragging` (กำลังลากไฟล์ผ่านกล่อง)
- **`useEffect`**: `Uploader`, `ResultPage` และ `ErrorPage` สร้าง object URL จาก `file` เพื่อแสดงรูป และ revoke ทิ้งเมื่อไฟล์เปลี่ยนหรือออกจากหน้า
- **`useRef`**: `Uploader` อ้างถึง `<input type="file">` ที่ซ่อนไว้ เพื่อเปิดหน้าต่างเลือกไฟล์ และล้างค่าหลังกด ✕

component อื่นไม่มี state รับ props มาแสดงอย่างเดียว

## หมายเหตุ

- ราคาเป็นการประเมินเบื้องต้นจากราคาตลาด ไม่ใช่ราคารับซื้อจริง
- ไฟล์ `dist/` เป็นผลจาก `npm run build` ไม่ควรแก้ด้วยมือ
