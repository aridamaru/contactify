import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import { NavBar } from '../../features/nav/NavBar';
import ContactDashboard from '../../features/contacts/dashboard/ContactDashboard';
import { LoadingComponent } from './LoadingComponent';
import ContactStore from '../stores/contactStore';
import { observer } from 'mobx-react-lite';

const App = () => {
	const contactStore = useContext(ContactStore);

	useEffect(() => {
		contactStore.loadContacts();
	}, [contactStore]);
	if (contactStore.loadingInitial)
		return <LoadingComponent content='Loading contacts...' />;

	return (
		<Fragment>
			<NavBar />
			<Container style={{ marginTop: '7em' }}>
				<ContactDashboard />
			</Container>
		</Fragment>
	);
};

export default observer(App);
