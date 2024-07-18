import styles from './App.module.css';
import Form from './components/Form/Form';
import WeatherDetail from './components/WeatherDetail/WeatherDetail';
import useWeather from './hooks/useWeather';

export default function App() {
	const { fetchWeather, hasWeatherData, weather } = useWeather();
	return (
		<>
			<h1 className={styles.title}>App</h1>

			<div className={styles.container}>
				<Form fetchWeather={fetchWeather} />

				{hasWeatherData && <WeatherDetail weather={weather} />}
			</div>
		</>
	);
}
