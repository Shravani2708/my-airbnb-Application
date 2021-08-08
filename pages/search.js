import Header from "../components/Header";
import Footer from '../components/Footer';
import { useRouter } from "next/router";
import {format} from "date-fns";
import InfoCards from "../components/infoCards";


//props-{searchResults}
function Search({searchResults}) {

    const router=useRouter();
    //to grab the values from the web url
    //ES6 destructuring
    const{location,startDate,endDate,noOfGuests}=router.query;

    //to get range in particular format

    const formattedStartDate= format(new Date(startDate),"dd MMMM yy");
    const formattedEndDate= format(new Date(endDate),"dd MMMM yy");
    //`` ->backtics allows to include javascript as string its called as string interpolation
    const rangeDate=`${formattedStartDate} - ${formattedEndDate}`;

    
    return (
        <div>
            <Header placeholder={`${location}| ${rangeDate} | ${noOfGuests} guests`}/>
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs"> 300+ stays-{rangeDate}- for {noOfGuests} guests</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                    <div className="hidden lg:inline-flex mb-5 space-x-3
                    text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation policy</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More filters</p>
                    </div>

                    <div className="flex flex-col">
                    {searchResults?.map(({img,location,title,description,star,price,
                                total}) => (
                        <InfoCards 
                        key={img}
                        img={img}
                        location={location}
                        title={title}
                        description={description}
                        star={star}
                        price={price}
                        total={total}                                    
                        />

                    ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Search

//to pull data from API using server side rendering
export async function getServerSideProps()
{
    const searchResults=await fetch("https://links.papareact.com/isz").then
    (res=>res.json());

    //to return to the json paramters to actual page
    return{
        props:{
            searchResults,
        },
    };
}