import "./App.css";
import React from "react";
import $ from "jquery";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastPeriod: "",
      forecastDesc: "",
      updateTime: "",
    };
    this.GetData = this.GetData.bind(this);
  }

  GetData() {
    $.ajax({
      type: "GET",
      url: "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=en",
      dataType: "json",
      success: function (data) {
        this.setState({
          forecastPeriod: data.forecastPeriod,
          forecastDesc: data.forecastDesc,
          updateTime: data.updateTime,
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      },
    });
  }

  componentDidMount() {
    this.GetData();
  }

  render() {
    let time = this.state.updateTime;
    return (
      <div
        style={{
          backgroundImage: `url("https://wallpaperaccess.com/full/51435.jpg")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            className="card max-w-2xl bg-base-100 shadow-xl "
            style={{ backgroundColor: "lightblue" }}
          >
            <div className="card-body items-center text-center">
              <h1 className="card-title">{this.state.forecastPeriod}</h1>
              <p>{this.state.forecastDesc}</p>
              <div
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "20px",
                }}
              >
                Updated at: {time}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
