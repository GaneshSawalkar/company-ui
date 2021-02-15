import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import PropTypes from 'prop-types';
import { getEmployee, addEmployee, editEmployee, deleteEmployee } from './Redux/action';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      city: "",
      companyDesc: "",
      companyName: "",
      contactEmail: "",
      contactNumber: "",
			states : [],
			cities : [],
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0,
      searchText: "",
      countries: [],
      errors: {} ,
      logo: "",
show: false
    };    
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
		this.changeState = this.changeState.bind(this);
    this.handlePageClick = this
    .handlePageClick
    .bind(this);
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  static propTypes = {
    employees: PropTypes.array.isRequired,
    getEmployee: PropTypes.func.isRequired,
    addEmployee: PropTypes.func.isRequired,
    editEmployee: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired
  };
handleChange = (e) => {
  let value = Array.from(e.target.selectedOptions, option => option.value);
  this.setState({values: value});
}
  componentDidMount() {
    this.props.getEmployee(this.state);
    this.setState({	
    countries : [
  { name: 'Maharashtra', states: [ {name: 'Mumbai'} , {name: 'Pune'}] },
  { name: 'Gujrat', states: [ {name: 'Vadodara'} , {name: 'Surat' }] },
  { name: 'Kerala', states: [ {name: 'Kochi'} , {name: 'Kozhikode' } ] },
  { name: 'UP', states: [ {name: 'Agra'},  {name: 'Kanpur'} ] },
  { name: 'Goa', states: [ {name: 'Old-Goa'}, {name: 'NewGoa'} ] },
]
		});
  }

  submitData = (e) => {
    e.preventDefault();

    if(this.handleValidation()){
       alert("Form submitted");
    }else{
this.state.errors.globalErr = "Please Fill All Data"
    }

    console.log("sssssssssssss0.this.state", this.state)
    if (this.state.companyName && this.state.companyDesc && this.state.contactEmail && this.state.contactNumber&& this.state.state && !this.state.id) {
      this.props.addEmployee(this.state);
      this.refreshPage();

    } else if (this.state.companyName && this.state.companyDesc && this.state.contactEmail && this.state.contactNumber&& this.state.state && this.state.id) {
      this.props.editEmployee(this.state);
      this.refreshPage();
    } else {
      // alert('Please Enter Employee Details.');
      this.state.errors.globalErr = "Please Fill Data"
    }

    this.clearData();
  }

  editDetails = (data) => {
    console.log("sssss", data)
    this.setState({
      id: data._id,
      companyName: data.companyName,
      companyDesc: data.companyDesc,
      contactNumber: data.contactNumber,
      contactEmail: data.contactEmail,
      state: data.state,
      city: data.city
    })
  }

  deleteEmployee = (id) => {
    this.clearData();
    if (window.confirm("Are you sure?")) {
      this.props.deleteEmployee(id);
    }
    this.refreshPage();

  }

  handlePageClick = (e) => {
    console.log("ssssssssssssssssss", e)
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
      this.props.getEmployee(this.state);
    });

}
handleChange = (e) => {
  let value = Array.from(e.target.selectedOptions, option => option.value);
  this.setState({values: value});
}

  handleNameChange = (e) => {
    this.setState({
      companyName: e.target.value
    });
  }
  handleEmailChange = (e) => {
    this.setState({
      contactEmail: e.target.value
    });
  }
  handleContactChange = (e) => {
    this.setState({
      contactNumber: e.target.value
    });
  }
  handleStateChange = (e) => {
    this.setState({
      state: e.target.value
    });
  }
  handleCityChange = (e) => {
    this.setState({
      city: e.target.value
    });
  } 
  handleDepartmentChange = (e) => {
    this.setState({
      companyDesc: e.target.value
    });
  }
  refreshPage() {
    window.location.reload(false);
  }
  search = (e) => {
    console.log("sdddddddddddddd", e)
    this.setState({
      searchText: e.target.value
    });
    this.props.getEmployee(this.state);
  }

searchData = () => {
  console.log("sdddddddddddddd", this.state)
  this.props.getEmployee(this.state);
  }

  changeCountry(event) {
    console.log(";;;;;;;;;;;", event)
		this.setState({state: event.target.value});
		this.setState({states : this.state.countries.find(cntry => cntry.name === event.target.value).states});
	}

	changeState(event) {
		this.setState({city: event.target.value});
		const stats = this.state.countries.find(cntry => cntry.name === this.state.state).states;
		this.setState({cities : stats.find(stat => stat.name === event.target.value).cities});
	}

  handleValidation(){
    let fields = this.state.companyName;
    let fields1 = this.state.companyDesc;
    let fields2 = this.state.contactNumber;
    let email = this.state.contactEmail;
    
    let formIsValid = true;
console.log("dddddddddddddd", fields)
    if(!fields){
       formIsValid = false;
       console.log("dddddddddddddd", formIsValid, this.state.errors )
       this.state.errors.companyName = "Cannot be empty";
    }
    if(!fields1){
      formIsValid = false;
      console.log("dddddddddddddd", formIsValid, this.state.errors )
      this.state.errors.companyName = "Cannot be empty";
   } 
   if(!fields2){
    formIsValid = false;
    console.log("dddddddddddddd", formIsValid, this.state.errors )
    this.state.errors.companyName = "Cannot be empty";
 }  

    if(typeof email !== "undefined"){
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');
    
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
         formIsValid = false;
         this.state.errors.contactEmail  = "Email is not valid";
       }
    }
  
  }

  clearData = () => {
    this.setState({
      id: 0,
      city: "",
      companyDesc: "",
      companyName: "",
      contactEmail: "",
      contactNumber: "",
      state: ""
    });
  }
  onFileChange = event => {
    
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  
  };
  onFileUpload = () => {
    
    // Create an object of formData
    const formData = new FormData();
  
    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
  
    // Details of the uploaded file
    console.log(this.state.selectedFile);
  this.state.logo = this.state.selectedFile
    // Request made to the backend api
    // Send formData object
    // axios.post("api/uploadfile", formData);
  };
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">CRUD opeartions for Company Module</h1>
        </header>
        <h1>React Modal</h1>
        <button type="button" onClick={this.showModal}>
          Add new Contact
        </button>
        <p className="App-intro">
          <div className="leftsection">
            
            Company Name<span style={{color: "red"}}>*</span> : <input onChange={this.handleNameChange} value={this.state.companyName} type="text" placeholder="Company Name" required /><span style={{color: "red"}}>{this.state.errors.companyName}</span>
<br />
           Company Description<span style={{color: "red"}}>*</span> :  <input onChange={this.handleDepartmentChange} value={this.state.companyDesc} type="text" placeholder="Company Department" required /><span style={{color: "red"}}>{this.state.errors.companyName}</span><br />
            
            Email<span style={{color: "red"}}>*</span> : <input onChange={this.handleEmailChange} value={this.state.contactEmail} type="email" placeholder="Email" required/><span style={{color: "red"}}>{this.state.errors.contactEmail}</span>
<br />
            Contact<span style={{color: "red"}}>*</span> :  <input onChange={this.handleContactChange} value={this.state.contactNumber} type="number" placeholder="Mobie No" required/><span style={{color: "red"}}>{this.state.errors.companyName}</span><br />
            {/* Employee State : <input onChange={this.handleStateChange} value={this.state.state} type="text" placeholder="Employee Name" /> <br />
            Employee City :  <input onChange={this.handleCityChange} value={this.state.city} type="text" placeholder="Employee Department" /><br /> */}
            <div>
					<label>State</label>
					<select placeholder="State" value={this.state.state} onChange={this.changeCountry}>
						<option>--Choose State--</option>
						{this.state.countries.map((e, key) => {
							return <option key={key}>{e.name}</option>;
						})}
					</select>
				</div>
        <div>
					<label>City</label>
					<select placeholder="City" value={this.state.city} onChange={this.changeState}>
						<option>--Choose City--</option>
						{this.state.states.map((e, key) => {
							return <option key={key}>{e.name}</option>;
						})}
					</select>
				</div>
        <div>
        <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>
        </div>
        {/* <div>
					<label>City</label>
					<select placeholder="City">
						<option>--Choose City--</option>
						{this.state.cities.map((e, key) => {
							return <option key={key}>{e}</option>;
						})}
					</select>
				</div> */}
<div><span style={{color: "red"}}>{this.state.errors.globalErr}</span>
</div>

            {this.state.id ? <button onChange={this.handleDepartmentChange} onClick={this.submitData}>UPDATE</button> : <button onClick={this.submitData}>ADD</button>} &nbsp;&nbsp;<button onClick={this.clearData}>CLEAR</button>
          </div>
          
          <input
          className="form-control"
          placeholder = "Search Here..."
          onChange={this.search} 
          value={this.state.searchText} />
          <div className="rightsection">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Email</th>                 
                  <th>Contact</th>
                  <th>Actions</th> 
                </tr>
              </thead>
              <tbody>
                {this.props.employees && this.props.employees.map((data, index) => {
                  return <tr key={(index + 1)}>
                    <td>{(index + 1)}</td>
                    <td>{data.companyName}</td>
                    <td>{data.companyDesc}</td><td>{data.contactEmail}</td><td>{data.contactNumber}</td>
                    <td><button onClick={() => this.editDetails(data)}>EDIT</button> <button onClick={() => this.deleteEmployee(data._id)}>DELETE</button> </td>
                  </tr>
                })}
 <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>           
                       </tbody>
            </table>
          </div>
        </p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  employees: state.employees
});

export default connect(mapStateToProps, { getEmployee, addEmployee, editEmployee, deleteEmployee })(App);