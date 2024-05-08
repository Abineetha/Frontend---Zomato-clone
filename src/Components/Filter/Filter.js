import React,{useEffect,useState} from 'react'
// import food from '../../Assets/breakfast(1).avif'
// import Header from '../Header/Header'
import axios from 'axios'
import queryString from 'query-string'
import { useLocation,useNavigate } from 'react-router-dom'

export default function Filter() {
    const navigate = useNavigate();
    const location = useLocation().search;
    const restaurantsPerPage = 2;

    const [locationData, setLocationData]= useState([]);
    const [restaurantData, setRestaurantData]= useState([]);
    const [sort, setSort] = useState(1)
    const [cuisineid, setCuisineid] = useState([])
    const [lowCost, setLowCost] = useState(undefined);
    const [highCost, setHighCost] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    const qs = queryString.parse(window.location.search);
    const mealtype_id = qs.mealtype;

    const location_id = Number(sessionStorage.getItem('locationID'));

    const fetchLocation =()=>{
        axios.get('http://localhost:8900/getAllLocation')
        .then((res)=>
            setLocationData(res.data)
        )
        .catch(err=>err);
    }
    useEffect(()=>{

        fetchLocation();

        const filterObject = {
            mealtype_id: Number(mealtype_id),
            location_id: location_id,
            cuisine_id: cuisineid,
            sort: sort,
            lowCost: lowCost,
            highCost: highCost
        }

        axios.get(`http://localhost:8900/mealTypeId/${mealtype_id}`)
        .then((res)=>{
            setRestaurantData(res.data)
        })
        .catch(err=>err);

        axios.post("http://localhost:8900/filter",filterObject)
        .then((res)=>
            setRestaurantData(res.data)
        )
        .catch(err=>err);

       sessionStorage.clear()
    },[location, sort, cuisineid, lowCost, highCost, location_id, mealtype_id])

    const searchHandle =(locationId)=>{
        // var locationId = Number(e.target.value);

        const filterObject = {
            mealtype_id: Number(mealtype_id),
            location_id: Number(locationId),
            sort: sort,
            lowCost: lowCost,
            highCost: highCost
        }

        axios.post("http://localhost:8900/filter",filterObject)
        .then((res)=>
            setRestaurantData(res.data)
        )
        .catch(err=>err);
    }

    const filters =()=>{
        const filterObject = {
            mealtype_id: Number(mealtype_id),
            location_id: location_id,
            cuisine_id: cuisineid,
            sort: sort,
            lowCost: lowCost,
            highCost: highCost
        }

        axios.post("http://localhost:8900/filter",filterObject)
        .then((res)=>
            setRestaurantData(res.data)
        )
        .catch(err=>err);
    }

    const handleCuisine = (id)=>{
        const index = cuisineid.indexOf(id)
        if(index === -1){
            cuisineid.push(id)
            setCuisineid(cuisineid)
        }else{
            cuisineid.splice(index,1)
            setCuisineid(cuisineid)
        }
        setTimeout(() => {
            filters();
        }, 0);
    }

    const searchSort = (e) => {
        const sort = e.target.value
        setSort(sort)
        setTimeout(() => {
            filters();
        }, 0);
    }

    const handleCost = (lowCost, highCost) => {
        setLowCost(lowCost)
        setHighCost(highCost)
        setTimeout(() => {
            filters();
        }, 0);

    }

    const handleDetail =(e)=>{
        navigate(`/Details?restaurant=${e._id}`);
    }

    const handlePage= (pageNumber)=>{
        setCurrentPage(pageNumber);
    }

    const indexOfLastRestaurant = currentPage*restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant-restaurantsPerPage;
    const length = Math.ceil(restaurantData.length / restaurantsPerPage);
    const currentRestaurants = restaurantData.length > 0 ? restaurantData.slice(indexOfFirstRestaurant, indexOfLastRestaurant):0;


  return (
    <div>
        {/* <Header/> */}
        <div className="divbody">
        <div className="top">Breakfast Places in Coimbatore</div>
            <div className="parent">
                <div className="col1 bs" style={{borderRadius:"20px"}}>
                  <div className="fil">Filters</div>
                   <div className="sl">Select Location</div>
                     {/* <input type="text" list="location" className="list" placeholder="Select Location"/> */}
                     <select id="city" onChange={(event) => { searchHandle(event.target.value) }}>
                        <option>--select city--</option>
                        {locationData.map((e) => {
                            return <option key={e._id} value={e.location_id}>{`${e.city}- ${e.locality}`}</option>
                        })}
                    </select>


                        <div className="sl">Cuisine</div>
                    <div className="cr">
                        <input type="checkbox" onChange={() => handleCuisine(1)}/> North indian
                        <br/>
                        <input type="checkbox" onChange={() => handleCuisine(2)}/> South indian
                        <br/>
                        <input type="checkbox" onChange={() => handleCuisine(3)}/> Chinese
                        <br/>
                        <input type="checkbox" onChange={() => handleCuisine(4)}/> Fast food
                        <br/>
                        <input type="checkbox" onChange={() => handleCuisine(5)}/> Italian
                    </div>
                    
                           <div className="sl">Cost for two</div>
                     <div className="cr">
                        <input type="radio" name="price" onChange={() => handleCost(0, 500)}/> Less than &#8377; 500
                        <br/>
                        <input type="radio" name="price" onChange={() => handleCost(500, 1000)}/> &#8377; 500 to &#8377; 1000
                        <br/>
                        <input type="radio" name="price" onChange={() => handleCost(1000,1500)}/> &#8377; 1000 to &#8377; 1500
                        <br/>
                        <input type="radio" name="price" onChange={() => handleCost(1500,2000)}/> &#8377; 1500 to &#8377; 2000
                        <br/>
                        <input type="radio" name="price" onChange={() => handleCost(2000,50000)}/> Above &#8377; 2000
                    </div>

                      <div className="sl">Sort</div>
                    <div className="cr">
                        <input type="radio" name="Sort" id="" value={1} onClick={searchSort} /> Price Low to High
                        <br/>
                        <input type="radio" name="Sort" id="" value={-1} onClick={searchSort} /> Price High to Low
                    </div>
                </div>

                <div className="col2">
                { currentRestaurants.length > 0 ? currentRestaurants.map((item,i)=>{
                    return <div className="bs margin" style={{borderRadius:"20px"}}>
                    <div className="childcol "  onClick={() => handleDetail(item)}>
                        <div>
                            <img className="imgfil" src={item.image} alt="no img"/>
                        </div>
                        <div className="info"> 
                            <div className="resname">{item.name}</div>
                            <div className="fort">{item.locality}</div>
                            <div className="add">{item.city}</div>
                        </div>
                    </div>
                    <hr/>
                    <div style={{width:"400px"}}>
                        <table className="table">
                        <tr>
                            <td className="color">CUISINES :</td>
                            <td> {`  ${item.cuisine.map(e => e.name + " ")}`}</td>
                        </tr>
                        <tr>
                            <td className="color">COST FOR TWO :</td>
                            <td>  &#8377;{item.min_price}</td>
                        </tr>
                        </table>
                    </div>
                </div>
                }):<center>
                    <h2 style={{color:"Black"}}>No Results Found</h2>
                </center>
                }
                {restaurantData.length > 0 ? 
                <div className="num">
                {/* <div>Prev</div> */}
                
                {Array.from({length}).map((_,index)=>{
                    return <div>
                        <center>
                         <p key={index}
                    className={` ${currentPage === index + 1 ? 'active' : ''} `}
                    onClick={() => handlePage(index + 1)}>
                    <span>{index + 1}</span>
                </p>
                </center>
                </div>
                })}
                
                {/* <div>Next</div> */}
                </div>
                : null}

                    {/* <div className="num">
                        <div>Prev</div>
                        <div className="bg">1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div>
                        <div>Next</div>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
  )
}
