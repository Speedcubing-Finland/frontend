import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

function JoinForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    email: '',
    wcaId: '',
    birthDate: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Etunimi on pakollinen';
    if (!formData.lastName.trim()) newErrors.lastName = 'Sukunimi on pakollinen';
    if (!formData.city.trim()) newErrors.city = 'Asuinkunta on pakollinen';
    if (!formData.email.trim()) newErrors.email = 'Sähköposti on pakollinen';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Sähköpostiosoite on virheellinen';
    }
    if (!formData.birthDate.trim()) newErrors.birthDate = 'Syntymäaika on pakollinen';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setIsSubmitting(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/submit-member`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          setSuccessMessage('Kiitos liittymisestäsi! Tervetuloa Speedcubing Finlandiin! 🎉');
          setFormData({
            firstName: '',
            lastName: '',
            city: '',
            email: '',
            wcaId: '',
            birthDate: '',
          });
          setTimeout(() => setSuccessMessage(''), 8000);
        } else {
          const errorText = await response.text();
          console.error('Backend error:', errorText);
          setErrorMessage(errorText);
          setTimeout(() => setErrorMessage(''), 5000);
        }
      } catch (err) {
        console.error('Error connecting to the server:', err);
        setErrorMessage('Palvelimeen ei saatu yhteyttä. Yritä myöhemmin uudelleen.');
        setTimeout(() => setErrorMessage(''), 5000);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const inputClasses = (fieldName) => `
    w-full mt-1 px-4 py-3 border-2 rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 focus:border-brand-secondary
    ${errors[fieldName] ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'}
  `;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6">
        <h2 className="text-2xl font-bold text-white text-center">Jäsenlomake</h2>
      </div>

      <div className="p-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Row */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">
                Etunimi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={inputClasses('firstName')}
                placeholder="Mikko"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">
                Sukunimi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={inputClasses('lastName')}
                placeholder="Mallikas"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-gray-700 font-medium mb-1">
              Asuinkunta <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={inputClasses('city')}
              placeholder="Helsinki"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Sähköposti <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses('email')}
              placeholder="mikko.mallikas@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Birth Date and WCA ID Row */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Birth Date */}
            <div>
              <label htmlFor="birthDate" className="block text-gray-700 font-medium mb-1">
                Syntymäaika <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className={inputClasses('birthDate')}
              />
              {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
            </div>

            {/* WCA ID */}
            <div>
              <label htmlFor="wcaId" className="block text-gray-700 font-medium mb-1">
                WCA ID <span className="text-gray-400 font-normal">(valinnainen)</span>
              </label>
              <input
                type="text"
                id="wcaId"
                name="wcaId"
                value={formData.wcaId}
                onChange={handleChange}
                className={inputClasses('wcaId')}
                placeholder="2000MALL01"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-4 px-6 rounded-lg font-semibold 
                     hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Lähetetään...</span>
              </>
            ) : (
              <>
                <FaPaperPlane />
                <span>Lähetä jäsenhakemus</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinForm;