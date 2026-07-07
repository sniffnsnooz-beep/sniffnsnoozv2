import https from 'https';

const routes = [
  '/',
  '/services',
  '/packages',
  '/gallery',
  '/booking',
  '/store-booking',
  '/testimonials',
  '/contact',
  '/reviews',
  '/services/bath-spa-addons',
  '/services/coat-skin-treatment',
  '/services/ear-care',
  '/services/hair-styling',
  '/services/nail-paw-care',
  '/services/oral-hygiene-care',
  '/news'
];

const baseUrl = 'https://sniffnsnooz.in';

async function checkRoute(route) {
  return new Promise((resolve) => {
    https.get(baseUrl + route, (res) => {
      resolve({ route, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ route, status: 'Error: ' + e.message });
    });
  });
}

async function run() {
  console.log('Checking routes for 200 OK status...');
  let allGood = true;
  for (const route of routes) {
    const { status } = await checkRoute(route);
    if (status === 200) {
      console.log(`✅ ${route} - 200 OK`);
    } else {
      console.log(`❌ ${route} - ${status}`);
      allGood = false;
    }
  }
  
  if (allGood) {
    console.log('\n🎉 All routes are working perfectly!');
  } else {
    console.log('\n⚠️ Some routes had issues.');
  }
}

run();
