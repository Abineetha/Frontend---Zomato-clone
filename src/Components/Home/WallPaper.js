import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img from '../../Assets/bgimg2.jpg'
import axios from 'axios'

export default function WallPaper() {
  
    const[location, setLocation]=useState([]);
    const[restaurants, setRestaurants] = useState([]);
    const[suggestion, setSuggestion] = useState([]);
    const[inputtext, setInputtext] = useState('');

    useEffect(()=>{
        axios.get('https://backend-zomato-clone.onrender.com/getAllLocation')
        .then((res)=>
            setLocation(res.data)
        )
        .catch(err=>err)
       sessionStorage.clear()
    },[])

 const handleLocation=(e)=>{
      var locationId=e.target.value
      sessionStorage.setItem("locationID",Number(locationId))
      axios.get(`https://backend-zomato-clone.onrender.com/locationId/${locationId}`)
      .then((res)=>
        setRestaurants(res.data)
      ).catch(err=>err)
      console.log(restaurants)
    }

    const handleSearch = (e) => {
      let inputText = e.target.value;
      const suggestions = restaurants.filter(e => e.name.toLowerCase().includes(inputText.toLowerCase()));
      setInputtext(inputText);
      setSuggestion(suggestions)
  }

  const navigate = useNavigate();
  const selectingRest = (restObj) => {
      navigate(`/Details?restaurant=${restObj._id}`);
  }
    const showSuggestion = () => {
      if (suggestion.length === 0 && inputtext === undefined) {
          return null;
      }
      if (suggestion.length > 0 && inputtext === '') {
          return null;
      }
      if (suggestion.length === 0 && inputtext) {
          return <ul>
              <li style={{backgroundColor:"white"}}>No Search Result found</li>
          </ul>
      }
      return (
          <ul style={{backgroundColor:"white"}}>
              {suggestion.map((e, i) =>(
              <li key={i} onClick={() => selectingRest(e)} >
                {`${e.name}- ${e.locality},${e.city}  `}
              </li>)) }
          </ul>
      )
  }

  return (
    <div>
        <img src={img} alt="no img" className="bgimg"/>
        <div className="container-fluid topc">
        <center>
        <h1 className="col-12 mb-5" style={{color: "azure"}}>Find the best restaurants, cafes and bars</h1>
        </center>
            <div className="dropdown row justify-content-around" style= {{display:"flex",width: "100%"}}>
                    <div className="col-4 mb-4 me-5" >
                            <select className="form-control place me-2" 
                               list="datalistOptions" 
                               id="exampleDataList" 
                               onChange={handleLocation}
                               style= {{textIndent:"30px",border:"white 3px solid"}} 
                               placeholder="Please type your location..">
                                <option value="location_id_name_city">Choose City..</option>
                                {location.map((loc)=>(
                                  <option key={loc.location_id} value={loc.location_id}>{loc.locality}, {loc.city}</option>
                                ))}
                            </select>
                    </div> 
                    <div className="col-4">
                        <input className="form-control icon" 
                               type="search" 
                               aria-label="Search" 
                               onChange={handleSearch}
                               style= {{border:"white 3px solid"}}/>  
                        {showSuggestion()}
                    </div>
            </div>
        </div>
        <div className="logo">e!</div>
    </div>
  )
}
