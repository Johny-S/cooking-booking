const geocoder = require('google-geocoder');
const { connect } = require('mongoose');
const Venue = require('../models/Venue');

const geo = geocoder({
  key: 'AIzaSyCVqXSmsIDhO-EClFmjLr1Jj9JqlNABzOE'
});

const uri =
  'mongodb+srv://dbUser:xpxA7Dwo4S53xNJo@elbrusbot-i8nza.mongodb.net/CookingBooking?retryWrites=true&w=majority';
connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

async function createVenue(data) {
  const addVenue = async (data, geo) => {
    const price = Math.floor(Math.random() * (3000 - 800)) + 800;
    const venue = new Venue({
      ...data,
      geo,
      price
    });
    await venue.save();
  };
  await geo.find(data.address, async (err, resGeo) => {
    const geoPoint = await { ...resGeo[0].location };
    await addVenue(data, geoPoint);
  });
}

const venues = [
  {
    name: 'CULINARYON',
    address: 'Новинский бул., 31, Москва, 123242',
    phone: '8 (495) 480-74-10',
    web: 'culinaryon.ru',
    img:
      'https://www.restoclub.ru/uploads/place_thumbnail_big/d/3/7/5/d375af9ad3e90a236bec2a0d5fe09004.jpg',
    from: '12-00',
    to: '20-00',
    capacity: 8,
    options: {
      pastry: true,
      gastro: false,
      cold: false
    }
  },
  {
    name: 'Вкусотеррия',
    address: '1905 Года ул., 10 строение 1, Москва, 123022',
    phone: '8 (925) 319-05-50',
    web: 'vkusoterria.ru',
    img:
      'https://www.restoclub.ru/uploads/place_thumbnail_big/7/b/2/e/7b2e3108c47d32663f7e2678e4f0bdb7.jpg',
    from: '10-00',
    to: '22-00',
    capacity: 20,
    options: {
      pastry: false,
      gastro: true,
      cold: true
    }
  },
  {
    name: 'Академия дель Густо',
    address: '1-я Тверская-Ямская ул., 27, Москва, 125047',
    phone: '8 (495) 968-67-88',
    web: 'delgusto.ru',
    img:
      'https://www.restoclub.ru/uploads/place_thumbnail_big/5/c/9/b/5c9b664709ab805f162fabcc33694a0f.jpg',
    from: '10-00',
    to: '23-30',
    capacity: 16,
    options: {
      pastry: true,
      gastro: false,
      cold: true
    }
  },
  {
    name: 'Студия Юлии Высоцкой',
    address: 'ул. Охотный Ряд, 2, Москва, 109012',
    phone: '8 (495) 255-06-55',
    web: 'studio.jvcompany.ru',
    img:
      'https://www.restoclub.ru/uploads/place_thumbnail_big/b/b/c/e/bbcee089237a5e30cdecb291b4d2e060.jpg',
    from: '10-00',
    to: '22-00',
    capacity: 25,
    options: {
      pastry: false,
      gastro: true,
      cold: false
    }
  },
  {
    name: 'Clever',
    address: 'Варшавское ш., 9, строение 1Б, Москва, 117105',
    phone: '8 (495) 191-33-21',
    web: 'clever.studio',
    img:
      'https://www.loft2rent.ru/upload_data/2017/8689/upldPG1zSO.jpg.749x500.jpg',
    from: '10-00',
    to: '22-00',
    capacity: 30,
    options: {
      pastry: true,
      gastro: true,
      cold: false
    }
  },
  {
    name: 'DELI',
    address: 'Кутузовский просп., 36 строение 4, Москва, 121170',
    phone: '8 (495) 118-23-31',
    web: 'deli-very.ru',
    img:
      'https://www.restoclub.ru/uploads/place_thumbnail_big/f/d/b/c/fdbc770a9afcef93dd2ba44acda81092.jpg',
    from: '10-00',
    to: '22-00',
    capacity: 26,
    options: {
      pastry: false,
      gastro: false,
      cold: true
    }
  },
  {
    name: 'Urban Kitchen',
    address: 'Люсиновская ул., 55, Москва, 115093',
    phone: '8 (499) 391-44-00',
    web: 'urbankitchen.ru',
    img:
      'https://img02.rl0.ru/afisha/o/www.afisha.ru/uploads/images/4/b5/4b515008e43943c48567c0d29e204a3e.jpeg',
    from: '10-00',
    to: '23-00',
    capacity: 20,
    options: {
      pastry: true,
      gastro: true,
      cold: false
    }
  },
  {
    name: 'Гастрономъ',
    address: 'Волоколамское ш., 2, Москва, 125080',
    phone: '8 (495) 725-10-79',
    web: 'gastronom.ru',
    img:
      'https://www.restoclub.ru/uploads/place_thumbnail_big/f/b/9/6/fb96a98cd7a1130e758ecf31e8996734.jpg',
    from: '10-00',
    to: '19-00',
    capacity: 20,
    options: {
      pastry: true,
      gastro: true,
      cold: true
    }
  },
  {
    name: 'Хлеб и еда',
    address: 'пер. Слесарный, 2, Москва, 129110',
    phone: '8 (495) 665-84-06',
    web: 'hlebieda.ru',
    img:
      'https://www.restoclub.ru/uploads/place_thumbnail_big/a/0/1/4/a014ad8488e83c06b84f19de7ec4f6f5.jpg',
    from: '10-00',
    to: '22-00',
    capacity: 30,
    options: {
      pastry: false,
      gastro: true,
      cold: false
    }
  },
  {
    name: 'Донна Маргарита',
    address: '1905 Года ул., 2с1, Москва, 123022',
    phone: '8 (499) 682-70-00',
    web: 'donnamargaritastudio.ru',
    img:
      'https://kudago.com/media/thumbs/xl/images/place/15/68/1568242837d07c10f87163b946306508.jpg',
    from: '10-00',
    to: '22-00',
    capacity: 24,
    options: {
      pastry: true,
      gastro: true,
      cold: true
    }
  }
];

// Venue.deleteMany({});

venues.forEach(el => createVenue(el));
