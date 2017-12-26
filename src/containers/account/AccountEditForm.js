import 'react-select/dist/react-select.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import Select from 'react-select';

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
                value: [],
                rtl: false,
            }      
        }
    }


    componentWillMount(){
        const newState = Object.assign({}, this.state);
        newState.account = this.props.account;
        newState.select.value = this.props.account.regions_array
        this.setState(newState);
    }

    handelInputChange = (event) => {
        const { name ,value } =  event.target;
        const parstValue = name === "investment_period" ? parseInt(value) : value
        this.setState({ account: Object.assign({}, this.state.account, { [name]: parstValue }) })
    }

    handleSelectChange = (value) => {        
        const newState = Object.assign({}, this.state);
        newState.select.value = value.split(",") 
        this.setState(newState);
    }

    handelEditSubmit = (event) => {
        debugger;
    }


    render(){
        const { disabled, stayOpen, value } = this.state.select;
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
                            value={this.state.account.email}
                            onChange={this.handelInputChange}/>
                    </label><br/>

                    <label>Name
                        <input type="text"
                            name="name"
                            placeholder="Enter name"
                            value={this.state.account.name}
                            onChange={this.handelInputChange}/>
                    </label><br/>

                    <label>Title
                        <input type="text"
                            name="title"
                            placeholder="Enter Title"
                            value={this.state.account.title}
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
                        value={value}/>
                  </div>
                   

                    <div>
                        <label>6 months period
                            <input type="radio"
                                name="investment_period"
                                value="6" 
                                checked={this.state.account.investment_period === 6 }
                                onChange={this.handelInputChange}/>
                        </label><br/>
                        
                        <label>3 months period
                            <input type="radio"
                                name="investment_period"
                                value="3" 
                                checked={this.state.account.investment_period === 3 }
                                onChange={this.handelInputChange}/>
                        </label><br/>
                        
                        <label>2 months period    
                            <input type="radio"
                                name="investment_period" 
                                value="2"
                                checked={this.state.account.investment_period === 2 }
                                onChange={this.handelInputChange}/>
                        </label><br/>
                    </div>

                    <input type="submit" value="Update Account"/>
                </form>
            </div> 
        )
    }
}

const MapStateToProps = (state) => {
    return { 
        account: state.account.info, 
        currencies: state.currencies.all 
    }
}


export default connect(MapStateToProps)(AccountEditForm);


