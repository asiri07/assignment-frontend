import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { message, Spin, Card } from "antd";
import { AppstoreAddOutlined, RightOutlined } from '@ant-design/icons';

const MonthSummary = (props) => {

    const { income, expense, monthdetails, month, calculateIncomeSum, dashboard } = props;

    return (
        <>
            <div className="row">
                <div className="col-md-6 page__header">
                    <h6>OVERVIEW</h6>
                    <p>{month}</p>
                    {/* <div>
                        <label>{income}</label> - <label>{expense}</label> = <label>{income - expense}</label>
                    </div> */}
                </div>
                <div className="col-md-6">

                </div>
            </div>
            <div className="row">
                <div className="button__container">
                    {Array.isArray(monthdetails) && monthdetails.length > 0 &&
                        <>
                            <Link className="btn btn-primary" to={`/income/${monthdetails[0].id}`}><AppstoreAddOutlined />&nbsp;Add income</Link>&nbsp;&nbsp;
                            <Link className="btn btn-secondary" to={`/expense/${monthdetails[0].id}`}><AppstoreAddOutlined />&nbsp;Add expense</Link>
                        </>}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Card className="dashboard__header__card">
                        {Array.isArray(monthdetails) && monthdetails.length > 0 && Array.isArray(monthdetails[0].incomes) && monthdetails[0].incomes.map((value, index) => {
                            return (
                                <Link className="img__wrapper" to={`/income-edit/${value.id}`}>
                                    <div>
                                        <span><img src={require('../../assets/images/business-and-finance.svg').default} className='img-icon' /></span>
                                        <div>
                                            <a>{value.income}</a>
                                            <a>{value.amount}</a>
                                        </div>
                                    </div>
                                    <RightOutlined />
                                </Link>
                            )
                        })}
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card className="dashboard__header__card">
                        <div className="dashboard__header__label">
                            <label>Total income</label>
                            <p>{income} <small>rupees</small></p>
                        </div>
                        <div className="dashboard__header__label">
                            <label>Total expense</label>
                            <p>{expense} <small>rupees</small></p>
                        </div>
                        <div className="dashboard__header__label">
                            <label>Available</label>
                            <p>{income - expense} <small>rupees</small></p>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="row">
                {Array.isArray(monthdetails) && monthdetails.length > 0 && Array.isArray(monthdetails[0].categories) && monthdetails[0].categories.map((value, index) => {
                    return (
                        <div className="col-md-4">
                            <Card className="expense_card">
                                <div className="expense_card__header">
                                    <label>{value.name}</label> &nbsp;
                                    <small>{calculateIncomeSum(value.expenses)}</small>
                                </div>
                                <table className="table table-borderless">
                                    <thead>
                                        <th>Expense</th>
                                        <th>Amount</th>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(value.expenses) && value.expenses.map((value, index) => {
                                            return (
                                                <tr className="table__row">
                                                    <td><input type="checkbox" checked={value.paid} />&nbsp;<Link to={`/expense-edit/${value.id}`}>{value.expense}</Link></td>
                                                    <td><small>{value.amount}</small></td>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <td>Total</td>
                                            <td>{calculateIncomeSum(value.expenses)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export { MonthSummary };