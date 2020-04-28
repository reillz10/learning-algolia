import React from 'react';
import { InstantSearch, Hits, SearchBox, Index, connectHits  } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);


const CustomHit = ({hit}) => (
  <div className='card' style={{ width: '300px', height: '515px'}}>
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

const App = () => (
  <InstantSearch searchClient={searchClient} indexName="airbnb">
    <SearchBox />
    <p>Results in first dataset</p>
    <Hits />
    {/* <Hits hitComponent={CustomHit}/> */}
    {/* <ConnectedCustomHits /> */}
    
    
    <Index indexName="instant_search">
      <p>Results in second dataset</p>
      <Hits />
    </Index>
  </InstantSearch>
);

export default App;
