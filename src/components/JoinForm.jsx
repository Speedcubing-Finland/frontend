import { useState } from 'react';
import Button from '../components/Button';

function JoinForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    email: '',
    wcaId: '',
    birthDate: '', // New birth date field
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.birthDate.trim()) newErrors.birthDate = 'Birth date is required'; // Validate birth date
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log('Form submission started');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/submit-member`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          console.log('Submission successful');
          setSuccessMessage('Lomake lähetetty!');
          setFormData({
            firstName: '',
            lastName: '',
            city: '',
            email: '',
            wcaId: '',
            birthDate: '',
          });
          setTimeout(() => setSuccessMessage(''), 5000);
        } else {
          const errorText = await response.text();
          console.error('Backend error:', errorText);
          setErrorMessage(errorText); // Display the backend error
          setTimeout(() => setErrorMessage(''), 5000);
        }
      } catch (err) {
        console.error('Error connecting to the server:', err);
        setErrorMessage('Palvelimeen ei saatu yhteyttä.');
        setTimeout(() => setErrorMessage(''), 5000);
      }
    }
  };

  return (
    <div className="form-container max-w-lg mx-auto">
<div className="bg-white shadow-md rounded-lg p-1 mb-8">
  <h2 className="text-2xl font-bold text-center mb-12 mt-10">Liity Speedcubing Finlandiin</h2>
</div>
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-semibold">
            Etunimi<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Mikko"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-semibold">
            Sukunimi<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Mallikas"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        {/* City */}
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-semibold">
            Asuinkunta<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Helsinki"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold">
            Sähköposti<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            placeholder="mikkomallikas@gmail.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Birth Date */}
        <div className="mb-4">
          <label htmlFor="birthDate" className="block text-gray-700 font-semibold">
            Syntymäaika<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
        </div>

        {/* WCA ID */}
        <div className="mb-4">
          <label htmlFor="wcaId" className="block text-gray-700 font-semibold">
            WCA ID
          </label>
          <input
            type="text"
            id="wcaId"
            name="wcaId"
            value={formData.wcaId}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            placeholder="2000MALL01"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button type="submit">Lähetä</Button>
        </div>
      </form>
    </div>
  );
}

export default JoinForm;