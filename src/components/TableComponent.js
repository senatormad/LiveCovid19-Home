import React, { Component, forwardRef } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Clear from '@material-ui/icons/Clear';
import Search from '@material-ui/icons/Search';
import infoCircle from '../../public/assets/img/info.svg';
import { fetchAllCountries } from '../redux/ActionCreators';
import {
  headerStyle, rowStyle, searchFieldStyle, cellStyleCust, cellStyleCustChanged, cellStyleCustRight, headerStyleCust,
} from './TableComponentStyle';

const tableIcons = {
  ResetSearch: forwardRef((props, ref) => { return <Clear {...props} ref={ref} style={{ color: '#a3a4a8' }} />; }),
  Search: forwardRef((props, ref) => { return <Search {...props} ref={ref} style={{ color: '#fefefe' }} />; }),
  SortArrow: forwardRef((props, ref) => { return <ArrowDownward {...props} ref={ref} style={{ color: '#fefefe' }} />; }),
};

const mapStateToProps = (state) => {
  return {
    allCountries: state.allCountries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCountries: () => { dispatch(fetchAllCountries()); },
  };
};

const calcChangeTime = (lastChange) => {
  if (lastChange === null) { return <span />; }
  const lasdtChangeTime = new Date(lastChange);
  return (
    <span>
      {lasdtChangeTime.toLocaleString('default', { timeStyle: 'short', dateStyle: 'short' })}
    </span>
  );
};

class TableComponent extends Component {
  componentDidMount() {
    this.props.fetchAllCountries();
  }

  returnTimeZone() {
    const date = new Date(this.props.allCountries.allCountries[0].lastChange);
    const zone = (date.getTimezoneOffset() / (-60)).toString();
    let time = 0;
    if (zone >= 0) { time = `+${zone.toString()}`; } else time = `${zone.toString()}`;
    return (
      <span className="colHeader">
        Changed
        <img className="spanToolTip" title={`Time Zone: GMT${time}`} data-toggle="tooltip" data-placement="top" src={infoCircle} alt="more info" />
      </span>
    );
  }

  render() {
    if (this.props.allCountries.isLoading === false) {
      $(() => {
        $('.spanToolTip').tooltip({ boundary: 'window' });
      });
      return (
        <MaterialTable
          title="All Countries Data"
          columns={[
            {
              title: <span className="colHeader">Country</span>, field: 'country', cellStyle: cellStyleCust, headerStyle: headerStyleCust,
            },
            {
              title: <span className="colHeader">Confirmed</span>, field: 'confirmed', defaultSort: 'desc', cellStyle: cellStyleCustRight, headerStyle: headerStyleCust,
            },
            {
              title: <span className="colHeader">Recovered</span>, field: 'recovered', cellStyle: cellStyleCustRight, headerStyle: headerStyleCust,
            },
            {
              title: <span className="colHeader">Critical</span>, field: 'critical', cellStyle: cellStyleCustRight, headerStyle: headerStyleCust,
            },
            {
              title: <span className="colHeader">Deaths</span>, field: 'deaths', cellStyle: cellStyleCustRight, headerStyle: headerStyleCust,
            },
            {
              title: this.returnTimeZone(),
              field: 'lastChange',
              cellStyle: cellStyleCustChanged,
              headerStyle: headerStyleCust,
              sorting: false,
              render: (rowData) => {
                return (
                  <span style={{ fontStyle: 'italic', fontSize: '.8em' }}>
                    {calcChangeTime(rowData.lastChange)}
                  </span>
                );
              },
            },
          ]}
          data={this.props.allCountries.allCountries}
          options={{
            sorting: true,
            paging: false,
            draggable: false,
            searchFieldStyle,
            headerStyle,
            rowStyle,
          }}
          icons={tableIcons}
        />
      );
    } return (
      <div><p style={{ color: '#FFF' }}>Loading data...</p></div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
