import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faPlus,
  faTimes,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { fetchLatestTotals } from '../redux/ActionCreators';


const mapStateToProps = (state) => {
  return {
    latestTotals: state.latestTotals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLatestTotals: () => { dispatch(fetchLatestTotals()); },
  };
};


const calcChangeTime = (lastChange) => {
  const smece = new Date(lastChange);
  const now = new Date();
  const lastChangeMin = Math.round((((now - smece) % 86400000) % 3600000) / 60000);
  return (lastChangeMin !== 1) ? `${lastChangeMin} minutes ago` : `${lastChangeMin} minute ago`;
};


class Main extends Component {
  componentDidMount() {
    this.props.fetchLatestTotals();
  }


  render() {
    if (this.props.latestTotals.isLoading === false) {
      return (
        <>
          <h5>World Totals</h5>
          <p style={{ fontStyle: 'italic' }}>
            Last change
            {' '}
            {calcChangeTime(this.props.latestTotals.latestTotals[0].lastChange)}
          </p>
          <div className="totalsContainer">
            <div className="totalsValue">
              <button className="btn btn-warning btn-circle btn-xl" type="button">
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <h4>Confirmed</h4>
              <h4>{this.props.latestTotals.latestTotals[0].confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</h4>
            </div>
            <div className="totalsValue">
              <button className="btn btn-success btn-circle btn-xl" type="button">
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <h4>Recovered</h4>
              <h4>{this.props.latestTotals.latestTotals[0].recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</h4>
            </div>
            <div className="totalsValue">
              <button className="btn btn-danger btn-circle btn-xl" type="button">
                <FontAwesomeIcon icon={faExclamation} />
              </button>
              <h4>Critical</h4>
              <h4>{this.props.latestTotals.latestTotals[0].critical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</h4>
            </div>
            <div className="totalsValue">
              <button type="button" className="btn btn-secondary btn-circle btn-xl">
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <h4>Deaths</h4>
              <h4>{this.props.latestTotals.latestTotals[0].deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</h4>
            </div>
          </div>
        </>
      );
    }
    return (
      <div><p>Loading data...</p></div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
