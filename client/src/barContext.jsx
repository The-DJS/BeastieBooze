import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import { UserContext } from './userContext';

const BarContext = createContext();

const BarContextProvider = ({ children }) => {
  const { userInfo } = useContext(UserContext);

  // Bar name
  const [barName, setBarName] = useState('');

  // Contact info which holds address, phone, and email.
  const [contactInformation, setContactInformation] = useState({
    address,
    phone,
    email,
  });
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Details holds hours of operation and a description.
  const [details, setDetails] = useState({
    hoursOfOperation,
    description,
  });
  const [hoursOfOperation, setHoursOfOperation] = useState('');
  const [description, setDescription] = useState('');

  const [bars, setBars] = useState([]);

  const fetchBars = async () => {
    const response = await axios.get('/routes/businesses');
    return response.data;
  };

  useEffect(() => {
    fetchBars()
      .then((bars) => setBars(bars))
      .catch((err) => console.log(err));
  }, []);

  // Determine if the register form should be rendered.
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const [currentBar, setCurrentBar] = useState(null);
  useEffect(() => {
    if (userInfo.businessId) {
      axios
        .get(`/routes/businesses/${userInfo.businessId}`)
        .then(({ data: barInfo }) => setCurrentBar(barInfo))
        .catch((err) => console.log(err));
    }
  }, [userInfo]);

  return (
    <BarContext.Provider
      value={{
        barName,
        setBarName,
        contactInformation,
        address,
        setAddress,
        phone,
        setPhone,
        email,
        setEmail,
        details,
        hoursOfOperation,
        setHoursOfOperation,
        description,
        setDescription,
        showForm,
        toggleForm,
        bars,
        currentBar,
      }}
    >
      {children}
    </BarContext.Provider>
  );
};

export { BarContext, BarContextProvider };
