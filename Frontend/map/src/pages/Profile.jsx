import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinCard from '../Components/PinCard.jsx';
import './Profile.css';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const [pins, setPins] = useState(null);
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        async function fetchUserPins(params) {
            try {
                const userName = localStorage.getItem('user')
                const userpins = await axios.get(`${process.env.REACT_APP_URL}/pin/user/${userName}`);
                setPins(userpins.data);
                console.log(userpins.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchUserPins();
    },[])

    const handleDeletePin = async (pinId) => {
        if (window.confirm('Are you sure you want to delete this pin?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_URL}/pin/${pinId}`);
                setPins(pins?.filter(pin => pin._id !== pinId));
            } catch (err) {
                console.log('Error deleting pin:', err);
                alert('Failed to delete pin. Please try again.');
            }
        }
    };

    const handleEditPin = (pinId) => {
        // Navigate to edit page or open edit modal
        console.log('Edit pin:', pinId);
    };

    const handleSharePin = (pin) => {
        if (navigator.share) {
            navigator.share({
                title: pin.title,
                text: pin.desc,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${pin.title}: ${pin.desc}`);
            alert('Pin details copied to clipboard!');
        }
    };

    const handleBackToMap = () => {
        navigate('/');
    };

    return (
        <div className="profile-container">
            {/* Header */}
            <header className="profile-header">
                <div className="header-content">
                    <button className="back-button" onClick={handleBackToMap}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span>Map</span>
                    </button>
                </div>
            </header>


            {/* Pins Grid/List */}
            <main className="pins-section">
                {pins?.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        </div>
                        <h3>No pins yet</h3>
                        <p>Start exploring and create your first pin!</p>
                        <button className="button login" onClick={handleBackToMap}>
                            Explore Map
                        </button>
                    </div>
                ) : (
                    <div className={`pins-container ${viewMode}`}>
                        {pins?.map(pin => (
                            <PinCard
                                key={pin._id}
                                pin={pin}
                                viewMode={viewMode}
                                onDelete={handleDeletePin}
                                onEdit={handleEditPin}
                                onShare={handleSharePin}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Profile;