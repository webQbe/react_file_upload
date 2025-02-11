import React from 'react'
import PropTypes from 'prop-types'

const Progress = ({ percentage }) => { // Pass uploadPercentage from FileUpload.jsx
  return (
        // Show percentage on progress bar
        <div className="progress">
            <div 
                className="progress-bar progress-bar-striped bg-success"
                role='progressbar'
                style={{ width: `${percentage}%`, color: 'blue' }}>
                {percentage}%
            </div>
        </div>
  )
}

Progress.propTypes = {
    // Valdate percentage prop type
    percentage: PropTypes.number.isRequired
}

export default Progress