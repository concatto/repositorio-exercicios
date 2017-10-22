import React from 'react';
import ReactDOM from 'react-dom'
import { FormGroup, ListGroup, FormControl, Button , Panel , PanelGroup } from 'react-bootstrap';
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
												
												<div className="teacherid" key={ListItemTeacher.name}>
													<div className="teacherid">{ListItemTeacher.memberitem}</div>
												</div>
																		
									  )
									})}
									
							</Panel>

							 <Panel header={"Alunos"}>
							
								 {filterStudent.map(ListItemStudent => {
									  return (			
												<div className="studentid" key={ListItemStudent.name}>
													<div className="studentname">{ListItemStudent.memberitem}</div>
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
