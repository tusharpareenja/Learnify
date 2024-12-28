import React from 'react';
import YouTube from 'react-youtube';

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 0,
  },
};

function ChapterContent({ chapter, content }) {
  console.log('Content:', content); // Log the content object to check its structure

  return (
    <div className="p-10 ml-48 mt-20 text-black">
      <h2 className="font-medium text-2xl">{chapter?.chapterName}</h2>
      <p className="text-gray-500">{chapter?.about}</p>

      <div className="flex justify-center my-6">
        <YouTube videoId={content?.videoId} opts={opts} />
      </div>

      <div>
        {content?.content?.map((item, index) => {
          console.log('Item:', item); // Log each item to check its structure
          return (
            <h2 className="font-medium text-black text-lg" key={index}>
              {item.title || "No Title"} {/* Render title or fallback */}
            </h2>
          );
        })}
      </div>
    </div>
  );
}

export default ChapterContent;
