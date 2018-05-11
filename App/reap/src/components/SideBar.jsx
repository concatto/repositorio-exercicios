import React from 'react';
import { FormGroup, ListGroup, Panel , PanelGroup } from 'react-bootstrap';
import SearchInput, {createFilter} from './SearchInput';
import ListItemTeacher from './ListItemTeacher';
import ListItemStudent from './ListItemStudent';
import MemberItem from './MemberItem';

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
        
        const result = this.props.users;
        console.log(result);
        
        
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
									{result.map(ListItemTeacher => {
										if (ListItemTeacher.privilege >= 1) {
                                            return (
											<div key={ListItemTeacher.name}>
                                                <MemberItem name={ListItemTeacher.name} user={ListItemTeacher} online={false}/>
                                            </div>	
										  )   
                                        }
									})}
								</Panel>
								<Panel header={"Alunos"}>
                                    
									{result.map(ListItemStudent => {
                                            if (ListItemStudent.privilege < 1) {
                                                return (
                                                <div key={ListItemStudent.name}>
                                                    <MemberItem name={ListItemStudent.name} user={ListItemStudent} online={false}/>
                                                </div>	
                                            )}
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
