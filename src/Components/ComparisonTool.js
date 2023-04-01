import React, { useState, useEffect } from 'react';
import Box from './Box';
import './ComparisonTool.css';

const ComparisonTool = (props) => {
  const [chosenVideos, setChosenVideos] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    if (chosenVideos.length !== 0) {
      setShowComparison(true)
      console.log(chosenVideos)
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
        <h2>{similarities > 2 ? 'Yes' : 'No'}</h2>
        <div onClick={() => resetSelections()} className='cursor-pointer'>Clear selection</div>
        <ul>
          {prodYear && <li>Production year: {prodYear}</li>}
          {parentalRating && <li>Parental rating: {parentalRating}</li>}
          {imdbRating && <li>IMDB rating: {imdbRating}</li>}
          {duration && <li>Duration: {duration}</li>}
          {commonActors.length > 0 && <li>Common actors: <ul>{commonActors.map(actor => {
            return (
              <li>{actor}</li>
            )
          })}</ul></li>}
        </ul>
      </>
    )
  }


  return (
    <div className='mainSection'>
      <div className='comparisonSection'>
        <h1>Are these similar?</h1>
        {chosenVideos.length === 0 &&
        <h4>Select two movies below to see their similarities</h4>
        }
        {showComparison &&
          <div className='flex'>
            <div className='movieComparison'>
              <h3>{chosenVideos[0].title}</h3>
            </div>
            {chosenVideos.length === 2 &&
              <div className='similaritiesSection'>
                <div>{checkSimilarities(chosenVideos[0], chosenVideos[1])}</div>
              </div>
            }
            <div className='movieComparison'>
              <h3>{chosenVideos[1]?.title}</h3>
            </div>
          </div>
        }
      </div>
      <div className='gridSection flex'>
        {props.data.map(video => {
          return (
            <div onClick={() => {chooseVideo(video)}} key={video.guid} className='cursor-pointer'>
              <Box video={video} />       
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ComparisonTool;
