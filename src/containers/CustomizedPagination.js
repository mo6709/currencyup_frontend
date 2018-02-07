import React, { Component } from 'react';
import { Grid, Form, Pagination, Segment } from 'semantic-ui-react';

export default class CustomizedPagination extends Component {
	constructor(props){
        super(props);

        this.state = {
		    activePage: 1,
		    boundaryRange: 1,
		    siblingRange: 1,
		    showEllipsis: true,
		    showFirstAndLastNav: false,
		    showPreviousAndNextNav: true,
		    totalPages: this.props.totalPages,
		};
	}


    handlePaginationChange = (e, { activePage }) => { 
    	this.setState({ activePage })
    	this.props.activePageChange(activePage)
    }

	render() {
	    const {
			activePage,
			boundaryRange,
			siblingRange,
			showEllipsis,
			showFirstAndLastNav,
			showPreviousAndNextNav,
			totalPages,
	    } = this.state;

		return(
			<Pagination
			    pointing
			    secondary
			    activePage={activePage}
			    boundaryRange={boundaryRange}
			    onPageChange={this.handlePaginationChange}
			    
			    totalPages={totalPages}
			    // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
			    ellipsisItem={showEllipsis ? undefined : null}
			    firstItem={showFirstAndLastNav ? undefined : null}
			    lastItem={showFirstAndLastNav ? undefined : null}
			    prevItem={showPreviousAndNextNav ? undefined : null}
			    nextItem={showPreviousAndNextNav ? undefined : null}
			  />
		)
	}
}