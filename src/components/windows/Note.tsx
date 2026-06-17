import React, { useState, useEffect } from 'react'
import MacWindow from './MacWindow'
import './note.scss'
import Markdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface NoteProps {
  setWindowsState: React.Dispatch<React.SetStateAction<{
    github: boolean
    note: boolean
    spotify: boolean
    cli: boolean
  }>>
  windowName: string
}

const Note: React.FC<NoteProps> = ({ setWindowsState, windowName }) => {
  const [markdownContent, setMarkdownContent] = useState<string | null>(null)

  useEffect(() => {
    fetch('/note.txt')
      .then(response => response.text())
      .then(text => setMarkdownContent(text))
      .catch(() => setMarkdownContent('// Unable to load note.txt'))
  }, [])

  return (
    <MacWindow setWindowsState={setWindowsState} windowName={windowName}>
      <div className="note-window">
        {markdownContent ? (
          // @ts-expect-error — react-syntax-highlighter types mismatch on style prop
          <SyntaxHighlighter language="typescript" style={atelierDuneDark}>
            {markdownContent}
          </SyntaxHighlighter>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </MacWindow>
  )
}

export default Note
