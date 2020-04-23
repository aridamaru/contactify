import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import ContactList from './ContactList';
import ContactDetails from '../details/ContactDetails';
import ContactForm from '../form/ContactForm';
import { observer } from 'mobx-react-lite';
import ContactStore from '../../../app/stores/contactStore';

export const ContactDashboard: React.FC = () => {
	const contactStore = useContext(ContactStore);
	const { editMode, selectedContact } = contactStore;
	return (
		<Grid>
			<Grid.Column width={10}>
				<ContactList />
			</Grid.Column>
			<Grid.Column width={6}>
				{selectedContact && !editMode && <ContactDetails />}
				{editMode && (
					<ContactForm
						key={(selectedContact && selectedContact.id) || 0}
						contact={selectedContact!}
					/>
				)}
			</Grid.Column>
		</Grid>
	);
};

export default observer(ContactDashboard);
