import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';
import * as corporationActions from '../../actions/corporationActions';
import CorporationsTable from './CorporationsTable';
import { Segment, Header } from 'semantic-ui-react';


class CorporationsPage extends Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    componentDidMount() {
        if(this.props.corporations.all.length === 0){
            this.props.corporationActions.fetchCorporations()
        }
    }

    render(){
        return(
            <div id="corporations-div" className="DottedBox">
                <Segment style={{ margin: '5em 0em'}}>
                    <Header as="h1" textAlign="center">All Corporations</Header>
                    <Segment loading={this.props.corporations.loading}>
                        <CorporationsTable/>
                    </Segment> 
                </Segment>
           </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        corporations: state.corporations
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        corporationActions: bindActionCreators(corporationActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CorporationsPage);