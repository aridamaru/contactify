import React, { SyntheticEvent } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IContact } from '../../../app/models/contact';

interface IProps {
	contacts: IContact[];
	selectContact: (id: string) => void;
	deleteContact: (
		event: SyntheticEvent<HTMLButtonElement>,
		id: string
	) => void;
	submitting: boolean;
	target: string;
}

export const ContactList: React.FC<IProps> = ({
	contacts,
	selectContact,
	deleteContact,
	submitting,
	target,
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
									name={contact.id}
									loading={
										target === contact.id && submitting
									}
									onClick={(e) =>
										deleteContact(e, contact.id)
									}
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
