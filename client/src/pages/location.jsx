
import { useState } from 'react';
import {
    GoogleMap,
    useJsApiLoader,
} from '@react-google-maps/api';

const LocationPage = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [pickupLocation, setPickupLocation] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [time, setTime] = useState('');
    const [dropOffDate, setDropOffDate] = useState('');
    const [setChooseCar] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB_5zs__O1tCWMXp1-Pxty1D6cZ0JK3eo8",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'pickupLocation':
                setPickupLocation(value);
                break;
            case 'pickupDate':
                setPickupDate(value);
                break;
            case 'time':
                setTime(value);
                break;
            case 'dropOffDate':
                setDropOffDate(value);
                break;
            default:
                break;
        }
    };

    const handleGoToCars = (car) => {
        setChooseCar(car);
    }

    const onMapClick = (event) => {
        setSelectedLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
    };

    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    return (
        <div>
            <h2>Location Picker</h2>

            <div>
                <label>Pick-up location or Zip Code:</label>
                <input
                    type="text"
                    name="pickupLocation"
                    value={pickupLocation}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label>Pick-up date:</label>
                <input
                    type="date"
                    name="pickupDate"
                    value={pickupDate}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label>Time:</label>
                <input
                    type="time"
                    name="time"
                    value={time}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label>Drop-off date:</label>
                <input
                    type="date"
                    name="dropOffDate"
                    value={dropOffDate}
                    onChange={handleInputChange}
                />
            </div>

            {isLoaded ? <GoogleMap
                center={selectedLocation}
                zoom={15}
                onClick={onMapClick}
                mapContainerStyle={containerStyle}
            >
                <></>
            </GoogleMap> : <></>
            }

            <div>
                <h3>Select Your Car Now</h3>
                <button onClick={() => handleGoToCars('Car')}>Car</button>
            </div>
        </div>
    );
};

export default LocationPage;