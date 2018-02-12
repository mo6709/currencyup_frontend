import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import CustomizedPagination from './CustomizedPagination';

class PaginatedTable extends Component {
	constructor(props){
		super(props);

		this.state = {
			tableHeadersData: this.props.headersData,
            tableRowsData: this.props.rowsData,
            currentTableRows: null,
            rowsPerPage: 7,
            totalPages: 0,
            someState: "",
		}
	}
    componentWillMount(){
        const { rowsPerPage, tableRowsData } = this.state;

		const totalPages = Math.ceil(tableRowsData.length / rowsPerPage);
        const currentTableRows = tableRowsData.slice(0, rowsPerPage);
	   	
	    this.setState({ currentTableRows, totalPages});
    }

	componentWillReceiveProps(nextProps){
		if(this.props.rowsData[0] !== nextProps.rowsData){
		    this.setState({ tableRowsData: nextProps.rowsData }, () => {
		    	const { rowsPerPage, tableRowsData } = this.state;

				const totalPages = Math.ceil(tableRowsData.length / rowsPerPage);
		        const currentTableRows = tableRowsData.slice(0, rowsPerPage);
			   	
			    this.setState({ currentTableRows, totalPages });
		    });
	    }
	}

	handlePageChange = pageNumber => {
        const{ tableRowsData, currentTableRows, rowsPerPage } = this.state;
        let showedRowsNumber = (pageNumber - 1) * rowsPerPage;
        let rowsToBeShowenNumber = pageNumber * rowsPerPage;
        let parsedRows = tableRowsData.slice(showedRowsNumber, rowsToBeShowenNumber);
        this.setState({ currentTableRows: parsedRows })
    }

	render(){
		const { tableRowsData, currentTableRows, rowsPerPage, totalPages, tableHeadersData, someState } = this.state; 

		return(
			<div>
				<CustomizedPagination totalPages={totalPages} onActivePageChange={this.handlePageChange} />
	            <h1>{someState}</h1>
	            <Table unstackable>
	                <Table.Header>
	                  <Table.Row>
	                    {tableHeadersData}
	                  </Table.Row>
	                </Table.Header>
	                <Table.Body>
	                  {currentTableRows}
	                </Table.Body>
	            </Table>
            </div>
		)
	}
}

export default PaginatedTable;