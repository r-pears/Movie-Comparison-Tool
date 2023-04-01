import React from 'react';
import Box from './Box';

const ComparisonTool = (props) => {

  console.log(props.data)
  return (
    <div>
      <div className='comparisonSection'>

      </div>
      <div className='gridSection'>
        {props.data.map(video => {
          return (
            <div key={video.guid}>
              <Box video={video} />       
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ComparisonTool;
