import React, { Component } from 'react';
import currencies  from './supported-currencies.json'
import { Line } from 'react-chartjs-2';
import './App.css';

class App extends Component {

    state={
      baseUrl: 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=',
      country: 'INR',
      graphUnit: 2,
      graphUnitOption: [1,2,3,4,5],
      labelsDate: [],
      labelsPrice: []
    }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    const {baseUrl, country} = this.state;

    fetch(baseUrl + country)
    .then(response => response.json())
    .then(
        rawData => this.setState({
            labelsDate: Object.keys(rawData.bpi),
            labelsPrice: Object.keys(rawData.bpi).map(i => rawData.bpi[i])
        }))
    .catch(e => e)
  }

  data = () => {

      const {labelsDate, labelsPrice, graphUnit, country} = this.state

      return {
          labels: labelsDate.filter((_,i) => i % graphUnit === 0),
          datasets: [
              {
                  label: `Bitcoin Price in ${country}`,
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 1.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'rgba(75,192,192,1)',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: labelsPrice.filter((_,i) => i % graphUnit === 0)
              }
          ]
      }
  };
  
  onCurrencyChange = (e) => {
    this.setState({
      country: e.target.value
    },()=>{
      this.fetchData()
    })
  }

  onGraphUnitChange = (e) => {
    this.setState({
      graphUnit: e.target.value
    },()=>{
      this.fetchData()
    })
  }

  render() {

    const { graphUnitOption, graphUnit } = this.state

    return (
      <div className="main-container">
        <div className="header-container">
          <h2>Bitcoin Price Teller</h2>
        </div>
        <div className="graph-side-container">
          <div className="graph">
            <Line
                height={250}
                data={this.data()}
            />
          </div>
          <div className="side-container">
            <div className="select-country">
              <h4 className="label">Select Country</h4>
                <select className="select-option" value={this.state.country} onChange={this.onCurrencyChange}>
                  {currencies.map((obj, index) =>
                    <option key={`${index}-${obj.country}`} value={obj.currency}> {obj.country} </option>
                  )}
                </select>
            </div>
            <div className="select-graph-unit">
              <h4 className="label">Select Day range</h4>
              <select  className="select-option"  value={graphUnit} onChange={this.onGraphUnitChange}>
                  {graphUnitOption.map((i, index) =>
                    <option key={index} value={i}> {i} </option>
                  )}
                </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
