import { useState,useEffect } from "react";
import { GetOrder } from "../Api/Axios";
import { Box, Spinner } from "@chakra-ui/react";
import { OrderList } from "../Components/AdminCard";
import { AdminCard } from "../Components/AdminCard";
import { DeliteOrder } from "../Api/Axios";
import { UpdateData } from "../Api/Axios";
export function Admin(){
const [data,setdata]=useState([]);
const [loading,setloading]=useState(false);
const [count,setcount]=useState(1);
const mydelite=(id)=>{
    setloading(true);
DeliteOrder(id) ; 
setcount(count+1)
setloading(false) ;
}
const myupdate=(id,data)=>{
    setloading(true);
UpdateData(id,data) ; 
setcount(count+1)
setloading(false) ;
}
useEffect(()=>{
setloading(true); 
GetaData(setdata)
setloading(false) ;
},[count])

if(loading){
    return <Spinner thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl' />
}


return (
    <Box mb='600px'>
    <OrderList/>
    {data.map((el)=>{
        
     return <AdminCard ondelite={mydelite} onupdate={myupdate} data={el} />
    })}
    </Box>
)
    
 
}

function GetaData(setdata){
    GetOrder()
    .then(
        res=>{
           let data =  res.data;
           setdata(data)
           console.log(data)
        }
    )
    .catch(
        err => console.log(err)
    )
}