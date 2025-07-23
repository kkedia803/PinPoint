import React, { useState } from 'react';
import './PinCard.css';
import { MdOutlineSubtitles } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { FcRating } from "react-icons/fc";
import { SiNamebase } from "react-icons/si";
import { TbWorldLatitude } from "react-icons/tb";
import { TbWorldLongitude } from "react-icons/tb";
import { GiBulletBill } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const PinCard = ({ pin, onDelete, onEdit }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={'pin-card grid'}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="pin-image">
        <div className='headingDiv'>
          <GiBulletBill color='darkblue'/>
          <span>PIN DATA</span>
        </div>
        <div className='datadiv'>
          <MdOutlineSubtitles color='red'/>
          <span>{pin.title}</span>
        </div>
        <div className='datadiv'>
          <TbFileDescription color='red'/>
          <span>{pin.desc}</span>
        </div>
        <div className='datadiv'>
          <FcRating color='red'/>
          <span>{pin.rating}</span>
        </div>
        <div className='datadiv'>
          <SiNamebase color='red'/>
          <span>{pin.username}</span>
        </div>
        <div className='datadiv'>
          <TbWorldLatitude color='green'/>
          <span>{pin.lat}</span>
        </div>
        <div className='datadiv'>
          <TbWorldLongitude color='green'/>
          <span>{pin.long}</span>
        </div>
        <div className={`pin-actions ${showActions ? 'visible' : ''}`}>
          <button
            className="action-btn edit"
            onClick={() => onEdit(pin._id)}
            title="Edit pin"
          >
            <FaEdit size={40}/>
          </button>
          <button
            className="action-btn delete"
            onClick={() => onDelete(pin._id)}
            title="Delete pin"
          >
            <MdDelete size={40}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinCard;
