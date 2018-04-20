import React from 'react';
import { FormGroup, ListGroup, Panel , PanelGroup } from 'react-bootstrap';
import SearchInput, {createFilter} from './SearchInput';
import ListItemTeacher from './ListItemTeacher';
import ListItemStudent from './ListItemStudent';

const KEYS_TO_FILTERS = ['name']

class SideBar extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
		  searchTerm: ''
		}
		this.searchUpdated = this.searchUpdated.bind(this)
	}
	render() {
		const filterTeacher = ListItemTeacher.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
		const filterStudent = ListItemStudent.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
		return (
			<div>
				<form>
					<FormGroup className="filter-member">
					<SearchInput className='search-input' onChange={this.searchUpdated} />
						<ListGroup className="member-list-panel">
							<PanelGroup>
								<Panel header={"Professores"}>
									{filterTeacher.map(ListItemTeacher => {
										return (
											<div key={ListItemTeacher.name}>
												{ListItemTeacher.memberitem}
											</div>
										)
									})}
								</Panel>
								<Panel header={"Alunos"}>
									{filterStudent.map(ListItemStudent => {
											return (
											<div key={ListItemStudent.name}>
												{ListItemStudent.memberitem}
											</div>
										)
									})}
								</Panel>
							</PanelGroup>
						</ListGroup>
					</FormGroup>
					</form>
			</div>
		);
	}
	searchUpdated (term) {
    this.setState({searchTerm: term})
  }
}

export default SideBar;
