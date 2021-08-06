import Head from 'next/head';
import Header from "../components/Header";
import Banner from "../components/Banner";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';

export default function Home({exploreData,cardsData}) {

  return (
    <div className="">
      <Head>
        <title>Create Airbnb Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*Header*/}
      <Header />
      {/*banner*/}
      <Banner />
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pd-5 ">Explore Nearby</h2>
          {/*pull some data from a server-API endpoints and map it*/}
          <div className="grid grid-cols-1 sm:grid-cols-2
          lg:grid-cols-3 xl:grid-cols-4">
          { exploreData?.map((item) => (
              //<h1>{item.location}</h1>
              <SmallCard 
              key={item.img}
              img={item.img} 
              distance={item.distance}
              location={item.location} />

              /*or exploreData?.map(({img,diatance,location}}) => (
              //<h1>{item.location}</h1>
              <SmallCard 
              key={img}
              img={img} 
              distance={distance}
              location={location} />*/
            ))}
            </div>
          </section>

          <section>
            <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
            <div className="flex space-x-3 overflow-scroll scrollbar-hide
            p-3 ml-3">
            {cardsData?.map(({img,title}) => (
              <MediumCard 
              key={img}
              img={img} 
              title={title}
               />
            ))}
            </div>
          </section>
          
          <section>
          <LargeCard 
             img="https://links.papareact.com/4cj"
             title="The Greatest Outdoors"
             description="Wishlist curated by Airbnb"
             butttonText="Get Inspired"
          />
          </section>
        </main>
        <Footer />
    </div>
  );
}

//function to do static server rendering
export async function getStaticProps(){
  const exploreData=await fetch('https://links.papareact.com/pyp').
  then(
    (res)=>res.json()
  );

  const cardsData=await fetch('https://links.papareact.com/zp1').
  then(
    (res)=>res.json()
  );
  return{
     props:{
       exploreData,
       cardsData,
     },
    }
}