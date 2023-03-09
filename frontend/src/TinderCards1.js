import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import {
    Container,
    Col,
    Row,
} from 'reactstrap'
import './TinderCards.css'

function TinderCards({urlImages}) {
    const [people, setPeople] = useState([
        {
            name: 'Elon Musk',
            url: 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSStEXQ52SE6txqvnwfAyOZ-dt6fkkBqzcir0RaZkoG54dYK7UByieR90Nb18ON4rdZ6VyDNVuQdk1kXik'
        },
        {
            name: 'Jeff Bezos',
            url: 'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQcKtPg4LQ1A7_j_7_ph7FfTTTjQrnqOdC2EPUHdeqAZ01JOImw19i9gvYHROXo0HahI13E_dZ1ZekfGEE'
        }
    ])

    const swiped = (direction, nameToDelete) => {
        console.log("removing: " + nameToDelete)
    }

    const outOfFrame = (name) => {
        console.log(name + " left the screen")
    }

    return (
               <div className='tinderCards'>
               <div className='cardContainer'>
               {
//                    people.map((person) => (
                    imageUrls.map((url, key) =>
                        <TinderCard
                            className="swipe"
//                            key={person.name}
//                            preventSwipe={["up", "down"]}
//                            onSwipe={(dir) => swiped(dir, person.name)}
//                            onCardLeftScreen={() => outOfFrame(person.name)}
                            key='key'
                            onSwipe={(dir) => swiped(dir, key)}
                            onCardLeftScreen={() => outOfFrame(key)}
                        >
                            <div
//                                style={{ backgroundImage: `url(${person.url})` }}
                                style={{ backgroundImage: `url(${url})` }}
                                className="cardTinder"
                            >
//                                <h3>{person.name}</h3>
                                <h3>{key}</h3>
                            </div>
                        </TinderCard>
                    ))
                }
                </div>
                </div>
    );
}

export default TinderCards