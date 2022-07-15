import React, { Component } from "react";
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Loader extends Component {

    render() {
        return (
            <div>
                <GridLoader color={"#ac3e7f"} loading={true} css={override} size={8} />
            </div>
        )
    }

}

export { Loader };