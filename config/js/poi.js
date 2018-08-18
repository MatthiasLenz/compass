'use strict';
var POIS = [];

let loadPoi = fetch('./data/poi.json').then(response => {
  return response.json();
}).then(data => {
  POIS = data;
}).catch(err => {
    console.log(err);
});


class PoiRow extends React.Component {
  render() {
    const poi = this.props.poi;
		const color = poi.active ? "black" : "lightgrey"
    return (
		  <tr> 
        <td><input style={{color: color}} type="text" placeholder="Bezeichnung" value={poi.name}/></td>
        <td><input style={{color: color}} type="text" placeholder="Latitude" value={poi.lat}/></td>
        <td><input style={{color: color}} type="text" placeholder="Longitude" value={poi.lon}/></td>
				<td><button>entfernen</button></td>
      </tr>
    );
  }
}

class PoiTable extends React.Component {
	render() {
		const rows = [];
		this.props.pois.forEach((poi) => {
			rows.push(
				<PoiRow poi={poi} key={poi.name} />
			);
		});
		return (
			<table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Lat</th>
            <th>Lon</th>
          </tr>
        </thead>
        <tbody>
				  {rows}
				</tbody>
      </table>
		);
	}
}

class PoiAdder extends React.Component {
  render(){
		return (
				<table>
					<thead>
						<tr>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><input type="text" placeholder="Bezeichnung" /></td>
							<td><input type="text" placeholder="Latitude" /></td>
							<td><input type="text" placeholder="Longitude" /></td>
							<td><button>hinzufügen</button></td>
						</tr>
					</tbody>
				</table>
    );
	}
}

class EditablePoiTable extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			newPoi : {}
		}
	}
	render() {
		return (
			<div>
				<PoiTable pois={this.props.pois}/>
				<PoiAdder poi={this.state.newPoi} />
			</div>
		);
	}
}
loadPoi.then(()=>{
    ReactDOM.render(<EditablePoiTable pois={POIS}/>, document.querySelector('#poi-table'));
    fetch('./data/poi.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Fred',
        lat: 5,
        lon: 4
      })
    });
})

