import MetaHeader from '../../components/MetaHeader/MetaHeader';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { addProduct } from '../../redux/transaction/transactionSlice';
import { setIsBooth } from '../../redux/transaction/boothSlice';
import axios from 'axios';

const SelectMenu = () => {

    const navigate = useNavigate()
    const isbooth = useSelector((state) => state.isbooth.isbooth)
    const dispatch = useDispatch()


    const [dataMenu, setDataMenu] = useState([]);
    const [dataPhoto, setDataPhoto] = useState([]);
    let pay = 0
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}retrieveShop`)
            .then((response) => {
                if (response.status) {
                    let count = 0
                    let check = false
                    response.data.forEach(element => {
                        if (element.ShopID === isbooth.item && !check) {
                            check = true
                        }
                        else if (element.ShopID !== isbooth.item && !check) {
                            count++
                        }
                    });
                    setDataMenu(response.data[count].menu.map((value, index) => {
                        return { ...value, index: index + 1, count: 0 }
                    }))
                    setDataPhoto(response.data[count].photoURL)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const selectedItems = dataMenu
        .filter(item => item.count > 0)
        .map(item => ({ menu: item.menu, count: item.count, cost: item.count * parseInt(item.price) }));

    const itemsByName = selectedItems.reduce((acc, item) => {
        acc[item.menu] = acc[item.menu] || { count: 0, sumCost: 0 };
        acc[item.menu].count += item.count;
        acc[item.menu].sumCost += item.cost;
        pay += item.cost
        return acc;
    }, {});

    const handleBack = () => {
        dispatch(setIsBooth({status: false}))
        navigate('/')
    }

    const handleNext = (data,pay) => {
        dispatch(addProduct({ status: true, data,pay }))
        navigate('/receipt')
    }

    const handleInputChange = (event, index) => {
        let { value } = event.target;
        value = parseInt(value) >= 0 ? parseInt(value) : 0;
        setDataMenu(prevData => {
            const newData = [...prevData];
            newData[index].count = value;
            return newData;
        });
    };

    return (
        <div>
            <MetaHeader title='SelectMenu' />
            <div className="flex h-full border bg-pos-primary">
                <div className="flex-none w-1/5 h-full max-h-full">
                    <div className="flex justify-center mt-10 avatar">
                        <div className="w-48 rounded-full">
                            <img src={dataPhoto} />
                        </div>
                    </div>
                    <div className="flex justify-center mt-10 bg-pos-secondary">
                        <div className="text-2xl text-[#000000] py-3">
                            รายการสินค้า
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center py-10 w-4/5 h-full max-h-full bg-[#FFFFFF]">
                    <div className="text-3xl text-[#000000]"> รายการสินค้า </div>
                    <div className="flex w-full max-w-3xl">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="text-[#000000]"> รายการ </th>
                                    <th className="text-[#000000]"> ราคา </th>
                                    <th className="flex justify-end mr-16 text-[#000000]" > จำนวน </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataMenu.map((value, index) => (
                                    <tr key={index}>
                                        <td className="text-[#000000]">{value.menu}</td>
                                        <td className="text-[#000000]">{value.price}</td>
                                        <td className="flex justify-end">
                                            <div>
                                                <div className="btn btn-bordered hover:bg-pos-success/80 border-none bg-pos-success mx-2 text-[#000000]" onClick={() => handleInputChange({ target: { value: value.count - 1 } }, index)}> - </div>
                                                <input
                                                    type="text"
                                                    value={value.count}
                                                    readOnly
                                                    className="input input-bordered border-[#bababa] bg-[#FFFFFF] text-[#000000] w-14 h-10"
                                                />
                                                <div className="btn btn-bordered hover:bg-pos-error/80 border-none bg-pos-error mx-2 text-[#000000] " onClick={() => handleInputChange({ target: { value: value.count + 1 } }, index)}> + </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end w-full gap-4 py-10 px-52">
                        <div className="btn flex w-24 justify-center bg-pos-error border-none text-[#000000] hover:bg-pos-error/80" onClick={handleBack}> ย้อนกลับ </div>
                        <div className="btn flex w-24 justify-center bg-pos-success border-none text-[#000000] hover:bg-pos-success/80" onClick={() => {handleNext(itemsByName,pay)}}> ยืนยัน </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SelectMenu;
