import React, { useContext, useEffect } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import ContactStore from '../../../app/stores/contactStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';

interface DetailParams {
	id: string;
}

const ContactDetails: React.FC<RouteComponentProps<DetailParams>> = ({
	match,
	history,
}) => {
	const contactStore = useContext(ContactStore);
	const { contact, loadContact, loadingInitial } = contactStore;

	useEffect(() => {
		loadContact(match.params.id);
	}, [loadContact, match.params.id]);

	if (loadingInitial || !contact)
		return <LoadingComponent content='Loading contact...' />;

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
						as={Link}
						to={`/manage/${contact.id}`}
						basic
						color='teal'
						content='Edit'
					/>
					>
					<Button
						onClick={() => history.push('/contacts')}
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
