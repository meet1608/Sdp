import React, { useState,useEffect } from 'react';
import { Col, Row, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { addCar } from '../redux/actions/carsActions';

function AddCar() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [objectUrl, setObjectUrl] = useState('');
  const [singleObjectUrl, setSingleObjectUrl] = useState('');
  const [multipleObjectUrls, setMultipleObjectUrls] = useState([]);
  const [file, setFile] = useState(null); // Initialize with null
  const [files, setFiles] = useState([]); // Initialize with empty array

  useEffect(() => {
    console.log(files);
  }, [files]);

  // useEffect(() => {
  //   // Assuming you have fetched renter emails from the server
  //   const renterEmails = ["renter1@example.com", "renter2@example.com"];

  //   // Send a POST request to your server to store renter emails in MongoDB
  //   fetch('/storeRenterEmails', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ renterEmails }),
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error(error));
  // }, []);

  const handleSingleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  
  const handleMultipleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const onFinish = async (values) => {
    if (!file) {
      alert('Please select an image file.');
      return;
    }
  
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });
  
      const responseData = await response.json();
      console.log('Server Response:', responseData);
  
      const uploadResponse = await fetch(responseData.url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });
  
      console.log('Image uploaded successfully:', uploadResponse);
  
      // Update objectUrl after successful image upload
      setObjectUrl(responseData.objectUrl);
  
      // Assign the correct value to values.image
      values.image = responseData.objectUrl;
  
    console.log("Before dispatching addCar:", values);
  if(files.length<4){
    alert('you selected less images then 4 image file,please select exact 4 images');
      return;
  }

  if(files.length>4){
    alert('you selected more than 4 image file,please select exact 4 images and first 4 will be consider.');
      return;
  }

      if (files.length > 0) {
        console.log("Files are present. Uploading multiple images...");
  
        // Multiple image upload
        const filesArray = files.map(file => ({
          filename: file.name,
          contentType: file.type
        }));
        console.log(filesArray);
  
        const responseMultiple = await fetch('/api/uploadMultiple', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ files: filesArray }),
        });
  
        const responseDataMultiple = await responseMultiple.json();
        console.log('Server Response for multiple images:', responseDataMultiple);

        const urls = responseDataMultiple.urls;
// Assuming responseDataMultiple.urls and files have the same length
for (let i = 0; i < urls.length; i++) {
    const { url } = urls[i];
    const file = files[i];

    // Perform a PUT request for each URL and file
    const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type,
        },
    });
    // Handle response as needed
}

          //console.log("444444444",file,files);
  
        // Update objectUrls after successful image uploads
        setMultipleObjectUrls(responseDataMultiple.urls.map(url => url.objectUrl));
  
        // Assign the correct value to values.images
        values.images = responseDataMultiple.urls.map(url => url.objectUrl);
      }
      console.log("444444444",file,files);
      const email = localStorage.getItem("email");
      // Dispatch addCar action once after uploading images
      dispatch(addCar({...values,email}));
      console.log("After dispatching addCar:", values);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  const check = (values) => {
    if (localStorage.getItem("email") === values.email) {
      return true;
    } else {
      window.location = "/addcar";
      return false; // Add this line to make sure the function returns a value
    }
  };
  
  
  const formRef = React.createRef();
  const handleLogout = () => {
		window.location ="/Main";
	  };
	  
	  const onclick = () => {
		window.location ="/";
	  };
	  
	  const onclick1 = () => {
		window.location ="/userbookings";
	  };

    const onclick2 = () => {
      window.location ="/BookingCar";
      };

	  
	  
	  const handleLogout1 = () => {
		if (localStorage.getItem('email')) {
      localStorage.removeItem('admin');
      localStorage.removeItem('id');

		  localStorage.removeItem('email');
		  localStorage.removeItem('token');
		  localStorage.removeItem('seller');
		  localStorage.removeItem('customer');
      localStorage.removeItem('employee');


		  window.location = "/";
		}
		else{
		  window.location = "/afterHome";
		}
		};

  return (
    <><header className="header" data-header>
    <div className="container">
      <div className="overlay" data-overlay />
      <h1 className="h2" style={{fontSize:"35px",marginTop:"10px",color:"#1A9DF4",fontWeight:"bold"}}>RentalRevolve</h1>

      {/* <h1>RentalRevolve</h1> */}

      <a href="#" className="logo">
      </a>
      <nav className="navbar" data-navbar>
        <ul className="navbar-list">
        </ul>
      </nav>
      <div className="header-actions">
        
      {/* <button className="btn" aria-labelledby="aria-label-txt" onClick={onclick}>
          <span id="aria-label-txt">Home</span>
        </button> */}

        <button className="btn" aria-labelledby="aria-label-txt" onClick={handleLogout1}>
          <span id="aria-label-txt">			{localStorage.getItem('email') ? 'Logout' : 'Login'}
</span>
        </button>


   

      

        <button className="btn" aria-labelledby="aria-label-txt" href="/BookingCar" onClick={handleLogout}>
          <span id="aria-label-txt">Home</span>
        </button>
        <button className="btn user-btn" aria-label="Profile">
        <ion-icon name="person-outline" />
        </button>

        <button className="nav-toggle-btn" data-nav-toggle-btn aria-label="Toggle Menu">
          <span className="one" />
          <span className="two" />
          <span className="three" />
        </button>
      </div>
    </div>
  </header>
      {/* {loading && <Spinner />} */}
      <br />
      <br />
      <br />
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form className="bs1 p-2" layout="vertical" onFinish={onFinish} ref={formRef}>
            <center><h2>Add New Car</h2></center>
            <hr />
            <Form.Item name="name" label="Car name" rules={[{ required: true }]} >
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true }]} >
  <Input  />
</Form.Item>



            <Form.Item label="Upload single image" rules={[{ required: true }]}>
              <input type="file" onChange={handleSingleFileChange} accept="image/*" />
              {singleObjectUrl && <p>Uploaded: {singleObjectUrl}</p>}
            </Form.Item>
            <Form.Item label="Upload four images" rules={[{ required: true }]}>
              <input type="file" onChange={handleMultipleFileChange} accept="image/*" multiple />
              {multipleObjectUrls.length > 0 && (
                <ul>
                  {multipleObjectUrls.map((url, index) => (
                    <li key={index}>Uploaded: {url}</li>
                  ))}
                </ul>
              )}
            </Form.Item>
            <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="fuelType" label="Fuel Type" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="year" label="Year" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="mileage" label="Mileage" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="carType" label="Car Type" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="rentPerHour" label="Rent Per Hour" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <div className="text-right">
              <center>
              <button
  className="btn1"
  type="submit"
  onClick={() => {
    const formValues = formRef.current.getFieldsValue(); // Assuming you have a form reference named formRef
    check(formValues);
  }}
>
  ADD CAR
</button>

              </center>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default AddCar;