import 'leaflet/dist/leaflet.css'

import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '../../../Module/Place/Place.class';
import L from 'leaflet'

import herePoint from '../../../../public/Logo/herePoint.svg'
import restaurantPoint from '../../../../public/Logo/restaurantPoint.svg'
import hotelPoint from '../../../../public/Logo/hotelPoint.svg'
import activityPoint from '../../../../public/Logo/activityPoint.svg'
import { placesTab } from '../../../Module/Place/Place.hook';

type interactivMapProps={
    placeData: Place
    suggestions: placesTab
}

export const InteractivMap:React.FC<interactivMapProps> = (props) => {

    const hereIcon = L.icon({
        iconUrl:herePoint,
        iconAnchor:[(60/2),72]
    })

    const restaurantIcon = L.icon({
        iconUrl:restaurantPoint,
        iconAnchor:[(60/2),72]
    })

    const hotelIcon = L.icon({
        iconUrl:hotelPoint,
        iconAnchor:[(60/2),72]
    })

    const activityIcon = L.icon({
        iconUrl:activityPoint,
        iconAnchor:[(60/2),72]
    })
    
    return(
        <div id="map" className='w-1/3 h-[700px] shadow-lg'>
            <MapContainer center={[props.placeData.getLatCoordinate(), props.placeData.getLonCoordinate()]} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
        <Marker position={[props.placeData.getLatCoordinate(), props.placeData.getLonCoordinate()]} icon={hereIcon} />
        {props.suggestions.activity && props.suggestions.activity.map((place)=>{return(
            place.getId()!== props.placeData.getId() && <Marker position={[place.getLatCoordinate(), place.getLonCoordinate()]} icon={activityIcon} />
        )})}
        {props.suggestions.hotel && props.suggestions.hotel.map((place)=>{return(
            place.getId()!== props.placeData.getId() && <Marker position={[place.getLatCoordinate(), place.getLonCoordinate()]} icon={hotelIcon} />
        )})}
        {props.suggestions.restaurant && props.suggestions.restaurant.map((place)=>{return(
            place.getId()!== props.placeData.getId() && <Marker position={[place.getLatCoordinate(), place.getLonCoordinate()]} icon={restaurantIcon} />
        )})}
      </MapContainer>
    </div>
    )
}
