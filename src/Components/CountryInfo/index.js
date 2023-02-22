import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../util/api";
import { Link } from "react-router-dom";
import {Map, Marker, Popup, GeoJSON, TileLayer} from 'react-leaflet';
import { Icon } from "leaflet";
import countries from "../util/countries.json";
import "./style.css";


export const icon = new Icon({
  iconUrl: "https://assets.stickpng.com/images/5888920ebc2fc2ef3a1860a9.png",
  iconSize: [40]
});

const CountryInfo = () => {

  

  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [details,setDetails] = useState([]);

  

  const { countryName } = useParams();

  const onEachCountry = (country, layer) => {

    const nameOfCoutry = country.properties.ADMIN;
    console.log(nameOfCoutry);
    layer.bindPopup(nameOfCoutry);
    layer.setStyle(
      {
        color:"blue",
        fillColor:"lightblue"
      }
    )

    layer.on({
      mouseover:(event) => {
        event.target.setStyle(
          {
            color:"yellow",
            fillColor:"red"
          }
        )
      },
      mouseout:(event) => {
        event.target.setStyle(
          {
            color:"blue",
            fillColor:"lightblue"
          }
        )
      }
    })

  }

  //const borders = country.map((country) => country.borders);
  var latlngCapital,Capital,Country,Population,Language,coatOfArmsLogo;

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${apiURL}/name/${countryName}`);

        if (!res.ok) throw new Error("Could not found!");

        const data = await res.json();

        setCountry(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryName]);

  

  return (
    <div className="country__info__wrapper">
      <button>
        <Link to="/">Back</Link>
      </button>

      {isLoading && !error && <h4>Loading........</h4>}
      {error && !isLoading && { error }}

      {country?.map((country, index) => (
        <div className="country__info__container" key={index}>


          <div className="country__info-img">
            <img src={country.flags.png} alt="" />
          </div>

          <div className="country__info">
            <img className="Country__info__coat" src={country.coatOfArms.png} alt=""/>
              <h3>{country.name.common}</h3>
            
            
            <div className="country__info-left">
              <h5>
                Population:{" "}
                <span>
                  {new Intl.NumberFormat().format(country.population)}
                </span>
              </h5>
              <h5>
                Region: <span>{country.region}</span>
              </h5>
              <h5>
                Sub Region: <span>{country.subregion}</span>
              </h5>
              <h5>
                Capital: <span>{country.capital}</span>
              </h5>
              <div hidden="hidden">
              {latlngCapital =  country.capitalInfo.latlng}
              {Capital = country.capital}
              {Country = country.name.common}
              {Population = Intl.NumberFormat().format(country.population)}
              {Language = Object.values(country.languages)}
              {coatOfArmsLogo = country.coatOfArms.png}
              </div>
              <h5>
                Language: <span>{Language[0]}</span>
              </h5>
            </div>
          </div>
        </div>
      ))}
      {console.log(countryName)}
      
      <Map center={latlngCapital} zoom={7}>
        <TileLayer
          url="https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=frUJydRn2J8XP1SkGbgc"
          />

        <GeoJSON 
          data={countries.features}
          onEachFeature={onEachCountry}
          />
        

        <Marker position={latlngCapital}
          onClick={() => {
            setDetails(Capital);
          }}
            />

        {details && (
          <Popup
            position={latlngCapital}
            onClose={() => {
              setDetails(null);
            }}
          >
            <div>
              <h2>{Country}</h2>
              <p>Capital: {Capital}</p>
              <p>Population: {Population}</p>
            </div>
          </Popup>
        )}
      </Map>


    </div>
  );
};

export default CountryInfo;
