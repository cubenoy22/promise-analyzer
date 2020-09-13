import React from 'react';
import { parseStack } from './Utils';

export default props => {
  const { event } = props;
  if (!event) {
    return <div style={{
      flexBasis: '33%',
      height: '100%',
      padding: '8px',
      boxSizing: 'border-box',
      flexShrink: 0,
      borderLeft: '1px solid black',
    }}></div>;
  }

  const startDate = new Date(event.startTime);
  const endDate = event.endTime && new Date(event.endTime);

  return (
    <div style={{
      flexBasis: '33%',
      height: '100%',
      fontSize: '11pt',
      borderLeft: '1px solid black',
      padding: '8px',
      boxSizing: 'border-box',
      flexShrink: 0,
      minHeight: 0,
      overflowY: 'scroll'
    }}>
      <div>開始時間:{startDate.toLocaleTimeString()} ({event.startTime})</div>
      { endDate && 
        <div>終了時間:{endDate.toLocaleTimeString()} ({event.endTime})</div>
      }
      <div>終了方法: {event.action}</div>
      <div>ID: {event.identifier}</div>
      { 
        event.additionalInfo &&
        <div>追加情報: {event.additionalInfo.toString()}</div>
      }
      <div style={{
        wordBreak: 'break-all',
        fontSize: '10pt'
      }}>
        {
          event.stack.map((func, index) => {
            const info = parseStack(func);
            const funcName = info && info[0];
            const otherInfo = info && info[1];
            return (<div key={index} style={{
              borderBottom: '1px solid lightgray',
              fontSize: '11px'
            }}>
              <strong style={{ color: '#0088ff' }}>{funcName ?? ''}</strong><br />
              <span style={{ color: 'gray' }}>{otherInfo ?? func}</span>
            </div>)
          })
        }
      </div>
    </div>
  );
};
