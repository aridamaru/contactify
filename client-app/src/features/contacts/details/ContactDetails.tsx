import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { IContact } from '../../../app/models/contact';

interface IProps {
	contact: IContact;
	setEditMode: (editMode: boolean) => void;
	setSelectedContact: (contact: IContact | null) => void;
}

export const ContactDetails: React.FC<IProps> = ({
	contact,
	setEditMode,
	setSelectedContact,
}) => {
	return (
		<Card fluid>
			<Image src='/assets/placeholder.png' wrapped ui={false} />
			<Card.Content>
				<Card.Header>
					{contact.name} {contact.lastName}
				</Card.Header>
				<Card.Meta>
					<span className='email'>{contact.email}</span>
				</Card.Meta>
				<Card.Description>{contact.phoneNumber}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths={2}>
					<Button
						onClick={() => setEditMode(true)}
						basic
						color='teal'
						content='Edit'
					/>
					>
					<Button
						onClick={() => setSelectedContact(null)}
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
