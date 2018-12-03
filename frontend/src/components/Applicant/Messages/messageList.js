import React, { Component } from "react";
import Messages from "./Messages";
import axios from "axios";
import { Redirect } from "react-router";
import MessageView from "./messageView";
import ProfileNavbar from "../../Navbar/applicantNavbar";

// REDUX functionality
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// import Pagination from "../common/pagination";
// import { paginate } from "../../utils/paginate";
import {
  messageListFunc,
  messageID,
  messageViewFunc
} from "../../../actions/messageActions";

class messageList extends Component {
  lookprop = [];
  constructor(props) {
    super(props);
    this.state = {
      authflag: false,
      isClicked: false
    };
  }

  redirectDetails = members => {
    //this.props.messageID(members);
    var data = {
      from_email: members[0],
      to_email: members[1]
    };
    this.props.messageViewFunc(JSON.stringify(data));
    this.setState({
      ...this.state,
      isClicked: true
    });
    this.props.messageID(members);
  };

  componentDidMount() {
    var data = {
      // from_email: this.props.applicantProfile.applicantUser.email
      from_email: "apurav@gmail.com"
    };
    var author = this.props.applicantProfile.applicantUser.email;
    var author = "apurav@gmail.com";
    sessionStorage.setItem("author", author);
    this.props.messageListFunc(data.from_email);
  }

  render() {
    var redirect;
    if (this.state.isClicked) {
      redirect = <MessageView />;
    }
    return (
      <div>
        <ProfileNavbar />
        <div class="content-panel-container">
          <div class="panel panel-default">
            <div className="col-sm-3">
              <ul className="nav nav-navs" id="myTab" role="tablist">
                {this.props.messageReducer.messageList.map((propval, place) => (
                  <li>
                    <a data-toggle="tab" href="#messages">
                      <div className="ml-5 mt-2">
                        <Messages
                          // membername={propval.messageMembers[1]}
                          membername={propval.messageMembers[1]}
                          // from_email={propval.authorMessage[place].author}
                          onClick={() =>
                            this.redirectDetails(propval.messageMembers)
                          }
                        />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-sm-9">
              <div>
                <div id="messages">
                  {redirect}
                  {/* {(this.state.isClicked) ? <MessageView /> : } */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

messageList.propTypes = {
  messageListFunc: PropTypes.func.isRequired,
  messageViewFunc: PropTypes.func.isRequired,
  messageID: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  messageReducer: state.messageReducer,
  applicantProfile: state.applicantProfile
});

export default connect(
  mapStateToProps,
  { messageListFunc, messageID, messageViewFunc }
)(withRouter(messageList));
