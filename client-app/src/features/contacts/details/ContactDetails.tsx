import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import ContactStore from '../../../app/stores/contactStore';
import { observer } from 'mobx-react-lite';

export const ContactDetails: React.FC = () => {
	const contactStore = useContext(ContactStore);
	const {
		selectedContact: contact,
		openEditForm,
		cancelFormOpen,
		cancelSelectedContact,
	} = contactStore;
	return (
		<Card fluid>
			<Image src='/assets/placeholder.png' wrapped ui={false} />
			<Card.Content>
				<Card.Header>
					{contact!.name} {contact!.lastName}
				</Card.Header>
				<Card.Meta>
					<span className='email'>{contact!.email}</span>
				</Card.Meta>
				<Card.Description>{contact!.phoneNumber}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths={2}>
					<Button
						onClick={() => openEditForm(contact!.id)}
						basic
						color='teal'
						content='Edit'
					/>
					>
					<Button
						onClick={cancelSelectedContact}
						basic
						color='grey'
						content='Cancel'
					/>
					>
				</Button.Group>
			</Card.Content>
		</Card>
	);
};

export default observer(ContactDetails);
