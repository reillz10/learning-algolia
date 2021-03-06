import React from 'react';
import { InstantSearch, Hits, SearchBox, Index, Stats, connectHits, connectStats, RefinementList } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);


const CustomHit = ({hit}) => (
  <div >
    <img className='card-img-top' src={hit.thumbnail_url} />
    <div className='card-body'>
      <p className='card-title'>
        {hit.city}
      </p>
      <p className='card-text'>
        {hit.name} is located in {hit.country}
      </p>
      <ul className='list-group list group-flush'>
        <li className='list-group-item'>Price: {hit.price_formatted}</li>
        <li className='list-group-item'># of Beds: {hit.beds}</li>
        <li className='list-group-item'># of Bathrooms: {hit.bathrooms}</li>

      </ul>
    </div>
  </div>
);

const CustomHits = ({hits}) => (
  <div className="container">
    <div className='row'>
      {hits.length && hits.map(hit => (
        <div className="col-4 mb-3">
          <CustomHit hit={hit} />
        </div>
      ))}
    </div>
  </div>
);


const ConnectedCustomHits = connectHits(CustomHits);

// how many 2 miliseconds are there in 1000 / 2(result number)
const CustomStats = ({processingTimeMS, nbHits}) => {
  const hitPerSec = (1000 / processingTimeMS) * nbHits;
  return (
    <p>Possible hits per second: {hitPerSec}</p>
  );
};

const ConnectedCustomStats = connectStats(CustomStats);

const App = () => (
  <InstantSearch searchClient={searchClient} indexName="airbnb">
    <SearchBox />
    
    <p>Results in first dataset</p>
    {/* <Hits /> */}
    {/* <Stats /> */}
    <RefinementList attribute="city" />
    <Hits hitComponent={CustomHit}/>
    {/* <ConnectedCustomHits /> */}
    
    
    <Index indexName="instant_search">
      <p>Results in second dataset</p>
      <Hits />
    </Index>
  </InstantSearch>
);

export default App;
