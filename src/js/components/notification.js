const shell = window.require('electron').shell;

import React from 'react';
import { connect } from 'react-redux';

import { markNotification } from '../actions';

export class SingleNotification extends React.Component {

  urgency = {
    0: 'new',
    5: 'outstanding',
    10: 'stale',
  }

  pressTitle() {
    this.openBrowser();

    if (this.props.markOnClick) {
      this.markAsRead();
    }
  }

  openBrowser() {
    var url = this.props.notification.subject.url.replace('api.github.com/repos', 'www.github.com');
    if (url.indexOf('/pulls/') !== -1) {
      url = url.replace('/pulls/', '/pull/');
    }
    shell.openExternal(url);
  }

  markAsRead() {
    this.props.markNotification(this.props.notification.id);
  }

  getUrgency() {
    return this.urgency[this.props.notification.subject.urgency];
  }

  render() {
    var typeIconClass, typeIconTooltip;

    if (this.props.notification.subject.type === 'Issue') {
      typeIconClass = 'octicon octicon-issue-opened';
      typeIconTooltip = 'Issue';
    } else if (this.props.notification.subject.type === 'PullRequest') {
      typeIconClass = 'octicon octicon-git-pull-request';
      typeIconTooltip = 'Pull Request';
    } else if (this.props.notification.subject.type === 'Commit') {
      typeIconClass = 'octicon octicon-git-commit';
      typeIconTooltip = 'Commit';
    } else if (this.props.notification.subject.type === 'Release') {
      typeIconClass = 'octicon octicon-tag';
      typeIconTooltip = 'Release';
    } else {
      typeIconClass = 'octicon octicon-question';
      typeIconTooltip = '';
    }

    return (
      <div className={`row notification ${this.getUrgency.call(this)}`}>
        <div className="col-xs-1"><span title={typeIconTooltip} className={typeIconClass} /></div>
        <div className="col-xs-10 subject" onClick={this.pressTitle.bind(this)}>
          {this.props.notification.subject.title}
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    markOnClick: state.settings.markOnClick
  };
};

export default connect(mapStateToProps, { markNotification })(SingleNotification);
