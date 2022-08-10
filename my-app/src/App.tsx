import React from 'react';
import axios from "axios";
import { useState } from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import './App.css';

function App() {
  const [objectID, setObjectID] = useState("");
  const [objectInfo, setObjectInfo] = useState<undefined | any>(undefined);

  const metmuseum_api_url = "https://collectionapi.metmuseum.org/public/collection/v1";


  return (
    <div>
      <h1>Find MetMuseum Pieces</h1>
      <div>
      <br />
      <p>Enter an object ID for the artwork (example: 2578)</p>
      <p>(If the image isnt available under Open Access, it cannot be seen)</p>
        <InputGroup
          type="text"
          id="object-ID"
          name="object-ID"
          onChange={(e) => setObjectID(e.target.value)}
        />
        <br />
        <Button onClick={search}>Show Artwork!</Button>
      </div>

      {objectInfo === undefined ? (
        <p>No artwork found!</p>
      ) : (
        <div id="object_image">
          <h3>Title: {objectInfo.title}</h3>
          <p>Year: {objectInfo.accessionYear}</p>
          Artist: {objectInfo.artistDisplayName}
          <br></br>
          <img src={objectInfo.primaryImageSmall} alt='artwork generated'></img>

        </div>
      )}
    </div>
  );
  function search(){
    axios.get(metmuseum_api_url + /objects/ + objectID).then((res) => {
      setObjectInfo(res.data);
    });
    
  }
}

export default App;