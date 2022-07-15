import React, { Component } from "react";

class Card extends Component {

    render() {
        return (
            <div className={"card mb-4 " + this.props.widgetCard + " " + this.props.cardClass}>
                {
                    this.props.ImageSRC &&
                    <div className="view overlay">
                        <img className="card-img-top" src={this.props.ImageSRC}
                            alt="Card image cap" />
                        <a href="#!" className={this.props.widgetCard}>
                            <div className="mask rgba-white-slight"></div>
                        </a>
                    </div>}

                {/* Card content */}
                <div className="card-body">

                    <h5 className="widget_title">{this.props.Title}</h5>

                    <p className="card-text">{this.props.Desc}</p>

                    {/* <a href="#" className="btn btn-primary">Button</a> */}
                </div>
                {!this.props.FooterLess &&
                    <div className="card-footer card-footer-container">
                    </div>
                }
            </div>
        );
    }
}

export { Card };