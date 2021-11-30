(function () {


	// console.log(JSON.stringify(punti.map(p => ({ name: p.nome, lat: p.lng, lng: p.lat }))));

	// const centro = { lat: 44.79527913699855, lng: 10.098414994852149 }
	const startConf = {
		center: [10.098414994852149, 44.79527913699855],
		zoom: 5,
		pitch: 0,
		bearing: 0
	}

	// 10.453644626845517 46.52956541122481 10.453644626845582 46.5295654112248

	function near(a, b) {
		return Math.abs(a - b) < 0.000000000001
	}

	function pnear(p) {
		const c = map.getCenter()
		var z = map.getZoom()
		return log(near(c.lng, p.lng) && near(c.lat, p.lat) && z > 9)
	}


	function fly(p) {
		map.flyTo({
			center: [p.lng, p.lat],
			zoom: 10,
			pitch: humanize(65, 20),
			bearing: humanize(0, 90),
			essential: true
		});
	}


	function findContentInPage(query) {
		var trovati = jQuery('#routes [data-tag] h3')
		for (i = 0; i < trovati.length; i++)
			if (trovati[i].innerText.toLowerCase() == query.toLowerCase()) {
				return trovati[i]
			}
	}

	function findContent(query) {
		var content = findContentInPage(query)
		return content.cloneNode(true)
	}

	function doPoint(p, map) {
		const el = document.createElement('div')

		const s = el.style

		s.backgroundImage = "url('https://ladigital.fabioziliani.it/mamo/mg3.png')"
		s.backgroundSize = "cover"
		s.width = "50px"
		s.height = "39px"
		s.cursor = "pointer"

		// el.addEventListener('click', () => { navigateTop(p) })
		// console.log(p.name, near(now.lng, p.lng), near(now.lat, p.lat))
		//  alert(p.nome) 

		const marker2 = new mapboxgl.Marker(el)
			.setLngLat([p.lng, p.lat])
			.addTo(map);


		var popupContent;

		try {
			popupContent = findContent(p.h3)
			console.log(popupContent)
			//TODO aprire popup
		}
		catch (err) {
			popupContent = p.name
			console.error('Contenuto non trovato per', p.h3, p.name)
		}


		const markerHeight = 50;
		const markerRadius = 10;
		const linearOffset = 25;
		const popupOffsets = {
			'top': [0, 0],
			'top-left': [0, 0],
			'top-right': [0, 0],
			'bottom': [0, -markerHeight],
			'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
			'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
			'left': [markerRadius, (markerHeight - markerRadius) * -1],
			'right': [-markerRadius, (markerHeight - markerRadius) * -1]
		};

		const popup2 = new mapboxgl.Popup({ offset: popupOffsets, className: 'my-class', closeButton: false })
			.setLngLat([p.lng, p.lat])
			.setHTML(popupContent)
			.setMaxWidth("300px")
			.addTo(map);

		popup2.on('open', e => {
			if (navigateTop(p))
				popup2.remove()
		})

		popup2.remove()

		marker2.setPopup(popup2)

		// const b = document.createElement('button')

		// const img = document.createElement('img')
		// img.setAttribute('src', 'bici.png')
		// b.appendChild(img)


		// const span = document.createElement('span')
		// span.innerText = p.name;
		// b.appendChild(span)

		// b.addEventListener('click', () => fly(p))

		// document.getElementById('btns').appendChild(b)
	}

	function navigateTop(p) {
		if (pnear(p))
			return false
		fly(p)
		return true
	}

	function navigateTo(query) {
		var trovato = punti.find(p => p.h3 == query)
		fly(trovato)
	}

	window.navigateTo = navigateTo

	

	const punti = [
		{ h3: "COLLE DELL’ASSIETTA", "name": "Colle dell'Assietta", "lat": 45.070402858291686, "lng": 6.95702767490749 },
		{ h3: "COLLE DEL SOMMEILLER", "name": "Colle del Sommeiller", "lat": 45.13563469802622, "lng": 6.846677558547623 },
		{ h3: "VIA DEL SALE", "name": "Via del Sale", "lat": 44.14956851189366, "lng": 7.561840203233174 },
		{ h2: "COLLE DELL’ASSIETTA", "name": "Monferrato-Langhe", "lat": 44.96289640650412, "lng": 8.305690513796987 },
		{ h2: "STELVIO - CANCANO - VAL MORA", "name": "Stelvio - Cancano - Val Mora", "lat": 46.5295654112248, "lng": 10.453644626845582 },
		{ h2: "ALTOPIANO DEI LESSINI", "name": "Altopiano dei Lessini", "lat": 45.68604434380629, "lng": 11.082089782776155 },
		{ h2: "PASUBIO", "name": "Pasubio", "lat": 45.77703674516535, "lng": 11.237686138030503 },
		{ h2: "ALTOPIANO DEI LESSINI", "name": "Altopiano di Asiago", "lat": 45.80432913098119, "lng": 11.535367879903378 },
		{ h2: "VALSUGANA - CIMA D’ASTE", "name": "Valsugana - Cima D' Aste", "lat": 46.17140955976914, "lng": 11.601940472340068 },
		{ h2: "MONTE PENNA - AVETO", "name": "Monte Penna - Aveto", "lat": 44.48665018236158, "lng": 9.495676623628848 },
		{ h2: "MONTE CUSNA", "name": "Monte Cusna", "lat": 44.246147089220244, "lng": 10.425967323344276 },
//		{ "name": "Parma", "lat": 44.79527913699855, "lng": 10.098414994852149 },
		{ h2: "TREMALZO - NOTA", "name": "Tremalzo - Nota", "lat": 45.83464535444968, "lng": 10.720700574243322 },
		{ h2: "CHIANTI", "name": "CHIANTI", "lat": 43.46463051673579, "lng": 11.315571900273701 },
		{ h2: "ARGENTARIO", "name": "ARGENTARIO", "lat": 42.40153615850624, "lng": 11.15907193689943 },
		{ h2: "MONTE SIBILLINI", "name": "Monti sibillini", "lat": 42.825687261988605, "lng": 13.206290601051721 }
	]


	mapboxgl.accessToken = 'pk.eyJ1IjoiZnV2Y2FxdXZ6Y2JuamhlIiwiYSI6ImNrdWU4Zmp6eDFobGcyb2xtamZsbWdtY20ifQ.vn4A_kvxiay9lDRHpAahMw';
	const map = new mapboxgl.Map({
		container: 'mapFabio', // container ID
		style: 'mapbox://styles/fuvcaquvzcbnjhe/ckue9aok02wkz17mvy2jic097',


		// center: [centro.lat, centro.lng], // starting position [lng, lat]
		// zoom: 5, // starting zoom
		// pitch: 75
		...startConf
	});



	map.on('load', () => {
		map.addLayer({
			'id': 'sky',
			'type': 'sky',
			'paint': {
				// set up the sky layer to use a color gradient
				'sky-type': 'gradient',
				// the sky will be lightest in the center and get darker moving radially outward
				// this simulates the look of the sun just below the horizon
				'sky-gradient': [
					'interpolate',
					['linear'],
					['sky-radial-progress'],
					0.8,
					'rgba(135, 206, 235, 1.0)',
					1,
					'rgba(0,0,0,0.1)'
				],
				'sky-gradient-center': [0, 0],
				'sky-gradient-radius': 90,
				'sky-opacity': [
					'interpolate',
					['exponential', 0.1],
					['zoom'],
					5,
					0,
					22,
					1
				]
			}
		});
	});

	// const b = document.createElement('button');
	// b.innerText = 'Inizio';

	// b.addEventListener('click', () => {
	// 	map.flyTo(log({
	// 		...startConf,
	// 		essential: true
	// 	}));
	// })

	// document.getElementById('btns').appendChild(b)

	for (const p of punti)
		doPoint(p, map)


	function humanize(num, pm) {
		return num + (Math.random() * pm * 2 - pm);
	}

	function log(x) {
		console.log(x);
		return x;
	}




})();