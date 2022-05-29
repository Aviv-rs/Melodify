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


// STATIONS
// TODO :LIKED SONGS USER TO CHANGE FOLLOWING NEW USERS CREATED

export const tags = [
  "Workout",
  "Relax",
  "Meditation",
  "Summer",
  "Motivating",
  "Sunny",
  "Tropical",
  "Throwback",
  "French",
  "Hits",
  "Hip Hop",
  "Focus",
  "Studying",
  "Chill",
  "Love"
]

export const demoDataStations = [
  {
    "_id": "5cksxjas89xjsa8xjsa8jxs09",
    "name": "Best Workout Mix",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebbb3c5c979973dadd9e7ef516d",
    "tags": [
      "Motivating",
      "Workout"
    ],
    "createdAt": 1541652422,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "kyle_s",
      "fullName": "Kyle Smith"
    },
    "likedByUsers": [
      {
        "_id": "628a6e62b1f6f147074b1ff5",
        "username": "leila.P",
        "fullName": "Leila Parks"
      },

      {
        "_id": "628a71b2b1f6f147074b1ff6",
        "username": "summerz",
        "fullName": "Sam Marks"
      }
    ],
    "songs": [
      {
        "id": "Obim8BYGnOE",
        "title": "'Eminem - Til I collapse",
        "url": "https://www.youtube.com/watch?v=Obim8BYGnOE",
        "imgUrl": "https://i.ytimg.com/vi/Obim8BYGnOE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "628a71b2b1f6f147074b1ff6",
          "username": "summerz",
          "fullName": "Sam Marks"
        },
        "addedAt": 162521765262,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },

          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      },

      {
        "id": "VDvr08sCPOc",
        "title": "Fort Minor - Remember the name",
        "url": "https://www.youtube.com/watch?v=VDvr08sCPOc",
        "imgUrl": "	https://i.ytimg.com/vi/VDvr08sCPOc/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "kyle_s",
          "fullName": "Kyle Smith"
        },
        "addedAt": 162521765262,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },
          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      }
    ]
  },



  {
    "_id": "5cksxjas89xjsa8xjsa8jxs10",
    "name": "Meditation and Healing Sounds ",
    "coverUrl": "https://i.scdn.co/image/6373b28c2946da5ceffd79e8295e57ec7a8b8ddf",
    "tags": [
      "Relax",
      "Meditation"
    ],
    "createdAt": 1621119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fbrt",
      "username": "raheem_s",
      "fullName": "Raheem Sterling"
    },
    "likedByUsers": [
      {
        "_id": "628a6e62b1f6f147074b1ff5",
        "username": "leila.P",
        "fullName": "Leila Parks"
      },

      {
        "_id": "628a71b2b1f6f147074b1ff6",
        "username": "summerz",
        "fullName": "Sam Marks"
      }
    ],
    "songs": [
      {
        "id": "ZfQLaKS8yJY",
        "title": "'Les Choristes - Vois sur ton chemin",
        "url": "https://www.youtube.com/watch?v=ZfQLaKS8yJY",
        "imgUrl": "https://i.ytimg.com/vi/ZfQLaKS8yJY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "628a71b2b1f6f147074b1ff6",
          "username": "summerz",
          "fullName": "Sam Marks"
        },
        "addedAt": 1631119918991,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },

          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      },

      {
        "id": "4s3uheDMRl0",
        "title": "Danit - Guacamayo",
        "url": "https://www.youtube.com/watch?v=4s3uheDMRl0",
        "imgUrl": "	https://i.ytimg.com/vi/4s3uheDMRl0/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "kyle_s",
          "fullName": "Kyle Smith"
        },
        "addedAt": 162521765262,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },
          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      }
    ]
  },


  {
    "_id": "5cksxjas89xjsa8xjsa8jxs989",
    "name": "Summer and Cocktails 🏝️🍹",
    "coverUrl": "https://mosaic.scdn.co/640/ab67616d0000b273063fc4921a6d7fbac76e9bbaab67616d0000b273582f703c73240fe327aa05d6ab67616d0000b2736ca5c90113b30c3c43ffb8f4ab67616d0000b273985bf5ede2fe4a048ee85f28",
    "tags": [
      "Summer",
      "Sunny",
      "Tropical"
    ],
    "createdAt": 1431119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "kyle_s",
      "fullName": "Kyle Smith"
    },
    "likedByUsers": [
      {
        "_id": "628a6e62b1f6f147074b1ff5",
        "username": "leila.P",
        "fullName": "Leila Parks"
      },

      {
        "_id": "628a71b2b1f6f147074b1ff6",
        "username": "summerz",
        "fullName": "Sam Marks"
      }
    ],
    "songs": [
      {
        "id": "McEoTIqoRKk",
        "title": "Calvin Harris - Summer",
        "url": "https://www.youtube.com/watch?v=McEoTIqoRKk",
        "imgUrl": "https://i.ytimg.com/vi/McEoTIqoRKk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "628a71b2b1f6f147074b1ff6",
          "username": "summerz",
          "fullName": "Sam Marks"
        },
        "addedAt": 1431119918991,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },

          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      },

      {
        "id": "CwZ_bmNbdAw",
        "title": "Simple Plan - Summer paradise",
        "url": "https://www.youtube.com/watch?v=CwZ_bmNbdAw",
        "imgUrl": "https://i.ytimg.com/vi/qjHlgrGsLWQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "kyle_s",
          "fullName": "Kyle Smith"
        },
        "addedAt": 162521765262,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },
          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      }
    ]
  },

  {
    "_id": "5cksxjas89xjsa8xjsa8jxs249",
    "name": "Throwback To Summertime 🍦",
    "coverUrl": "https://i.scdn.co/image/ab67706f00000003858e9388631d9f3f5eaa5fca",
    "tags": [
      "Throwback",
      "Summer"
    ],
    "createdAt": 1411119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "kyle_s",
      "fullName": "Kyle Smith"
    },
    "likedByUsers": [
      {
        "_id": "628a6e62b1f6f147074b1ff5",
        "username": "leila.P",
        "fullName": "Leila Parks"
      },

      {
        "_id": "628a71b2b1f6f147074b1ff6",
        "username": "summerz",
        "fullName": "Sam Marks"
      }
    ],
    "songs": [
      {
        "id": "ZmzjH6OjjIA",
        "title": "'Madonna - La isla bonita",
        "url": "https://www.youtube.com/watch?v=ZmzjH6OjjIA",
        "imgUrl": "https://i.ytimg.com/vi/ZmzjH6OjjIA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "628a71b2b1f6f147074b1ff6",
          "username": "summerz",
          "fullName": "Sam Marks"
        },
        "addedAt": 1421119918991,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },

          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      },

      {
        "id": "ghGiv7YLC7Q",
        "title": "Boney M - Sunny",
        "url": "https://www.youtube.com/watch?v=ghGiv7YLC7Q",
        "imgUrl": "	https://i.ytimg.com/vi/ghGiv7YLC7Q/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "kyle_s",
          "fullName": "Kyle Smith"
        },
        "addedAt": 162521765262,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },
          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      }
    ]
  },

  {
    "_id": "5cksxjas89xjsa8xjsa8jxs459",
    "name": "French Classic Hits",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebb740a579d239ead3b5b60356d",
    "tags": [
      "French",
      "Hits"
    ],
    "createdAt": 1415119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "kyle_s",
      "fullName": "Kyle Smith"
    },
    "likedByUsers": [
      {
        "_id": "628a6e62b1f6f147074b1ff5",
        "username": "leila.P",
        "fullName": "Leila Parks"
      },

      {
        "_id": "628a71b2b1f6f147074b1ff6",
        "username": "summerz",
        "fullName": "Sam Marks"
      }
    ],
    "songs": [
      {
        "id": "Zt7y8y1Axcs",
        "title": "Edith Piaf - La vie en rose",
        "url": "https://www.youtube.com/watch?v=Zt7y8y1Axcs",
        "imgUrl": "https://i.ytimg.com/vi/r3Ge6kOEUtI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "628a71b2b1f6f147074b1ff6",
          "username": "summerz",
          "fullName": "Sam Marks"
        },
        "addedAt": 1415119918991,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },

          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      },

      {
        "id": "2u8ezUvd5o4",
        "title": "Charles Trenet - Douce France",
        "url": "https://www.youtube.com/watch?v=2u8ezUvd5o4",
        "imgUrl": "	https://i.ytimg.com/vi/2u8ezUvd5o4/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "kyle_s",
          "fullName": "Kyle Smith"
        },
        "addedAt": 162521765262,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },
          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      }
    ]
  },

  {
    "_id": "5cksxjas89xjsa8xjsa8jxs7009",
    "name": "Best Of Drake",
    "coverUrl": "https://i.scdn.co/image/ab67616d00001e02adfb5909ec66db5fbb4d06c8",
    "tags": [
      "Drake",
      "Hip Hop"
    ],
    "createdAt": 1416119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "kyle_s",
      "fullName": "Kyle Smith"
    },
    "likedByUsers": [
      {
        "_id": "628a6e62b1f6f147074b1ff5",
        "username": "leila.P",
        "fullName": "Leila Parks"
      },

      {
        "_id": "628a71b2b1f6f147074b1ff6",
        "username": "summerz",
        "fullName": "Sam Marks"
      }
    ],
    "songs": [
      {
        "id": "b8M6N0FTpNc",
        "title": "Drake - Girls want girls (ft Lil Baby)",
        "url": "https://www.youtube.com/watch?v=b8M6N0FTpNc&list=PL-FVH5VWgRPE_91MmVotuEmBWYED6Gph6&index=3",
        "imgUrl": "https://i.ytimg.com/vi/b8M6N0FTpNc/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "628a71b2b1f6f147074b1ff6",
          "username": "summerz",
          "fullName": "Sam Marks"
        },
        "addedAt": 1516119918991,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },

          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      },

      {
        "id": "zbWpjizpJfI",
        "title": "Drake - Laugh Now Cry Later",
        "url": "https://www.youtube.com/watch?v=zbWpjizpJfI",
        "imgUrl": "	https://i.ytimg.com/vi/zbWpjizpJfI/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "kyle_s",
          "fullName": "Kyle Smith"
        },
        "addedAt": 1516119918991,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },
          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      }
    ]
  },


  {
    "_id": "5cksxjas89xjsa8xjsa8jxs23009",
    "name": "Good Old Rock Days",
    "coverUrl": "https://i.scdn.co/image/ab67616d00001e02c86998f987b7ba2a1c4e50f0",
    "tags": [
      "Rock",
      "Throwback"
    ],
    "createdAt": 1516119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "kyle_s",
      "fullName": "Kyle Smith"
    },
    "likedByUsers": [
      {
        "_id": "628a6e62b1f6f147074b1ff5",
        "username": "leila.P",
        "fullName": "Leila Parks"
      },

      {
        "_id": "628a71b2b1f6f147074b1ff6",
        "username": "summerz",
        "fullName": "Sam Marks"
      }
    ],
    "songs": [
      {
        "id": "abA0UlsphpM",
        "title": "Guns N' Roses - Sweet child O' mine ",
        "url": "https://www.youtube.com/watch?v=abA0UlsphpM",
        "imgUrl": "https://i.ytimg.com/vi/abA0UlsphpM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "628a71b2b1f6f147074b1ff6",
          "username": "summerz",
          "fullName": "Sam Marks"
        },
        "addedAt": 1536119918991,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },

          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      },

      {
        "id": "SgLy-6yj1Ws",
        "title": "AC/DC - Highway to hell",
        "url": "https://www.youtube.com/watch?v=SgLy-6yj1Ws",
        "imgUrl": "	https://i.ytimg.com/vi/ksqTQ33ohWM/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "kyle_s",
          "fullName": "Kyle Smith"
        },
        "addedAt": 1546119918991,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },
          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      }
    ]
  },


  {
    "_id": "5cksxjas89xjsa8xjsb8jxwe7009",
    "name": "Love Songs 💜",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebb078583c4cca4f9c7b6d75941",
    "tags": [
      "Love",
      "Relax"
    ],
    "createdAt": 1216119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "kyle_s",
      "fullName": "Kyle Smith"
    },
    "likedByUsers": [
      {
        "_id": "628a6e62b1f6f147074b1ff5",
        "username": "leila.P",
        "fullName": "Leila Parks"
      },

      {
        "_id": "628a71b2b1f6f147074b1ff6",
        "username": "summerz",
        "fullName": "Sam Marks"
      }
    ],
    "songs": [
      {
        "id": "nLQFBq9ykjI",
        "title": "Sam Smith - Stay with me ",
        "url": "https://www.youtube.com/watch?v=nLQFBq9ykjI",
        "imgUrl": "https://i.ytimg.com/vi/nLQFBq9ykjI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "628a71b2b1f6f147074b1ff6",
          "username": "summerz",
          "fullName": "Sam Marks"
        },
        "addedAt": 1556119918991,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },

          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      },

      {
        "id": "lQMHoAs6PdY",
        "title": "Adele - Easy on me",
        "url": "https://www.youtube.com/watch?v=lQMHoAs6PdY",
        "imgUrl": "	https://i.ytimg.com/vi/lQMHoAs6PdY/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "kyle_s",
          "fullName": "Kyle Smith"
        },
        "addedAt": 1566119918991,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },
          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      }
    ]
  },



  {
    "_id": "5cksxjas8xjsa8xjsa8xfxs7009",
    "name": "DeepHouse x Chill ",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebb3f32c24a06b455c86f2c447e",
    "tags": [
      "Chill",
      "Summer"
    ],
    "createdAt": 1566119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "kyle_s",
      "fullName": "Kyle Smith"
    },
    "likedByUsers": [
      {
        "_id": "628a6e62b1f6f147074b1ff5",
        "username": "leila.P",
        "fullName": "Leila Parks"
      },

      {
        "_id": "628a71b2b1f6f147074b1ff6",
        "username": "summerz",
        "fullName": "Sam Marks"
      }
    ],
    "songs": [
      {
        "id": "MDt1Ed_Qwlo",
        "title": "Tez Cadey - Seve",
        "url": "https://www.youtube.com/watch?v=MDt1Ed_Qwlo",
        "imgUrl": "https://i.ytimg.com/vi/wGP3jsvlAyI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "628a71b2b1f6f147074b1ff6",
          "username": "summerz",
          "fullName": "Sam Marks"
        },
        "addedAt": 1567119918991,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },

          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      },

      {
        "id": "BgfcToAjfdc",
        "title": "Kygo - Stole the show",
        "url": "https://www.youtube.com/watch?v=BgfcToAjfdc",
        "imgUrl": "	https://i.ytimg.com/vi/VQ1a4SuXIiw/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "kyle_s",
          "fullName": "Kyle Smith"
        },
        "addedAt": 1568119918991,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },
          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      }
    ]
  },


  {
    "_id": "5cksxjas89xjsa8xjsa8jxs7009",
    "name": "Coding Focus",
    "coverUrl": "https://i.scdn.co/image/ab67706c0000bebbc2b080eb3eef0417b61950ed",
    "tags": [
      "Focus",
      "Studying"
    ],
    "createdAt": 1578119918991,
    "createdBy": {
      "_id": "6283d13fb9a7e752c1c0fdcb",
      "username": "kyle_s",
      "fullName": "Kyle Smith"
    },
    "likedByUsers": [
      {
        "_id": "628a6e62b1f6f147074b1ff5",
        "username": "leila.P",
        "fullName": "Leila Parks"
      },

      {
        "_id": "628a71b2b1f6f147074b1ff6",
        "username": "summerz",
        "fullName": "Sam Marks"
      }
    ],
    "songs": [
      {
        "id": "xyY4IZ3JDFE",
        "title": "Ludovico Einaudi - Nuvole Bianche",
        "url": "https://www.youtube.com/watch?v=xyY4IZ3JDFE",
        "imgUrl": "https://i.ytimg.com/vi/hN_q-_nGv4U/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA68kovT2nZYzUWEI8nYr_MFMF8aQ",
        "addedBy": {
          "_id": "628a71b2b1f6f147074b1ff6",
          "username": "summerz",
          "fullName": "Sam Marks"
        },
        "addedAt": 1578119918991,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },

          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      },

      {
        "id": "zwJQE0HkYZw",
        "title": "Yiruma - Rivers flow in you",
        "url": "https://www.youtube.com/watch?v=zwJQE0HkYZw",
        "imgUrl": "	https://i.ytimg.com/vi/zwJQE0HkYZw/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g",
        "addedBy": {
          "_id": "6283d13fb9a7e752c1c0fdcb",
          "username": "kyle_s",
          "fullName": "Kyle Smith"
        },
        "addedAt": 1588119918991,
        "likedByUsers": [
          {
            "_id": "628a6e62b1f6f147074b1ff5",
            "username": "leila.P",
            "fullName": "Leila Parks"
          },
          {
            "_id": "628a71b2b1f6f147074b1ff6",
            "username": "summerz",
            "fullName": "Sam Marks"
          }
        ],
      }
    ]
  }
]











// USERS


const user = {
  "_id": "628a6e62b1f6f147074b1ff5",
  "username": "leila.P",
  "password": "avocados4life",
  "fullName": "Leila Parks",
  "avatar": "https://thumbs.dreamstime.com/z/illustration-cute-gentlemen-avocado-gentleman-vector-84825371.jpg",
  "likedSongs": [{
    "id": "VDvr08sCPOc",
    "title": "Remember the name",
    "url": "https://www.youtube.com/watch?v=VDvr08sCPOc",
    "imgUrl": "	https://i.ytimg.com/vi/VDvr08sCPOc/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCzIpVuDtabT7NmQNSK5X1fDnh95g"
  }
  ],
  "likedStations": [{
    "_id": "5cksxjas89xjsa8xjsa8jxs09",
    "name": "Best workout mix"
  }]
}




const activities = {
  "activities": [
    {
      id: 'a101',
      doneBy: {
        "_id": "6283d13fb9a7e752c1c0fdcb",
        "username": "kyle_s",
        "fullName": "Kyle Smith"
      },
      action: 'addSong',
      doneAt: 17258891775
    }
  ]
}




