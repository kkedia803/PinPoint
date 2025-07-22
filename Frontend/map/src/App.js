import * as React from 'react';
import { PiMapPinFill } from 'react-icons/pi'
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import StarIcon from '@mui/icons-material/Star';
import './app.css'
import axios from "axios"
import { useState, useEffect } from 'react';
import { format } from 'timeago.js';
import Register from './Components/Register';
import Login from './Components/Login';

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
      const res = await axios.post("/pin", newPin);
      setPins([...pins, res.data]);

      setTitle('');
      setDesc('');
      setStar(0);
      setClickedLocation(null);
    } catch (err) {
      console.log(err);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<StarIcon key={i} className='star' />);
    }
    return stars;
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

        {pins.map(p => {
          if (!currentUser || p.username === currentUser) {
            return (
              <div>
                <Marker
                  longitude={p.long} latitude={p.lat} onClick={() => handleMarkerClick(p)}>
                  <div>
                    <PiMapPinFill style=
                      {{
                        fontSize: '30px',
                        color: p.username === currentUser ? 'tomato' : 'slateblue',
                        cursor: 'pointer'
                      }} />
                  </div>
                </Marker>

                {selectedPin && (

                  <Popup longitude={p.long} latitude={p.lat} anchor='left' onClose={() => setSelectedPin(null)}>
                    <div className='card'>
                      <label>Place</label>
                      <h4 className='place'>{p.title}</h4>
                      <label>Review</label>
                      <p className='desc'>{p.desc}</p>
                      <label>Rating</label>
                      <div className='stars'>
                        {renderStars(p.rating)}
                      </div>
                      <div className='stars'>

                      </div>
                      <label>Information</label>
                      <span className='username'>Created By <b>{p.username}</b></span>
                      <span className='date'>{format(p.createdAt)}</span>
                    </div>
                  </Popup>
                )}

              </div>
            )
          }
        }
        )}

        {clickedLocation && (
          <>
            <Marker
              longitude={clickedLocation.longitude}
              latitude={clickedLocation.latitude}>
              <div>
                <PiMapPinFill style=
                  {{
                    fontSize: '30px',
                    color: 'green',
                    cursor: 'pointer'
                  }} />
              </div>
            </Marker>
            <Popup
              latitude={clickedLocation.latitude}
              longitude={clickedLocation.longitude}
              closeButton={true}
              anchor="left"
              onClose={() => setClickedLocation(null)}
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}

        {currentUser ? (
          <button className='button logout' onClick={handleLogOut}>Log Out</button>
        ) : (
          <div className='buttons'>
            <button className='button login' onClick={() => setShowLogin(true)}>LogIn</button>
            <button className='button register' onClick={() => setShowRegister(true)}>Register</button>
          </div>
        )}
        {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser} />}
        {showRegister && <Register setShowRegister={setShowRegister} />}
      </Map >
    </>

  );
}

export default App;
