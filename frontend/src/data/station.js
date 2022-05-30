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

// DEMO *STATION*

// {
//   "_id": "6283d13fb9a7e752c1c0fdcb",
//   "name": "French Classic Hits",
//   "coverUrl": "https://i.scdn.co/image/ab67706c0000bebb740a579d239ead3b5b60356d",
//   "tags": [
//     "French",
//     "Hits"
//   ],
//   "createdAt": 1415119918991,
//   "createdBy": {
//     "_id": "6283d13fb9a7e752c1c0fdcb",
//     "username": "melodifyDYA",
//   },
//   "likedByUsers": [
//     {
//       "_id": "6283d13fb9a7e752c1c0fdcb",
//       "username": "melodifyDYA",
//     },

//     {
//       "_id": "6283d13fb9a7e752c1c0fdcb",
//       "username": "melodifyDYA",
//     }
//   ],
// },


// DEMO *SONG* FOR ADDING NEW SONGS :


// {
//   "id": "Obim8BYGnOE",
//   "title": "'Eminem - Til I collapse",
//   "url": "https://www.youtube.com/watch?v=Obim8BYGnOE",
//   "imgUrl": "https://i.ytimg.com/vi/Obim8BYGnOE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
//   "addedBy": {
//     "_id": "6283d13fb9a7e752c1c0fdcb",
//     "username": "melodifyDYA",
//   },
//   "addedAt": 162521765262,
//   "likedByUsers": [
//     {
//       "_id": "6283d13fb9a7e752c1c0fdcb",
//       "username": "melodifyDYA",
//     },

//     {
//       "_id": "6283d13fb9a7e752c1c0fdcb",
//       "username": "melodifyDYA",
//     }
//   ],
// },

// STATIONS
// TODO :LIKED SONGS USER TO CHANGE FOLLOWING NEW USERS CREATED

export const tags = [
  "Hits",
  "Workout",
  "Summer",
  "Hip Hop",
  "Meditation",
  "Chill",
  "Throwback",
  "Sunny",
  "Relax",
  "French",
  "Motivating",
  "Tropical",
  "Studying",
  "Love",
  "Focus"
]

export const demoDataStations = [

  {
    "_id": "6283d13fb9a7e752c1c0fdcb",
    "name": "Tropical Sunset",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebb71cbf7aff2c8d6ee402af304",
    "tags": [
      "Tropical",
      "Chill"
    ],
    "createdAt": 1415119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "melodifyDYA",
    },
    "likedByUsers": [
    ],
  },

  {
    "_id": "6283d13fb9a7e752c1c0fdcb",
    "name": "70's Golden Age",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebbb4755a392bfecd5646f0c936",
    "tags": [
      "Throwback",
      "Hits"
    ],
    "createdAt": 1415119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "melodifyDYA",
    },
    "likedByUsers": [

    ],
  },

  {
    "name": "2022 French Hits",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebbbf4be1a9f107d4d496dc1536",
    "tags": [
      "French",
      "Hits"
    ],
    "createdAt": 1415119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "melodifyDYA",
    },
    "likedByUsers": [
    ],
  },

  {
    "name": "Hip-Hop Hits 2022",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebb86c8562c1ed6220c1efb94b3",
    "tags": [
      "Hip Hop",
      "Hits"
    ],
    "createdAt": 1415119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "melodifyDYA",
    },
    "likedByUsers": [

    ],
  },

  {
    "name": "Top Old School US",
    "coverUrl": "https://i.scdn.co/image/ab67616d00001e025b18f1a07315c0f092648a9e",
    "tags": [
      "Hip Hop",
      "Motivating"
    ],
    "createdAt": 1415119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "melodifyDYA",
    },
    "likedByUsers": [

    ],
  },

  {
    "name": "WRKT 2022 MIX",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebb740a579d239ead3b5b60356d",
    "tags": [
      "Workout",
      "Motivating"
    ],
    "createdAt": 1415119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "melodifyDYA",
    },
    "likedByUsers": [

    ],
  },


  {
    "name": "Best Workout Mix",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebbb3c5c979973dadd9e7ef516d",
    "tags": [
      "Motivating",
      "Workout"
    ],
    "createdAt": 1541652422,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "melodifyDYA",
    },
    "likedByUsers": [

    ],
    "songs": [
      {
        "id": "Obim8BYGnOE",
        "title": "'Eminem - Til I collapse",
        "url": "https://www.youtube.com/watch?v=Obim8BYGnOE",
        "imgUrl": "https://i.ytimg.com/vi/Obim8BYGnOE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 162521765262,
        "likedByUsers": [

        ],
      },

      {
        "id": "VDvr08sCPOc",
        "title": "Fort Minor - Remember the name",
        "url": "https://www.youtube.com/watch?v=VDvr08sCPOc",
        "imgUrl": "	https://i.ytimg.com/vi/VDvr08sCPOc/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 162521765262,
        "likedByUsers": [

        ],
      },
      {
        "id": "Obim8BYG34",
        "title": "'Basto - Again and again",
        "url": "https://music.youtube.com/watch?v=1EM7-9L2pdI",
        "imgUrl": "https://i.ytimg.com/vi/1EM7-9L2pdI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 162521765262,
        "likedByUsers": [

        ],
      },
    ]
  },



  {
    "_id": "6283d13fb9a7e752c1c0fdcb",
    "name": "Meditation and Healing Sounds ",
    "coverUrl": "https://i.scdn.co/image/6373b28c2946da5ceffd79e8295e57ec7a8b8ddf",
    "tags": [
      "Relax",
      "Meditation"
    ],
    "createdAt": 1621119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "raheem_s",
    },
    "likedByUsers": [

    ],
    "songs": [
      {
        "id": "ZfQLaKS8yJY",
        "title": "'Les Choristes - Vois sur ton chemin",
        "url": "https://www.youtube.com/watch?v=ZfQLaKS8yJY",
        "imgUrl": "https://i.ytimg.com/vi/ZfQLaKS8yJY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 1631119918991,
        "likedByUsers": [

        ],
      },

      {
        "id": "4s3uheDMRl0",
        "title": "Danit - Guacamayo",
        "url": "https://www.youtube.com/watch?v=4s3uheDMRl0",
        "imgUrl": "	https://i.ytimg.com/vi/4s3uheDMRl0/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 162521765262,
        "likedByUsers": [

        ],
      }
    ]
  },


  {
    "_id": "6283d13fb9a7e752c1c0fdcb",
    "name": "Summer and Cocktails 🏝️🍹",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebba3908a576ac468092735cf38",
    "tags": [
      "Summer",
      "Sunny",
      "Tropical"
    ],
    "createdAt": 1431119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "melodifyDYA",
    },
    "likedByUsers": [

    ],
    "songs": [
      {
        "id": "McEoTIqoRKk",
        "title": "Calvin Harris - Summer",
        "url": "https://www.youtube.com/watch?v=McEoTIqoRKk",
        "imgUrl": "https://i.ytimg.com/vi/McEoTIqoRKk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 1431119918991,
        "likedByUsers": [

        ],
      },

      {
        "id": "CwZ_bmNbdAw",
        "title": "Simple Plan - Summer paradise",
        "url": "https://www.youtube.com/watch?v=CwZ_bmNbdAw",
        "imgUrl": "https://i.ytimg.com/vi/qjHlgrGsLWQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 162521765262,
        "likedByUsers": [

        ],
      }
    ]
  },

  {
    "_id": "6283d13fb9a7e752c1c0fdcb",
    "name": "Throwback To Summertime 🍦",
    "coverUrl": "https://i.scdn.co/image/ab67706f00000003858e9388631d9f3f5eaa5fca",
    "tags": [
      "Throwback",
      "Summer"
    ],
    "createdAt": 1411119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "melodifyDYA",
    },
    "likedByUsers": [

    ],
    "songs": [
      {
        "id": "ZmzjH6OjjIA",
        "title": "'Madonna - La isla bonita",
        "url": "https://www.youtube.com/watch?v=ZmzjH6OjjIA",
        "imgUrl": "https://i.ytimg.com/vi/ZmzjH6OjjIA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 1421119918991,
        "likedByUsers": [

        ],
      },

      {
        "id": "ghGiv7YLC7Q",
        "title": "Boney M - Sunny",
        "url": "https://www.youtube.com/watch?v=ghGiv7YLC7Q",
        "imgUrl": "	https://i.ytimg.com/vi/ghGiv7YLC7Q/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 162521765262,
        "likedByUsers": [

        ],
      }
    ]
  },

  {
    "_id": "6283d13fb9a7e752c1c0fdcb",
    "name": "French Classic Hits",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebb740a579d239ead3b5b60356d",
    "tags": [
      "French",
      "Hits"
    ],
    "createdAt": 1415119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "melodifyDYA",
    },
    "likedByUsers": [

    ],
    "songs": [
      {
        "id": "Zt7y8y1Axcs",
        "title": "Edith Piaf - La vie en rose",
        "url": "https://www.youtube.com/watch?v=Zt7y8y1Axcs",
        "imgUrl": "https://i.ytimg.com/vi/r3Ge6kOEUtI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 1415119918991,
        "likedByUsers": [

        ],
      },

      {
        "id": "2u8ezUvd5o4",
        "title": "Charles Trenet - Douce France",
        "url": "https://www.youtube.com/watch?v=2u8ezUvd5o4",
        "imgUrl": "	https://i.ytimg.com/vi/2u8ezUvd5o4/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 162521765262,
        "likedByUsers": [

        ],
      }
    ]
  },

  {
    "_id": "6283d13fb9a7e752c1c0fdcb",
    "name": "Best Of Drake",
    "coverUrl": "https://i.scdn.co/image/ab67616d00001e02adfb5909ec66db5fbb4d06c8",
    "tags": [
      "Drake",
      "Hip Hop"
    ],
    "createdAt": 1416119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "melodifyDYA",
    },
    "likedByUsers": [

    ],
    "songs": [
      {
        "id": "b8M6N0FTpNc",
        "title": "Drake - Girls want girls (ft Lil Baby)",
        "url": "https://www.youtube.com/watch?v=b8M6N0FTpNc&list=PL-FVH5VWgRPE_91MmVotuEmBWYED6Gph6&index=3",
        "imgUrl": "https://i.ytimg.com/vi/b8M6N0FTpNc/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 1516119918991,
        "likedByUsers": [

        ],
      },

      {
        "id": "zbWpjizpJfI",
        "title": "Drake - Laugh Now Cry Later",
        "url": "https://www.youtube.com/watch?v=zbWpjizpJfI",
        "imgUrl": "	https://i.ytimg.com/vi/zbWpjizpJfI/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 1516119918991,
        "likedByUsers": [

        ],
      }
    ]
  },


  {
    "_id": "6283d13fb9a7e752c1c0fdcb",
    "name": "Good Old Rock Days",
    "coverUrl": "https://i.scdn.co/image/ab67616d00001e02c86998f987b7ba2a1c4e50f0",
    "tags": [
      "Rock",
      "Throwback"
    ],
    "createdAt": 1516119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "melodifyDYA",
    },
    "likedByUsers": [

    ],
    "songs": [
      {
        "id": "abA0UlsphpM",
        "title": "Guns N' Roses - Sweet child O' mine ",
        "url": "https://www.youtube.com/watch?v=abA0UlsphpM",
        "imgUrl": "https://i.ytimg.com/vi/abA0UlsphpM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 1536119918991,
        "likedByUsers": [

        ],
      },

      {
        "id": "SgLy-6yj1Ws",
        "title": "AC/DC - Highway to hell",
        "url": "https://www.youtube.com/watch?v=SgLy-6yj1Ws",
        "imgUrl": "	https://i.ytimg.com/vi/ksqTQ33ohWM/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 1546119918991,
        "likedByUsers": [

        ],
      }
    ]
  },


  {
    "_id": "6283d13fb9a7e752c1c0fdcb",
    "name": "Love Songs 💜",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebb078583c4cca4f9c7b6d75941",
    "tags": [
      "Love",
      "Relax"
    ],
    "createdAt": 1216119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "melodifyDYA",
    },
    "likedByUsers": [

    ],
    "songs": [
      {
        "id": "nLQFBq9ykjI",
        "title": "Sam Smith - Stay with me ",
        "url": "https://www.youtube.com/watch?v=nLQFBq9ykjI",
        "imgUrl": "https://i.ytimg.com/vi/nLQFBq9ykjI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 1556119918991,
        "likedByUsers": [

        ],
      },

      {
        "id": "lQMHoAs6PdY",
        "title": "Adele - Easy on me",
        "url": "https://www.youtube.com/watch?v=lQMHoAs6PdY",
        "imgUrl": "	https://i.ytimg.com/vi/lQMHoAs6PdY/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 1566119918991,
        "likedByUsers": [

        ],
      }
    ]
  },



  {
    "_id": "6283d13fb9a7e752c1c0fdcb",
    "name": "DeepHouse x Chill ",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebb3f32c24a06b455c86f2c447e",
    "tags": [
      "Chill",
      "Summer"
    ],
    "createdAt": 1566119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "melodifyDYA",
    },
    "likedByUsers": [

    ],
    "songs": [
      {
        "id": "MDt1Ed_Qwlo",
        "title": "Tez Cadey - Seve",
        "url": "https://www.youtube.com/watch?v=MDt1Ed_Qwlo",
        "imgUrl": "https://i.ytimg.com/vi/wGP3jsvlAyI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 1567119918991,
        "likedByUsers": [

        ],
      },

      {
        "id": "BgfcToAjfdc",
        "title": "Kygo - Stole the show",
        "url": "https://www.youtube.com/watch?v=BgfcToAjfdc",
        "imgUrl": "	https://i.ytimg.com/vi/VQ1a4SuXIiw/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 1568119918991,
        "likedByUsers": [

        ],
      }
    ]
  },


  {
    "_id": "6283d13fb9a7e752c1c0fdcb",
    "name": "Coding Focus",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebbc2b080eb3eef0417b61950ed",
    "tags": [
      "Focus",
      "Studying"
    ],
    "createdAt": 1578119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "melodifyDYA",
    },
    "likedByUsers": [

    ],
    "songs": [
      {
        "id": "xyY4IZ3JDFE",
        "title": "Ludovico Einaudi - Nuvole Bianche",
        "url": "https://www.youtube.com/watch?v=xyY4IZ3JDFE",
        "imgUrl": "https://i.ytimg.com/vi/hN_q-_nGv4U/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 1578119918991,
        "likedByUsers": [

        ],
      },

      {
        "id": "zwJQE0HkYZw",
        "title": "Yiruma - Rivers flow in you",
        "url": "https://www.youtube.com/watch?v=zwJQE0HkYZw",
        "imgUrl": "	https://i.ytimg.com/vi/zwJQE0HkYZw/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "melodifyDYA",
        },
        "addedAt": 1588119918991,
        "likedByUsers": [

        ],
      }
    ]
  }
]











// USERS


const user = {
  "_id": "6283d13fb9a7e752c1c0fdcb",
  "username": "melodifyDYA",
  "password": "avocados4life",
  "avatar": "https://thumbs.dreamstime.com/z/illustration-cute-gentlemen-avocado-gentleman-vector-84825371.jpg",
  "likedSongs": [{
    "id": "VDvr08sCPOc",
    "title": "Remember the name",
    "url": "https://www.youtube.com/watch?v=VDvr08sCPOc",
    "imgUrl": "	https://i.ytimg.com/vi/VDvr08sCPOc/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g"
  }
  ],
  "likedStations": [{
    "_id": "6283d13fb9a7e752c1c0fdcb",
    "name": "Best workout mix"
  }]
}




const activities = {
  "activities": [
    {
      id: 'a101',
      doneBy: {
        "_id": "6283d13fb9a7e752c1c0fdcb",
        "username": "melodifyDYA",
      },
      action: 'addSong',
      doneAt: 17258891775
    }
  ]
}




