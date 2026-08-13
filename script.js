const map = L.map('map').setView([-23.511, -46.876], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker = L.marker([-23.511, -46.876]).addTo(map)
  .bindPopup('Barueri - SP')
  .openPopup();

async function searchCity() {
  const city = document.getElementById('city').value;

  if (!city) return;

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
    );

    const data = await response.json();

    if (data.length === 0) {
      alert('Cidade não encontrada');
      return;
    }

    const lat = data[0].lat;
    const lon = data[0].lon;

    map.setView([lat, lon], 12);

    marker.setLatLng([lat, lon])
      .bindPopup(city)
      .openPopup();

  } catch (error) {
    alert('Erro ao buscar localização');
  }
}
