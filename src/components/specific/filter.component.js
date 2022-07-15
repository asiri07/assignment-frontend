import { Component } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import Moment from 'moment';
import { DatePicker, Select, Space } from "antd";

const { RangePicker } = DatePicker;
const { Option } = Select;

class Filter extends Component {

    render() {
        const routerPath = window.location.pathname.split('/')[1];
        // console.log("routerPath", routerPath === '');
        return (
            <div className="advaced__filter__wrapper" id="advaced__filter__wrapper">
                <div className="wrapper">
                    <div>
                        <label htmlFor className="form-label">Distric</label>
                        <Select
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear
                            className="form-control form-dropdown"
                            id="enterprise"
                            placeholder="Select Enterprise"
                            value={this.props.district}
                            onChange={this.props.onChangeDistrict}
                        >
                          {/* <Option value={"Kandy"}>{"Kandy"}</Option> */}
                            {/* {this.renderEnterprises()} */}
                        </Select>
                    </div>
                    <div>
                        <label htmlFor className="form-label">DS Division</label>
                        <Select
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear
                            className="form-control form-dropdown"
                            id="enterprise"
                            placeholder="Select Enterprise"
                            value={this.props.ds}
                            onChange={this.props.onChangeDs}
                        >
                            {/* <Option value={"Yatinuwara"}>{"Yatinuwara"}</Option> */}
                            {/* {this.renderEnterprises()} */}
                        </Select>
                    </div>
                    <div>
                        <label htmlFor className="form-label">GN Division</label>
                        <Select
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear
                            className="form-control form-dropdown"
                            id="enterprise"
                            placeholder="Select Enterprise"
                            value={this.props.gn}
                            onChange={this.props.onChangeGn}
                        >
                            {/* <Option value={"Arambegama West"}>{"Arambegama West"}</Option> */}
                            {/* {this.renderEnterprises()} */}
                        </Select>
                    </div>
                    {(routerPath === 'schedulelist' || routerPath === 'appointmentlist') && <div>
                        <label htmlFor className="form-label">Center</label>
                        <Select
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear
                            className="form-control form-dropdown"
                            id="enterprise"
                            placeholder="Select Enterprise"
                            value={this.props.center}
                            onChange={this.props.onChangeCenter}
                        >
                            {/* <Option value={"Pilimathalawa central college"}>{"Pilimathalawa central college"}</Option> */}
                            {/* {this.renderEnterprises()} */}
                        </Select>
                    </div>}
                    {routerPath === 'appointmentlist' && <div>
                        <label htmlFor className="form-label">Date range</label>
                        <RangePicker
                            className="custom-date-range"
                            onChange={this.props.onChangeDate}
                            value={this.props.daterange}
                        // defaultValue={[Moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), Moment(new Date()).format('YYYY-MM-DD HH:mm:ss')]}
                        />
                    </div>}
                    <div className="btn__wrapper">
                        <button className="btn btn-sm"
                            onClick={this.props.onPressSearch}
                            disabled={this.props.searchDisabled}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export { Filter };