import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import CustomizedPagination from './CustomizedPagination';

export default class PaginatedTable extends Component {
	constructor(props){
		super(props);

		this.state = {
            currentTableRows: null,
            rowsPerPage: 7,
            totalPages: null,
		}
	}

	componentWillReceiveProps(nextProps){
        this.setState({ 
        	tableHeadersData: nextProps.headersData,  
        	tableRowsData: nextProps.rowsData
        })
	}

	componentWillMount(){
        const { rowsPerPage, tableRowsData } = this.state;

		const totalPages = Math.ceil(tableRowsData.length / rowsPerPage);
        const currentTableRows = tableRowsData.slice(0, rowsPerPage);

        this.setState({ currentTableRows, totalPages })
	}

	handlePageChange = pageNumber => {
        const{ tableRowsData, currentTableRows, rowsPerPage } = this.state;
        let showedRowsNumber = (pageNumber - 1) * rowsPerPage;
        let rowsToBeShowenNumber = pageNumber * rowsPerPage;
        let parsedRows = tableRowsData.slice(showedRowsNumber, rowsToBeShowenNumber);
        this.setState({ currentTableRows: parsedRows })
    }

	render(){
		const { tableRowsData, currentTableRows, rowsPerPage, totalPages, tableHeadersData } = this.state; 

		return(
			<div>
				<CustomizedPagination totalPages={totalPages} onActivePageChange={this.handlePageChange} />
	            <Table unstackable>
	                <Table.Header>
	                  <Table.Row>
	                    {this.props.headersData}
	                  </Table.Row>
	                </Table.Header>

	                <Table.Body>
	                  {this.props.rowsData}
	                </Table.Body>
	            </Table>
            </div>
		)
	}
}