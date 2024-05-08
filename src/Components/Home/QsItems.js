import React, { useEffect, useState } from 'react'
// import breakfast from '../../Assets/breakfast(1).avif'
// import lunch from '../../Assets/lunch(1).jpg'
// import snacks from '../../Assets/sancks(1).webp'
// import desserts from '../../Assets/desserts(1).jpg'
// import dinner from '../../Assets/dinner(1).jpg'
// import bever from '../../Assets/bever.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function QsItems() {
  const [mealtype, setMealtype] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get("http://localhost:8900/getAllMealTypes")
      .then((res) => {
        setMealtype(res.data)
      }).catch(err => err)
    // console.log(mealtype.name)
  }, [])

  const navigateQs = (mealtypeid)=>{
    const locId = sessionStorage.getItem("locationID")
    if(!locId){
      navigate(`/filter?mealtype=${mealtypeid}`)
    }else{
      
      navigate(`/filter?mealtype=${mealtypeid}&LocationId=${locId}`)
    }
  }

  return (
    <div>
      {mealtype.map((e, i) => {
        return <div key={i} onClick={()=>{navigateQs(e.mealtype_id)}}className='maindiv d-inline-flex bd-highlight col-4 ' >
          <img src={e.image} alt="no img" style={{ width: "150px",cursor:"pointer" }} />
          <div className="col-6 col-md-3 col-lg-2 shadow-lg bg-body rounded p-2 desp">
            <h3 className="head" style={{cursor:"pointer"}}>{`${e.name}`}</h3>
            <h5 className="padd" style={{cursor:"pointer"}}>{e.content}</h5>
          </div>
        </div>

      })}
    </div>
  )
}
