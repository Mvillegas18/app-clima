import axios from 'axios';
import { useMemo, useState } from 'react';
import { z } from 'zod';
import { SearchType } from '../types';

// Castear el type
// const { data: weatherResult } = await axios(weatherUrl);
// console.log(weatherResult.temp);
// console.log(weatherResult.name);

// TYPE GUARDS
// function isWeatherResponse(weather: unknown): weather is Weather {
// 	return Boolean(
// 		weather &&
// 			typeof weather === 'object' &&
// 			typeof (weather as Weather).name === 'string' &&
// 			typeof (weather as Weather).main.temp === 'number' &&
// 			typeof (weather as Weather).main.temp_max === 'number' &&
// 			typeof (weather as Weather).main.temp_min === 'number'
// 	);
// }

// zod
const Weather = z.object({
	name: z.string(),
	main: z.object({
		temp: z.number(),
		temp_max: z.number(),
		temp_min: z.number(),
	}),
});
export type Weather = z.infer<typeof Weather>;

// const WeatherSchema = object({
// 	name: string(),
// 	main: object({
// 		temp: number(),
// 		temp_max: number(),
// 		temp_min: number(),
// 	}),
// });
// type Weather = InferOutput<typeof WeatherSchema>;

export default function useWeather() {
	const [weather, setWeather] = useState<Weather>({
		name: '',
		main: {
			temp: 0,
			temp_max: 0,
			temp_min: 0,
		},
	});

	const fetchWeather = async (search: SearchType) => {
		const appId = import.meta.env.VITE_API_KEY;
		try {
			const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;

			const { data } = await axios(geoUrl);

			const lat = data[0].lat;
			const lon = data[0].lon;

			const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

			// const { data: weatherResult } = await axios(weatherUrl);

			// const result = isWeatherResponse(weatherResult);
			// console.log(result);

			// Implementation ZOD
			const { data: weatherResult } = await axios(weatherUrl);
			const result = Weather.safeParse(weatherResult);

			if (result.success) {
				setWeather(result.data);
			}

			// Valibot
			// const { data: weatherResult } = await axios(weatherUrl);
			// const result = parse(WeatherSchema, weatherResult);
			// if (result) {
			// 	console.log(result.name);
			// }
		} catch (error) {
			console.error(error);
		}
	};

	const hasWeatherData = useMemo(() => weather.name, [weather]);

	return {
		fetchWeather,
		hasWeatherData,
		weather,
	};
}
