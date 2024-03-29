# image-paster

Web Component which was originally created as a plugin for Cargo site builder.

It's partially depends on Cargo Gallery Component.

**NOTE:**
It's important that's this component should be used right after gallery component, as it's initialize images based on previous sibling node in DOM.
Pasted images would be of the same size as they are styles within gallery node.

### Attributes

| Name      | Type    | Default value | Description                                                                                                    |
| --------- | ------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
| data-loop | boolean | true          | When set to `false` would clear canvas on user click when no images left, and only then re-initialize images. |
| data-crop | boolean | false         | When set to `true` image won't be cropped while being put near the edge of the canvas.                         |

### CSS hooks

You can set value for this CSS variables in order to style shadow dom elements inside image paster.

| Name                     | Default value | Description                                                                         |
| ------------------------ | ------------- | ----------------------------------------------------------------------------------- |
| --mobile-tap-hint-width  | 50%           | Allows you to set width of mobile hint to ket user know that he can tap the screen. |
| --mobile-tap-hand-fill   | #fff          | Allows you to set fill color for mobile tap hint hand.                              |
| --mobile-tap-hand-stroke | #000          | Allows you to set stroke color for mobile tap hint hand.                            |
| --mobile-tap-stroke      | #000          | Allows you to set stroke color for mobile tap bubble press effect.                  |

### EXAMPLE OF USAGE

```html
<div class="gallery">
  <img src="./images/image-1" />
  <img src="./images/image-2" />
  <img src="./images/image-3" />
</div>
<image-paster data-loop="true" data-crop="true" />
```


### DEV NOTES

**NOTE:** We use jsdeliver cdn to host versions in order to create new version you should:
1. update source code
2. update change log and describe your changes
3. run build `npm run build`
4. commit your changes `git commit`
5. push your changes `git push`
6. create version tag `git tag -a <tag_name> -m "<tag_message>"`
7. push tags `git push --tags`
8. you can now access your new version via link `https://cdn.jsdelivr.net/gh/igocooper/image-paster@<VERSION_TAG>/dist/index.js`
