const init = () => {
  const myMap = new ymaps.Map(
    'map', {
      center: [55.7718, 37.6316],
      zoom: 16,
      controls: ['smallMapDefaultSet'],
    }, {},
  );
  const myPlaceMark = new ymaps.Placemark(
    [55.7724, 37.6252], {}, {
      iconLayout: 'default#image',
      iconImageHref: './img/mark.svg',
      iconImageSize: [70, 70],
      iconImageOffset: [-35, -70],
    },
  );
  myMap.geoObjects.add(myPlaceMark);
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1240) {
      myMap.setCenter([55.7718, 37.6256]);
      myPlaceMark.options.set('iconImageSize', [50, 50]);
    } else {
      myMap.setCenter([55.7718, 37.6316]);
      myPlaceMark.options.set('iconImageSize', [70, 70]);
    }
  });
};
ymaps.ready(init);


// const map = L.map('map').setView([55.7726, 37.63], 17);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// L.marker([55.7724, 37.6252]).addTo(map).bindPopup('E-trans').openPopup();