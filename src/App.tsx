import React, { useState } from 'react'
import AgoraUIKit, { layout } from 'agora-react-uikit'
import 'agora-react-uikit/dist/index.css'

const App: React.FunctionComponent = () => {
  const [videocall, setVideocall] = useState(true)
  const [link, setLink] = useState('')

  const parseParams = () => {
    const params = new URLSearchParams(window.location.search);
    const object: any = {};
    params.forEach((value, key) => {
      object[key] = value;
    })
    console.log('params', object)
    return object;
  };

  const createLink = () => {
    const ts = new Date().getTime()
    let link = window.location.origin + '/?channel=' + ts
    console.log(link)
    setLink(link)
    return link
  }

  return (
    <div style={styles.container}>
      <div style={styles.videoContainer}>
        <h1 style={styles.heading}>Agora React Web UIKit</h1>
        {videocall ? (<>
          <AgoraUIKit
            rtcProps={{
              appId: '',
              channel: 'test',
              token: null,
              role: 'host',
              layout: layout.grid,
              ...parseParams()
            }}
            callbacks={{
              EndCall: () => setVideocall(false),
            }} /></>
        ) : (
          <div style={styles.nav}>
            <div style={styles.btn} onClick={() => setVideocall(true)}>Start Call</div>
            <div style={styles.btn} onClick={() => createLink()}>Create Link</div>
            <div onClick={()=>window.open(link, '_blank')}>{link}</div>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: { width: '100vw', height: '100vh', display: 'flex', flex: 1},
  heading: { textAlign: 'center' as const, marginBottom: 0 },
  videoContainer: { display: 'flex', flexDirection: 'column', flex: 1 } as React.CSSProperties,
  nav: { display: 'flex', justifyContent: 'space-around' },
  btn: { backgroundColor: '#007bff', cursor: 'pointer', borderRadius: 5, padding: 5, color: '#ffffff', fontSize: 20 },
}

export default App