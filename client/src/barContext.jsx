import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import { UserContext } from './userContext';

const BarContext = createContext();

const BarContextProvider = ({ children }) => {
  const { userInfo } = useContext(UserContext);

  // Bar name
  const [barName, setBarName] = useState('');

  // Contact info which holds address, phone, and email.
  const [contactInformation, setContactInformation] = useState({});
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Update the independent phone, address, and email states when contactInfo state changes.
  useEffect(() => {
    const {
      address,
      phone,
      email,
    } = contactInformation;

    setAddress(address);
    setPhone(phone);
    setEmail(email);
  }, [contactInformation]);

  // Details holds hours of operation and a description.
  const [details, setDetails] = useState({});
  const [hoursOfOperation, setHoursOfOperation] = useState('');
  const [description, setDescription] = useState('');

    // Update the independent phone, address, and email states when contactInfo state changes.
    useEffect(() => {
      const {
        hoursOfOperation,
        description
      } = details;

      setHoursOfOperation(hoursOfOperation);
      setDescription(description);
    }, [details]);

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

  // Set current bar when the userInfo state changes.
  const [currentBar, setCurrentBar] = useState(null);
  useEffect(() => {
    if (userInfo.businessId) {
      axios
        .get(`/routes/businesses/${userInfo.businessId}`)
        .then(({ data: barInfo }) => {
          setCurrentBar(barInfo);
          setBarName(barInfo.name);
          setContactInformation(barInfo.contactInformation);
          setDetails(barInfo.details);
        })
        .catch((err) => console.log(err))
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
        setCurrentBar,
      }}
    >
      {children}
    </BarContext.Provider>
  );
};

export { BarContext, BarContextProvider };
