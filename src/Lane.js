import React from 'react';
import Event from './Event';

export default props => {
  const { onHoverEvent, inspectingEvent, focusedIdentifier, stackFilter, heightPx, durationMillis, scale } = props;
  const filterFunc = stackFilter && new Function('stackList', `try { return (${stackFilter})(stackList); } catch (e) { console.error(e); return false; }`);
  return (
    <div style={{
      width: durationMillis * scale,
      height: `${heightPx}px`,
      position: 'relative',
      margin: '1px 0',
    }}>
      {
        props.items
          .filter(item => !filterFunc || filterFunc(item.stack))
          .map((item, index) => (
            <Event 
              key={index}
              data={item}
              firstStartTime={props.firstStartTime}
              scale={props.scale}
              isInspecting={inspectingEvent === item}
              focusedIdentifier={focusedIdentifier}
              pendingWidthPx={heightPx}
              onHover={onHoverEvent}
            />
          ))
      }
    </div>
  )
};
