<?php

use craft\elements\Entry;
use craft\elements\Category;
use craft\elements\User;

return [
  'endpoints' => [
    'api/blog/<elementsPerPage:\d+>.json' => function($elementsPerPage) {
        // Set criteria
        $criteria['section'] = 'blog';

        // Check for title search
        $search = Craft::$app->request->getQueryParam('search');
        if ($search){
          $criteria['search'] =  $search;
          $criteria['orderBy'] = 'score';
        }

        // Check for category search 
        $searchCategories = Craft::$app->request->getQueryParam('searchCategories');
      
        if ($searchCategories){
          $criteria['relatedTo'] = $searchCategories;
        }
      
        return [
            'elementType' => Entry::class,
            'criteria' => $criteria,
            'elementsPerPage' => $elementsPerPage,
            'pageParam' => 'pg',  
            'transformer' => function(Entry $entry) {
              if (isset($entry->featuredImage)){
                $srcImage = $entry->featuredImage->one();
                if($srcImage){
                  $imageUrl = $srcImage->getUrl(['width' => 635, 'height' => 331]); 
                } else {
                  $imageUrl = "";
                }
              }

              $childCategories = [];
              foreach ($entry->blogCategories->level(2)->all() as $cat) {
                $childCategories[] = $cat->title;
              }

              $parentCategories = [];
              foreach ($entry->blogCategories->level(1)->all() as $cat) {
                $parentCategories[] = $cat->title;
              }

              $imageGradient = "";
              $hasGradient = $entry->imageGradient->one();
              if($hasGradient){
                $imageGradient = $hasGradient->slug;
              }


              return [
                  'id' => $entry->id,
                  'featuredArticle' => $entry->featuredArticle,
                  'title' => $entry->title,
                  'readingTime' => $entry->readingTime,
                  'url' => $entry->url,
                  'image' => $imageUrl,
                  'childCategories' => $childCategories,
                  'parentCategories' => $parentCategories,
                  'description' => $entry->seoDescription,
                  'imageGradient' => $imageGradient,
                  'author' => [
                    'photo' => $entry->getAuthor()->getPhotoUrl(),
                    'name' => $entry->author->fullName,
                    'title' => $entry->author->authorTitle,
                    'id' => $entry->author->id
                  ]
              ];
            },
        ];
    },
    'api/all-blog-posts.json' => function() {
        // Set criteria
        $criteria['section'] = 'blog';


      
        return [
            'elementType' => Entry::class,
            'criteria' => $criteria,
            'elementsPerPage' => 10000,
            'pageParam' => 'pg',  
            'transformer' => function(Entry $entry) {

              return [
                  'title' => $entry->title,
                  'url' => $entry->url,
              ];
            },
        ];
    },
    // Exposes all resources API
    'api/all-resources.json' => function() {
        // Set criteria
        $criteria['section'] = ['resources', 'webinars', 'customerStories'];
      
        return [
            'elementType' => Entry::class,
            'criteria' => $criteria,
            'elementsPerPage' => 100,
            'pageParam' => 'pg',  
            'transformer' => function(Entry $entry) {
              if (isset($entry->featuredImage)){
                $srcImage = $entry->featuredImage->one();
                if($srcImage){
                  $imageUrlSmall = $srcImage->getUrl(['width' => 338, 'height' => 176]); 
                  $imageUrlMedium = $srcImage->getUrl(['width' => 522, 'height' => 272]); 
                  $imageUrlLarge = $srcImage->getUrl(['width' => 706, 'height' => 368]); 
                  $imageUrlSlide = $srcImage->getUrl(['width' => 1440, 'height' => 450]); 
                  $imageUrl = $srcImage->getUrl(['width' => 635, 'height' => 331]); 
                } else {
                  $imageUrl = "";
                  $imageUrlSmall = ""; 
                  $imageUrlMedium = ""; 
                  $imageUrlLarge = ""; 
                  $imageUrlSlide = "";
                }
              }
              return [
                  'title' => $entry->title,
                  'url' => $entry->url,
                  'id' => $entry->id,
                  'image' => $imageUrl,
                  'description' => $entry->subText,
                  'eyebrow' => $entry->eyebrow,
                  'images' => [
                    'small' => $imageUrlSmall,
                    'medium' => $imageUrlMedium,
                    'large' => $imageUrlLarge,
                    'slide' => $imageUrlSlide
                  ],
                  'postDate' => $entry->postDate,
                  'featured' => $entry->featured
              ];
            },
        ];
    },
    'api/blog-author.json' => function() {
      // Set criteria
      $criteria['section'] = 'blog';

      // Check for category search 
      $searchAuthor = Craft::$app->request->getQueryParam('author');
    
      if ($searchAuthor){
        $criteria['authorId'] = $searchAuthor;
      }
    
      return [
          'elementType' => Entry::class,
          'criteria' => $criteria,
          'elementsPerPage' => 6,
          'pageParam' => 'pg',   
          'transformer' => function(Entry $entry) {
            if (isset($entry->featuredImage)){
              $srcImage = $entry->featuredImage->one();
              if($srcImage){
                $imageUrl = $srcImage->getUrl(['width' => 635, 'height' => 331]); 
              } else {
                $imageUrl = "";
              }
            }

            $childCategories = [];
            foreach ($entry->blogCategories->level(2)->all() as $cat) {
              $childCategories[] = $cat->title;
            }

            $parentCategories = [];
            foreach ($entry->blogCategories->level(1)->all() as $cat) {
              $parentCategories[] = $cat->title;
            }

            $imageGradient = "";
            $hasGradient = $entry->imageGradient->one();
            if($hasGradient){
              $imageGradient = $hasGradient->slug;
            }

            return [
                'id' => $entry->id,
                'featuredArticle' => $entry->featuredArticle,
                'title' => $entry->title,
                'readingTime' => $entry->readingTime,
                'url' => $entry->url,
                'image' => $imageUrl,
                'imageGradient' => $imageGradient,
                'childCategories' => $childCategories,
                'parentCategories' => $parentCategories,
                'description' => $entry->seoDescription,
                'author' => [
                  'photo' => $entry->getAuthor()->getPhotoUrl(),
                  'name' => $entry->author->fullName,
                  'title' => $entry->author->authorTitle,
                  'id' => $entry->author->id
                ]
            ];
          },
      ];
    },   
    'api/featured-blog.json' => function() {
        // Set criteria
        // $criteria['section'] = 'blog';
        // $criteria['search'] =  "featuredArticle:".True;
        $criteria = [
          'section' => 'blog',
          'featuredArticle' => true
        ];
        // Check for category search 
        $searchCategories = Craft::$app->request->getQueryParam('searchCategories');
      
        if ($searchCategories){
          $criteria['relatedTo'] = $searchCategories;
        }
      
        return [
            'elementType' => Entry::class,
            'criteria' => $criteria,
            'elementsPerPage' => 10,
            'pageParam' => 'pg',
            'transformer' => function(Entry $entry) {
              if (isset($entry->featuredImage)){
                $srcImage = $entry->featuredImage->one();
                if($srcImage){
                  $imageUrl = $srcImage->getUrl(['width' => 635, 'height' => 331]); 
                } else {
                  $imageUrl = "";
                }
              }

              $childCategories = [];
              foreach ($entry->blogCategories->level(2)->all() as $cat) {
                $childCategories[] = $cat->title;
              }

              $parentCategories = [];
              foreach ($entry->blogCategories->level(1)->all() as $cat) {
                $parentCategories[] = $cat->title;
              }

              $imageGradient = "";
              $hasGradient = $entry->imageGradient->one();
              if($hasGradient){
                $imageGradient = $hasGradient->slug;
              }
              
              return [
                  'id' => $entry->id,
                  'featuredArticle' => $entry->featuredArticle,
                  'title' => $entry->title,
                  'consolidatedTitle' => $entry->consolidatedTitleFeaturedArticle,
                  'readingTime' => $entry->readingTime,
                  'url' => $entry->url,
                  'image' => $imageUrl,
                  'imageGradient' => $imageGradient,
                  'childCategories' => $childCategories,
                  'parentCategories' => $parentCategories,
                  'description' => $entry->seoDescription,
                  'author' => [
                    'photo' => $entry->getAuthor()->getPhotoUrl(),
                    'name' => $entry->author->fullName,
                    'title' => $entry->author->authorTitle,
                    'id' => $entry->author->id
                  ]
              ];
            },
        ];
    },
    'api/categories.json' => function() {
      return [
          'elementType' => Category::class,
          'criteria' => [
            'group' => 'blogCategories',
            'level' => 1
          ],
          'transformer' => function(Category $entry) {
            if (isset($entry->featuredImage)){
              $srcImage = $entry->featuredImage->one();
              if($srcImage){
                $adImage = $srcImage->getUrl(); 
              } else {
                $adImage = "";
              }
            }
  
            if (isset($entry->clickthrough)){
              if($entry->clickthrough){
                $adLink = $entry->clickthrough->url;
              } else {
                $adLink = "";
              }
            }
            return [
                'id' => $entry->id,
                'title' => $entry->title,
                'adImage' => $adImage,
                'adLink' => $adLink,
            ];
          },
      ];
    },
    'api/subcategories/<categoryId:\d+>.json' => function($categoryId) {
      return [
        'elementType' => Category::class,
        'criteria' => ['descendantOf' =>  $categoryId ],
        'transformer' => function(Category $entry) {
          if (isset($entry->featuredImage)){
            $srcImage = $entry->featuredImage->one();
            if($srcImage){
              $adImage = $srcImage->getUrl(); 
            } else {
              $adImage = "";
            }
          }

          if (isset($entry->clickthrough)){
            if($entry->clickthrough){
              $adLink = $entry->clickthrough->url;
            } else {
              $adLink = "";
            }
          }
          return [
              'id' => $entry->id,
              'title' => $entry->title,
              'adImage' => $adImage,
              'adLink' => $adLink,
          ];
        },
      ];
    },
    'api/authors.json' => function() {
      return [
          'elementType' => User::class,
          //ToDo Create group to query authors
          'criteria' => ['group' => 'blogAuthor'],
          'elementsPerPage' => 8,
          'pageParam' => 'pg',
          'transformer' => function(User $entry) {
            return [
                'id' => $entry->id,
                'FirstName' => $entry->firstName,
                'LastName' => $entry->lastName,
                'FullName' => $entry->fullName,
                'JobTitle' => $entry->authorTitle,
                'UserName' => $entry->username,
                'photo' => $entry->getPhotoUrl(),
            ];
          },
      ];
    }
  ]
];