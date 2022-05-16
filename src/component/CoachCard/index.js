import React from 'react';
import './style.css';

const CoachCard = ({first_name, last_name, email, specialty, bio, thumbnail}) => {

    const generic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    
    return (
        <div className='coach-card-container card'>
            <figure className='image-container'>
                <img className='image' src={thumbnail ? thumbnail : generic} alt={first_name} />
            </figure>
            <div className='card-name'>{first_name} {last_name}</div>
            <div className='card-email'>{email}</div>
            <div className='card-specialty'>
                {specialty.map( (item, index) => (
                    <span className='specialty-tag' key={index}>{item}</span>
                ))}
            </div>
            <hr />
            <div className='card-bio'>{bio}</div>
        </div>
    )
};

export default CoachCard;