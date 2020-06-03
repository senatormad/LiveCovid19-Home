import React from 'react';
import { Provider } from 'react-redux';
import TableComponent from './components/TableComponent';
import { ConfigureStoreAllCountries } from './redux/configureStore';

const store = ConfigureStoreAllCountries();

function Table() {
  return (
    <Provider store={store}>
      <div>
        <TableComponent />
      </div>
    </Provider>
  );
}

export default Table;
