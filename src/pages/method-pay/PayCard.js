import MetaHeader from "../../components/MetaHeader/MetaHeader"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import axios from 'axios'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


const PayCard = () => {

    const navigate = useNavigate()
    const isbooth = useSelector((state) => state.isbooth.isbooth)
    const product = useSelector((state) => state.product.product)
    const [user, setUser] = useState([])
    const menu = Object.entries(product.data)
    const totalPay = product.pay
    const point = totalPay / 5


    const alertSuccess = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: confirmButtonText
        })
    }

    const alertError = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'error',
            confirmButtonText: confirmButtonText
        })
    }

    const alertWarning = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            confirmButtonText: confirmButtonText
        })
    }

    const handleBack = () => {
        navigate('/')
    }

    const handleSubmit = () => {
        axios.post(`${process.env.REACT_APP_API}retrieveDataNisitWithUUID`)
            .then((response) => {
                if (response.status) {
                    if (response.data === 'Not member, please sign up first') {
                        Swal.fire({
                            title: 'ข้อมูลบัตรสมาชิกไม่ถูกต้อง',
                            text: 'กรุณาสมัครสมาชิก',
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#3FC3EE',
                            cancelButtonColor: '#F27474',
                            confirmButtonText: 'ตกลง',
                        })
                        navigate('/')
                    }
                    else if (response.data === 'กรุณาแนบบัตร') {
                        Swal.fire({
                            title: 'กรุณาแนบบัตร',
                            icon: 'info',
                            showCancelButton: false,
                            confirmButtonColor: '#3FC3EE',
                            cancelButtonColor: '#F27474',
                            confirmButtonText: 'ตกลง',
                        })
                    }
                    else if (response.data === 'ไม่พบเครื่องอ่านบัตร') {
                        Swal.fire({
                            title: 'ไม่พบเครื่องอ่านบัตร',
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#3FC3EE',
                            cancelButtonColor: '#F27474',
                            confirmButtonText: 'ตกลง',
                        })
                        navigate('/receipt')
                    }
                    else {
                        axios.post(`${process.env.REACT_APP_API}updateDataNisit`, {
                            cash: totalPay,
                            point: point
                        })
                            .then((response) => {
                                if (response.status) {
                                    if (response.data === "Not enough money") {
                                        alertError('กรุณาเติมเงิน', 'เงินของคุณไม่เพียงพอ', 'ตกลง')
                                        navigate('/')
                                    }
                                    else {
                                        setUser(response.data)
                                        alertSuccess('ชำระเสร็จสิ้น', '', 'ตกลง')
                                        axios.post(`${process.env.REACT_APP_API}createTransactionShop`, {
                                            studentID: response.data.studentID,
                                            point: point,
                                            shopID: isbooth.item
                                            
                                        })
                                        axios.post(`${process.env.REACT_APP_API}createTransactionPayment`, {
                                            product : menu,
                                            cash : totalPay,
                                            point : point,
                                            shopID : isbooth.item
                                        })
                                    }
                                }
                            })
                            .catch((error) => { })

                    }
                }
            })
    }

    return (
        <div>
            <MetaHeader title='Pay By Card' />
            <div className="flex items-center justify-center w-full h-screen py-16 align-middle bg-gradient-to-r from-pos-primary to-pos-secondary">
                <div className="flex flex-col items-center w-full h-full mx-20 rounded-box bg-pos-white">
                    {user.length !== 0 ?
                        <div className="flex flex-col items-center w-full h-full py-3">
                            <div className="flex flex-col items-center w-full h-full py-3">
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col  w-[10rem]  ">
                                        <span className="text-3xl text-pos-primary">รหัสนิสิต</span>
                                        <span className="text-3xl text-pos-primary">ชื่อ</span>
                                        <span className="text-3xl text-pos-primary">นามสกุล</span>

                                    </div>
                                    <div className="flex flex-col  w-[28rem] ">
                                        <span className="text-3xl text-pos-primary">{user.studentID}</span>
                                        <span className="text-3xl text-pos-primary">{user.firstname}</span>
                                        <span className="text-3xl text-pos-primary">{user.lastname}</span>
                                    </div>

                                </div>
                                <div className='h-1 mx-10 my-5 border-none divider bg-pos-primary' />
                                <div className="flex justify-between w-full px-40 py-2">
                                    <span className="text-2xl text-pos-primary">ยอดรวมสุทธิ</span>
                                    <span className="text-2xl text-pos-primary">{totalPay} บาท</span>
                                </div>
                                <div className="flex justify-between w-full px-40 ">
                                    <span className="text-2xl text-pos-primary">ได้รับแต้ม</span>
                                    <span className="text-2xl text-pos-primary">{point} คะแนน</span>
                                </div>
                                <div className="flex justify-between w-full px-40 py-2">
                                    <span className="text-2xl text-pos-primary">ยอดเงินคงเหลือ</span>
                                    <span className="text-2xl text-pos-primary">{user.cash} บาท</span>
                                </div>
                                <div className="flex justify-between w-full px-40 ">
                                    <span className="text-2xl text-pos-primary">แต้มสะสมคงเหลือ</span>
                                    <span className="text-2xl text-pos-primary">{user.point} คะแนน</span>
                                </div>
                                <div className="flex items-end justify-center w-full h-full ">
                                    <button className="btn w-[150px] bg-pos-error hover:bg-pos-error/80 text-[#000000] border-none" onClick={handleBack} >ย้อนกลับ</button>
                                </div>
                            </div>

                        </div>
                        :
                        <div className={`flex justify-center  w-full h-full p-32 `}>
                            <MetaHeader title={'กรุณาแนบบัตร'} />
                            <div className='flex flex-col justify-center items-center w-full h-full rounded-lg bg-[#FFFFFF]'>
                                <div>
                                    <h1 className={`text-4xl bg-gradient-to-r from-[#ba0a0a] to-[#f22929] inline-block text-transparent bg-clip-text`}>กรุณา <span className={`btn text-4xl text-[#FFFFFF] bg-gradient-to-r from-[#ba0a0a] to-[#f22929]`}>แนบ</span> บัตรสมาชิกที่เครื่องอ่านบัตร</h1>
                                </div>
                                <div className={`size-auto w-3/12 my-20`}>
                                    <img className={`size-full`} src={require('../../image/waiting.gif')} alt={`กรุณาแนบบัตร`} />
                                </div>
                                <div>
                                    <button onClick={handleSubmit} className={`text-2xl text-[#FFFFFF] btn bg-pos-primary hover:bg-pos-primary/60`}>ตรวจสอบบัตรสมาชิก</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PayCard