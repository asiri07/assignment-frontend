import React, { Component } from "react";
import { Spin, Space } from 'antd';

class Spinner extends Component {

    render() {
        return (
            <Space size="middle">
                <Spin size={this.props.size || "large"} />
            </Space>
        )
    }

}

export { Spinner };