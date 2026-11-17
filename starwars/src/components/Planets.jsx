import React from 'react'
import { useQuery } from 'react-query'

const fetchPlanets =  async () => {
    const response = await fetch("https://swapi.dev/api/planets");

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
}

const Planets = () => {
    const {status, data, error} =  useQuery("planets", fetchPlanets);
    console.log(status, data)
  return (
    <div>
        <h2>Planets</h2>
        <p>Status: {status}</p>

        {status  == 'loading ' && (
            <div> loading data ....</div>
        )}

        {status  == 'error ' && (
            <div> Error fetching data : {error.message}</div>
        )}


        {status === 'success' && (
            data.results.map(planet => (
                <p key={planet.name}>{planet.name}</p>
            ))
        )}


           

            
    </div>
  )
}

export default Planets