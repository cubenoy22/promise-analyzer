import React from 'react';

export default props => {
  const { durationMillis, scale, pageHeight } = props;
  return (
    <div style={{
      width: durationMillis * scale,
      position: 'absolute',
      background: '#ccc',
      display: 'flex',
    }}>
      {
       (() => {
          const result = [];
          for (let i = 0 ; i < Math.ceil(durationMillis / 1000); ++i) {
            result.push((
              <div  key={i} style={{
                width: 1000 * scale,
                height: `${pageHeight}px`,
                borderRight: 'dashed 1px black',
              }}></div>
            ));
          }
          return result;
        })()
      }
    </div>
  );
}
