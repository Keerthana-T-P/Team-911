import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS

mapboxgl.accessToken = 'pk.eyJ1Ijoia2VlcnU1NCIsImEiOiJjbHoyeHZ5dHUwcW9oMnJwZmJqOXk1OGtjIn0.WqtCLysVj7z9UGxGwnvCIQ';

const MapComponent = () => {
    const mapContainerRef = useRef(null);
    const userInteracting = useRef(false);
    const spinEnabled = useRef(true);

    useEffect(() => {
        // Initialize the map
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v9',
            zoom: 7,
            center: [76.2711, 10.8505]
        });

        map.addControl(new mapboxgl.NavigationControl());
        map.scrollZoom.disable();
        map.on('style.load', () => {
            map.setFog({});
        });

        // Spin globe logic
        const spinGlobe = () => {
            const zoom = map.getZoom();
            if (spinEnabled.current && !userInteracting.current && zoom < 5) {
                let distancePerSecond = 360 / 240;
                if (zoom > 3) {
                    const zoomDif = (5 - zoom) / (5 - 3);
                    distancePerSecond *= zoomDif;
                }
                const center = map.getCenter();
                center.lng -= distancePerSecond;
                map.easeTo({ center, duration: 1000, easing: (n) => n });
            }
        };

        map.on('mousedown', () => {
            userInteracting.current = true;
        });
        map.on('dragstart', () => {
            userInteracting.current = true;
        });
        map.on('moveend', () => {
            spinGlobe();
        });
        spinGlobe();

        // Haversine distance function
        const haversineDistance = (coords1, coords2) => {
            const toRad = (x) => x * Math.PI / 180;
            const R = 6371; // Radius of Earth in km

            const dLat = toRad(coords2.lat - coords1.lat);
            const dLon = toRad(coords2.lng - coords1.lng);
            const lat1 = toRad(coords1.lat);
            const lat2 = toRad(coords2.lat);

            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in km
        };

        const kochiCoords = { lat: 9.9312, lng: 76.2673 };
        new mapboxgl.Marker({ color: 'red' })
            .setLngLat([kochiCoords.lng, kochiCoords.lat])
            .addTo(map);

        const fridgeCoords = [
            { lat: 10.0159, lng: 76.3419 }, // Fridge 1
            { lat: 10.5276, lng: 76.2144 }, // Fridge 2
            { lat: 9.9392, lng: 76.2602 },  // Fridge 3
            { lat: 10.0889, lng: 76.3892 }, // Fridge 4
            { lat: 9.8693, lng: 76.3767 }   // Fridge 5
        ];

        const distances = [];
        fridgeCoords.forEach((coords) => {
            new mapboxgl.Marker()
                .setLngLat([coords.lng, coords.lat])
                .addTo(map);

            const distance = haversineDistance(kochiCoords, coords);
            distances.push(distance);
        });

        console.log("Distances from Kochi to each fridge (in km):", distances);

        return () => map.remove();
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            position: 'relative',
            overflow: 'hidden',
            bottom:50
        }}>
            <div ref={mapContainerRef} style={{
                width: '80%',
                height: '60vh',
                position: 'relative',
            }}>
                <div id="info" style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'white',
                    padding: '10px',
                    borderRadius: '5px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                    zIndex: 1
                }}>
                    Community Fridges and Distances from Kochi:
                </div>
            </div>
        </div>
    );
};

export default MapComponent;
