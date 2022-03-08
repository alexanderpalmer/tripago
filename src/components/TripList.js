import { useState, useEffect, useCallback } from "react";
import './TripList.css';

export default function TripList() {

    const [trips, setTrips] = useState([]);
    const [url, setUrl] = useState('http://localhost:3000/trips');

    // useCallback cached die Funktion, damit nicht bei jedem
    // Rendern der Komponente die Funktion neu erzeugt wird.
    // Wenn sich das Dependency url ändert, wird eine neue
    // Funktion fetchTrips gecached. Somit wird bei useEffect
    // aufgrund der neuen Funktion die Funktion fetchTrips
    // erneut aufgerufen. 
    const fetchTrips = useCallback(async () => {
        const response = await fetch(url);
        const json = await response.json();
        setTrips(json);
    }, [url]); // Bei einer Änderung der url wird eine neue Version gecached

    // useEffect wird nach dem ersten Rendern des JSX
    // aufgerufen. Da das zweite Argument [] ein leeres
    // Array ist, wird dieser Side-Effect nur einmal aktiviert

    // durch das zweite Argument (hier in Array fetchTrips), wird eine
    // dependency mit dem useCallback-Hook hergestellt.
    // siehe Kommentar bei fetchTrips
    useEffect(() => {
        fetchTrips();
    }, [fetchTrips])

    console.log(trips);

    return ( 
        <div className="trip-list">
            <h2>TripList</h2>
            <ul>
                {trips.map(trip => (
                    <li key={trip.id}>
                        <h3>{trip.title}</h3>
                        <p>{trip.price}</p>
                    </li>
                ))}
            </ul>

            <div className="filters">
                <button onClick={()=> setUrl('http://localhost:3000/trips?loc=europe')}>
                    European Trips
                </button>
                <button onClick={()=> setUrl('http://localhost:3000/trips')}>
                    All Trips
                </button>
            </div>
        </div>
    )
}