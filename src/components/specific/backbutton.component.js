import React, { Component } from "react";

class BackButton extends Component {

    onClickBack = () => {
        this.prop.history.goBack();
    }

    render() {
        return (
            <button
                className="btn btn-sm"
                onClick={this.onClickBack}
            ><i className="las la-arrow-left" />
         &nbsp;Back
            </button>
        );
    }
}

export { BackButton };