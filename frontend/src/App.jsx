import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {checkDuplicate}  from './components/checkDuplicate'

const App = () => {
  const [applications, setApplications] = useState([])

  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
  })

  const [showFilter, setShowFilter] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    
    if (checkDuplicate(data.company, data.role)) {
      alert("Application for this company and name already exists.")
      return
    }
    
    const today = new Date().toISOString().split("T")[0]
    if (data.dateOfApplication > today) {
      alert("Date of application cannot be in the future.")
      return
    }
    
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/applications`, 
      {company: data.company, role: data.role, status: data.status, dateOfApplication: data.dateOfApplication, link: data.link})
      .then((response) => {
        setApplications((prev) => [...prev, response.data])
      })
      .catch((error) => {
        console.error("Error adding application:", error)
        alert("Failed to add application. Please try again.")
      })
    e.target.reset()
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (index, newStatus) => {
    try {
      axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/applications/${applications[index]._id}`,
        { ...applications[index], status: newStatus })
        .then((response) => {
          setApplications((prev) =>
            prev.map((app, i) => (i === index ? response.data : app))
          )
        })
        .catch((error) => {
          console.error("Error updating application status:", error)
          alert("Failed to update application status. Please try again.")
        })
    } catch (error) {
        console.error("Error updating application status:", error);
        
    }
  }

  const handleDelete = (index) => {
    // confirmation before deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this application?")
    if (!confirmDelete) return
    // if confirmed, delete the application
    // using the index to find the application
    try {
      axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/applications/${applications[index]._id}`) 
        .then(() => {
          setApplications((prev) => prev.filter((_, i) => i !== index))
        })
        .catch((error) => {
          console.error("Error deleting application:", error)
          alert("Failed to delete application. Please try again.")
        })
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  }

  const filteredApplications = applications.filter((application) => {
    const matchesStatus =
      !filters.status || application.status === filters.status
    const matchesStartDate =
      !filters.startDate || application.dateOfApplication >= filters.startDate
    const matchesEndDate =
      !filters.endDate || application.dateOfApplication <= filters.endDate
    return matchesStatus && matchesStartDate && matchesEndDate
  })

  const today = new Date().toISOString().split("T")[0]

  useEffect(()=>{
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/applications`);
  
        // Make sure it's an array
        if (Array.isArray(response.data)) {
          setApplications(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setApplications([]); // fallback
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    }
    fetchApplications()
  },[])

  return (
    <div className='p-6 font-[jetbrains-mono] mx-auto max-w-7xl'>
      <h1 className="mb-4 text-3xl font-bold text-blue-600">
        Add Job Application
      </h1>
      <div className='p-6 mb-6 bg-white rounded-lg shadow-lg'>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700'>Company Name</label>
            <input type="text" name='company' className='w-full p-2 border rounded' required />
          </div>
          <div className='mb-4'>
            <label className='block text-grey-700'>Role</label>
            <input type="text" name='role' className='w-full p-2 border rounded' required/>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Status</label>
            <select name='status' className='w-full p-2 border rounded' required>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Date of Application</label>
            <input
              type="date"
              name='dateOfApplication'
              className='w-full p-2 border rounded'
              max={today}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Link</label>
            <input type="url" name='link' className='w-full p-2 border rounded' required />
          </div>
          <div className='mb-4'>
            <button type='submit' className='p-2 text-white bg-blue-600 rounded'>Add Application</button>
          </div>
        </form>
      </div>

      <h1 className='text-3xl font-bold text-blue-600'>Applications</h1>
      <div className='relative'>
        <button
          className='right-0 p-2 mt-4 bg-gray-200 rounded shadow'
          onClick={() => setShowFilter(!showFilter)}
        >
          Filters ▼
        </button>
        {showFilter && (
          <div className='absolute z-10 p-4 bg-white rounded shadow-lg'>
            <h2 className='mb-2 text-lg font-bold'>Filter Options</h2>
            <div className='mb-4'>
              <label className='block text-gray-700'>Status</label>
              <select
                name='status'
                className='w-full p-2 border rounded'
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Start Date</label>
              <input
                type="date"
                name='startDate'
                className='w-full p-2 border rounded'
                max={today}
                onChange={handleFilterChange}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>End Date</label>
              <input
                type="date"
                name='endDate'
                className='w-full p-2 border rounded'
                max={today}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        )}
      </div>

      <div className='mt-4 overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='min-w-full p-8 text-left text-gray-500 rounded-lg shadow-lg'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
            <tr>
              <th className='px-3 py-3'>Company Name</th>
              <th className='px-3 py-3'>Role</th>
              <th className='px-3 py-3'>Status</th>
              <th className='px-3 py-3'>Date Of Application</th>
              <th className='px-3 py-3'>Link</th>
              <th className='px-3 py-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application, index) => (
              <tr key={index} className='border-b border-gray-200 hover:bg-gray-50'>
                <td className='p-4'>{application.company}</td>
                <td className='p-4'>{application.role}</td>
                <td className='p-4'>
                  <select
                    value={application.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className='p-2 border rounded'
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className='p-4'>{application.dateOfApplication}</td>
                <td className='p-4'>
                  <a href={application.link} target="_blank" rel="noopener noreferrer">Link</a>
                </td>
                <td className='p-4'>
                  <button
                    onClick={() => handleDelete(index)}
                    className='p-2 text-white bg-red-500 rounded'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App