import React, { useEffect } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { PiMapPinFill } from 'react-icons/pi';
import {
    MdLocationOn,
    MdRateReview,
    MdStar,
    MdPerson,
    MdCalendarToday
} from 'react-icons/md';
import { FaStar, FaRegStar } from 'react-icons/fa';

const PinMarkers = ({
    pins, currentUser, selectedPin, setSelectedPin, handleMarkerClick
}) => {
    const renderStars = (rating) => {
        return (
            <div className="rating-display">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>
                        {star <= rating ? (
                            <FaStar className="star-filled-display" />
                        ) : (
                            <FaRegStar className="star-empty-display" />
                        )}
                    </span>
                ))}
            </div>
        );
    };

    useEffect(() => {
        if (selectedPin) {
            console.log('selected pin', selectedPin);
            console.log('selected pin lat', selectedPin.lat);
            console.log('selected pin long', selectedPin.long);
            console.log('selected pin id', selectedPin._id);
        }
    }, [selectedPin])

    return (
        <>
            {pins.map(p => {
                if (!currentUser || p.username === currentUser) {
                    return (

                        <div key={p._id || `${p.lat}-${p.long}`}>
                            <Marker longitude={p.long} latitude={p.lat}>
                                <div
                                    className="pin-marker-container"
                                    onClick={(e) => { e.stopPropagation(); setSelectedPin(p) }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <PiMapPinFill
                                        className={`pin-marker ${p.username === currentUser ? 'own-pin' : 'other-pin'}`}
                                    />
                                    <div className="pin-shadow"></div>
                                </div>
                            </Marker>
                        </div>

                    )
                }
            })}

            {selectedPin && (
                <Popup
                    longitude={selectedPin.long}
                    latitude={selectedPin.lat}
                    anchor="left"
                    onClose={() => setSelectedPin(null)}
                    className="pin-popup"
                >
                    <div className="pin-card">
                        <div className={`${selectedPin.username === currentUser ?'pin-card-header2':'pin-card-header'}`}>
                            <div className="location-icon">
                                <MdLocationOn />
                            </div>
                            <h3 className="pin-title">{selectedPin.title}</h3>
                        </div>

                        <div className="pin-card-content">
                            <div className="review-section">
                                <div className="section-header">
                                    <MdRateReview className="section-icon" />
                                    <span className="section-label">Review</span>
                                </div>
                                <p className="pin-description">{selectedPin.desc}</p>
                            </div>

                            <div className="rating-section">
                                <div className="section-header">
                                    <MdStar className="section-icon" />
                                    <span className="section-label">Rating</span>
                                </div>
                                {renderStars(selectedPin.rating)}
                            </div>

                            <div className="info-section">
                                <div className="user-info">
                                    <MdPerson className="info-icon" />
                                    <span className="info-text">
                                        Created by <strong>{selectedPin.username}</strong>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
            )}
        </>
    )
}

export default PinMarkers