import React, { useState, useEffect } from 'react';
import './ComparisonTool.css';

const ComparisonTool = (props) => {
  const [chosenVideos, setChosenVideos] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showActors, setShowActors] = useState(false);

  console.log(props)
  useEffect(() => {
    if (chosenVideos.length !== 0) {
      setShowComparison(true)
    }
  }, [chosenVideos])

  const chooseVideo = (video) => {
    // Check if two videos have already been chosen
    if (chosenVideos.length === 2) {
      return;
    }
    // Check to make sure the video hasn't already been chosen
    if (chosenVideos[0] === video) {
      return;
    }
    // Add video to array
    setChosenVideos([...chosenVideos, video])
  }

  const resetSelections = () => {
    // Reset the comparison
    setChosenVideos([]);
    setShowComparison(false);
  }

  const checkSimilarities = (video1, video2) => {
    // Handles all the logic for similarities between two videos
    let similarities = 0;
    let commonActors = [];
    let duration;
    let prodYear;
    let parentalRating;
    let imdbRating;
    // Check similarities between video 1 and video 2
    if (video1?.production.year === video2?.production.year) {
      similarities++;
      prodYear = video1.production.year;
    }
    if (video1?.parentalRating === video2?.parentalRating) {
      similarities++;
      parentalRating = video1.parentalRating;
    }
    if (Math.ceil(video1.imdb?.rating) === Math.ceil(video2.imdb?.rating)) {
      similarities++;
      imdbRating = Math.ceil(video1.imdb.rating);
    }
    // Check if duration of the videos are similar
    if ((video1.duration.milliseconds < 3600000) && (video2.duration.milliseconds < 3600000)) {
      duration = 'under an hour.';
      similarities++;
    } else if ((video1.duration.milliseconds >= 3600000 && video1.duration.milliseconds < 7200000) && (video2.duration.milliseconds >= 3600000 && video2.duration.milliseconds < 7200000)) {
      duration = 'between 1 and 2 hours.';
      similarities++;
    } else if ((video1.duration.milliseconds >= 7200000) && (video2.duration.milliseconds >= 7200000)) {
      duration = 'over 2 hours';
      similarities++;
    }
    // Check if the videos have actors in common
    if ((video1.people.actors !== undefined) && (video2.people.actors !== undefined)) {
      video1.people.actors.forEach(actor => {
        video2.people.actors.forEach(actor2 => {
          if (actor === actor2) {
            commonActors.push(actor);
          }
        })
      })
    }

    if (commonActors.length > 0) {
      similarities++
    }

    return (
      <>
        <h2 className={'pt2 ' + (similarities > 2 ? 'green' : 'red')}>{similarities > 2 ? 'Yes' : 'No'}</h2>
        <div onClick={() => resetSelections()} className='button mt2 cursor-pointer'>Clear selection</div>
        <h3 className='mt2'>Similarities</h3>
        {similarities === 0 &&
          <p className='mt2'>None found</p>
        }
        <ul className='mt2 noMarker'>
          {prodYear && <li><b>Production year: </b>{prodYear}</li>}
          {parentalRating && <li><b>Parental rating: </b>{parentalRating}</li>}
          {imdbRating && <li><b>IMDB rating: </b>{imdbRating}</li>}
          {duration && <li><b>Duration: </b>{duration}</li>}
          {commonActors.length > 0 && <li><b>Common actors </b> <img onClick={() => setShowActors(!showActors)} className={'cursor-pointer ' + (showActors ? 'arrowUp' : '') } height={10} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVXqRw8E167DcwfMAH1ZmHHcoJTePXYR9vpA&usqp=CAU' alt='arrow'/>
            <>
              {showActors &&
                <ul>{commonActors.map(actor => {
                return (
                  <li>{actor}</li>
                )
              })}</ul>                 
              }
            </>
          </li>}
        </ul>
      </>
    )
  }


  return (
    <div className='mainSection'>
      <div className='comparisonSection'>
        <h1>Are these similar?</h1>
        {chosenVideos.length === 0 &&
        <h4 className='pt2'>Select two movies below to see their similarities</h4>
        }
        {showComparison &&
          <div className='flex justify-between'>
            <div className='movieComparison'>
              <img className='mobileImg' src={'https://via.placeholder.com/240x320.png?text=' + chosenVideos[0].title} alt={chosenVideos[0].title} />
            </div>
            {chosenVideos.length === 2 &&
              <div className='similaritiesSection'>
                <div>{checkSimilarities(chosenVideos[0], chosenVideos[1])}</div>
              </div>
            }
            <div className='movieComparison'>
              {chosenVideos.length === 2 &&
                <img className='mobileImg' src={'https://via.placeholder.com/240x320.png?text=' + chosenVideos[1]?.title} alt={chosenVideos[1]?.title} />
              }
            </div>
          </div>
        }
      </div>
      <div className='gridSection flex'>
        {props.data.blocks[0].products.map(video => {
          return (
              <img onClick={() => { chooseVideo(video) }} key={video.guid} className={'cursor-pointer box ' + (chosenVideos.includes(video) ? 'chosen' : '')} src={'https://via.placeholder.com/240x320.png?text=' + video.title} alt={video.title} />
          )
        })}
      </div>
    </div>
  )
}

export default ComparisonTool;
