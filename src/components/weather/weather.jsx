import { useEffect, useState } from 'react';

import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';

import styles from "./weacther.module.css";

import { BsFillCloudSnowFill } from "react-icons/bs";



const API = "https://api.open-meteo.com/v1/forecast?latitude=55.0415&longitude=82.9346&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&start_date=2023-12-04&end_date=2023-12-06"

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};


function Weather() {

  const [weather, setWeather] = useState({});
  const getData = () => {

    setWeather({ ...weather, isLoading: true });

    return fetch(`${API}`)
      .then(checkReponse)
      .then(response => setWeather({ ...weather, data: response, isLoading: false, hasError: false }))
      .catch(e => setWeather({ ...weather, loading: false, hasError: true }));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {weather.data && weather.data.daily
        ? (
          <div className={styles.container}>
            <Carousel classNames={styles.slider} initialSlide={1} slideSize="80%" height={500} styles={{ container: { gap: '10px', width: '100%' } }} >
              {weather.data.daily.time.map((date, index) => (
                <Carousel.Slide
                
                  className={styles.item}
                  key={index}>
                  <div className={styles.date}>{date}</div>

                  <BsFillCloudSnowFill size={100} />

                  <div className={styles.temps}>
                    <div className={styles.temp}>
                      <span>max</span>
                      <p>{weather.data.daily.temperature_2m_max[index]}°C</p>
                    </div>
                    <div className={styles.temp}>
                      <span>min</span> 
                      <p>{weather.data.daily.temperature_2m_min[index]}°C</p>
                      </div>
                  </div>

                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        )
        : (
          <h1 className='center' >Loading...</h1>
        )}
    </>
  );
}

export default Weather;
