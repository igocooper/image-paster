# CHANGELOG

## 1.5.4

* fix obsolete mediaQuery.addListener()

## 1.5.3

* fix build version after 1.5.2

## 1.5.2 

* fix bug with device orientation change

## 1.5.1

* fix bug with calculation of maxX and maxY position

## 1.5.0

* add `data-crop` attribute to configure cropping images near canvas edges

## 1.4.1

* fix bug with poorly written styles

## ## 1.4.0

* add css hooks to style mobile tab hint

## ## 1.3.3

* fix css styles

## ## 1.3.1

* fix touch device detection via JS

## ## 1.3.0 

* add mobile tap hint 

## 1.2.2

* fix bug with gallery detection

## 1.2.1

* fix bug with initialization when there is no gallery

## 1.2.0

* calculating images based on gallery meta instead of parsing it
* add control of looping via `data-loop` attribute

## 1.1.6

* fix bug with is-inside-editor

## 1.1.5

* fix bug with element dimensions we are now using element from it's reference

## 1.1.4

* fix bug with drawing incorrect image sizes into canvas

## 1.1.3

* fix bug with redundant image src from original image element

## 1.1.2

* fix bug with image re-initialization it's no more using references to arrays

## 1.1.1

* fix helper to prepare argo media assets to use only fixed `width` values

## 1.1.0

* initialization refactoring
* enable component functionality only after preloading all images
* hide preview on mobile devices

## 1.0.3

* preload images from prepared cargo source
* add helper to prepare cargo source

## 1.0.2

* fix bug with preloading images

## 1.0.1

* fix bug with non-loaded images due to lazy load
* hide gallery on connectedCallback 

## 1.0.0

* add `image-paster` component
