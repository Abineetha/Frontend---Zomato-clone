// import React from 'react';
import "react-tabs/style/react-tabs.css"
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import queryString from 'query-string';

export default function MyTabs() {
  const [restaurant, setRestaurant]= useState([]);
  const parsed = queryString.parse(window.location.search);
  const id = parsed.restaurant;


  useEffect(()=>{
    axios.get(`http://localhost:8900/restById/${id}`)
    .then((res)=>{
      setRestaurant(res.data);  
    }).catch(err=>err)
    // console.log(restaurant)
  },[id])
 
  return (
    <div>
        <Tabs>
            <TabList>
                <Tab><h6><b>OverView</b></h6></Tab>
                <Tab><h6><b>Contact</b></h6></Tab>
            </TabList>
            <TabPanel>
                <br/>
                <h2 style={{color:" rgb(41, 41, 125)"}}><b>About this place</b></h2>
                <br/>
                <dl>
                    <dt>
                      <h3 style={{color:" rgb(41, 41, 125)"}}>Cuisine</h3>
                    </dt>
                    <dd>
                        {restaurant && restaurant.cuisine ? 
                            `${restaurant.cuisine.map((ele) => ele.name ) }`
                               : "No cuisine information available"
                        }
                    </dd>
                    <dt>
                      <h3 style={{color:" rgb(41, 41, 125)"}}>Average Cost</h3>
                    </dt>
                    <dd>
                    {`${restaurant.min_price}`}
                    </dd>
                    <dt>
                      <h3 style={{color:" rgb(41, 41, 125)"}}>Rating</h3>
                    </dt>
                    <dd>
                    {`${restaurant.rating_text}`}
                    </dd>
                </dl>
            </TabPanel>
            <TabPanel>
            <br/>
                <dl>
                    <dt style={{color:"rgb(41, 41, 125)"}}><h4><b>Phone Number</b></h4></dt>
                    <dd>{`${restaurant.contact_number}`}</dd>
                </dl>
                <dl>
                    <dt style={{color:"rgb(41, 41, 125)"}}><h4><b>{`${restaurant.name}`}</b></h4></dt>
                    <dd>Shop 1, Plot D, Samrudhi Complex, Chennai </dd>
                </dl>
            </TabPanel>
        </Tabs>
    </div>
  )
}
