import React, { Component } from "react";
import "./styles/styles.scss";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      contentShow: false,
      className: props.className || "",
      maxWidth: props.maxWidth || 768
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  componentDidMount() {
    this.props.opened &&
      setTimeout(() => {
        this.open();
      }, 0);
  }
  open() {
    this.setState(
      {
        open: true,
        contentShow: true
      },
      () => {
        this.props.onShow && this.props.onShow();
      }
    );
  }
  close() {
    this.setState(
      {
        open: false
      },
      () => {
        setTimeout(() => {
          this.setState(
            {
              contentShow: false
            },
            () => {
              this.props.onHide && this.props.onHide();
            }
          );
        }, 600);
      }
    );
  }
  componentWillReceiveProps(props) {
    if (props.opened !== this.state.open) {
      props.opened ? this.open() : this.close();
    }
    if (props.maxWidth !== this.state.maxWidth) {
      this.setState({
        maxWidth: props.maxWidth
      });
    }
  }
  render() {
    let { open, contentShow, className, maxWidth } = this.state;
    maxWidth = parseInt(maxWidth);
    return (
      <div
        className={[
          "modal",
          "modal__" + (open ? "open" : "close"),
          className
        ].join(" ")}
        onClick={this.close}
      >
        <div
          className="modal-content"
          style={{
            maxWidth: maxWidth + "px"
          }}
        >
          <div className="modal-close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z" />
            </svg>
          </div>
          <div
            className="modal-content-inner"
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {contentShow && this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
