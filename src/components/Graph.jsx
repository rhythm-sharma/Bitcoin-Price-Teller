import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

export default class Graph extends Component {

    state={
        baseUrl: 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=',
        rawData: {},
        country: 'INR',
        graphUnit: 2,
        labelsDate: [],
        labelsPrice: []
      }

    componentDidMount(){

        const {baseUrl, country} = this.state;
        
        fetch(baseUrl + country)
        .then(response => response.json())
        .then(
            rawData => this.setState({
                rawData: rawData,
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
                    borderDashOffset: 0.0,
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

    render(){
        return(
            <Line
                height={250}
                data={this.data()}
            />
        );
    }

}