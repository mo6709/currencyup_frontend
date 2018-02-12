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
            message: "",
		}
	}
    componentWillMount(){
        const { rowsPerPage, tableRowsData } = this.state;

		const totalPages = Math.ceil(tableRowsData.length / rowsPerPage);
        const currentTableRows = tableRowsData.slice(0, rowsPerPage);
	   	const message =  currentTableRows.length > 0 ? "" : <h3>Nothing to desplay yet.</h3>;

	    this.setState({ currentTableRows, totalPages, message });
    }

	componentWillReceiveProps(nextProps){
		if(this.props.rowsData[0] !== nextProps.rowsData){
		    this.setState({ tableRowsData: nextProps.rowsData }, () => {
		    	const { rowsPerPage, tableRowsData } = this.state;

				const totalPages = Math.ceil(tableRowsData.length / rowsPerPage);
		        const currentTableRows = tableRowsData.slice(0, rowsPerPage)
                const message =  currentTableRows.length > 0 ? "" : <h3>Nothing to desplay yet.</h3>;

			    this.setState({ currentTableRows, totalPages, message });
		    });
	    }
	}

	handlePageChange = pageNumber => {
        const { tableRowsData, currentTableRows, rowsPerPage } = this.state;
        let showedRowsNumber = (pageNumber - 1) * rowsPerPage;
        let rowsToBeShowenNumber = pageNumber * rowsPerPage;
        let parsedRows = tableRowsData.slice(showedRowsNumber, rowsToBeShowenNumber);
        this.setState({ currentTableRows: parsedRows })
    }

	render(){
		const { tableRowsData, currentTableRows, rowsPerPage, totalPages, tableHeadersData, message  } = this.state; 

		return(
			<div>
				{message !== "" ? message: <CustomizedPagination totalPages={totalPages} onActivePageChange={this.handlePageChange} />}
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