
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import mapboxgl from 'mapbox-gl';
import Map from "mapmyindia-react";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { IndexServices } from "./IndexServices";
import ReactSnackBar from "react-js-snackbar";
import TextField from '@material-ui/core/TextField';
mapboxgl.accessToken = 'pk.eyJ1IjoidmVsYXZhIiwiYSI6ImNraTBmeGtreTAxZTcydGtiaHEwMG5pZXUifQ.UDX8NNZQYfVHgLgYy2jY6g';


export default class Index extends React.Component {
  classes = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    }),
  );
  state = { Show: false, Showing: false };
  show = () => {
    if (this.state.Showing) return;

    this.setState({ Show: true, Showing: true });
    setTimeout(() => {
      this.setState({ Show: false, Showing: false });
    }, 3000);
  };

  constructor(props) {
    super(props);
    this.state = {
      lng: 13.058542950493207,
      lat: 80.29603386239616,
      zoom: 15,
      sitename: 'Not Listed',
      showPopup: false,
      shows: false,
      ProjectName_e: '',
      getProject: [],
      viewport: {
        width: "100vw",
        height: "100vh",
        zoom: 16
      },
      userLocation: {}
    };


  }
  componentDidMount() {
    this.details = ({});
    let initialPlanets2 = [];
    IndexServices.ProjectGet(this.details)
      .then(response => {
        return response;
      }).then(data => {
        initialPlanets2 = data.data.map((planet) => {
          return planet;
        });
        const usersOnline = initialPlanets2.filter(user => user.id);
        this.setState({
          getProject: usersOnline,
        });
      });


  }
  showit = ev => {
    ev.preventDefault();
    console.log('j-');
    this.setState({
      shows: !this.state.shows
    });
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  submitCreate = ev => {
    ev.preventDefault();
    var db = {
      description: this.state.description,
      ProjectName: this.state.ProjectName,
    }
    if (!this.state.description) {

      this.setState({ pop: "Please Enter Description" });
      this.show();
    }
    if (!this.state.ProjectName) {
      this.setState({ pop: "Please Enter Project Name" });
      this.show();
    } else {
      IndexServices.ProjectCreate(db)
        .then(
          user => {
            if (user.error === "false") {
              this.setState({ pop: user.message });
              this.show();
              this.setState({ pop: user.message });
              this.props.history.push({
                pathname: `/agent/PayState`,
                search: '?query=abc',
                state: { pop: user.message }
              });
            } else if (user.error === "true") {
              this.setState({ pop: user.message });
              this.show();
              this.props.history.push(`/agent/StateAdd`);
            }

          },
          error => this.setState({ error, loading: false })
        );
    }

  }



  submitProject = ev => {
    ev.preventDefault();
    var db = {
      lat: this.state.lat,
      lng: this.state.lng,
      sitename: this.state.title,
      selectProject: this.state.selectProject,
    }

    IndexServices.ProjectSite(db)
      .then(
        user => {
          if (user.error === "false") {
            this.setState({ pop: user.message });
            this.show();
            this.setState({ pop: user.message });
            this.props.history.push({
              pathname: `/agent/PayState`,
              search: '?query=abc',
              state: { pop: user.message }
            });
          } else if (user.error === "true") {
            this.setState({ pop: user.message });
            this.show();
            this.props.history.push(`/agent/StateAdd`);
          }

        },
        error => this.setState({ error, loading: false })
      );


  }

  getusage(event) {
    this.state.selectProject = event.target.value;
    IndexServices.getfilter(this.state.selectProject)
      .then(
        data => {
          if (data.error === "false") {
            console.log(data.data, 'Data');
            if (data.data) {
              this.setState({ usersDB: data.data })
              this.setState({ id: data.data.id ? data.data.id : '' })
              if (data.data.lat) {
                delete this.state.lat;
                this.state.lat = data.data.lat;
              } else { this.setState({ lat: 80.29603386239616 }); }
              if (data.data.lng) {
                delete this.state.lng;
                this.state.lng = data.data.lng;
              } else { this.setState({ lng: 13.058542950493207 }) }
              this.setState({ project: data.data.project ? data.data.project : '' })
              this.setState({ sitename: data.data.sitename ? data.data.sitename : 'Not List' })
              this.setState({ title: data.data.sitename ? data.data.sitename : 'Not List' })
            }
          } else if (data.error === "true") {
            this.props.history.push(`/agent/DigitalCertificateAdd`);
          }
        },
        error => this.setState({ error, loading: false })
      );

  }



  render() {
    return (
      <>

        <div style={{ "padding": "20px" }}>
          <ReactSnackBar Icon={<span ><i className="flaticon2-notification"></i></span>} Show={this.state.Show}>
            {this.state.pop}
          </ReactSnackBar>
          <div className='app'>



            <div class="right">
              <IconButton style={{ "margin-top": "27px", "padding": "0px", color: "#ff6b00" }} variant="outlined" color="primary" onClick={this.togglePopup.bind(this)} >
                <Icon color="primary" style={{ fontSize: 35, color: "#ff6b00" }}>add_circle</Icon>
              </IconButton>
            &nbsp;
            <FormControl >
                <InputLabel htmlFor="age-native-simple">Select Project</InputLabel>
                <Select
                  native
                  style={{ "width": "200px", "padding-top": "11px" }}
                  value={this.state.selectProject}
                  name="selectProject"
                  onChange={e => {
                    this.setState({ selectProject: e.target.value })
                    this.getusage(e)
                  }}

                >
                  <option aria-label="None"  ></option>
                  {this.state.getProject.map((team) => <option key={team.id} value={team.id}>{team.project}</option>)}
                </Select>

              </FormControl>


            </div>

            {this.state.showPopup ?
              <div className='popup'>
                <div className='popup_inner'>

                  <IconButton variant="outlined" color="primary" onClick={this.togglePopup.bind(this)} >
                    <CloseIcon color="primary" style={{ fontSize: 20 }} />
                  </IconButton>
                  <center>  <h3> <b> Create New Project</b></h3></center>
                  <div class=" ">
                    <Input
                      placeholder="Project Name"
                      style={{ margin: 10, width: 250 }}
                      label="Project Name"
                      inputProps={{ 'aria-label': 'description' }}
                      onChange={e => {
                        this.setState({ ProjectName: e.target.value })
                        if (e.target.value.length < 1) {
                          this.setState({
                            ProjectName_e: ' Please Enter  Project Name   ',
                            ProjectName_c: 'red'
                          });
                        } else {
                          this.setState({
                            ProjectName_e: '',
                            ProjectName_c: 'green'
                          });
                        }
                      }}
                      onBlur={e => {
                        if (e.target.value.length < 1) {
                          this.setState({
                            ProjectName_e: ' Please Enter  Project Name  ',
                            ProjectName_c: 'red'
                          });
                        }
                      }}
                    />
                    <b><font color='red'>{this.state.ProjectName_e}</font></b>

                    <Input
                      placeholder="Description"
                      style={{ margin: 10, width: 250 }}
                      label="Project Name"
                      inputProps={{ 'aria-label': 'description' }}

                      onChange={e => {
                        this.setState({ description: e.target.value })
                        if (e.target.value.length < 1) {
                          this.setState({
                            description_e: ' Please Enter  Description  ',
                            description_c: 'red'
                          });
                        } else {
                          this.setState({
                            description_e: '',
                            description_c: 'green'
                          });
                        }
                      }}
                      onBlur={e => {
                        if (e.target.value.length < 1) {
                          this.setState({
                            description_e: ' Please Enter Description  ',
                            description_c: 'red'
                          });
                        }
                      }}
                    />
                    <b><font color='red'>{this.state.description_e}</font></b>

                  </div>
                  <div>

                    <Button
                      variant="contained"
                      style={{ "margin-left": "32%", "margin-top": "23px" }}
                      color="primary"
                      disabled={this.state.description_c !== 'green' || this.state.ProjectName_c !== 'green'}
                      onClick={this.submitCreate}
                    >
                      Submit
                 </Button>
                  </div>
                </div>
              </div>
              : null
            }
          </div>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Map
            center={[this.state.lng, this.state.lat]}
            zoom={this.state.zoom}
            markers={[
              {
                zoomControl: true,
                position: [this.state.lng + 0 / 10000, this.state.lat + 0 / 10000],
                draggable: true,
                hybrid: true,
                title: `<h1>${this.state.project ? this.state.project : "Not List"}</h1> <br><b>Lat</b> : ${this.state.lat} <br> <b>lng</b>:${this.state.lng} <br>${this.state.sitename ? `<b>sitename</b>:${this.state.sitename}` : ''}   
               
                `,

                onDragend: e => {
                  this.lng = e.target._latlng.lng;
                  this.lat = e.target._latlng.lat;
                  this.setState({ lat: this.lng });
                  this.setState({ lng: this.lat });
                }
              }
            ]}
          />
          <br></br>
          {this.state.id &&
            <>
              <div className={this.classes.root}>
                <br></br>
                <center> <h1> Add New Site </h1> </center>
                <Grid container spacing={3}>

                  <Grid item xs={3}></Grid>

                  <Grid item xs={3}>

                    <FormControl >
                      <InputLabel htmlFor="age-native-simple">Select Project</InputLabel>
                      <Select
                        native
                        style={{ "width": "300px", "padding-top": "11px" }}
                        value={this.state.selectProject}
                        onChange={e => {
                          this.setState({ selectProject: e.target.value })
                        }}
                        onChange={this.handleChange}
                      >
                        <option aria-label="None"  ></option>
                        {this.state.getProject.map((team) => <option key={team.id} value={team.id}>{team.project}</option>)}
                      </Select>
                    </FormControl>

                    <TextField
                      id="standard-basic"
                      label="Latitude"
                      style={{ "width": "300px", "padding-top": "11px" }}
                      value={this.state.lat}
                      onChange={e => {
                        this.setState({ lat: e.target.value })
                        if (e.target.value.length < 2) {
                          this.setState({
                            lat_e: ' Lat Minimum 2 Characters ',
                            lat_c: 'red'
                          });
                        } else {
                          this.setState({
                            lat_e: '',
                            lat_c: 'green'
                          });
                        }
                      }}
                      onBlur={e => {
                        if (e.target.value.length < 2) {
                          this.setState({
                            lat_e: ' Please Enter Lat ',
                            lat_c: 'red'
                          });
                        }
                      }}
                    />
                    {this.state.lngs}
                  </Grid>
                  <Grid item xs={3}>


                    <TextField
                      id="standard-basic"
                      label="Enter Site Name"
                      style={{ "width": "300px", "padding-top": "11px" }}
                      value={this.state.title == "Not List" ? "" : this.state.title}
                      onChange={e => {
                        this.setState({ title: e.target.value })
                        if (e.target.value.length < 2) {
                          this.setState({
                            title_e: ' Lat Minimum 2 Characters ',
                            title_c: 'red'
                          });
                        } else {
                          this.setState({
                            title_e: '',
                            title_c: 'green'
                          });
                        }
                      }}
                      onBlur={e => {
                        if (e.target.value.length < 2) {
                          this.setState({
                            title_e: ' Please Enter Site Name ',
                            title_c: 'red'
                          });
                        }
                      }}
                    />

                    <TextField
                      id="standard-basic"
                      label="Longitude"
                      style={{ "width": "300px", "padding-top": "11px" }}
                      value={this.state.lng}
                      onChange={e => {
                        this.setState({ lng: e.target.value })
                        if (e.target.value.length < 2) {
                          this.setState({
                            lng_e: ' Lng Minimum 2 Characters ',
                            lng_c: 'red'
                          });
                        } else {
                          this.setState({
                            lng_e: '',
                            lng_c: 'green'
                          });
                        }
                      }}
                      onBlur={e => {
                        if (e.target.value.length < 2) {
                          this.setState({
                            lng_e: ' Please Enter Lat ',
                            lng_c: 'red'
                          });
                        }
                      }}
                    />
                    {this.state.lats}

                  </Grid>

                  <Grid item xs={3}></Grid>

                </Grid>
                <center>

                  {this.state.title == "Not List" &&
                    <Button
                      variant="contained"
                      style={{ "margin-top": "23px" }}
                      color="primary"
                      disabled={this.state.title_c !== 'green'}
                      onClick={this.submitProject}
                    >
                      Submit
                 </Button>
                  }
                  {this.state.title != "Not List" &&
                    <Button
                      variant="contained"
                      style={{ "margin-top": "23px" }}
                      color="primary"

                      onClick={this.submitProject}
                    >
                      Update
               </Button>

                  }
                </center>

              </div>



            </>
          }
        </div>

      </>
    )
  }
}
