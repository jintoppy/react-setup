// Framework imports
import axios from 'axios';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
// Redux
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

// Localisation
import { IntlProvider, addLocaleData } from 'react-intl';

import en from '../assets/locale/en/translation.json';
import fr from '../assets/locale/fr/translation.json';


// Utils
import * as utils from './util/language';

// Reducers
import reducers from './reducers/rootReducer';

// Routes
import routes from './routes';

// Scss
import '../scss/style.scss';

const middleWare = applyMiddleware(thunk);
const store = createStore(reducers, middleWare);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      locale: utils.getLanguage(),
      message: {},
      loadContent: false,
    };
    addLocaleData(...en, ...fr);
  }
  componentWillMount() {
    axios.get('locale/en/translation.json')
      .then((data) => {
        this.setState({
          message: data.data,
          loadContent: true,
        });
      });
  }
  render() {
    if(this.state.loadContent) {
      return(
        <Provider store={store}>
          <IntlProvider locale={this.state.locale} messages={this.state.message}>
            {routes}
          </IntlProvider>
        </Provider>
      );
    }
    return (<div className="loading">Loading</div>);
  }
}

ReactDom.render(<App />, document.getElementById('content'));
