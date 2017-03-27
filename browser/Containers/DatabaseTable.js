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
		let count = 0; 
		return (

			<table> 
				<tbody>
					<tr> 
						{this.state.headings.map(heading => <th key={heading}>{heading}</th>) }
					</tr> 
				 </tbody>

			{this.state.entries.map(entry => { 
				return (
					 <tbody key={"" + count++}>
					 	<tr key={"" + count++}>
					 		{this.state.headings.map( col => <td key={"" + count++}>{entry[col]}</td>) } 
					 	</tr> 
					 </tbody> 
				) 
			})} 

			</table>
		) 
	} 
} 




		  




