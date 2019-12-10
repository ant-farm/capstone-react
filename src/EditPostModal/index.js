import React from 'react';
import { Form, Button, Label, Header, Modal } from 'semantic-ui-react';

function EditPostModal(props){
	return(
		<Modal open={props.open} closeIcon onClose={props.closeModal}>
			<Header> Edit Post</Header>
			<Modal.Content>
				<Form onSubmit={props.updatePost}>
					<Label>Text: </Label>
					<Form.Input
						type='text'
						name='text'
						value={props.postToEdit.text}
						onChange={props.handleEditChange}
					/>
					<Modal.Actions>
					<Button type='submit'>Submit Changes</Button>
					</Modal.Actions>
				</Form>
			</Modal.Content>
		</Modal>
	)
}

export default EditPostModal