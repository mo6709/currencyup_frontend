import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Icon, Modal, Header } from 'semantic-ui-react';
import * as accountTransactionsActions from '../../actions/accountTransactionActions';
import { Label, Input } from 'semantic-ui-react';


class InvestmentsList extends Component{
    constructor(props){
        super(props);

        this.state = {
            pickedTransaction: false,
            open: false,
            transaction: {
                investor_id: '',
                corporation_investment_id: '',
                corporation_id: '',
                currency_id: '',
                total_amount: '',
                return_rate: '',
                t_type: "to_corp",
            }
        }
    }

    // shouldComponentUpdate(){
    //     //make sure to prevent rerender when the prop account gets updated
    // }

    showModal = params => (event) => {
        const { account, investments } = this.props;
        const dimmer = params[0];
        const investment = investments.all.find(i => i.id == params[1]);
        const { id, currency_id, corporation_id, return_rate, investment_date } = investment;
        const investmentCurrency = this.props.currencies.all.find(c => c.id === currency_id);
        const transaction = {
                investor_id: account.info.id,
                corporation_investment_id: id,
                corporation_id,
                currency_id,
                return_rate,
                total_amount: '',
                t_type: "to_corp",
        }
        this.setState({
            transaction, 
            dimmer,
            open: true,
            investmentCurrencyName: investmentCurrency.name,
            investmentDate: investment_date,
            corporationName: params[2], 
            returnRate: params[3],
            investmentPeriod: params[4],
        });

    };
    
    open = () => this.setState({ open: true });
    close = () => {
        this.setState({ open: false, pickedTransaction: false })
    }
    
    handelIputChange = (event) => {
        const { name, value } = event.target;
        const newTransaction = Object.assign({}, this.state.transaction)
        newTransaction.total_amount = parseFloat(value);
        this.setState({ transaction: newTransaction });
    } 

    handleInvestSubmition = (event) => {
        this.setState({ pickedTransaction: true });
        this.props.accountTransactionsActions.persistTransaction(this.state.transaction, this.props.routerHistory)
    }

    render(){
        const { routerHistory, account, investments, corporations, accountTransactions } = this.props;
        const { open, dimmer, returnRate, investmentDate, investmentPeriod, transaction, corporationName } = this.state;

        let investmentsData = null;
        if(account.accountType === "investor"){
            investmentsData = investments.all.filter(i => i.region === account.info.region)
        }else{
            investmentsData = investments.all
        }

        const investmentDivs = investmentsData.map((investment) => {
            const { active, corporation_id, return_rate, investment_date } = investment;
            const corporation = corporations.all.find(c => c.id === corporation_id);
            let corpName = "";
            let investmentPeriod = "";
            if(corporation){
                corpName = corporation.name;
                investmentPeriod = corporation.investment_period;
            }
            const id = investment.id
            const activation = active === true ? "Active" : "Not Active";
            const returnRate = return_rate;
            const date = investment_date.slice(0, 10);
            return(
                <div key={investment.id}>
                    <p>{activation} | {corpName} | {returnRate} for | {investmentPeriod} months | investment date {date}</p>
                    <Button onClick={ this.showModal(['blurring', id, corpName, returnRate, investmentPeriod]) }>Invest</Button>
                </div>
            )
        })

        let description = "";
        if(this.state.pickedTransaction && accountTransactions.loading){
            description = <p>loading one moment please we are submiting your investments</p>;
        }else if(this.state.pickedTransaction && !!accountTransactions.response){
            if(accountTransactions.status === 'error'){
                description = <p>{accountTransactions.response}</p>;
            }else if(accountTransactions.status === 'success'){
                const amountCalculated = transaction.total_amount + (transaction.total_amount * returnRate/100);
                let dueDate = new Date(investmentDate); 
                dueDate.setMonth(+6);
                description = <p>you invested in -
                    {corporationName} -
                    {transaction.total_amount} - 
                    {this.state.investmentCurrencyName} your return for this transaction is -
                    {amountCalculated.toFixed(2)} - 
                    {this.state.investmentCurrencyName} due at {dueDate.toDateString()}</p>;
            }
        }else{
            description = <div>
                <Header>investment info</Header>
                <p>corporation name: {corporationName}</p>
                <p>return rate: {returnRate}</p>
                <p>for: {investmentPeriod}</p>
                <label>Total Amount:
                    <Input labelPosition='right' 
                        type='number'
                        name="total">
                        <Label basic>make this field dinamic</Label>
                        <input placeholder='Amount'
                        value={transaction.total_amount}
                        onChange={this.handelIputChange}/>
                        <Label>.00</Label>
                    </Input>
                </label>
            </div>;
        }
       
        return(
            <div className="DottedBox">
                <p>Investments list</p>
                {investmentDivs}

                <Modal
                open={open}
                dimmer={dimmer}
                onClose={this.close}>
                    <Modal.Header>
                        Invest
                    </Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            {description}
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button disabled={accountTransactions.loading} color='black' onClick={this.close}>Back to Investments</Button>
                        <Button disabled={!!accountTransactions.response} positive labelPosition='right' icon='checkmark' content='Invest' onClick={this.handleInvestSubmition}/>
                    </Modal.Actions>
                </Modal>

            </div>
        )
    }
}

const mapStateToProps = (state) =>{
   return {
       account: state.account,
       currencies: state.currencies,
       investments: state.investments,
       corporations: state.corporations,
       accountTransactions: state.accountTransactions
   }
}

const mapDispatchToProps = (dispatch) => {
    return {
        accountTransactionsActions:  bindActionCreators(accountTransactionsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentsList);