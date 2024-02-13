import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import axios from "axios";

export default function Register() {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedTypeRole, setSelectedTypeRole] = useState("")
  const [reportto, setreportto] = useState("");
  // let roles = [
  //   { name: 'CEO', code: 'CEO', report: 'NULL' },
  //   { name: 'CPO', code: 'CPO', report: 'CEO' },
  //   { name: 'CTO', code: 'CTO', report: 'CEO' },
  //   { name: 'BUSSINESS MANAGER', code: 'BN', report: 'CPO' },
  //   { name: 'HR', code: 'HR', report: 'BUSINESS MANAGER' },
  //   { name: 'DELIVERY HEAD', code: 'DH', report: 'CTO' },
  //   { name: 'TM-DE', code: 'TMDE', report: 'DELIVERY HEAD' },
  //   { name: 'TM-DN', code: 'TMDN', report: 'DELIVERY HEAD' },
  //   { name: 'TM-FS', code: 'TMFS', report: 'DELIVERY HEAD' },
  //   { name: 'TL-DN', code: 'TLDN', report: 'TM-DN' },
  //   { name: 'TL-DE', code: 'TLDE', report: 'TM-DE' },
  //   { name: 'TL-FS', code: 'TLFS', report: 'TM-FS' },
  //   { name: 'DEV-DE', code: 'DEVD', report: 'TL-DE' },
  //   { name: 'DEV-DN', code: 'DEVFS', report: 'TL-DN' },
  //   { name: 'DEV-FS', code: 'DEVFS', report: 'TL-FS' }
  // ];
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '', reportingto: '' });
  const [type, setType] = useState('');
  const [roleType, setroleType] = useState('');
  const [departmentType, setDepartmentType] = useState('');
  const [selectedDept, setselectedDept] = useState("");

  const [roledrop, setroleDrop] = useState([]);
  const [departmentdrop, setdepartmentDrop] = useState([]);
  const [reporttodrop, setreporttoDrop] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });

  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setSelectedRole("");
        setselectedDept("");
        setreportto("");

        const response = await axios.get(`http://localhost:4000/api/getroles?DOMAIN=${type}`);
        console.log(response.data.data);
        setroleDrop(response.data.data);
        console.log('Post request successful:', response.data);

      } catch (error) {
        console.error('Error in post request:', error);

      }
    };


    if (type.trim() !== '') {
      fetchData();
    }
  }, [type]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setselectedDept("");
        setreportto("");
        const response = await axios.get(`http://localhost:4000/api/getdept?DOMAIN=${type}`);

        console.log('response for department',response.data.data)


        setdepartmentDrop(response.data.data);
        console.log('Post request successful:', response.data.data);

      } catch (error) {
        console.error('Error in post request:', error);

      }
    };


    if (roleType.trim() !== '') {
      fetchData();
    }
  }, [roleType]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setreportto("");
        const response = await axios.get(`http://localhost:4000/api/listseniornames?ROLE=${roleType}&DEPARTMENT=${departmentType}`);
        console.log('got response of senior emails',response.data.data);
        setreporttoDrop(response.data.data);
        console.log('Post request successful:', response.data.data);

      } catch (error) {
        console.error('Error in post request:', error);

      }
    };


    if (departmentType.trim() !== '') {
      fetchData();
    }
  }, [departmentType]);

  const submit = (event) => {
    event.preventDefault();
    console.log('Submitted Data:', formData, 'OVER');
  };

  return (
    <section className="vh-100">
      <div className="mask d-flex align-items-center">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Add new user</h2>

                  <form>

                    <div className="form-outline mb-4">
                      <input type="text" name="name"
                        value={formData.name} id="form3Example1cg" className="form-control form-control-lg" onChange={handleInputChange} />
                      <label className="form-label" htmlFor="form3Example1cg">Name</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="email" name="email"
                        value={formData.email} id="form3Example3cg" className="form-control form-control-lg" onChange={handleInputChange} />
                      <label className="form-label" htmlFor="form3Example3cg">Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" name="password"
                        value={formData.password} id="form3Example4cg" className="form-control form-control-lg" onChange={handleInputChange} />
                      <label className="form-label" htmlFor="form3Example4cg">Set Password</label>
                    </div>

                    <div className="form-outline mb-4">
                      <div className="card flex justify-content-center">
                        <Dropdown
                          value={selectedTypeRole} name='role'
                          onChange={(e) => {
                            setSelectedTypeRole(e.value);
                            setType(e.value);

                          }}
                          options={["PR", "TECH"]}

                          placeholder="Select a role"
                          className="w-full md:w-14rem"
                        />
                      </div>
                      <label className="form-label" htmlFor="form3Example4cg">Select role</label>
                    </div>


                    <div className="form-outline mb-4">
                      <div className="card flex justify-content-center">
                        <Dropdown
                          value={selectedRole} name='role'
                          onChange={(e) => {
                            console.log(e.value);
                            setSelectedRole(e.value);
                            setroleType(e.value);
                          }}
                          options={roledrop}

                          placeholder="Select a role"
                          className="w-full md:w-14rem"
                        />
                      </div>
                      <label className="form-label" htmlFor="form3Example4cg">Select role</label>
                    </div>

                    <div className="form-outline mb-4">
                      <div className="card flex justify-content-center">
                        <Dropdown
                          value={selectedDept} name='role'
                          onChange={(e) => {
                            setselectedDept(e.value);
                            setDepartmentType(e.value);
                          }}
                          options={departmentdrop}

                          placeholder="Select department"
                          className="w-full md:w-14rem"
                        />
                      </div>
                      <label className="form-label" htmlFor="form3Example4cg">Select role</label>
                    </div>

                    <div className="form-outline mb-4">
                      <div className="card flex justify-content-center">
                        <Dropdown
                          value={reportto} name='reportingto'
                          onChange={(e) => {
                            setreportto(e.value);

                          }}

                          options={reporttodrop}

                          placeholder="Reporting to"
                          className="w-full md:w-14rem"
                        />
                      </div>
                      <label className="form-label" htmlFor="form3Example4cg">Reporting to</label>
                    </div>

                    {/* <div className="form-outline mb-4">
                      <input type="text" className="form-control form-control-lg" value={selectedRole.report}  onChange={(e) => {
                          }} />
                      <label className="form-label" htmlFor="form3Example3cg">Reporting to</label>
                    </div> */}


                    <div className="d-flex justify-content-center">
                      <button type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={submit}>Add user</button>
                    </div>



                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}