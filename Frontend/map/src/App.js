import * as React from 'react';
import { PiMapPinFill } from 'react-icons/pi'

// import mapboxgl from 'mapbox-gl';
// import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker'; 
// mapboxgl.workerClass = MapboxWorker;

import Map, { Marker, Popup } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css'
import StarIcon from '@mui/icons-material/Star';
import './app.css'
import axios from "axios"
import { useState, useEffect } from 'react';
// import { format } from 'timeago.js';
import Register from './Components/Register';
import Login from './Components/Login';
import PinForm from './Components/PinForm';
import PinMarkers from './Components/PinMarkers';

function App() {

  const myStorage = window.localStorage;

  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [selectedPin, setSelectedPin] = useState(null);

  const [clickedLocation, setClickedLocation] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);

  useEffect(() => {
    const getPins = async () => {
      try {
        console.log('url', process.env.REACT_APP_URL)
        const res = await axios.get(`${process.env.REACT_APP_URL}/pin`);
        setPins(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    getPins();
  }, [currentUser])

  const handleMarkerClick = (pin) => {
    setSelectedPin(pin);
    console.log(selectedPin);
  }

  const handleMapClick = (e) => {
    if (!currentUser) { return };
    const latitude = e.lngLat.lat;
    const longitude = e.lngLat.lng;
    setClickedLocation({ longitude, latitude });
  }

  const handleLogOut = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating: star,
      lat: clickedLocation.latitude,
      long: clickedLocation.longitude,
    };

    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/pin`, newPin);
      setPins([...pins, res.data]);

      setTitle('');
      setDesc('');
      setStar(0);
      setClickedLocation(null);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={{
          longitude: 77.2090212,
          latitude: 28.6139391,
          zoom: 11,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onClick={handleMapClick}
      // mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      >

        <PinMarkers
          pins={pins}
          currentUser={currentUser}
          selectedPin={selectedPin}
          setSelectedPin={setSelectedPin}
        />

        {clickedLocation && (

          <PinForm
            clickedLocation={clickedLocation}
            handleSubmit={handleSubmit}
            title={title}
            setTitle={setTitle}
            desc={desc}
            setDesc={setDesc}
            star={star}
            setStar={setStar}
            setClickedLocation={setClickedLocation}
            handleMarkerClick={handleMarkerClick}
          />
        )}
        <div className='logodiv'>
          <img src='../l.png' className='logo' />
        </div>
        {currentUser ? (
          <div className='dashboarddiv'>
            <button className='button logout' onClick={handleLogOut}>Log Out</button>
            <a className='button profile' href='/fdh'>Profile</a>
          </div>
        ) : (
          <div className='buttons'>
            <button className='button login' onClick={() => { setShowLogin(true); setShowRegister(false) }}>LogIn</button>
            <button className='button register' onClick={() => { setShowRegister(true); setShowLogin(false) }}>Register</button>
          </div>
        )}
        {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser} />}
        {showRegister && <Register setShowRegister={setShowRegister} />}
      </Map >
    </>

  );
}

export default App;
