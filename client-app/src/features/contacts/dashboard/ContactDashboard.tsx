import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ContactList from './ContactList';
import { observer } from 'mobx-react-lite';
import ContactStore from '../../../app/stores/contactStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export const ContactDashboard: React.FC = () => {
	const contactStore = useContext(ContactStore);

	useEffect(() => {
		contactStore.loadContacts();
	}, [contactStore]);

	if (contactStore.loadingInitial)
		return <LoadingComponent content='Loading contacts...' />;
	return (
		<Grid>
			<Grid.Column width={10}>
				<ContactList />
			</Grid.Column>
			<Grid.Column width={6}>
				<h2>Activity fitlers</h2>
			</Grid.Column>
		</Grid>
	);
};

export default observer(ContactDashboard);
