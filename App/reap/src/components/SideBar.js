import React from 'react';
import MemberItem from './MemberItem';
import { FormGroup, ListGroup, FormControl, Button , Panel , PanelGroup} from 'react-bootstrap';


class SideBar extends React.Component {
	render() {
		return (
			<div>
				<form>
					<FormGroup className="filter-member">
						<FormControl type="text" placeholder="Search" />
					</FormGroup>
					{' '}
					<Button bsStyle="primary" type="submit">Submit</Button>


				</form>


				<ListGroup className="member-list-panel">

				<PanelGroup>

						<Panel header={"Professores"}>
							<ListGroup>

								<MemberItem name="Elieser" online={false}/>
								<MemberItem name="Marcelo" online={true}/>

							</ListGroup>
						</Panel>

						<Panel header={"Alunos"}>
							<ListGroup>

								<MemberItem name="Andriel" online={true}/>
								<MemberItem name="Eriosvaldo" online={true}/>
								<MemberItem name="Pedro" online={true}/>
								<MemberItem name="Rodrigo" online={false}/>
								<MemberItem name="Samuel" online={false}/>

							</ListGroup>
						</Panel>
					</PanelGroup>
				</ListGroup>

			</div>
		);
	}
}

export default SideBar;
