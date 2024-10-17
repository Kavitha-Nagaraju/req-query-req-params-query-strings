import React, { useEffect, useRef, useState } from 'react'

function EmployeesForm() {
    let[data,setData] = useState([]);
    let [countries,setCountries] = useState([]);
    let [departments,setDepartments] = useState([]);
    let [genders,setGenders] = useState([]);
    let [salary,setSalary ] = useState([]);
    let [age,setAge]   = useState([]);


    let selectCountryRef = useRef();
    let selectDepartmentRef = useRef();
    let selectGenderRef = useRef();
    let selectSalaryRef = useRef();
    let selectAgeRef= useState();

    useEffect(()=>{
      getCountriesList();
      getDepartmentsList();
      getgendersList();
      getSalaryList();
      getAgeList();

    },[]);

    let getCountriesList =async()=>{
      let reqOptions={
           method:"Get",
      };
      let JSONData= await fetch("http://localhost:4567/countriesList",reqOptions);
      let  JSOData= await JSONData.json() ;
      console.log(JSOData);
      setCountries(JSOData);
     };

     let getDepartmentsList =async()=>{
      let reqOptions={
           method:"Get",
      };
      let JSONData= await fetch("http://localhost:4567/departmentsList",reqOptions);
      let  JSOData= await JSONData.json() ;
      console.log(JSOData);
      setDepartments(JSOData);
     };

     let getgendersList =async()=>{
      let reqOptions={
           method:"Get",
      };
      let JSONData= await fetch("http://localhost:4567/gendersList",reqOptions);
      let  JSOData= await JSONData.json() ;
      console.log(JSOData);
      setGenders(JSOData);
     };

     let getSalaryList =async()=>{
      let reqOptions={
           method:"Get",
      };
      let JSONData= await fetch("http://localhost:4567/salaryList",reqOptions);

      let  JSOData= await JSONData.json() ;
      console.log(JSOData);
      setSalary(JSOData);
     };

     let getAgeList =async()=>{
      let reqOptions={
           method:"Get",
      };
      let JSONData= await fetch("http://localhost:4567/ageList",reqOptions);
      let  JSOData= await JSONData.json() ;
      console.log(JSOData);
      setAge(JSOData);
     };

    let getEmployeeDataFormServer =async()=>{
     let reqOptions={
          method:"Get",
     };
      
     let url = `http://localhost:4567/employees?country=${selectCountryRef.current.value}&department=${selectDepartmentRef.current.value}&gender=${selectGenderRef.current.value}&salary=${selectSalaryRef.current.value}&age=${selectAgeRef.current.value}`;
     console.log(url);
      let url2 = `http://localhost:4567/employees/${selectCountryRef.current.value}/${selectDepartmentRef.current.value}/${selectGenderRef.current.value}/${selectSalaryRef.current.value}/${selectAgeRef.current.value}?limit=5&order=desc`;

     
     console.log(url2);
     let JSONData= await fetch(url2,reqOptions);
     let  JSOData= await JSONData.json() ;
     console.log(JSOData);
     setData(JSOData);
    };
    
  return (
    <div>
      <form>
     
        <label>Countries</label>
        <select ref={selectCountryRef}>
          {countries.map((ele,i)=>{
            return <option>{ele}</option>
          })}
        </select>

        <label>Departments</label>
        <select ref={selectDepartmentRef}>
          {departments.map((ele,i)=>{
            return <option>{ele}</option>
          })}
        </select>
       
        <label>Genders</label>
        <select ref={selectGenderRef}>
          {genders.map((ele,i)=>{
            return <option>{ele}</option>
          })}
        </select>
        
        <label>Salary</label>
        <select ref={selectSalaryRef}>
          {salary.map((ele,i)=>{
            return <option>{ele}</option>
          })}
        </select>
     
        <label>Age</label>
        <select ref={selectAgeRef}>
          {age.map((ele,i)=>{
            return <option>{ele}</option>
          })}
        </select>

    <button type="button" onClick={()=>{
      
       getEmployeeDataFormServer ();
    }}>Employees Data</button>

</form>
    <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>ID</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Department</th>
            <th>Profilepic</th>
            <th>Salary</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
    {data.map((ele,i)=>{
         return(
            <tr>
              <td>{i+1}</td>
                <td>{ele.id}</td>
                <td>{ele.firstName}</td>
                <td>{ele. lastName}</td>
                <td>{ele.email}</td>
                <td>{ele. gender}</td>
                <td>{ele.age}</td>
                <td>{ele. department}</td>
                <td><img src={ele.profilePic}></img></td>
                <td>{ele.salary}</td>
                <td>{ele.country}</td>

            </tr>
         )
    })}
    </tbody>
      </table>
    
    </div>
     
    
   
  )
}

export default EmployeesForm
