import gql from 'graphql-tag';

export const res = `
{
  entries(section:["webinars","resources"],limit:1000){
    ... on webinars_webinarSpecial_Entry{
      title
      url
      id
      image:featuredImage{
        ... on AssetInterface{
          url
         	url@transform(width:635,height:331,mode:"crop",position:"center")
        }
      }
      seoDescription
      eyebrow
      images:featuredImage{
        ... on AssetInterface{
          url
          small:url@transform(width:338,height:176)
          medium:url@transform(width:552,height:272,mode:"crop",position:"center")
          large:url@transform(width:706,height:368,mode:"crop",position:"center")
          slide:url@transform(width:1440,height:450,mode:"crop",position:"center")
        }
      }
      postDate@formatDateTime(timezone:"America/Los_Angeles")
    }
    ... on webinars_webinars_Entry{
      title
      url
      id
      image:featuredImage{
        ... on AssetInterface{
          url
         	url@transform(width:635,height:331,mode:"crop",position:"center")
        }
      }
      seoDescription
      eyebrow
      images:featuredImage{
        ... on AssetInterface{
          url
          small:url@transform(width:338,height:176)
          medium:url@transform(width:552,height:272,mode:"crop",position:"center")
          large:url@transform(width:706,height:368,mode:"crop",position:"center")
          slide:url@transform(width:1440,height:450,mode:"crop",position:"center")
        }
      }
      postDate@formatDateTime(timezone:"America/Los_Angeles")
      featured
    }
  	... on resources_eBook_Entry{
      title
      url
      id
      image:featuredImage{
        ... on AssetInterface{
          url
         	url@transform(width:635,height:331,mode:"crop",position:"center")
        }
      }
      seoDescription
      eyebrow
      images:featuredImage{
        ... on AssetInterface{
          url
          small:url@transform(width:338,height:176)
          medium:url@transform(width:552,height:272,mode:"crop",position:"center")
          large:url@transform(width:706,height:368,mode:"crop",position:"center")
          slide:url@transform(width:1440,height:450,mode:"crop",position:"center")
        }
      }
      postDate@formatDateTime(timezone:"America/Los_Angeles")
      featured
    }
    ... on resources_download_Entry{
    	title
      url
      id
      image:featuredImage{
        ... on AssetInterface{
          url
         	url@transform(width:635,height:331,mode:"crop",position:"center")
        }
      }
      seoDescription
      eyebrow
      images:featuredImage{
        ... on AssetInterface{
          url
          small:url@transform(width:338,height:176)
          medium:url@transform(width:552,height:272,mode:"crop",position:"center")
          large:url@transform(width:706,height:368,mode:"crop",position:"center")
          slide:url@transform(width:1440,height:450,mode:"crop",position:"center")
        }
      }
      postDate@formatDateTime(timezone:"America/Los_Angeles")
      featured
    }
  }
}
`

export const globalVar = `
{
  globalSets(handle:"resourcesList"){
    ... on resourcesList_GlobalSet{
      featuredResources{
        ... webinarData
        ... webinarSpecialData
        ... ebookData
        ... resourceDownload
        ... blogData
        ... customerStories
      }
      video{
        ... webinarData
        ... webinarSpecialData
        ... ebookData
        ... resourceDownload
        ... blogData
        ... customerStories
      }
      ebook{
        ... webinarData
        ... webinarSpecialData
        ... ebookData
        ... resourceDownload
        ... blogData
        ... customerStories
      }
      caseStudy{
        ... webinarData
        ... webinarSpecialData
        ... ebookData
        ... resourceDownload
        ... blogData
        ... customerStories
      }
      tools{
        ... webinarData
        ... webinarSpecialData
        ... ebookData
        ... resourceDownload
        ... blogData
        ... customerStories
      }
    }
  }
}
fragment webinarData on webinars_webinars_Entry{
  title
  author{
    id
    name
    photo{
      url
    }
    title
  }
      url
      id
      image:featuredImage{
        ... on AssetInterface{
          url
         	url@transform(width:635,height:331,mode:"crop",position:"center")
        }
      }
      seoDescription
      eyebrow
      images:featuredImage{
        ... on AssetInterface{
          url
          small:url@transform(width:338,height:176)
          medium:url@transform(width:552,height:272,mode:"crop",position:"center")
          large:url@transform(width:706,height:368,mode:"crop",position:"center")
          slide:url@transform(width:1440,height:450,mode:"crop",position:"center")
        }
      }
      postDate@formatDateTime(timezone:"America/Los_Angeles")
      featured
}
fragment webinarSpecialData on webinars_webinarSpecial_Entry{
  title
  author{
    id
    name
    photo{
      url
    }
    title
  }
      url
      id
      image:featuredImage{
        ... on AssetInterface{
          url
         	url@transform(width:635,height:331,mode:"crop",position:"center")
        }
      }
      seoDescription
      eyebrow
      images:featuredImage{
        ... on AssetInterface{
          url
          small:url@transform(width:338,height:176)
          medium:url@transform(width:552,height:272,mode:"crop",position:"center")
          large:url@transform(width:706,height:368,mode:"crop",position:"center")
          slide:url@transform(width:1440,height:450,mode:"crop",position:"center")
        }
      }
      postDate@formatDateTime(timezone:"America/Los_Angeles")
}
fragment ebookData on resources_eBook_Entry{
  title
  author{
    id
    name
    photo{
      url
    }
    title
  }
      url
      id
      image:featuredImage{
        ... on AssetInterface{
          url
         	url@transform(width:635,height:331,mode:"crop",position:"center")
        }
      }
      seoDescription
      eyebrow
      images:featuredImage{
        ... on AssetInterface{
          url
          small:url@transform(width:338,height:176)
          medium:url@transform(width:552,height:272,mode:"crop",position:"center")
          large:url@transform(width:706,height:368,mode:"crop",position:"center")
          slide:url@transform(width:1440,height:450,mode:"crop",position:"center")
        }
      }
      postDate@formatDateTime(timezone:"America/Los_Angeles")
      featured
}
fragment resourceDownload on resources_download_Entry{
  title
  author{
    id
    name
    photo{
      url
    }
    title
  }
      url
      id
      image:featuredImage{
        ... on AssetInterface{
          url
         	url@transform(width:635,height:331,mode:"crop",position:"center")
        }
      }
      seoDescription
      eyebrow
      images:featuredImage{
        ... on AssetInterface{
          url
          small:url@transform(width:338,height:176)
          medium:url@transform(width:552,height:272,mode:"crop",position:"center")
          large:url@transform(width:706,height:368,mode:"crop",position:"center")
          slide:url@transform(width:1440,height:450,mode:"crop",position:"center")
        }
      }
      postDate@formatDateTime(timezone:"America/Los_Angeles")
      featured
}
fragment blogData on blog_blog_Entry{
  title
  author{
    id
    name
    photo{
      url
    }
    title
  }
      url
      id
      image:featuredImage{
        ... on AssetInterface{
          url
         	url@transform(width:635,height:331,mode:"crop",position:"center")
        }
      }
      seoDescription
      images:featuredImage{
        ... on AssetInterface{
          url
          small:url@transform(width:338,height:176)
          medium:url@transform(width:552,height:272,mode:"crop",position:"center")
          large:url@transform(width:706,height:368,mode:"crop",position:"center")
          slide:url@transform(width:1440,height:450,mode:"crop",position:"center")
        }
      }
      postDate@formatDateTime(timezone:"America/Los_Angeles")
}
fragment customerStories on customerStories_customerStories_Entry{
  title
  author{
    id
    name
    photo{
      url
    }
    title
  }
      url
      id
      image:featuredImage{
        ... on AssetInterface{
          url
         	url@transform(width:635,height:331,mode:"crop",position:"center")
        }
      }
      seoDescription
      eyebrow
      images:featuredImage{
        ... on AssetInterface{
          url
          small:url@transform(width:338,height:176)
          medium:url@transform(width:552,height:272,mode:"crop",position:"center")
          large:url@transform(width:706,height:368,mode:"crop",position:"center")
          slide:url@transform(width:1440,height:450,mode:"crop",position:"center")
        }
      }
      postDate@formatDateTime(timezone:"America/Los_Angeles")
      featured
}
`