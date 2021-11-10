const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWRhc2h2ZW50dXJlcyIsImEiOiJja3R3NjBxenUweXpuMnBxdGp3eHhlZWp6In0.wtiHu9y1KW4U6JgYQH2hmQ";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to mapbox", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, Input something else ", undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].center[0],
        longtitude: body.features[0].center[1],
      });
    }
  });
};

module.exports = geocode;
