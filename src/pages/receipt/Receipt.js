import MetaHeader from "../../components/MetaHeader/MetaHeader"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

const Receipt = () => {

    const navigate = useNavigate()
    const isbooth = useSelector((state) => state.isbooth.isbooth)
    const product = useSelector((state) => state.product.product)
    const menu = Object.entries(product.data)
    const totalPay = product.pay


    const current = new Date()
    let date = current.getDate()
    let month = current.getMonth() + 1
    const year = current.getFullYear()
    let hours = current.getHours()
    let minute = current.getMinutes()
    let second = current.getSeconds()
    let idSale = 1
    const point = totalPay / 5
    if (date < 10) date = '0' + date
    if (month < 10) month = '0' + month
    if (hours < 10) hours = '0' + hours
    if (minute < 10) minute = '0' + minute
    if (second < 10) second = '0' + second
    if (idSale < 10) idSale = '0' + idSale
    const dmy = date + '/' + month + '/' + year
    const time = hours + ':' + minute + ':' + second

    const handleBack = () => {
        Swal.fire({
            title: 'ต้องการกลับไปหน้าเลือกรายการสินค้า?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3FC3EE',

            cancelButtonColor: '#F27474',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/select-menu')
            }

        })

    }

    
    const handleNext = () => {
        navigate('/pay-card')
    }

    return (
        <div>
            <MetaHeader title='Receipt' />
            <div className="flex items-center justify-center w-full h-screen py-16 align-middle bg-pos-primary">
                <div className="flex flex-col items-center w-full h-full mx-20 my-20 rounded-box bg-pos-white" >
                    <div className="flex flex-col items-center my-5 ">
                        <div className="flex justify-between w-96 ">
                            <span className="text-3xl text-pos-primary">รหัสร้าน {isbooth.item}</span>
                            <span className="text-3xl text-pos-primary"> เลขที่ #{idSale}</span>
                        </div>
                        <div className="flex justify-between w-[28rem] ">
                            <span className="text-3xl text-pos-primary">วันที่/เวลา</span>
                            <span className="text-3xl text-pos-primary">{dmy}</span>
                            <span className="text-3xl text-pos-primary">{time}</span>

                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full shadow-inner rounded-3xl shadow-pos-secondary">
                        <div className="flex justify-between w-full px-20 my-5">
                            <span className="text-3xl text-pos-primary">รายการ</span>

                            <span className="text-3xl text-pos-primary">จำนวน</span>

                            <span className="text-3xl text-pos-primary">ราคา</span>
                        </div>
                        <div className='h-1 mx-10 my-1 border-none divider bg-pos-primary' />
                        <div className="my-5">
                            {menu.map((value, index) => (
                                <div key={index}>
                                    <div className="flex justify-between w-full px-20 py-2">
                                        <div className="flex justify-start w-full ">
                                            <p className="text-2xl text-pos-primary">{value[0]}</p>
                                        </div>
                                        <div className="flex justify-center w-full ">
                                            <p className="flex text-2xl text-pos-primary">{value[1].count}</p>
                                        </div>
                                        <div className="flex justify-end w-full ">
                                            <p className="text-2xl text-pos-primary">{value[1].sumCost} บาท</p>
                                        </div>
                                    </div>
                                </div>

                            ))}



                        </div>
                        <div className='h-1 mx-10 my-1 border-none divider bg-pos-primary' />
                        <div className="pt-2">
                            <div className="flex justify-between w-full px-20 ">
                                <p className="text-2xl text-pos-primary">ยอดรวมสุทธิ</p>
                                <p className="text-2xl text-pos-primary">{totalPay} บาท</p>
                            </div>
                            <div className="flex justify-between w-full px-20 ">
                                <p className="text-2xl text-pos-primary">ได้รับแต้ม</p>
                                <p className="text-2xl text-pos-primary">{point} คะแนน</p>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-center w-full h-full gap-4 py-5">
                        <button className="btn w-[150px] bg-pos-error hover:bg-pos-error/80" onClick={handleBack}>ย้อนกลับ</button>
                        <button className="btn w-[150px] bg-pos-success hover:bg-pos-success/80" onClick={handleNext}>จ่ายเงินผ่านบัตร</button>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Receipt