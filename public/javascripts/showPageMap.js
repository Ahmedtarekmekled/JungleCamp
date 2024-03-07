mapboxgl.accessToken =
  "pk.eyJ1IjoiZGFpYW1vbmRvIiwiYSI6ImNsdGViNTRraDBkZG8ya2xqc2dyOTdtNzEifQ.zyUUjy8GVLwmKP2shHhi2g";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/dark-v10", // style URL
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

new mapboxgl.Marker().setLngLat(campground.geometry.coordinates).setPopup(
    new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
        )
).addTo(map);
