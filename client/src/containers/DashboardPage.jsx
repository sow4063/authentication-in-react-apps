import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: ''
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
   componentDidMount() {
     const xhr = new XMLHttpRequest();
     xhr.open('get', '/api/dashboard');
     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     xhr.reponseType = 'json';
     xhr.addEventListener('load', () => {
       console.log('xhr response: ', xhr.response);
       if (xhr.status === 200) {
         this.setState({
           secretData: xhr.response.message
         });
       }
     });
     xhr.send();
   }

    /**
    * Render the component
    */
    render() {
      return (<Dashboard secretData={this.state.secretData} />);
    }

}

export default DashboardPage;
