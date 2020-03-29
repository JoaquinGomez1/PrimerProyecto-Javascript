window.addEventListener('load', ()=> {

	let long;
	let lat;
	let tempDesc = document.querySelector('.temperatura-descripcion');
	let tempGrados = document.querySelector('.temperatura-grados');
	let franjaHora = document.querySelector('.franja-horaria');
	let icon = document.querySelector('.icono');
	let tempSec = document.querySelector('.seccion-temperatura');
	let tempSpan = document.querySelector('.temperatura-span');

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/'; // Utilizo estre proxy para poder utilizar la API en localhost
			const api_key = `${proxy}https://api.darksky.net/forecast/3407de324ffb0bb89370e6d2d326e875/${lat},${long}`

			fetch(api_key).then(response =>{
			return response.json();

		})
		.then(data =>{
			

			const { temperature, summary } = data.currently;
			tempGrados.textContent = temperature;
			tempDesc.textContent = summary;
			franjaHora.textContent = data.timezone;

			tempDesc.textContent = TraduccionSimple(summary);

			tempSec.addEventListener('click', () =>{
				if (tempSpan.textContent === '°F'){
					tempSpan.textContent = '°C';
					tempGrados.textContent = Math.round(ToCelsius(temperature));
				}else{
					tempSpan.textContent = '°F';
					tempGrados.textContent = temperature; //'temperature' viene en °F por defecto.
				}
			})
		})
		})

	}

	function ToCelsius(grados){
		return ((grados - 32) * 5 / 9);
	}

	function TraduccionSimple(texto){
		if (texto.includes('Clear')){
			return 'Despejado';
		}

		if (texto.includes('Cloudy')){
			return 'Nublado';
		}

		if (texto.includes('Drizzle') 
			|| texto.includes('Rain')){
			return 'Lluvioso';
		}
	}
	
})		

