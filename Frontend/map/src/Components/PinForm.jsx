import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { PiMapPinFill } from 'react-icons/pi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { 
    MdLocationOn, 
    MdRateReview, 
    MdStar, 
    MdAdd
} from 'react-icons/md';

const StarRating = ({ rating, onRatingChange }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="rating-display">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className="star-button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => onRatingChange(star)}
                >
                    {star <= (hoverRating || rating) ? (
                        <FaStar className="star-filled-display" />
                    ) : (
                        <FaRegStar className="star-empty-display" />
                    )}
                </button>
            ))}
            <span className="rating-number">
                {rating > 0 ? `(${rating}/5)` : 'Select rating'}
            </span>
        </div>
    );
};

const PinForm = ({ 
    clickedLocation,
    handleSubmit,
    title,
    setTitle,
    desc,
    setDesc,
    star,
    setStar,
    setClickedLocation
}) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!desc.trim()) {
            newErrors.desc = 'Description is required';
        }

        if (!star || star === 0) {
            newErrors.star = 'Please select a rating';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await handleSubmit(e);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Marker
                longitude={clickedLocation.longitude}
                latitude={clickedLocation.latitude}
            >
                <div className="pin-marker-container">
                    <PiMapPinFill className="pin-marker own-pin" />
                    <div className="pin-shadow"></div>
                </div>
            </Marker>
            <Popup
                latitude={clickedLocation.latitude}
                longitude={clickedLocation.longitude}
                closeButton={true}
                anchor="left"
                onClose={() => setClickedLocation(null)}
                className="pin-popup"
            >
                <div className='pin-card'>
                    <div className="pin-card-header">
                        <div className="location-icon">
                            <MdAdd />
                        </div>
                        <h3 className='pin-title'>Add New Pin</h3>
                    </div>

                    <div className="pin-card-content">
                        <form onSubmit={onSubmit}>
                            <div className="review-section">
                                <div className="section-header">
                                    <MdLocationOn className="section-icon" />
                                    <span className="section-label">Title</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter a title"
                                    value={title}
                                    autoFocus
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        if (errors.title) {
                                            setErrors(prev => ({ ...prev, title: null }));
                                        }
                                    }}
                                    className={`pin-input ${errors.title ? 'error' : ''}`}
                                />
                                {errors.title && <span className="error-message">{errors.title}</span>}
                            </div>

                            <div className="review-section">
                                <div className="section-header">
                                    <MdRateReview className="section-icon" />
                                    <span className="section-label">Description</span>
                                </div>
                                <textarea
                                    placeholder="Tell us about this place..."
                                    value={desc}
                                    rows="3"
                                    onChange={(e) => {
                                        setDesc(e.target.value);
                                        if (errors.desc) {
                                            setErrors(prev => ({ ...prev, desc: null }));
                                        }
                                    }}
                                    className={`pin-textarea ${errors.desc ? 'error' : ''}`}
                                />
                                {errors.desc && <span className="error-message">{errors.desc}</span>}
                            </div>

                            <div className="rating-section">
                                <div className="section-header">
                                    <MdStar className="section-icon" />
                                    <span className="section-label">Rating</span>
                                </div>
                                <StarRating 
                                    rating={parseInt(star) || 0} 
                                    onRatingChange={(rating) => {
                                        setStar(rating);
                                        if (errors.star) {
                                            setErrors(prev => ({ ...prev, star: null }));
                                        }
                                    }} 
                                />
                                {errors.star && <span className="error-message">{errors.star}</span>}
                            </div>

                            <div className="info-section">
                                <button 
                                    type="submit" 
                                    className={`pin-submit-button ${isSubmitting ? 'submitting' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="spinner"></div>
                                            Adding...
                                        </>
                                    ) : (
                                        'Add Pin'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default PinForm;