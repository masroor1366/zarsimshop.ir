// app/page.tsx یا هر فایل کامپوننت مورد نظر

'use client'

import React, { useEffect, useState } from 'react'
import EconomicEvents from './EconomicEvents'
import axios from 'axios'

type EventData = {
  Name: string
  Currency: string
  Event_ID: number
  Category: string
  Date: string
  Actual: number
  Forecast: number
  Previous: number
  Outcome: string
  Strength: string
  Quality: string
  Projection: number
}

export default function EconomicCalendar() {
  const [data, setData] = useState<EventData[]>([])


//      useEffect(()=>{
//         axios.get('https://www.jblanked.com/news/api/mql5/calendar/today/', {
//       headers: {
//         Authorization: 'Api-Key lxMHo7CX.4hyUznir3Fs4vbLHqmHMOcWphsgRulGG', // یا هر هدر دلخواه
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => {
//       console.log('Data:', response.data);
//       setData(response.data);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
//   }, []);

    

//  useEffect(() => {
//     fetch('http://localhost:3000/api/analyze')
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
         
//       });
//   }, []);

  useEffect(()=>{
        axios.get('https://talavue.ir/api/analyze').then(res =>{
             
             setData(res.data)
            //  setUsers(...users,{id:141,name: 'Mohammad Ali Masroor', username:'masroor1366',email:'masroor.1388@gmail.com'})

             
        }).catch(err=>{
            console.log(err)
        })
    },[]);

console.log('testtttt');
console.log(data);
//    return <EconomicEvents events={economicData} />;
   return  <EconomicEvents events={data} />;  
   
 
}

