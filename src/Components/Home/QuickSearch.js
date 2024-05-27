import React from 'react'
import QsItems from './QsItems'

export default function QuickSearch() {
  return (
    <div>
      <h1 className="qsheading">Quick Searches</h1>
      <h3 className="pb-4 padd qsheading">Discover restaurants by type of meal</h3>
      <div className="container ">
        <div className="row">
          <QsItems  />
        </div>
      </div>
      <div>
        <center>
          <hr style={{marginTop:"20px"}}></hr>
        <h5 style={{fontFamily:"'Dancing Script', cursive",
                    color:"#4B0082", 
                    textShadow: "2px 2px 4px rgba(75, 0, 130, 0.3)",
                    marginTop:"20px", marginBottom:"20px"}}>food is always a good idea !</h5>
        </center>
      </div>
    </div>
  )
}

