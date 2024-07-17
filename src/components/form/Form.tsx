import { ChangeEvent, useState } from 'react';
import Alert from '../../alert/Alert';
import { countries } from '../../data';
import { type SearchType } from '../../types';
import styles from './Form.module.css';

type FormTypes = {
	fetchWeather: (search: SearchType) => Promise<void>;
};

export default function Form({ fetchWeather }: FormTypes) {
	const [search, setSearch] = useState<SearchType>({
		city: '',
		country: '',
	});

	const [alert, setAlert] = useState('');

	const handleSubmit = (
		event: React.FormEvent<HTMLFormElement> | ChangeEvent<HTMLSelectElement>
	) => {
		event.preventDefault();
		if (Object.values(search).includes('')) {
			setAlert('Todos los campos son obligatorios');
		}

		fetchWeather(search);
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
	) => setSearch({ ...search, [e.target.name]: e.target.value });

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit}>
			{alert && <Alert>{alert}</Alert>}

			<div className={styles.field}>
				<label htmlFor='city'>Ciudad:</label>
				<input
					type='text'
					id='city'
					placeholder='Introduce una ciudad'
					name='city'
					value={search.city}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.field}>
				<label htmlFor='country'>País:</label>
				<select
					name='country'
					id='country'
					value={search.country}
					onChange={handleChange}>
					<option value=''>--- Seleccionar País ---</option>
					{countries.map((country) => (
						<option
							key={country.code}
							value={country.code}>
							{country.name}
						</option>
					))}
				</select>
			</div>
			<input
				className={styles.submit}
				type='submit'
				value='Consultar clima'
			/>
		</form>
	);
}
