import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './LoginEmail.css'
import { employeeService } from "../../services/employeeService"

export default function LoginEmail() {
  const [employeeId, setEmployeeId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [employees, setEmployees] = useState([])

  const navigate = useNavigate()

  // Fetch employees khi component được render
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const apiData = await employeeService.getAllEmployees()
        setEmployees(apiData)
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhân viên:', error)
      }
    }

    fetchEmployees()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      // Kiểm tra role của nhân viên
      const matchedEmployee = employees.find(
        (emp) => emp.employeeId === employeeId && emp.position.positionCode === 'T'
      )

      if (matchedEmployee) {
        navigate('/admin') // Nếu là admin
      } else {
        navigate(`/user/${employeeId}`) // Nếu là user
      }
    } catch (error) {
      setErrorMessage('Employee ID không chính xác hoặc không tồn tại.')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="p-6">
          <h2 className="auth-header">Đăng nhập</h2>
          <p className="auth-subtext">Vui lòng nhập Employee ID của bạn</p>
        </div>
        <div className="p-6">
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                Employee ID
              </label>
              <div className="input-container">
                <input
                  id="employeeId"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="Nhập Employee ID"
                  className="input-field"
                />
              </div>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="primary-button">
              Đăng nhập
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  )
}
