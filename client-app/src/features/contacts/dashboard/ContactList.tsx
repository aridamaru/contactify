import React from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IContact } from '../../../app/models/contact';

interface IProps {
	contacts: IContact[];
	selectContact: (id: string) => void;
	deleteContact: (id: string) => void;
}

export const ContactList: React.FC<IProps> = ({
	contacts,
	selectContact,
	deleteContact,
}) => {
	return (
		<Segment clearing>
			<Item.Group divided>
				{contacts.map((contact) => (
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
									onClick={() => selectContact(contact.id)}
									floated='right'
									content='View'
									color='blue'
								/>
								<Button
									onClick={() => deleteContact(contact.id)}
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
