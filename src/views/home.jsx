import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchIcon from '@material-ui/icons/Search';
import { ApiUrl } from '../services/apirest';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {

  state={
    books:[],
    booksFilter:[],
    typeFilter: 0,
    search: "",
    redirect : false
  }

  constructor(props){
    super(props);
  }


  componentDidMount(){

    let url = `${ApiUrl}/contacto@tuten.cl/bookings?current=true`;
    axios({method:'GET',params:null,url,data:null,headers:{ 'Content-Type': 'application/json', Accept: 'application/json', 'app':'APP_BCK', 'token': sessionStorage.token, 'adminemail': 'testapis@tuten.cl' }})
    .then( response => {

      response.data.forEach(element => {
        element.bookingCreatedTime = new Date(element.bookingCreatedTime).toLocaleString("es-VE");
      });

      this.setState({
        books : response.data,
        booksFilter : response.data,
      })
    })
    .catch(error => {
        console.log(error);
    })

  }

  filter(search,type){
    let booksFilters = [];
    if(search == ""){
      this.setState({
        booksFilter : this.state.books,
        search: search
      })
    }else{
      if(type == 0){
        this.state.books.forEach(element => {
          if(element.bookingId.toString().includes(search.toString()) || 
          element.bookingPrice.toString().includes(search.toString()) ){
            booksFilters.push(element);
          }
        });
      }else if(type == 1){
        this.state.books.forEach(element => {
          if(element.bookingId <= search || 
          element.bookingPrice <= search ){
            booksFilters.push(element);
          }
        });
      }else{
        this.state.books.forEach(element => {
          if(element.bookingId >= search || 
          element.bookingPrice >= search ){
            booksFilters.push(element);
          }
        });
      }  
      this.setState({
        booksFilter : booksFilters,
        search: search
      })
      console.log(this.state)
    }

  }

  changefilter = async (value) => {
    console.log(value)
    this.filter(value,this.state.typeFilter);
  }

  changeTypeFilter = async (value) => {
    this.setState({
      typeFilter: Number(value)
    })
    this.filter(this.state.search,value);
  }

  logOut() {
    sessionStorage.clear();
    window.location.href = '';
    
  }



  render(){


    if (!sessionStorage.token) {
      console.log(sessionStorage)
      return (<Redirect to="/" />    )  
    }
    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />

        <div className="container h-100">
          <div className="d-flex justify-content-center h-100">
            <div className="searchbar">
              <input className="search_input" type="text" name="" placeholder="Search..." onChange={(e) => this.changefilter(e.target.value)} />
              <a href="#" className="search_icon"><SearchIcon /></a>
            </div>
          </div>
        </div>

        <div className="container h-100">
          <div className="d-flex justify-content-center h-100">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="0" onChange={(e) => this.changeTypeFilter(e.target.value)} defaultChecked/>
              <label className="form-check-label" for="inlineRadio1">Like</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="1" onChange={(e) => this.changeTypeFilter(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio2">&le;</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="2" onChange={(e) => this.changeTypeFilter(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio3">&ge;</label>
            </div>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">BookingId</th>
              <th scope="col">Cliente</th>
              <th scope="col">Fecha de creación</th>
              <th scope="col">Dirección</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.booksFilter.map((value,index) => {
                return(
                  <tr>
                    <td >{value.bookingId}</td>
                    <td>{value.tutenUserClient.firstName} {value.tutenUserClient.lastName}</td>
                    <td>{value.bookingCreatedTime}</td>
                    <td>{value.locationId.streetAddress}</td>
                    <td>{value.bookingPrice}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <button type="button" className="btn btn-outline-dark" 
            onClick={this.logOut}>Logout</button>
      </Container>
    );

  }

}

export default Home


