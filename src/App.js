import React, { useState, useCallback } from 'react';
import './App.css';
import EventViewer from './EventViewer';
import EventInspector from './EventInspector';
import { useDropzone } from 'react-dropzone';
import Filter from './Filter';

function parseJSON(json) {
  const firstStartTime = json[0].startTime;

  // create lanes
  const lanes = [];
  json.forEach(item => {
    if (!item.stack.find(func => func.indexOf('http') >= 0)) {
      return;
    }

    let targetLane = lanes.find(lane => {
      const lastEvent = lane[lane.length - 1];
      return lastEvent.endTime && lastEvent.endTime <= item.startTime;
    });
    if (!targetLane) {
      targetLane = [];
      lanes.push(targetLane);
    }
    targetLane.push(item);
  });
  
  // calcluate latest endTime
  const lastEndTime = lanes.map(lane => lane.reverse().find(item => item.endTime)?.endTime ?? 0).reduce((a, b) => a > b ? a : b);

  return [ firstStartTime, lanes, lastEndTime ];
}

export default () => {
  const [currentJSON, setCurrentJSON] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setCurrentJSON(JSON.parse(reader.result));
      document.title = acceptedFiles[0].name;
    });
    reader.readAsText(acceptedFiles[0]);
  }, []);
 
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [horizontalZoomFactor, setHorizontalZoomFactor] = useState(1);
  const [verticalZoomFactor, setVerticalZoomFactor] = useState(16);
  const [stackFilter, setStackFilter] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="App" {...getRootProps()}>
      <div className="FilterArea">
        <Filter
          horizontalZoomFactor={horizontalZoomFactor}
          verticalZoomFactor={verticalZoomFactor}
          stackFilter={stackFilter}
          onHorizontalZoomChanged={setHorizontalZoomFactor}
          onVerticalZoomChanged={setVerticalZoomFactor}
          onStackFilterChanged={setStackFilter}
        />
      </div>
      <div className="ContentsArea">
        {
          currentJSON && (() => {
            const [ firstStartTime, lanes, lastEndTime ] = parseJSON(currentJSON);
            return (
              <>
                <EventViewer
                  lanes={lanes}
                  firstStartTime={firstStartTime}
                  lastEndTime={lastEndTime}
                  inspectingEvent={hoveredEvent}
                  stackFilter={stackFilter}
                  horizontalZoomFactor={horizontalZoomFactor}
                  verticalZoomFactor={verticalZoomFactor}
                  onHoverEvent={setHoveredEvent}
                />
                <EventInspector
                  event={hoveredEvent}
                />
              </>
            )
          })()
        }
        {
          !currentJSON && <div style={{
            width: '100%',
            textAlign: 'center',
            alignSelf: 'center',
          }}>分析JSONをここにドロップしてください</div>
        }
        <input {...getInputProps()} disabled className='Dropzone' style={{
          opacity: isDragActive ? 0.8 : 0,
        }} />
      </div>
    </div>
  );
}
