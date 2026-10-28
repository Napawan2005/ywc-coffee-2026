# เรียน React จากโปรเจกต์ "สุด cool 101 · ประเมินราคาสารกาแฟ"

ต้นฉบับ: https://claude.ai/artifact/VVtcpB1sVcrGSWVdQ5HEdN (HTML ไฟล์เดียว 3 หน้า: home / error / result)

เป้าหมาย: เขียนหน้าเว็บนั้นใหม่เป็น React ทีละบท แต่ละบทได้เรียนแนวคิดใหม่หนึ่งเรื่อง
CSS ใช้ของเดิมทั้งก้อน (`src/index.css`) จะได้โฟกัสที่ React อย่างเดียว

## วิธีใช้ไฟล์นี้

แต่ละบทมี 5 ส่วน:
1. **แนวคิด**: อ่านก่อน
2. **โจทย์**: ลงมือเขียนเอง
3. **ผ่านเมื่อ**: ใช้เช็กว่าทำถูกหรือยัง
4. **ติดตรงไหน**: error ที่เจอบ่อย
5. **เฉลย**: พับซ่อนไว้ ลองทำเองก่อนค่อยเปิดดู

รันโปรเจกต์: `npm run dev` แล้วเปิด http://localhost:5173 (บันทึกไฟล์เมื่อไหร่ หน้าเว็บจะ reload ให้เอง)

## โครงไฟล์ตอนจบ

```
src/
  main.jsx            ← ไม่ต้องแก้
  index.css           ← CSS จาก artifact
  App.jsx             ← เก็บ state หลัก (view, file) และสลับหน้า
  data.js             ← BEAN_TYPES, TIPS, ผลประเมินปลอม
  components/
    Header.jsx  Footer.jsx
    BeanCard.jsx  Tip.jsx  Uploader.jsx
  pages/
    HomePage.jsx  ErrorPage.jsx  ResultPage.jsx
```

ไม่ต้องสร้างทั้งหมดตั้งแต่แรก ค่อยๆ สร้างไปตามบท

## ความคืบหน้า

- [ ] บท 0: ตั้งโปรเจกต์ + JSX
- [ ] บท 1: Component, import/export
- [ ] บท 2: props + list + key
- [ ] บท 3: children
- [ ] บท 4: useState + สลับหน้า
- [ ] บท 5: อัปโหลดไฟล์ + event
- [ ] บท 6: drag & drop
- [ ] บท 7: useEffect + cleanup
- [ ] บท 8: ยก state ขึ้นไปไว้ที่ตัวพ่อ
- [ ] บท 9: แสดงข้อมูล + คำนวณค่าตอน render
- [ ] บท 10: async, loading, error (เสริม)

---

## บท 0: ตั้งโปรเจกต์ + JSX แรก (20 นาที)

### แนวคิด
React คือการเขียน UI เป็น**ฟังก์ชันที่ return JSX** ซึ่งหน้าตาเหมือน HTML แต่จริงๆ คือ JavaScript จึงมีกฎต่างกันนิดหน่อย:

| HTML | JSX | เหตุผล |
|---|---|---|
| `class="wrap"` | `className="wrap"` | `class` เป็นคำสงวนของ JS |
| `<br>` `<img ...>` | `<br />` `<img ... />` | JSX บังคับให้ปิดทุกแท็ก |
| `style="max-width:500px"` | `style={{ maxWidth: 500 }}` | style ต้องเป็น object และใช้ชื่อแบบ camelCase |
| `stroke-width="2"` | `strokeWidth="2"` | attribute ที่มีขีด `-` ให้เปลี่ยนเป็น camelCase |
| `for="x"` | `htmlFor="x"` | `for` เป็นคำสงวนของ JS |
| `onclick="..."` | `onClick={ฟังก์ชัน}` | event ใช้ camelCase และส่งฟังก์ชันเข้าไป |
| ใส่หลายแท็กเรียงกันได้เลย | ต้องห่อด้วยแท็กเดียว หรือ `<>...</>` | ฟังก์ชัน return ได้แค่ค่าเดียว |

React เริ่มทำงานแบบนี้: `index.html` มี `<div id="root">` → `main.jsx` เรียก `createRoot(...).render(<App />)` → `App.jsx` return JSX ออกมา

### โจทย์
1. `index.html`: เปลี่ยน `lang="en"` เป็น `lang="th"`, ตั้ง `<title>`, และคัดลอกแท็ก `<link>` ของ Google Fonts 3 บรรทัดจาก artifact มาใส่ใน `<head>`
2. `src/index.css`: ลบของเดิมทิ้งทั้งหมด แล้ววาง CSS ใน `<style>` ของ artifact ลงไป
3. ลบไฟล์ `src/App.css` และลบบรรทัด `import './App.css'`
4. `App.jsx`: แสดงหัวข้อ hero (h1 + p) จาก artifact

### ผ่านเมื่อ
- พื้นหลังเป็นสีครีม หัวข้อใช้ฟอนต์ Prompt และ "รู้เกรดและราคา" เป็นสีน้ำตาล
- console ของเบราว์เซอร์ไม่มี warning

### ติดตรงไหน
| Error | สาเหตุ |
|---|---|
| `Expected corresponding JSX closing tag for 'br'` | ยังไม่ได้เปลี่ยน `<br>` เป็น `<br />` |
| `Unexpected token. Did you mean {'}'}` | เกิดต่อเนื่องจากแท็กที่ไม่ได้ปิด แก้ข้อบนแล้วจะหายเอง |
| `does not provide an export named 'default'` | ลืมใส่ `export default App` |
| `Invalid DOM property 'class'` | ต้องใช้ `className` |

<details><summary>เฉลย App.jsx</summary>

```jsx
function App() {
  return (
    <main className="wrap hero">
      <div>
        <h1>
          ถ่ายรูปสารกาแฟ<br /><span>รู้เกรดและราคา</span><br />ในไม่กี่วินาที
        </h1>
        <p>ระบบ AI นับเมล็ดดีและเมล็ดเสียทีละเมล็ด แล้วประเมินราคาเบื้องต้นจากราคาตลาด</p>
      </div>
    </main>
  )
}

export default App
```
</details>

---

## บท 1: Component และ import/export (20 นาที)

### แนวคิด
- **Component** คือฟังก์ชันที่ชื่อขึ้นต้นด้วย**ตัวพิมพ์ใหญ่**และ return JSX แล้วเรียกใช้แบบแท็ก `<Header />`
- ชื่อตัวเล็ก (`<header>`) คือแท็ก HTML ส่วนชื่อตัวใหญ่ (`<Header>`) คือ component ของเราเอง
- แยกแต่ละ component ไปไว้คนละไฟล์ แล้วใช้ `export default` / `import` เชื่อมกัน

```jsx
// components/Footer.jsx
export default function Footer() {
  return <footer>...</footer>
}

// App.jsx
import Footer from './components/Footer.jsx'
```

### โจทย์
1. สร้าง `src/components/Header.jsx` โดยคัดลอก `<header class="top">` จาก artifact มาทั้งหมด รวม SVG โลโก้ด้วย
2. สร้าง `src/components/Footer.jsx`
3. ใน `App.jsx` เรียง `<Header />`, `<main>` (hero ของบท 0), `<Footer />` โดยห่อทั้งหมดไว้ใน `<>...</>`

### ผ่านเมื่อ
- แถบเมนูติดด้านบนตอน scroll (`position: sticky`) และ footer อยู่ล่างสุด
- `App.jsx` สั้นลง และอ่านแล้วเห็นโครงหน้าได้ทันที

### ติดตรงไหน
- **attribute ของ SVG**: `stroke-width` → `strokeWidth`, `stroke-linecap` → `strokeLinecap`, `aria-hidden` ใช้แบบเดิมได้ (`aria-*` กับ `data-*` ไม่ต้องเปลี่ยน)
- **ลิงก์ในเมนู** (`href="#home"`) ปล่อยไว้ก่อน จะทำให้กดได้จริงในบท 4

<details><summary>เฉลย</summary>

```jsx
// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>ราคาที่แสดงเป็นราคาประเมินเบื้องต้น อ้างอิงราคาตลาด ไม่ใช่ราคารับซื้อจริง</span>
        <span>© ประเมินราคาสุด cool 101</span>
      </div>
    </footer>
  )
}
```

```jsx
// src/components/Header.jsx
export default function Header() {
  return (
    <header className="top">
      <div className="wrap">
        <a className="brand" href="#home">
          <span className="brand-tile">
            <svg width="26" height="26" viewBox="0 0 36 36" aria-hidden="true">
              <ellipse cx="18" cy="18" rx="11" ry="15" transform="rotate(25 18 18)" fill="#C98A4B" />
              <path d="M12 6 C 22 14, 14 22, 24 30" stroke="#2A1C14" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          <span><b>สุด cool 101</b><small>ประเมินราคาสารกาแฟ</small></span>
        </a>
        <nav aria-label="เมนูหลัก">
          <a href="#classes">ระบบตรวจอะไรบ้าง</a>
          <a href="#guide">วิธีถ่ายรูป</a>
        </nav>
      </div>
    </header>
  )
}
```

```jsx
// src/App.jsx
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <Header />
      <main className="wrap hero">{/* ...hero เดิม... */}</main>
      <Footer />
    </>
  )
}

export default App
```
</details>

---

## บท 2: props + list + key (40 นาที)

### แนวคิด
- **props** คือค่าที่ส่งเข้า component เหมือนพารามิเตอร์ของฟังก์ชัน: `<BeanCard name="เมล็ดดำ" />` → `function BeanCard({ name })`
- ถ้ามี HTML ซ้ำๆ หลายก้อน (ใน artifact มีการ์ดเมล็ด 7 ใบ) ให้เปลี่ยนเป็น**ข้อมูล** (array) แล้วใช้ `.map()` สร้าง JSX ออกมา
- ทุกตัวที่ได้จาก `.map()` ต้องมี `key` ที่ไม่ซ้ำกัน React ใช้ key ติดตามว่าตัวไหนเป็นตัวไหน (ไม่ควรใช้ index ถ้ารายการมีโอกาสเปลี่ยนลำดับ)
- ต่อ className ตามเงื่อนไขได้แบบนี้: `` className={`cls ${good ? 'cls-good' : ''}`} ``

### โจทย์
1. สร้าง `src/data.js` แล้ว export `BEAN_TYPES` เป็น array 7 ตัว แต่ละตัวมี `id`, `name`, `desc`, `good` (true/false), `wide` (true/false), `icon` (JSX ของ SVG)
2. สร้าง `src/components/BeanCard.jsx` ที่รับ props `{ name, desc, good, wide, icon }`
3. ใน `App.jsx` ใส่ section `#classes` (`.band` → `.cls-grid`) แล้ววนสร้างการ์ดด้วย `BEAN_TYPES.map(b => <BeanCard key={b.id} {...b} />)`

### ผ่านเมื่อ
- การ์ดครบ 7 ใบ ใบแรก (เมล็ดดี) เป็นสีฟ้า มีป้าย "ดี" และ 3 ใบแรกกว้างกว่าใบอื่น
- console ไม่มี warning `Each child in a list should have a unique "key"`
- ลองเพิ่มเมล็ดใน `data.js` อีก 1 ตัว แล้วการ์ดโผล่มาเองโดยไม่ต้องแก้ JSX

### ติดตรงไหน
- `{...b}` คือการกระจายทุก field ของ object ออกมาเป็น props แต่ละตัว ผลเหมือนเขียน `name={b.name} desc={b.desc} ...` ทีละตัว
- เก็บ SVG เป็น JSX ไว้ใน `data.js` ได้ แต่ต้องเปลี่ยนนามสกุลไฟล์เป็น `data.jsx`

<details><summary>เฉลย</summary>

```jsx
// src/data.jsx (ตัวอย่าง 2 ตัว ที่เหลือเขียนตามรูปแบบเดียวกัน)
export const BEAN_TYPES = [
  {
    id: 'good', name: 'เมล็ดคุณภาพดี', desc: 'สมบูรณ์ สีและรูปทรงปกติ', good: true, wide: true,
    icon: (
      <svg width="56" height="56" viewBox="0 0 64 64" aria-hidden="true">
        <ellipse cx="32" cy="32" rx="18" ry="25" fill="#A4B077" />
        <path d="M28 10 C 38 24, 26 40, 36 54" stroke="#6E7D45" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'black', name: 'เมล็ดดำ', desc: 'สีดำทั้งเมล็ดหรือบางส่วน มีผลต่อเกรดมาก', good: false, wide: true,
    icon: (
      <svg width="56" height="56" viewBox="0 0 64 64" aria-hidden="true">
        <ellipse cx="32" cy="32" rx="18" ry="25" fill="#2F2620" />
        <path d="M28 10 C 38 24, 26 40, 36 54" stroke="#120D0A" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  // ear, immature, broken, parchment, husk ...
]
```

```jsx
// src/components/BeanCard.jsx
export default function BeanCard({ name, desc, good, wide, icon }) {
  const cls = ['cls', good && 'cls-good', wide && 'cls-wide'].filter(Boolean).join(' ')
  return (
    <div className={cls}>
      {icon}
      <div>
        {good && <span className="badge-good">ดี</span>}
        <h3>{name}</h3>
        <p>{desc}</p>
      </div>
    </div>
  )
}
```

```jsx
// ใน App.jsx
<section className="band" id="classes">
  <div className="wrap">
    <div className="sec-head">
      <div><span className="eyebrow">ระบบตรวจอะไรบ้าง</span><h2>จำแนกเมล็ดได้ 7 แบบ</h2></div>
      <p>เมล็ดคุณภาพดี 1 แบบ และข้อบกพร่อง 6 แบบ ใช้คำนวณเปอร์เซ็นต์เมล็ดเสียและเกรด</p>
    </div>
    <div className="cls-grid">
      {BEAN_TYPES.map(b => <BeanCard key={b.id} {...b} />)}
    </div>
  </div>
</section>
```
</details>

---

## บท 3: children (25 นาที)

### แนวคิด
- อะไรก็ตามที่เขียนไว้**ระหว่าง**แท็กเปิดกับแท็กปิด จะถูกส่งเข้า component ในชื่อ prop `children`
- เหมาะกับกล่องที่โครงเหมือนกันแต่เนื้อหาข้างในต่างกัน

```jsx
<Tip title="วางบนพื้นสีขาวเรียบ" bad="✗ พื้นมีสี/ลาย">
  กระดาษหรือถาดสีขาว ไม่มีลวดลาย
</Tip>
// function Tip({ title, bad, children })
```

### โจทย์
1. สร้าง `Tip.jsx` ที่รับ `title`, `badLabel`, `goodImg`, `badImg` (เป็น JSX) และ `children` (คำอธิบาย)
2. ทำ section `#guide` ที่มี Tip 3 ใบ ส่วนใบไม้บรรทัด (`.tip-ruler`) เขียนแยกต่างหากได้ เพราะโครงไม่เหมือนใบอื่น
3. (ถ้าอยากลองต่อ) ย้ายข้อมูล tip ไปไว้ใน `TIPS` ที่ `data.jsx` แล้วใช้ `.map()` เหมือนบท 2

### ผ่านเมื่อ
- กล่องสีเข้ม 4 ใบ แต่ละใบมีรูปตัวอย่างที่ถูกกับที่ผิด และป้าย ✓/✗
- เข้าใจว่าเมื่อไหร่ควรใช้ `children` และเมื่อไหร่ควรใช้ prop ธรรมดา

<details><summary>เฉลย Tip.jsx</summary>

```jsx
export default function Tip({ title, badLabel, goodImg, badImg, children }) {
  return (
    <div className="tip">
      <div className="tip-pair">
        <div className="tip-img" style={{ background: '#FFFFFF' }}>{goodImg}</div>
        <div className="tip-img" style={{ background: badImg.bg }}>{badImg.svg}</div>
      </div>
      <div className="tip-labels"><span className="ok">✓ ถูก</span><span className="no">{badLabel}</span></div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  )
}
```
</details>

---

## บท 4: useState + สลับหน้า (40 นาที)

### แนวคิด
- **state** คือค่าที่เปลี่ยนได้ และทุกครั้งที่เปลี่ยน React จะ**วาด component ใหม่**ให้เอง
- `const [view, setView] = useState('home')` ได้ค่าปัจจุบันมาหนึ่งตัว และได้ฟังก์ชันสำหรับเปลี่ยนค่ามาอีกหนึ่งตัว
- **ห้ามแก้ค่าตรงๆ** (`view = 'result'` จะไม่มีอะไรเกิดขึ้น) ต้องเรียก `setView('result')` เท่านั้น
- แสดงผลตามเงื่อนไขได้ 2 แบบ:
  - `{view === 'home' && <HomePage />}`
  - `{cond ? <A /> : <B />}`
- JS เดิมของ artifact ใช้ `classList.toggle('active')` สั่งแก้ DOM เอง แต่ใน React เราแค่บอกว่า "ตอนนี้อยู่หน้าไหน" แล้วปล่อยให้ React จัดการ DOM

### โจทย์
1. ย้าย hero, `#classes` และ `#guide` ไปไว้ใน `pages/HomePage.jsx`
2. สร้าง `pages/ErrorPage.jsx` และ `pages/ResultPage.jsx` โดยคัดลอก HTML จาก artifact มาแปลงเป็น JSX (ช่องที่เป็น `[–]` ปล่อยไว้ก่อน)
3. ใน `App.jsx` ประกาศ `useState('home')` แล้วแสดงหน้าตาม `view`
4. ส่ง `setView` ผ่าน props ไปให้ทุกหน้า (`onNavigate={setView}`) และให้ปุ่มต่างๆ เรียก `onNavigate('home')` เป็นต้น
5. ลิงก์ "ตัวอย่างผลประเมิน" และ "ตัวอย่าง: รูปไม่ผ่าน" ต้องพาไปหน้า result และ error ได้

### ผ่านเมื่อ
- คลิกแล้วสลับหน้าได้ครบทั้ง 3 หน้า และหน้าเว็บไม่ reload
- ใน `App.jsx` ไม่มี `document.getElementById` หรือ `classList` เลย

### ติดตรงไหน
- `onClick={onNavigate('home')}` **ผิด** เพราะฟังก์ชันจะถูกเรียกทันทีตอน render ต้องเขียนเป็น `onClick={() => onNavigate('home')}`
- ลิงก์ `<a href="#...">` จะพาหน้าเว็บกระโดด ให้ใส่ `e.preventDefault()` หรือเปลี่ยนไปใช้ `<button>`
- ต้องการให้เลื่อนไปที่ section หลังเปลี่ยนหน้า? ไว้ค่อยทำทีหลัง ตอนนี้ยังไม่จำเป็น

<details><summary>เฉลย App.jsx</summary>

```jsx
import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import ResultPage from './pages/ResultPage.jsx'

function App() {
  const [view, setView] = useState('home')

  return (
    <>
      <Header onNavigate={setView} />
      <main>
        {view === 'home' && <HomePage onNavigate={setView} />}
        {view === 'error' && <ErrorPage onNavigate={setView} />}
        {view === 'result' && <ResultPage onNavigate={setView} />}
      </main>
      <Footer />
    </>
  )
}

export default App
```
</details>

---

## บท 5: อัปโหลดไฟล์ + event (40 นาที)

### แนวคิด
- event handler ได้รับ object `e` เข้ามา สำหรับ `<input type="file">` ไฟล์ที่เลือกอยู่ใน `e.target.files[0]`
- เก็บไฟล์ไว้ใน state: `const [file, setFile] = useState(null)`
- **ค่าที่คำนวณจาก state ไม่ต้องสร้างเป็น state แยก** ให้คำนวณสดๆ ตอน render ไปเลย เช่น `const hasFile = file !== null`
- เปลี่ยน className ตาม state ได้: `` className={`drop ${file ? 'has' : ''}`} `` แทนการสั่ง `classList.add('has')`
- แปลงไฟล์เป็น URL สำหรับแสดงรูปด้วย `URL.createObjectURL(file)`

### โจทย์
1. สร้าง `components/Uploader.jsx` โดยคัดลอก `.upload` จาก artifact มา
2. เลือกไฟล์ได้ → แสดงรูปตัวอย่างและชื่อไฟล์ โดยรับเฉพาะไฟล์ที่ `file.type.startsWith('image/')`
3. ปุ่ม ✕ ล้างรูปออก (`setFile(null)`)
4. ปุ่ม "เริ่มประเมินราคา" กดไม่ได้ถ้ายังไม่มีไฟล์ (`aria-disabled={!file}`) และพอกดแล้วไปหน้า result

### ผ่านเมื่อ
- เลือกรูปแล้วเห็นรูปตัวอย่าง กด ✕ แล้วกลับไปเป็นกล่องว่าง
- เลือกไฟล์ที่ไม่ใช่รูป (.pdf) แล้วไม่มีอะไรเปลี่ยน
- ปุ่มเป็นสีจางและกดไม่ได้ตอนที่ยังไม่มีรูป

### ติดตรงไหน
- เลือกไฟล์เดิมซ้ำแล้ว `onChange` ไม่ทำงาน → ให้ reset ด้วย `e.target.value = ''` หลังอ่านไฟล์แล้ว
- บทนี้ยังเรียก `createObjectURL` ตรงๆ ตอน render ได้ไปก่อน แต่จะทำให้หน่วยความจำรั่ว ซึ่งจะแก้กันในบท 7

<details><summary>เฉลย Uploader.jsx (ส่วนสำคัญ)</summary>

```jsx
import { useState } from 'react'

export default function Uploader({ onStart }) {
  const [file, setFile] = useState(null)

  function pick(f) {
    if (f && f.type.startsWith('image/')) setFile(f)
  }

  return (
    <div className="upload" id="upload">
      <div className={`drop ${file ? 'has' : ''}`}>
        <div className="empty" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <strong>อัปโหลดรูปสารกาแฟ</strong>
          <div className="pick">
            <label>
              เลือกรูป
              <input className="sr" type="file" accept="image/*"
                onChange={e => { pick(e.target.files[0]); e.target.value = '' }} />
            </label>
          </div>
        </div>
        {file && (
          <div className="preview">
            <div className="preview-box">
              <img src={URL.createObjectURL(file)} alt="รูปสารกาแฟที่เลือก" />
              <button type="button" className="clear-x" aria-label="ลบรูปนี้" onClick={() => setFile(null)}>✕</button>
            </div>
            <div className="preview-row"><span>{file.name}</span><span>กด ✕ เพื่อเปลี่ยนรูป</span></div>
          </div>
        )}
      </div>
      <button className="btn btn-primary" aria-disabled={!file} disabled={!file} onClick={() => onStart(file)}>
        เริ่มประเมินราคา
      </button>
    </div>
  )
}
```
</details>

---

## บท 6: drag & drop (25 นาที)

### แนวคิด
- event ที่ต้องใช้: `onDragEnter`, `onDragOver`, `onDragLeave`, `onDrop`
- ต้องเรียก `e.preventDefault()` ใน `onDragOver` และ `onDrop` ไม่อย่างนั้นเบราว์เซอร์จะเปิดไฟล์รูปขึ้นมาแทนที่หน้าเว็บ
- ไฟล์ที่ลากมาวางอยู่ใน `e.dataTransfer.files[0]`
- สถานะ "กำลังลากไฟล์อยู่เหนือกล่อง" เป็น state อีกตัว: `const [dragging, setDragging] = useState(false)`

### โจทย์
1. ลากรูปมาวางที่กล่อง `.drop` แล้วใช้งานได้เหมือนกดเลือกไฟล์ โดยเรียกฟังก์ชัน `pick` ตัวเดิมจากบท 5
2. ระหว่างที่ลากอยู่เหนือกล่อง ให้ใส่ class `drag` เพื่อให้ขอบกล่องเปลี่ยนจากเส้นประเป็นเส้นทึบ

### ผ่านเมื่อ
- ลากรูปจาก Finder มาวางแล้วเห็นรูปตัวอย่าง และเบราว์เซอร์ไม่เปิดรูปเป็นแท็บใหม่
- ขอบกล่องเปลี่ยนตอนลากเข้า และกลับเป็นแบบเดิมตอนลากออกหรือวางไฟล์

<details><summary>เฉลย (เพิ่มใน Uploader)</summary>

```jsx
const [dragging, setDragging] = useState(false)

<div
  className={`drop ${file ? 'has' : ''} ${dragging ? 'drag' : ''}`}
  onDragEnter={e => { e.preventDefault(); setDragging(true) }}
  onDragOver={e => { e.preventDefault(); setDragging(true) }}
  onDragLeave={() => setDragging(false)}
  onDrop={e => { e.preventDefault(); setDragging(false); pick(e.dataTransfer.files[0]) }}
>
```
</details>

---

## บท 7: useEffect + cleanup (30 นาที)

### แนวคิด
- **useEffect** ใช้กับงานที่ไม่ใช่การวาด UI (side effect) เช่น เรียก API, ตั้ง timer หรือสร้าง/คืน resource
- `useEffect(() => { ...ทำงาน...; return () => { ...เก็บกวาด... } }, [deps])`
  - ทำงานหลัง render และจะทำงานใหม่ทุกครั้งที่ค่าใน `deps` เปลี่ยน
  - ฟังก์ชันที่ return ออกมา (cleanup) จะถูกเรียก**ก่อน**รอบถัดไป และตอนที่ component หายไปจากหน้า
- `URL.createObjectURL` จองหน่วยความจำไว้ ต้องคืนด้วย `URL.revokeObjectURL` ซึ่ง artifact เดิมต้องเขียนจัดการเอง แต่ cleanup ของ useEffect ทำเรื่องนี้ให้อัตโนมัติ
- **ข้อสังเกต**: ใน dev mode ที่เปิด `StrictMode` ไว้ effect จะรัน 2 รอบ ซึ่งเป็นเรื่องปกติ React ตั้งใจทำแบบนี้เพื่อช่วยจับ bug ที่เกิดจากลืมเขียน cleanup

### โจทย์
1. ย้ายการสร้าง URL ออกจาก JSX ไปไว้ใน `useEffect` ที่ขึ้นกับ `[file]`
2. เก็บ URL ไว้ใน state `previewUrl`
3. ใน cleanup ให้เรียก `URL.revokeObjectURL(url)`

### ผ่านเมื่อ
- ตอนนี้ใน JSX ไม่มี `createObjectURL` แล้ว
- ลองใส่ `console.log('revoke', url)` ไว้ใน cleanup แล้วเปลี่ยนรูป 3 ครั้ง ต้องเห็น log ทุกครั้งที่เปลี่ยน (เสร็จแล้วอย่าลืมลบ log ออก)

<details><summary>เฉลย</summary>

```jsx
const [previewUrl, setPreviewUrl] = useState(null)

useEffect(() => {
  if (!file) { setPreviewUrl(null); return }
  const url = URL.createObjectURL(file)
  setPreviewUrl(url)
  return () => URL.revokeObjectURL(url)
}, [file])
```
</details>

---

## บท 8: ยก state ขึ้นไปไว้ที่ตัวพ่อ (25 นาที)

### แนวคิด
- state อยู่ใน component ไหน ก็มีแค่ component นั้นกับลูกของมันที่มองเห็น
- ตอนนี้ `file` อยู่ใน `Uploader` แต่หน้า `ResultPage` ก็ต้องใช้รูปนี้ด้วย → ต้อง**ย้าย state ขึ้นไปไว้ที่ตัวพ่อตัวแรกที่ทั้งสองฝั่งใช้ร่วมกัน** ซึ่งก็คือ `App`
- จากนั้นส่ง `file` ลงไปทาง props และส่งฟังก์ชัน `onFileChange` ลงไปให้ลูกเรียกเมื่อจะเปลี่ยนค่า
- ข้อมูลไหลจากบนลงล่างทาง props ส่วนเหตุการณ์ (event) ไหลจากล่างขึ้นบนผ่านฟังก์ชันที่ส่งลงไป

```
App (file, setFile)
 ├─ HomePage → Uploader   รับ file และ onFileChange
 └─ ResultPage            รับ file
```

### โจทย์
1. ย้าย `useState(null)` ของ file และ `useEffect` ของ previewUrl ขึ้นไปไว้ที่ `App`
2. `Uploader` ไม่เก็บ state ของไฟล์เองอีกแล้ว แต่รับ `file`, `previewUrl`, `onFileChange` มาจาก props แทน
3. `ResultPage` ได้รับ `previewUrl` ไปแสดงในกล่อง `.photo` ถ้าไม่มีรูปก็แสดง SVG ภาพประกอบเดิม

### ผ่านเมื่อ
- อัปโหลดรูป → กดประเมิน → หน้า result แสดงรูปที่อัปโหลด
- กด "ประเมินรูปใหม่" แล้วกลับมาหน้าแรก รูปเดิมยังอยู่ (เพราะ state ยังอยู่ที่ App ไม่ได้หายไปตอนเปลี่ยนหน้า)

### ติดตรงไหน
- ถ้าเผลอเหลือ `useState` ของไฟล์ไว้ใน Uploader ด้วย จะมี "ความจริง 2 ชุด" ที่ไม่ตรงกัน ให้ลบออกให้เหลือที่เดียวคือ App

---

## บท 9: แสดงข้อมูล + คำนวณค่าตอน render (40 นาที)

### แนวคิด
- หน้าผลลัพธ์ทั้งหน้าคือ**ฟังก์ชันของข้อมูลชุดเดียว** เมื่อมี object ผลประเมินแล้ว ทุกตัวเลขบนหน้าคำนวณออกมาจากมันได้หมด
- ค่าอย่าง % หรือผลรวมไม่ต้องเก็บไว้ใน state ให้คำนวณใหม่ตรงในฟังก์ชันทุกครั้งที่ render
- จัดรูปแบบตัวเลขด้วย `toLocaleString('th-TH')` และ `toFixed(1)`

### โจทย์
1. ใน `data.jsx` สร้างผลปลอม:
   ```js
   export const MOCK_RESULT = {
     analyzedAt: '2026-10-29T10:30:00',
     grade: 'A',
     price: { value: 185, min: 170, max: 200, updatedAt: '2026-10-28' },
     counts: { good: 86, black: 3, ear: 2, immature: 4, broken: 3, parchment: 1, husk: 1 },
     sizeMm: null,
   }
   ```
2. `ResultPage` รับ `result` แล้วแทนช่อง `[–]` ทุกจุดด้วยค่าจริง
3. คำนวณ `total`, `defects`, `defectPct` และ % ของแต่ละแบบ
4. การ์ด `.rcls` ใช้ `BEAN_TYPES.map()` ร่วมกับ `counts[b.id]` และความกว้างของ bar ใช้ `style={{ width: pct + '%' }}`
5. ถ้า `sizeMm` เป็น `null` ให้แสดงคำว่า "ไม่ได้วัด"

### ผ่านเมื่อ
- ในหน้าไม่เหลือ `[–]` เลย
- % ของทุกแบบรวมกันได้ 100 (ปัดเศษแล้วอาจคลาดไปเล็กน้อย)
- ลองแก้ `counts.black` เป็น 30 แล้ว % เมล็ดเสียและความยาว bar เปลี่ยนตามเองทั้งหมด

<details><summary>เฉลย (ส่วนคำนวณ)</summary>

```jsx
export default function ResultPage({ result, previewUrl, onNavigate }) {
  const total = Object.values(result.counts).reduce((a, b) => a + b, 0)
  const defects = total - result.counts.good
  const pct = n => (total ? (n / total) * 100 : 0)

  return (
    // ...
    <div className="cls-grid">
      {BEAN_TYPES.map(b => (
        <div key={b.id} className={['rcls', b.good && 'cls-good', b.wide && 'cls-wide'].filter(Boolean).join(' ')}>
          <div className="rcls-head">{b.icon}<div><h3>{b.name}</h3></div></div>
          <div className="rcls-num">
            <strong>{pct(result.counts[b.id]).toFixed(1)}%</strong>
            <span>{result.counts[b.id]} เมล็ด</span>
          </div>
          <div className="bar"><span style={{ width: pct(result.counts[b.id]) + '%' }} /></div>
        </div>
      ))}
    </div>
  )
}
```
</details>

---

## บท 10 (เสริม): async, loading, error (40 นาที)

### แนวคิด
- งานที่ต้องรอ (เรียก API) จะมี 3 สถานะเสมอ: **กำลังโหลด / สำเร็จ / ล้มเหลว**
- เขียน handler แบบ `async` แล้วครอบด้วย `try / catch / finally`
- ปิดปุ่มระหว่างโหลด เพื่อกันไม่ให้ผู้ใช้กดส่งซ้ำ

### โจทย์
1. เขียน `fakeAnalyze(file)` ที่ return Promise และ resolve หลังผ่านไป 1.5 วินาที:
   - ถ้าชื่อไฟล์มีคำว่า `dark` ให้ reject ด้วย `{ checks: [...] }` เพื่อจำลองว่า "แสงไม่พอ"
   - กรณีอื่นให้ resolve เป็น `MOCK_RESULT`
2. ใน `App` เพิ่ม state `loading`, `result`, `error`
3. ระหว่างโหลด ให้ปุ่มขึ้นข้อความ "กำลังวิเคราะห์…" และกดไม่ได้
4. ถ้าสำเร็จไปหน้า result และส่ง `result` ไปด้วย ถ้าล้มเหลวไปหน้า error และส่ง `error.checks` ไปแสดงรายการตรวจ

### ผ่านเมื่อ
- อัปโหลดรูปปกติแล้วเห็น loading ประมาณ 1.5 วิ ก่อนไปหน้า result
- อัปโหลดไฟล์ชื่อ `dark.jpg` แล้วไปหน้า error และรายการ "แสงไม่พอ" ขึ้นว่าไม่ผ่าน
- กดปุ่มรัวๆ ระหว่างโหลดแล้ว request ไม่ถูกส่งซ้ำ

<details><summary>เฉลย</summary>

```jsx
function fakeAnalyze(file) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (file.name.includes('dark')) {
        reject({ checks: [
          { label: 'แสงไม่พอ', detail: 'รูปมืดเกินไป', pass: false },
          { label: 'ความคมชัด', detail: 'รูปไม่เบลอ', pass: true },
          { label: 'เป็นสารกาแฟ', detail: 'ระบบพบเมล็ดสารกาแฟในรูป', pass: true },
        ] })
      } else {
        resolve(MOCK_RESULT)
      }
    }, 1500)
  })
}

// ใน App
const [loading, setLoading] = useState(false)
const [result, setResult] = useState(null)
const [error, setError] = useState(null)

async function analyze() {
  setLoading(true)
  try {
    setResult(await fakeAnalyze(file))
    setView('result')
  } catch (err) {
    setError(err)
    setView('error')
  } finally {
    setLoading(false)
  }
}
```
</details>

---

## เรียนจบแล้วไปต่อที่ไหน

| อยากได้ | เรียนเรื่อง |
|---|---|
| URL แยกตามหน้า (กด back ได้) | React Router |
| ต่อ API ที่เป็น AI จริง | `fetch` + `FormData` สำหรับส่งไฟล์ |
| เขียน test | Vitest + React Testing Library |
| ตรวจ type | TypeScript (`--template react-ts`) |

อ่านเพิ่มที่ https://react.dev/learn ซึ่งเรียงบทเรียนไว้ใกล้เคียงกับแผนนี้
