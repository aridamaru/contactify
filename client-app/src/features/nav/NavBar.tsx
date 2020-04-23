import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import ContactStore from '../../app/stores/contactStore';
import { observer } from 'mobx-react-lite';

export const NavBar: React.FC = () => {
	const contactStore = useContext(ContactStore);
	return (
		<Menu fixed='top' inverted>
			<Container>
				<Menu.Item>
					<img
						src='/assets/logo.png'
						alt='logo'
						style={{ marginRight: '10px' }}
					/>
					Contactify
				</Menu.Item>
				<Menu.Item name='Contacts' />
				<Menu.Item>
					<Button
						onClick={contactStore.openCreateForm}
						positive
						content='Create contact'
					/>
				</Menu.Item>
			</Container>
		</Menu>
	);
};

export default observer(NavBar);
