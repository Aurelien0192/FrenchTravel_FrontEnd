import 'leaflet/dist/leaflet.css'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '../../../Module/Place/Place.class';
import L from 'leaflet'

import herePoint from '../../../../public/Logo/herePoint.svg'
import restaurantPoint from '../../../../public/Logo/restaurantPoint.svg'
import hotelPoint from '../../../../public/Logo/hotelPoint.svg'
import activityPoint from '../../../../public/Logo/activityPoint.svg'
import { placesTab } from '../../../Module/Place/Place.hook';
import Control from 'react-leaflet-custom-control'
import { SelectorButton } from '../../Components/General/SelectorButton';
import { useState } from 'react';
import { PlaceDisplayLittleCard } from './PlaceDisplayLittleCards';



type interactivMapProps={
    placeData: Place
    suggestions: placesTab
}

export const InteractivMap:React.FC<interactivMapProps> = (props) => {

    const [selected, setSelected] = useState<string>("all")

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
        <div id="map" className='hidden md:block w-1/3 h-[700px] shadow-lg'>
            <MapContainer center={[props.placeData.getLatCoordinate(), props.placeData.getLonCoordinate()]} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                <Marker position={[props.placeData.getLatCoordinate(), props.placeData.getLonCoordinate()]} icon={hereIcon} />
                {(props.suggestions.activity && (selected==="all" || selected==="activity")) && props.suggestions.activity.map((place, index)=>{return(
                    place.getId()!== props.placeData.getId() && 
                        <Marker key={index} position={[place.getLatCoordinate(), place.getLonCoordinate()]} icon={activityIcon}>
                            <Popup>
                                <div className='size-full'>
                                    <PlaceDisplayLittleCard type="little" place={place}/>
                                </div>
                            </Popup>
                        </Marker>
                )})}
                {(props.suggestions.hotel && (selected==="all" || selected==="hotels")) && props.suggestions.hotel.map((place,index)=>{return(
                    place.getId()!== props.placeData.getId() && 
                        <Marker key={index} position={[place.getLatCoordinate(), place.getLonCoordinate()]} icon={hotelIcon}>
                            <Popup>
                                <div className='size-full'>
                                    <PlaceDisplayLittleCard type="little" place={place}/>
                                </div>
                            </Popup>
                        </Marker>
                )})}
                {(props.suggestions.restaurant && (selected==="all" || selected==="restaurants")) && props.suggestions.restaurant.map((place,index)=>{return(
                    place.getId()!== props.placeData.getId() && 
                        <Marker key={index} position={[place.getLatCoordinate(), place.getLonCoordinate()]} icon={restaurantIcon}>
                            <Popup>
                                <div className='size-full'>
                                    <PlaceDisplayLittleCard type="little" place={place}/>
                                </div>
                            </Popup>
                        </Marker>
                )})}
                <Control position='topright'>
                    <div className=' flex flex-col bg-white bg-opacity-50 rounded'>
                        <SelectorButton selected={selected==="all"} value='all' onClick={()=>{setSelected("all")}}>Tous</SelectorButton>
                        <SelectorButton selected={selected==="restaurants"} value='restaurants' onClick={()=>{setSelected("restaurants")}}>Restaurants</SelectorButton>
                        <SelectorButton selected={selected==="hotels"} value='hotels' onClick={()=>{setSelected("hotels")}}>Hôtels</SelectorButton>
                        <SelectorButton selected={selected==="activity"} value='activiy'onClick={()=>{setSelected("activity")}}>Activités</SelectorButton>
                    </div>
                </Control>
            </MapContainer>
        </div>
    )
}
