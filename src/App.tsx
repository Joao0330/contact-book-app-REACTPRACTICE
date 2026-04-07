import { useState } from 'react';
import { ContactCard } from './components/ContactCard';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
	const [newContact, setNewContact] = useState({ name: '', city: '' });
	const [contacts, setContacts] = useLocalStorage<Contact[]>('contactList', []);
	const [editingId, setEditingId] = useState<string | null>(null);

	const handleAddNewContact = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (newContact.name === '' || newContact.city === '') return;

		setContacts([...contacts, { id: Date.now().toString(), name: newContact.name, city: newContact.city }]);
		setNewContact({ name: '', city: '' });
	};

	return (
		<section className='min-h-dvh bg-gray-200 py-10 px-20 flex flex-col gap-7'>
			<header>
				<h1 className='text-2xl font-medium'>Contact Book</h1>
				<p>Keep track of where your friends live</p>
			</header>

			<form onSubmit={handleAddNewContact} className='bg-white p-5 inline-fit flex gap-3 shadow-md'>
				<input
					className='border border-gray-400 py-2 px-3 outline-0 rounded-md'
					type='text'
					placeholder='Name:'
					value={newContact.name}
					onChange={e =>
						setNewContact(prev => ({
							...prev,
							name: e.target.value,
						}))
					}
				/>

				<input
					className='border border-gray-400 py-2 px-3 outline-0 rounded-md'
					type='text'
					placeholder='City:'
					value={newContact.city}
					onChange={e =>
						setNewContact(prev => ({
							...prev,
							city: e.target.value,
						}))
					}
				/>

				<button type='submit' className='cursor-pointer bg-blue-700 text-white px-4 rounded-lg transition-colors duration-150 hover:bg-blue-800'>
					Add Contact
				</button>
			</form>

			<div className='grid grid-cols-3 gap-5'>
				{contacts.map((contact: Contact) => (
					<ContactCard key={contact.id} id={contact.id} name={contact.name} city={contact.city} setContacts={setContacts} editingId={editingId} setEditingId={setEditingId} />
				))}
			</div>
		</section>
	);
}

export default App;
