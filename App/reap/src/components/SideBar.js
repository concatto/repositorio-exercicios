import React from 'react';
import MemberItem from './MemberItem';
import ReactDOM from 'react-dom'
import { FormGroup, ListGroup, FormControl, Button , Panel , PanelGroup } from 'react-bootstrap';
import SearchInput, {createFilter} from './SearchInput'

class SideBar extends React.Component {
	  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }
	
	render() {
		const listgroup = <ListGroup className="member-list-panel">
				<PanelGroup>

						<Panel header={"Professores"}>
							<ListGroup className="professores">

								<MemberItem name="Elieser" online={false}/>
								<MemberItem name="Marcelo" online={true}/>

							</ListGroup>
						</Panel>

						<Panel header={"Alunos"}>
							<ListGroup className="alunos">

								<MemberItem name="Andriel" online={true}/>
								<MemberItem name="Eriosvaldo" online={true}/>
								<MemberItem name="Pedro" online={true}/>
								<MemberItem name="Rodrigo" online={false}/>
								<MemberItem name="Samuel" online={false}/>


							</ListGroup>
						</Panel>
					</PanelGroup>
				</ListGroup>
		
		
		return (
			<div>

				<form>
					<FormGroup className="filter-member">
					<SearchInput className='search-input' onChange={this.searchUpdated} />
	
					</FormGroup>
					
					{listgroup}

					</form>
				
			</div>
			
			
		);

		
	}
			  searchUpdated (term) {
    this.setState({searchTerm: term})
  }
}

export default SideBar;
