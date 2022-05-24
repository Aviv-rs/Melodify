// Guidlines:
// *. currently no better API than youtube...
// *. no need for song store, it is part of the station

// Pages, Cmps:
// HomePage render 2 stations => link StationDetails
// Add station
// AppPlayer (initially rendered at StationDetails, later in footer)
//   Smart component - connected to store:
//   -. stationModule.currentlyPlayingUrl
//   -. stationModule.dispatch(nextSong)
// Filtering
// StationList, StationPreview
// StationDetails - Make it amazing
// D & D Later....


// server.js

const station = {
  "_id": "5cksxjas89xjsa8xjsa8jxs09",
  "name": "Best workout mix",
  "coverUrl":"https://mosaic.scdn.co/640/ab67616d0000b273063fc4921a6d7fbac76e9bbaab67616d0000b273582f703c73240fe327aa05d6ab67616d0000b2736ca5c90113b30c3c43ffb8f4ab67616d0000b273985bf5ede2fe4a048ee85f28",
  "tags": [
    "Motivating",
    "Workout"
  ],
  "createdAt": 1541652422,
  "createdBy": {
    "_id" : "6283d13fb9a7e752c1c0fdcb", 
    "username" : "kyle_s", 
    "fullName" : "Kyle Smith"
  },
  "likedByUsers": [
    {"_id" : "628a6e62b1f6f147074b1ff5", 
  "username" : "leila.P", 
  "fullName" : "Leila Parks"},

  , {"_id" : "628a71b2b1f6f147074b1ff6", 
  "username" : "summerz", 
  "fullName" : "Sam Marks"}
],
  "songs": [
    {
      "id": "Obim8BYGnOE",
      "title": "'Til I collapse",
      "url": "https://www.youtube.com/watch?v=Obim8BYGnOE",
      "imgUrl": "https://i.ytimg.com/vi/Obim8BYGnOE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
      "addedBy": {
        "_id" : "628a71b2b1f6f147074b1ff6", 
      "username" : "summerz", 
      "fullName" : "Sam Marks"
    },
      "addedAt": 162521765262
    },
    {
      "id": "VDvr08sCPOc",
      "title": "Remember the name",
      "url": "https://www.youtube.com/watch?v=VDvr08sCPOc",
      "imgUrl": "	https://i.ytimg.com/vi/VDvr08sCPOc/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
      "addedBy": {
        "_id" : "6283d13fb9a7e752c1c0fdcb", 
        "username" : "kyle_s", 
        "fullName" : "Kyle Smith"
      }
    },
  ],
  "activityLog": [
    {
      id: 'a101',
      doneBy: {
        "_id" : "6283d13fb9a7e752c1c0fdcb", 
        "username" : "kyle_s", 
        "fullName" : "Kyle Smith"
      },
      action: 'addSong',
      doneAt: 17258891775
    }
  ]
}

const user = {"_id" : "628a6e62b1f6f147074b1ff5", 
"username" : "leila.P", 
"password" : "avocados4life",
"fullName" : "Leila Parks"}
