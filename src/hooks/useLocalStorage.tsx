import { useEffect, useState } from 'react';
export default function useLocalStorage<T>(keyName: string, initialValue: T) {
	const [contact, setContact] = useState<T>(() => {
		try {
			const storedValue = localStorage.getItem(keyName);
			return storedValue ? JSON.parse(storedValue) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(keyName, JSON.stringify(contact));
		} catch (error) {
			console.error(error);
		}
	}, [keyName, contact]);

	return [contact, setContact] as const;
}
