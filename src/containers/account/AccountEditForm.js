import 'react-select/dist/react-select.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import { updateAndSetAccountInfo } from '../../actions/accountActions';
import fetch from 'isomorphic-fetch';

const divStyle = {
  margin: '40px',
  border: '5px '
};

class AccountEditForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            select: {
                removeSelected: true,
                disabled: false,
                stayOpen: false,
            }      
        }
    }


    componentWillMount(){
        const { info, accountType } = this.props.account;
        const newState = Object.assign({}, this.state);
        newState.account = info;
        newState.account["type"] = accountType
        this.setState(newState);
    }

    handelInputChange = (event) => {
        const { name, value } =  event.target;
        const parstValue = name === "investment_period" ? parseInt(value) : value
        this.setState({ account: Object.assign({}, this.state.account, { [name]: parstValue }) })
    }

    handleSelectChange = (value) => {        
        const newState = Object.assign({}, this.state);
        newState.account.regions_array = value.split(",") 
        this.setState(newState);
    }

    handelEditSubmit = (event) => {
        event.preventDefault();
        this.props.updateAndSetAccountInfo(this.state.account)
    }


    render(){
        const { disabled, stayOpen } = this.state.select;
        const { email, name, title, regions_array, investment_period } = this.state.account
        let regions = this.props.currencies.map((currency) => {
            return { label: currency.region, value: currency.region }
        });

        return( 
            <div>
                <p>Hello from AccountEdit smart Container</p>
                 
                <form onSubmit={event => this.handelEditSubmit(event) }>
                    <label>Email:
                        <input type="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={this.handelInputChange}/>
                    </label><br/>

                    <label>Name
                        <input type="text"
                            name="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={this.handelInputChange}/>
                    </label><br/>

                    <label>Title
                        <input type="text"
                            name="title"
                            placeholder="Enter Title"
                            value={title}
                            onChange={this.handelInputChange}/>
                    </label><br/>

                  <div style={divStyle}>
                    Select Regions:
                    <Select
                        closeOnSelect={!stayOpen}
                        disabled={disabled}
                        multi
                        onChange={this.handleSelectChange}
                        options={regions}
                        placeholder="Select investment regions"
                        removeSelected={this.state.select.removeSelected}
                        rtl={this.state.select.rtl}
                        simpleValue
                        value={regions_array}/>
                  </div>
                   

                    <div>
                        <label>6 months period
                            <input type="radio"
                                name="investment_period"
                                value="6" 
                                checked={investment_period === 6 }
                                onChange={this.handelInputChange}/>
                        </label><br/>
                        
                        <label>3 months period
                            <input type="radio"
                                name="investment_period"
                                value="3" 
                                checked={investment_period === 3 }
                                onChange={this.handelInputChange}/>
                        </label><br/>
                        
                        <label>2 months period    
                            <input type="radio"
                                name="investment_period" 
                                value="2"
                                checked={investment_period === 2 }
                                onChange={this.handelInputChange}/>
                        </label><br/>
                    </div>

                    <input type="submit" value="Update Account"/>
                </form>
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        account: state.account, 
        currencies: state.currencies.all 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAndSetAccountInfo: bindActionCreators(updateAndSetAccountInfo, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AccountEditForm);


