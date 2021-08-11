import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import {useState} from 'react';
import getCenter from 'geolib/es/getCenter';


function Map({searchResults}) {

  const[selectedLocation,setSelectedLocation]=useState();


        //Transform the search results object {star:,price:,long:7584,lat:4657} into the {latitiute:858458,longitude:857857} object
        const coordinates=searchResults.map(result =>({
          longitude:result.long,
          latitude:result.lat,

        }));
        //centeral point of all the list of longitude and latitude value to pinpoint
        const center=getCenter(coordinates);
       // console.log(center);

       const [viewport, setViewport] = useState({
        width:"100%",
        height:"100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 8
      });
     // console.log(setSelectedLocation);
    return (

     <ReactMapGL

    mapStyle='mapbox://styles/shravani27/cks3zd4ry4br317mw6lp3y8cv'
    /*to gey map public key fetched from mapbox website and stored the value in next.config.js */
    mapboxApiAccessToken={process.env.mapbox_key}
    //to access the attributes in const viewport
    {...viewport} 
    //to make the map responsive
    onViewportChange={(nextViewport) => setViewport(nextViewport)}>

      {/*To pinpoint the designated place location using marker*/}

      {searchResults?.map(result => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            //To position the pin on map
            offsetLeft={-20}
            offsetTop={-10}
            >
              <p 
              role='img'
              onClick= {()=>setSelectedLocation(result)}
               className="cursor-pointer  text-2xl animate-bounce"
               aria-label="push-pin">
                📌
              </p>
          </Marker>

          {/* The popup should show if we click on mark up(push pin)*/}
          {selectedLocation.long==result.long ?(
            <Popup
            //reset my setselected location after clicking to empty value
              onClose={()=>setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
              >
               { result.title}
              </Popup>
          ):
          (false)
          }
        </div>
      ))}
        </ReactMapGL>
    );
}

export default Map
