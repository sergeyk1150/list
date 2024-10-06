import styles from './App.module.css';
import { useState } from 'react';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isValueVaild, setIsValueVaild] = useState(false);
	const [date, setDate] = useState(new Date());

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение').trim();
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			setIsValueVaild(false);
		} else {
			setValue(promptValue);
			setError('');
			setIsValueVaild(true);
		}
	};

	const getDate = (date) => {
		return date.toLocaleString();
	};

	const onAddButtonClick = () => {
		if (isValueVaild) {
			setDate(new Date());
			const updateList = [
				...list,
				{ id: Date.now(), value: value, date: getDate(date) },
			];
			setList(updateList);
			setError('');
			setValue('');
			setIsValueVaild(false);
		}
	};

	const errorText = (
		<div className={styles.error}>
			Введенное значение должно содержать минимум 3 символа
		</div>
	);

	const noList = <p className={styles['no-margin-text']}>Нет добавленных элементов</p>;

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' && errorText}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					onClick={onAddButtonClick}
					disabled={!isValueVaild}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length === 0 && noList}
				<ul className={styles.list}>
					{list.map(({ id, value, date }) => (
						<li key={id} className={styles['list-item']}>
							{`${value} / дата создания ${date}`}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
