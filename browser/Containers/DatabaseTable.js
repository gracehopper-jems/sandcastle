import React, {Component} from 'react';


export default class DatabaseTable extends Component {
  constructor(props){
    super(props)
    this.state = {
    	entries: [], 
    	headings: [], 
    }
  }



	componentWillReceiveProps(nextProps){ 
  		const database = nextProps.database; 

  		if (database.length){
  		  	
  		  	const entries = database.map(item => JSON.parse(item)); 
		  	this.setState({entries: entries}); 

		  	const headings = Object.keys(entries[0]); 
		  	this.setState({headings: headings}); 

  		}

  	}


	render() {

		return (

			<table> 
				<tbody>
					<tr> 
						{this.state.headings.map(heading => <th key={heading}>{heading}</th>) }
					</tr> 
				 </tbody>

			{this.state.entries.map(entry => { 
				let count = 0; 
				return (
					 <tbody>
					 	<tr>
					 		{this.state.headings.map( key => <td>{entry[key]}</td>) } 
					 	</tr> 
					 </tbody> 
				) 
			})} 

			</table>
		) 
	} 
} 




		  




