import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { IContact } from '../models/contact';
import { NavBar } from '../../features/nav/NavBar';
import { ContactDashboard } from '../../features/contacts/dashboard/ContactDashboard';

const App = () => {
	const [contacts, setContacts] = useState<IContact[]>([]);

	const [selectedContact, setSelectedContact] = useState<IContact | null>(
		null
	);

	const [editMode, setEditMode] = useState(false);

	const handleSelectContact = (id: string) => {
		setSelectedContact(contacts.filter((a) => a.id === id)[0]);
	};

	const handleOpenCreateForm = () => {
		setSelectedContact(null);
		setEditMode(true);
	};

	const handleCreateContact = (contact: IContact) => {
		setContacts([...contacts, contact]);
		setSelectedContact(contact);
		setEditMode(false);
	};

	const handleEditContact = (contact: IContact) => {
		setContacts([...contacts.filter((a) => a.id !== contact.id), contact]);
		setSelectedContact(contact);
		setEditMode(false);
	};

	const handleDeleteContact = (id: string) => {
		setContacts([...contacts.filter((a) => a.id !== id)]);
	};

	useEffect(() => {
		axios
			.get<IContact[]>('http://localhost:5000/api/contacts')
			.then((response) => {
				setContacts(response.data);
			});
	}, []);

	return (
		<Fragment>
			<NavBar openCreateForm={handleOpenCreateForm} />
			<Container style={{ marginTop: '7em' }}>
				<ContactDashboard
					contacts={contacts}
					selectContact={handleSelectContact}
					selectedContact={selectedContact}
					editMode={editMode}
					setEditMode={setEditMode}
					setSelectedContact={setSelectedContact}
					createContact={handleCreateContact}
					editContact={handleEditContact}
					deleteContact={handleDeleteContact}
				/>
			</Container>
		</Fragment>
	);
};

export default App;
