`use strict`;

async function getIPDetails(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

const displayIPDetails = () => {
  const ipAddress =
    document.getElementsByClassName("search-bar-input")[0].value;
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_vMIjof1g6XVqaF1luAuKpjEHZwIvf&ipAddress=${ipAddress}`;

  getIPDetails(url).then((data) => {
    console.log(data);
    data.ip ? addIPDetailsContent(data) : alert("Enter valid IP address");
  });
};

const addIPDetailsContent = (data) => {
  const {
    ip,
    location: { country, region, timezone, lat, lng },
    isp,
  } = data;
  console.log(lat, lng);
  document.querySelector(".ip-address .ip-details-content").textContent = ip;
  document.querySelector(
    ".ip-location .ip-details-content"
  ).textContent = `${region}, ${country}`;
  document.querySelector(
    ".ip-timezone .ip-details-content"
  ).textContent = `UTC ${timezone}`;
  document.querySelector(".ip-isp .ip-details-content").textContent = isp;
  changeMap(lat, lng);
};

const changeMap = (lat, lng) => {
  map.remove();
  getMap(lat, lng);
};

const getMap = (lat, lng) => {
  console.log(typeof lat);
  let mapOptions = {
    center: [lat, lng],
    zoom: 10,
  };
  map = new L.map("map", mapOptions);
  let layer = new L.TileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  let marker = new L.marker([lat, lng]).addTo(map);
  map.addLayer(layer);
};
getMap(0, 0);
