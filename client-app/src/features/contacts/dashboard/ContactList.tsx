import React, { useContext } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ContactStore from '../../../app/stores/contactStore';
import { Link } from 'react-router-dom';

const ContactList: React.FC = () => {
	const contactStore = useContext(ContactStore);
	const {
		contactsSorted,
		deleteContact,
		submitting = true,
		target,
	} = contactStore;
	return (
		<Segment clearing>
			<Item.Group divided>
				{contactsSorted.map((contact) => (
					<Item key={contact.id}>
						<Item.Content>
							<Item.Header as='a'>
								{contact.name} {contact.lastName}
							</Item.Header>
							<Item.Meta>{contact.email}</Item.Meta>
							<Item.Description>
								<div>{contact.phoneNumber}</div>
							</Item.Description>
							<Item.Extra>
								<Button
									as={Link}
									to={`/contacts/${contact.id}`}
									floated='right'
									content='View'
									color='blue'
								/>
								<Button
									name={contact.id}
									loading={target === contact.id && submitting}
									onClick={(e) => deleteContact(e, contact.id)}
									floated='right'
									content='Delete'
									color='red'
								/>
								<Label basic content='Category' />
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
};

export default observer(ContactList);
