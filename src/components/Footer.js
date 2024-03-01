import React from 'react'

function Footer() {
 
  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '1rem',
    position: 'relative',
    left: 0,
    bottom: 0,
    width: '100%'
  }

  return (
    <footer className='mt-4' style={footerStyle}>
      <p>&copy; 2024 Job Portal</p>
    </footer>
  )
}

export default Footer
