import BeanCard from "../components/BeanCard"
import { beans } from "../data"
import Tip from "../components/Tip"

export default function HomePage() {
    return (
        <>
        {
        <main className="wrap hero">
            <div>
            <h1>
                ถ่ายรูปสารกาแฟ<br/><span>รู้เกรดและราคา</span><br />ในไม่กี่วินาที
            </h1>
            <p>ระบบ AI นับเมล็ดดีและเมล็ดเสียทีละเมล็ด แล้วประเมินราคาเบื้องต้นจากราคาตลาด</p>
            </div>
            <section className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-semibold mb-6">จำแนกเมล็ดได้ 7 แบบ</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {beans.map((b) => (
                    <BeanCard key={b.id} name={b.name} desc={b.desc} good={b.good} />
                    ))}
                </div>
            </section>
            <section className="bg-stone-900 text-stone-100">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <h2 className="text-2xl font-semibold mb-6">ถ่ายแบบนี้ ผ่านการตรวจแน่นอน</h2>
                    <div className="grid md:grid-cols-4 gap-4">

                        <Tip title="วางบนพื้นสีขาวเรียบ" bad="✗ พื้นมีสี/ลาย">
                        กระดาษหรือถาด<b>สีขาว</b> ไม่มีลวดลาย
                        </Tip>

                        <Tip title="เกลี่ยไม่ให้ซ้อนกัน" bad="✗ เมล็ดซ้อนกัน">
                        ประมาณ 100 เมล็ดต่อรูป เห็นทุกเมล็ดชัด
                        </Tip>

                        <Tip title="แสงสว่างพอ ไม่มีเงา" bad="✗ มืด / มีเงา">
                        ใช้แสงธรรมชาติ ไม่ใช้แฟลช
                        </Tip>

                        <Tip title="วางไม้บรรทัดเทียบขนาด" bad="✗ ไม่มี (ไม่บังคับ)">
                        ให้ระบบวัดขนาดเมล็ดได้ด้วย
                        </Tip>
                        
                    </div>
                </div>
            </section>
        </main>
        }
        </>
    )
}