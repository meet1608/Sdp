import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCar, getAllCars } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";

function EditCar() {
  const { carid } = useParams();
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const car = cars.find((o) => o._id === carid);

  const [totalCars, setTotalCars] = useState([]);
  const [objectUrl, setObjectUrl] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setTotalCars(cars);
    }
  }, [cars, dispatch]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFinish = async (values) => {
    if (!car) {
      console.error('Car not found');
      return;
    }

    values._id = car._id;

    if (!file) {
      // If no new file is selected, use the existing image URL
      values.image = car.image;
    } else {
      // If a new file is selected, upload it and get a new object URL
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

        await fetch(responseData.url, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });

        values.image = responseData.objectUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    // Dispatch the editCar action with the updated values
    dispatch(editCar(values));
  };

  return (
    <div>
      {/* {loading && <Spinner />} */}

      <header className="header" data-header>
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
                
              <button className="btn" aria-labelledby="aria-label-txt" onClick={onclick}>
                  <span id="aria-label-txt">Home</span>
                </button>

                <button className="btn" aria-labelledby="aria-label-txt" onClick={handleLogout1}>
                  <span id="aria-label-txt">			{localStorage.getItem('email') ? 'Logout' : 'Login'}
</span>
                </button>


              <button className="btn" aria-labelledby="aria-label-txt" onClick={onclick1} >
                  <span id="aria-label-txt">Previous Bookings</span>
                </button>

              

                <button className="btn" aria-labelledby="aria-label-txt" href="/BookingCar" onClick={handleLogout}>
                  <span id="aria-label-txt">Explore cars</span>
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
      <br />
      <br />
      <br />
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          {car && totalCars.length > 0 && (
            <Form
              initialValues={car}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <center><h2>Edit Car details</h2></center>
              <hr />
              <Form.Item
                name="name"
                label="Car name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true }]} >
  <Input  />
</Form.Item>
              <Form.Item label="Current Image">
                {car.image && (
                  <img src={car.image} alt="Current Car Image" style={{ maxWidth: '100px' }} />
                )}
              </Form.Item>
              <Form.Item 
                label="Click on the button below to upload a new image from your device"
              >
                {file ? (
                  <p>File selected: {file.name}</p>
                ) : (
                  <>
                    <input type="file" onChange={handleFileChange} accept="image/*" />
                  </>
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
                  <button className="btn1" htmlType="submit">
                    Edit Car
                  </button>
                </center>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default EditCar;
