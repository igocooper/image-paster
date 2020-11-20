# image-paster

Web Component which was originally created as a plugin for Cargo site builder. 

It's partially depends on Cargo Gallery Component.

**NOTE:**
It's important that's this component should be used right after gallery component, as it's initialize images based on previous sibling node in DOM.
Pasted images would be of the same size as they are styles within gallery node. 

### Attributes

`data-loop` - if explicitly set to `false` would clear canvas on user click when no images left, and only then re-initialize images.

### EXAMPLE OF USAGE

```html
<div class="gallery" data-loop="true">
  <img src="./images/image-1" />
  <img src="./images/image-2" />
  <img src="./images/image-3" />
</div>
<image-paster />
```

