import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setIsBooth } from "../../redux/transaction/boothSlice"
import { useEffect,useState } from "react"
import axios from 'axios'
import Swal from "sweetalert2"


const Home = () => {
    
    const isbooth = useSelector((state) => state.isbooth.isbooth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [shop,setShop] = useState([])
    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}retrieveShop`)
        .then((response) => {
            if(response.status) {
                setShop(response.data)
            }
            else{
                alertWarning('คำเตือน',response.data,'ตกลง')
            }
        })
        .catch((error) => {})
        if(isbooth.status){
            navigate('/select-menu')
        }
    },[])


    const alertWarning = (title, text, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            confirmButtonText: confirmButtonText
        })
    }
    
    const handleStore = (item) => {
        dispatch(setIsBooth({status: true,item}))
        navigate('/select-menu')
    }
    return (
        <div className="h-screen py-10 text-white bg-gradient-to-r from-pos-primary to-pos-secondary">
            <div className="flex h-full mx-40 shadow-inner rounded-box bg-pos-white" >
                <div className="grid grid-flow-col grid-rows-1 gap-10 " >
                    {shop.map((item,index) => (
                        <div className="flex-col mx-5 my-5 h-max btn-ghost rounded-box bg-pos-secondary hover:bg-pos-primary hover:text-pos-secondary " onClick={() => {handleStore(item.ShopID)}}>
                            <img key={index} src={item.photoURL} alt={item.name} className="w-48 h-48 rounded-box"  />
                            <span className="flex justify-center mt-5">{item.name}</span>
                        </div>


                    ))}
                </div>
            </div>
        </div>

    )
}
export default Home