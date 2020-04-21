import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { IContact } from '../models/contact';
import { NavBar } from '../../features/nav/NavBar';
import { ContactDashboard } from '../../features/contacts/dashboard/ContactDashboard';
import agent from '../api/agent';

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
		agent.Contacts.create(contact).then(() => {
			setContacts([...contacts, contact]);
			setSelectedContact(contact);
			setEditMode(false);
		});
	};

	const handleEditContact = (contact: IContact) => {
		agent.Contacts.update(contact).then(() => {
			setContacts([
				...contacts.filter((a) => a.id !== contact.id),
				contact,
			]);
			setSelectedContact(contact);
			setEditMode(false);
		});
	};

	const handleDeleteContact = (id: string) => {
		agent.Contacts.delete(id).then(() => {
			setContacts([...contacts.filter((a) => a.id !== id)]);
		});
	};

	useEffect(() => {
		agent.Contacts.list().then((response) => {
			setContacts(response);
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
