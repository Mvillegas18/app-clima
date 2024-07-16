import { useState } from 'react';
import { countries } from '../../data';
import { SearchType } from '../../types';
import styles from './Form.module.css';

export default function Form() {
	const [search, setSearch] = useState<SearchType>({
		city: '',
		country: '',
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('Formulario enviado');
	};

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit}>
			<div className={styles.field}>
				<label htmlFor='city'>Ciudad</label>
				<input
					type='text'
					id='city'
					placeholder='Introduce una ciudad'
					name='city'
					value={search.city}
				/>
			</div>
			<div className={styles.field}>
				<label htmlFor='countries'>País</label>
				<select
					name='countries'
					id='countries'
					value={search.country}>
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
