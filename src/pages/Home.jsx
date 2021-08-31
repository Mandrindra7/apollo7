import { useLazyQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { GET_WEATHER_QUERY } from '../graphql/queries'

const Home = () => {
    const [city,setCity] = useState('')
    const [getWeather, {data, loading, error}] = useLazyQuery(GET_WEATHER_QUERY, {
        variables: { name: city}
    })

    if(error) return<h1>Error found</h1>
    if(loading) return <p>Loading ...</p>
    if(data) {
        console.log(data)
    }
    return (
        <div className="home">
            <h1>Search weather</h1>
            <input type="text" placeholder="city namae...." onChange={e => setCity(e.target.value)} />
            <button onClick={() => getWeather()}>Search</button>
            <div>
                {data && 
                    <>
                <h1>{data.getCityByName.name}</h1>
                <h1>{data.getCityByName.weather.temperature.actual} </h1>
                <h1>{data.getCityByName.weather.summary.description} </h1>
                <h1>{data.getCityByName.weather.wind.speed} </h1>
                </>}
            </div>
        </div>
    )
}

export default Home
