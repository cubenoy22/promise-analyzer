import React from 'react';

const getActionColor = action => {
  switch (action) {
    case 'then': return 'green';
    case 'catch': return 'orange';
    case 'finally': return 'blue';
    case 'xhr': return 'purple';
    default: return 'gray';
  }
}

export default props => {
  const { data, firstStartTime, scale, isInspecting, focusedIdentifier, pendingWidthPx, onHover } = props;
  const { action, identifier } = data;
  return (
    <div onClick={() => onHover(data)} style={{
      position: 'absolute',
      top: '0',
      cursor: 'pointer',
      left: (data.startTime - firstStartTime) * scale,
      border: isInspecting ? '3px solid white' : '1px solid black',
      width: data.endTime - data.startTime > 0 ? (data.endTime - data.startTime) * scale : `${pendingWidthPx}px`,
      height: '100%',
      background: data.endTime ? getActionColor(action) : 'red',
      boxSizing: 'border-box',
      opacity: focusedIdentifier && identifier !== focusedIdentifier ? 0.33 : (data.endTime - data.startTime > 0 ? 1 : 0.66),
      borderRadius: data.endTime - data.startTime > 0 ?  '0' : '50%'
    }}></div>
  );
}
