import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
import {connect} from 'react-redux'
import {requestUserData} from './../../ducks/userReducer'
import {requestBudgetData, addPurchase, removePurchase} from './../../ducks/budgetReducer'


class Budget extends Component {

componentDidMount(){
  this.props.requestUserData()
  this.props.requestBudgetData()
}



  render() {
    //Destructuring can be used here to avoid typing this.props.budget.loading:  and instead just put loading: 
    //Make sure to always destructure new objects before putting them in the return.

    const {loading, purchases, budgetLimit} = this.props.budget;
    const {firstName, lastName} = this.props.user
    //Not sure if the destructure here is allowed or will cause an error for not using this.props in the componenets below.
    const {addPurchase, removePurchase} =this.props 
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          {/* Destructuring means that I don't have to put this.props.user.firstName in the nav */}
          <Nav firstName ={firstName} lastName={lastName}/>
          <div className='content-container'>
            <div className="purchases-container">
              {/* check the components below with the {} to see how they are using the passed data from the store */}
              <AddPurchase addPurchase={addPurchase} />
              <DisplayPurchases purchases={purchases} budgetLimit={budgetLimit} removePurchase={removePurchase} />
            </div>
            <div className='chart-container'>
              <Chart1 purchases={purchases} budgetLimit={budgetLimit} />
              <Chart2 purchases={purchases}/>
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

function mapStateToProps(state){
  return {
    budget: state.budget,
    user: state.user
  }
}

//export the request functions inside one pair of {} so that they can be imported to other sections.

export default connect(mapStateToProps, {requestUserData, requestBudgetData, addPurchase, removePurchase})(Budget)

// export default Budget;
