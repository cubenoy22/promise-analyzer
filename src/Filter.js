import React, { useCallback, useEffect, useRef } from 'react';

export default props => {
  const { 
    horizontalZoomFactor,
    verticalZoomFactor,
    stackFilter,
    onHorizontalZoomChanged,
    onVerticalZoomChanged,
    onStackFilterChanged
  } = props;

  const horizZoomRef = useRef();
  useEffect(() => {
    horizZoomRef.current.value = horizontalZoomFactor;
  }, [horizontalZoomFactor]);

  const onHorizZoomValueChanged = useCallback(event => {
    const text = event.target.value;
    if (isFinite(text)) {
      onHorizontalZoomChanged(Number(text));
    }
  }, []);

  const vertZoomRef = useRef();
  useEffect(() => {
    vertZoomRef.current.value = verticalZoomFactor;
  }, [verticalZoomFactor]);

  const onVertZoomValueChanged = useCallback(event => {
    const text = event.target.value;
    if (isFinite(text)) {
      onVerticalZoomChanged(Number(text));
    }
  }, []);

  const stackFilterRef = useRef();
  useEffect(() => {
    stackFilterRef.current.value = stackFilter;
  }, [stackFilter]);

  return (
    <>
      <div>
        <label htmlFor="horizontalZoomFactor">横ズーム倍率</label>
        <input type="text" id="horizontalZoomFactor" ref={horizZoomRef} onBlur={onHorizZoomValueChanged} />
      </div>
      <div>
        <label htmlFor="verticalZoomFactor">レーンの高さ(px)</label>
        <input type="text" id="verticalZoomFactor" ref={vertZoomRef} onBlur={onVertZoomValueChanged} />
      </div>  
      <div style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        marginRight: '8px'
      }}>
        <label htmlFor="stackFilter" style={{ flexShrink: '0' }}>スタック絞り込み</label>
        <input 
          type="text"
          id="stackFilter"
          ref={stackFilterRef}
          placeholder={`stackList => stackList.join('\\n').match(/abc/)`}
          style={{ width: '100%' }}
          onBlur={e => { onStackFilterChanged(e.target.value); }}
        />
      </div>
    </>
  )
};
