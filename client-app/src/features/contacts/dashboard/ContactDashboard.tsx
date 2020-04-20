import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IContact } from '../../../app/models/contact';
import { ContactList } from './ContactList';
import { ContactDetails } from '../details/ContactDetails';
import { ContactForm } from '../form/ContactForm';

interface IProps {
	contacts: IContact[];
	selectContact: (id: string) => void;
	selectedContact: IContact | null;
	editMode: boolean;
	setEditMode: (editMode: boolean) => void;
	setSelectedContact: (contact: IContact | null) => void;
	createContact: (contact: IContact) => void;
	editContact: (contact: IContact) => void;
	deleteContact: (id: string) => void;
}

export const ContactDashboard: React.FC<IProps> = ({
	contacts,
	selectContact,
	selectedContact,
	editMode,
	setEditMode,
	setSelectedContact,
	createContact,
	editContact,
	deleteContact,
}) => {
	return (
		<Grid>
			<Grid.Column width={10}>
				<ContactList
					contacts={contacts}
					selectContact={selectContact}
					deleteContact={deleteContact}
				/>
			</Grid.Column>
			<Grid.Column width={6}>
				{selectedContact && !editMode && (
					<ContactDetails
						contact={selectedContact}
						setEditMode={setEditMode}
						setSelectedContact={setSelectedContact}
					/>
				)}
				{editMode && (
					<ContactForm
						key={(selectedContact && selectedContact.id) || 0}
						setEditMode={setEditMode}
						contact={selectedContact!}
						createContact={createContact}
						editContact={editContact}
					/>
				)}
			</Grid.Column>
		</Grid>
	);
};
