import React from 'react'
import './resume.scss'
import Macwindow from './MacWindow'

interface ResumeProps {
  setWindowsState: React.Dispatch<React.SetStateAction<{
    github: boolean
    note: boolean
    spotify: boolean
    cli: boolean
  }>>
  windowName: string
}

const Resume: React.FC<ResumeProps> = ({ setWindowsState, windowName }) => {
  return (
    <Macwindow setWindowsState={setWindowsState} windowName={windowName}>
      <div className="resume">
        <embed src="/resume.pdf" />
      </div>
    </Macwindow>
  )
}

export default Resume
