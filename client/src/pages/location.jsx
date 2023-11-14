import { Link } from 'react-router-dom'
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useState, useEffect } from 'react';
import {
    GoogleMap,
    useJsApiLoader,
    Marker
} from '@react-google-maps/api';

const LocationPage = () => {
    const [selectedLocation, setSelectedLocation] = useState({
        lat: 32.7767,
        lng: -96.7970
    });

    const [userLocation, setUserLocation] = useState({
        lat: 32.7767,
        lng: -96.7970
    });

    const [pickupLocation, setPickupLocation] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [time, setTime] = useState('');
    const [dropOffDate, setDropOffDate] = useState('');

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


    const onMapClick = (event) => {
        setSelectedLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
    };

    const containerStyle = {
        width: '25rem',
        height: '25rem',
        border: "5px solid gray"
    };

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    const success = (pos) => {
        const crd = pos.coords;
        // console.log("Your current position is:");
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${crd.accuracy} meters.`);
        const coords = {
            lat: crd.latitude,
            lng: crd.longitude,
        };

        setUserLocation(coords);
        setSelectedLocation(coords)
    }

    const errors = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    console.log(result);
                    if (result.state === "granted") {
                        //If granted then you can directly call your function here
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "prompt") {
                        //If prompt then the user will be asked to give permission
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "denied") {
                        //If denied then you have to show instructions to enable location
                        console.log("Location permission denied.");
                    }
                });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('button clicked');
        [pickupLocation, setPickupLocation];
        console.log(pickupLocation);
        [pickupDate, setPickupDate];
        console.log(pickupDate);
        [dropOffDate, setDropOffDate];
        console.log(dropOffDate);
        const userInfo = [pickupLocation, pickupDate, dropOffDate]
    };


    return (
        <>
            <Container className=''>
                <h1>Step:1 </h1>
                <ProgressBar animated now={33} />
            </Container>
            <Form onSubmit={handleSubmit} as={Row} className="mb-5 mt-5">
                <Col className="mb-3 col-lg-12 col-sm-2 m-2">
                    <Form.Group as={Row} controlId="formGridLocation">
                        <Form.Label>Pick-up location or Zip Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter location"
                            name="pickupLocation"
                            value={pickupLocation}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group as={Row} controlId="formGridDate">
                        <Form.Label>Pick-up date</Form.Label>
                        <Form.Control
                            type="date"
                            name="pickupDate"
                            value={pickupDate}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    {/* <Form.Group as={Col} controlId="formGridTime">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                        type="time"
                        name="time"
                        value={time}
                        onChange={handleInputChange}
                    />
                </Form.Group> */}

                    <Form.Group as={Row} controlId="formGridDropOffDate">
                        <Form.Label>Drop-off date</Form.Label>
                        <Form.Control
                            type="date"
                            name="dropOffDate"
                            value={dropOffDate}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>

                <Button onClick={handleSubmit} variant="primary" type="submit" className='col-lg-2 m-4'>
                    Submit
                </Button>
            </Form>
            <div className="col-4 d-none d-md-block">

                {
                    isLoaded ?
                        <GoogleMap
                            center={selectedLocation}
                            zoom={15}
                            onClick={onMapClick}
                            mapContainerStyle={containerStyle}>
                            <Marker position={userLocation} />
                        </GoogleMap> : <></>
                }
            </div>

            {/* <h3>Select Your Car Now</h3> */}
            <Link to="product-info"><Button>Next</Button> </Link>

        </>
    );
};

export default LocationPage;

{/* <>
<Container className=''>
    <h1>Step:1 </h1>
    <ProgressBar animated now={33} />
</Container>
<div className='m-5'>
    <h2>Choose a location</h2>

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
        <Marker position={userLocation} />
    </GoogleMap> : <></>
    }

    <div>
        <h3>Select Your Car Now</h3>
        <Link to="product-info"><Button> Pick Car </Button> </Link>
    </div>
</div >
</> */}
