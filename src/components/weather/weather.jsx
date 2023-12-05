import { useEffect, useState } from 'react';
import { Carousel} from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import styles from "./weacther.module.css";



const API = "https://api.open-meteo.com/v1/forecast?latitude=55.0415&longitude=82.9346&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&start_date=2023-12-04&end_date=2023-12-06"

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};


function Weather(){

      const [weather, setWeather] = useState({});
      const getData = () => {

        setWeather({...weather, isLoading: true});

        return fetch(`${API}`)
        .then(checkReponse)
        .then(response => setWeather( {...weather, data: response, isLoading: false, hasError: false} ))
        .catch(e => setWeather({...weather, loading: false, hasError: true}));
      }

      useEffect(() => {
        getData();
      }, []);

      return (
        <>
          {weather.data && weather.data.daily
           ? (
            <div className={styles.container}>
               <Carousel initialSlide={1} slideSize="80%" height={400} styles={{container:{gap: '10px'}}} >
                {weather.data.daily.time.map((date, index) => (
                  <Carousel.Slide
                  className={styles.slider}
                  key={index}>
                    <p>Date: {date}</p>
                    <p>Max Temperature: {weather.data.daily.temperature_2m_max[index]}</p>
                    <p>Min Temperature: {weather.data.daily.temperature_2m_min[index]}</p>
                  </Carousel.Slide>
                ))}
              </Carousel>
            </div>
          )
          : (
            <h1>Loading...</h1>
          )}
        </>
      );
}

export default Weather;
