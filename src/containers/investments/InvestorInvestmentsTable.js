import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Icon, Modal, Header, Label, Input, Table, Segment, Pagination } from 'semantic-ui-react';
import * as accountTransactionActions from '../../actions/accountTransactionActions';
import ErrorsDiv from '../../components/errors/ErrorsDiv';
import CustomizedPagination from '../CustomizedPagination';


class InvestorInvestmentsTable extends Component{
    constructor(props){
        super(props);

        this.state = {
            pickedTransaction: false,
            open: false,
            moneyToInvest: this.props.account.info.currency_investors[0].total_amount,
            transaction: {
                investor_id: '',
                corporation_investment_id: '',
                corporation_id: '',
                currency_id: '',
                total_amount: '',
                return_rate: '',
                t_type: "to_corp",
            },
            investment: {
                investmentCurrencyName: '',
                investmentCurrencySymbol: '', 
                investmentDate: '',
                corporationName: '', 
                returnRate: '',
                investmentPeriod: '',
            },
            pagination: {
                tableRows: null,
                currentTableRows: null,
                rowsPerPage: 7,
                totalPages: null,
            }
        }
    }

    componentWillMount(){
        const { investments, account, corporations } = this.props;
        const { rowsPerPage } = this.state.pagination;
        let investmentsData = null;
        if(account.accountType === "investor"){
            investmentsData = investments.all.filter(i => i.region === account.info.region.toLowerCase())
        }else{
            investmentsData = investments.all
        }

        const tableRows = investmentsData.map((investment) => {
            const { active, corporation_id, return_rate, investment_date } = investment;
            const corporation = corporations.all.find(c => c.id === corporation_id);
            let corpName = "";
            let investment_period = "";
            if(corporation){
                corpName = corporation.name;
                investment_period = corporation.investment_period;
            }
            const id = investment.id
            const activation = active ? "Active" : "Not Active";
            const date = investment_date.slice(0, 10);
            return(
                <Table.Row key={investment.id}>
                    <Table.Cell>{investment.id}</Table.Cell>
                    <Table.Cell>{corpName}</Table.Cell>
                    <Table.Cell>{return_rate}</Table.Cell>
                    <Table.Cell>{investment_period} Months</Table.Cell>
                    <Table.Cell>{date}</Table.Cell>
                    <Table.Cell textAlign='right'><Button onClick={ this.showModal(['blurring', id, corpName, return_rate, investment_period]) }>Invest</Button></Table.Cell>
                </Table.Row>
            )
        })

        const totalPages = Math.ceil(tableRows.length / rowsPerPage);
        const currentTableRows =  tableRows.slice(0, rowsPerPage);

        this.setState({ 
            pagination: Object.assign({}, this.state.pagination, { tableRows, currentTableRows, totalPages }) 
        });
    }

    componentWillUpdate(nextProps){
        (nextProps.account !== this.props.account) ? false : true
    }


    showModal = params => (event) => {
        const { account, investments } = this.props;
        const dimmer = params[0];
        const investmentShow = investments.all.find(i => i.id == params[1]);
        const { id, currency_id, corporation_id, return_rate, investment_date } = investmentShow;
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
        const investment = {
            investmentCurrencyName: investmentCurrency.name,
            investmentCurrencySymbol:investmentCurrency.symbol, 
            investmentDate: investment_date,
            corporationName: params[2], 
            returnRate: params[3],
            investmentPeriod: params[4],
        }
        this.setState({
            transaction,
            investment, 
            dimmer,
            open: true,
        });

    };
    
    open = () => this.setState({ open: true });
    close = () => {
        this.setState({ open: false, pickedTransaction: false })
    }
    
    handelIputChange = (event) => {
        const { name, value } = event.target;
        const newTransaction = Object.assign({}, this.state.transaction);
        const amount = value === "" ? 0 : parseFloat(value);
        const funds = this.props.account.info.currency_investors[0].total_amount;
        const newMoneyToInvest = funds - amount;
        newTransaction.total_amount = parseFloat(value);
        this.setState({ transaction: newTransaction, moneyToInvest: newMoneyToInvest });
    }

    handlePageChange = pageNumber => {
        const{ tableRows, currentTableRows, rowsPerPage } = this.state.pagination;
        let showedRows = (pageNumber - 1) * rowsPerPage;
        let rowsToBeShowen = pageNumber * rowsPerPage;
        let parsedRows = tableRows.slice(showedRows, rowsToBeShowen);
        this.setState({ pagination: Object.assign({}, this.state.pagination, { currentTableRows: parsedRows }) })
    }  

    handleInvestSubmition = (event) => {
        this.setState({ pickedTransaction: true });
        this.props.accountTransactionActions.persistInvestorTransaction(this.state.transaction)
    }

    render(){
        const { routerHistory, account, investments, corporations, accountTransaction } = this.props;
        const { open, dimmer, transaction, pickedTransaction, pagination } = this.state;
        const {investmentCurrencyName, investmentCurrencySymbol, investmentDate, corporationName, returnRate, investmentPeriod } = this.state.investment;
        
        let description = "";
        if(pickedTransaction && accountTransaction.loading){
            description = <p>loading one moment please we are submiting your investments</p>;
        }else if(pickedTransaction && !!accountTransaction.response){
            if(accountTransaction.status === 'error'){
                description = <ErrorsDiv messages={accountTransaction.response}/>
            }else if(accountTransaction.status === 'success'){
                const amountCalculated = transaction.total_amount + (transaction.total_amount * returnRate/100);
                let dueDate = new Date(investmentDate); 
                dueDate.setMonth(+investmentPeriod);
                description = <p>you invested in -
                    {corporationName} -
                    {transaction.total_amount} - 
                    {investmentCurrencyName} your return for this transaction is -
                    {amountCalculated.toFixed(2)} - 
                    {investmentCurrencyName} due at {dueDate.toDateString()}</p>;
            }
        }else{
            description = <div>
                <p><b>corporation name:</b> {corporationName}</p>
                <p><b>return rate:</b> {returnRate}</p>
                <p><b>for: {investmentPeriod}</b></p>
                <label>Enter Amount: 
                    <Input labelPosition='right' 
                        type='number'
                        name="total">
                        <Label basic>{investmentCurrencySymbol}</Label>
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
                <span id="investor-investments-div"></span> 
                <Header textAlign="center">Live Investments</Header>
                
                
                <Segment loading={investments.loading || corporations.loading } >
                    <CustomizedPagination totalPages={pagination.totalPages} activePageChange={this.handlePageChange}/>
                    <Table unstackable>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Corporation Name</Table.HeaderCell>
                            <Table.HeaderCell>Return Rate</Table.HeaderCell>
                            <Table.HeaderCell>Investment Period</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell textAlign='right'><Icon name="angle double down"/></Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>

                        <Table.Body>
                          {pagination.currentTableRows}
                        </Table.Body>
                    </Table> 
                </Segment>

                <Modal
                open={open}
                dimmer={dimmer}
                onClose={this.close}>
                    <Modal.Header>
                        Investment Info
                    </Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <h3>You have {this.state.moneyToInvest.toFixed(4)} money to invest</h3>
                            {description}
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button disabled={pickedTransaction && accountTransaction.loading} color='black' onClick={this.close}>Back to Investments</Button>
                        <Button disabled={pickedTransaction && !!accountTransaction.response} positive labelPosition='right' icon='checkmark' content='Invest' onClick={this.handleInvestSubmition}/>
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
       accountTransaction: state.accountTransaction
   }
}

const mapDispatchToProps = (dispatch) => {
    return {
        accountTransactionActions:  bindActionCreators(accountTransactionActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorInvestmentsTable);

