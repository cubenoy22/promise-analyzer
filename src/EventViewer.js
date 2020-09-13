import React, { useCallback, useState } from 'react';
import Lane from './Lane';
import Measure from './Measure';

export default props => {
  const { lanes, firstStartTime, lastEndTime, onHoverEvent, inspectingEvent, stackFilter, horizontalZoomFactor, verticalZoomFactor } = props;
  const durationMillis = (lastEndTime - firstStartTime);

  const [scale, setScale] = useState(0);
  const appRef = useCallback(node => {
    if (node !== null) {
      const rect = node.getBoundingClientRect();
      setScale(Math.floor(rect.width / durationMillis * horizontalZoomFactor * rect.width) / rect.width);
    }
  }, [horizontalZoomFactor, durationMillis]);

  const [pageHeight, setPageHeight] = useState(0);
  const lanesRef = useCallback(node => {
    if (node !== null) {
      const rect = node.getBoundingClientRect();
      setPageHeight(rect.height);
    }
  }, [durationMillis, verticalZoomFactor]);

  const [focusedIdentifier, setFocusedIdentifier] = useState('');
  const _onClickEvent = event => {
    onHoverEvent(event);
    setFocusedIdentifier(event.identifier);
  };

  return (
    <div ref={appRef} style={{
      position: 'relative',
      width: '100%',
      overflowX: 'scroll'
    }}>
      <div style={{
        position: 'relative'
      }}>
        <Measure
          durationMillis={durationMillis}
          scale={scale}
          pageHeight={pageHeight}
        />
        <div ref={lanesRef} style={{
          position: 'absolute'
        }}>{
          lanes.map((data, index) => (
            <Lane
              key={index}
              items={data}
              firstStartTime={firstStartTime}
              durationMillis={durationMillis}
              scale={scale}
              heightPx={verticalZoomFactor}
              inspectingEvent={inspectingEvent}
              focusedIdentifier={focusedIdentifier}
              stackFilter={stackFilter}
              onHoverEvent={_onClickEvent}
            />
          ))
        }</div>
      </div>
    </div>
  );
};
