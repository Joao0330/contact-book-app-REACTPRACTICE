import { useState } from 'react';

interface ContactCardProps {
	id: string;
	name: string;
	city: string;
	setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
	editingId: string | null;
	setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ContactCard = ({ id, name, city, setContacts, editingId, setEditingId }: ContactCardProps) => {
	const isEditing = editingId === id;
	const [editedContact, setEditedContact] = useState({ name, city });

	const handleEditContact = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (editedContact.name === '' || editedContact.city === '') return;

		setContacts(prev => prev.map(contact => (contact.id === id ? { ...contact, name: editedContact.name, city: editedContact.city } : contact)));

		setEditingId(null);
	};

	const handleDelete = () => {
		setContacts(prev => prev.filter(contact => contact.id !== id));
		setEditingId(null);
	};

	return (
		<article key={id} className='bg-white p-4 rounded-lg shadow-md flex flex-col justify-between min-h-40'>
			{!isEditing ? (
				<>
					<div>
						<h2 className='font-medium'>{name}</h2>
						<span className='text-sm'>{city}</span>
					</div>

					<button className='self-end bg-gray-100 text-sm font-medium py-2 px-3 rounded-md border border-gray-300 cursor-pointer' onClick={() => setEditingId(id)}>
						Edit
					</button>
				</>
			) : (
				<form onSubmit={handleEditContact} className='flex flex-col gap-4'>
					<div className='flex flex-col'>
						<input
							type='text'
							placeholder='Name:'
							className='border border-gray-400 py-2 px-3 outline-0 rounded-md'
							value={editedContact.name}
							onChange={e =>
								setEditedContact(prev => ({
									...prev,
									name: e.target.value,
								}))
							}
						/>
						<input
							type='text'
							placeholder='City:'
							className='border border-gray-400 py-2 px-3 outline-0 rounded-md'
							value={editedContact.city}
							onChange={e =>
								setEditedContact(prev => ({
									...prev,
									city: e.target.value,
								}))
							}
						/>
					</div>

					<div className='flex justify-between'>
						<button className='bg-pink-600 text-white rounded-md p-2 cursor-pointer' onClick={handleDelete}>
							Delete
						</button>

						<div>
							<button type='button' className='bg-gray-100 text-sm font-medium py-2 px-3 rounded-md border border-gray-300 cursor-pointer mr-3' onClick={() => setEditingId(null)}>
								Cancel
							</button>
							<button className='cursor-pointer bg-blue-700 text-white py-2 px-3 rounded-md transition-colors duration-150 hover:bg-blue-800'>Save</button>
						</div>
					</div>
				</form>
			)}
		</article>
	);
};
