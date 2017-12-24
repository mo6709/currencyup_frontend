import React, { Component } from 'react';
import { connect } from 'react-redux';

class AccountEditForm extends Component{
    constructor(props){
        super(props);

        this.state = {}
    }

    componentDidMount(){
        this.setState({
            ...this.props.account
        })
    }

    handelInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
        debugger;
    }

    handelEditSubmit = (event) => {
        
    }

    render(){ 
        return(
            <div>
                <p>Hello from AccountEdit smart Container</p>
                 
                <form onSubmit={event => this.handelEditSubmit(event) }>
                    <label>Email:
                        <input type="email"
                            name="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handelInputChange}/>
                    </label><br/>

                    <label>Name
                        <input type="text"
                            name="name"
                            placeholder="Enter name"
                            value={this.state.name}
                            onChange={this.handelInputChange}/>
                    </label><br/>

                    <label>Title
                        <input type="text"
                            name="title"
                            placeholder="Enter Title"
                            value={this.state.title}
                            onChange={this.handelInputChange}/>
                    </label><br/>

                    <label>
                        Select investment regions:
                        <select name="regions_array" multiple={true} value={this.state.regions_array} onChange={this.handleChange}>
                            <option value="Israel">Israel</option>
                            <option value="Jepan">Jepan</option>
                            <option value="USA">USA</option>
                        </select>
                    </label><br/>



                    <div>
                        <label>6 months period
                            <input type="radio"
                                name="investment_period"
                                value="6" 
                                checked={this.state.investment_period === "6"}
                                onChange={this.handelInputChange}/>
                        </label><br/>
                        
                        <label>3 months period
                            <input type="radio"
                                name="investment_period"
                                value="3" 
                                checked={this.state.investment_period === "3"}
                                onChange={this.handelInputChange}/>
                        </label><br/>
                        
                        <label>2 months period    
                            <input type="radio"
                                name="investment_period" 
                                value="2"
                                checked={this.state.investment_period === "2"}
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
    return { account: state.account.info }
}


export default connect(MapStateToProps)(AccountEditForm);


