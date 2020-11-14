# image-paster

Web Component which was originally created as a plugin for Cargo site builder. 

It's partially depends on Cargo Gallery Component.

**NOTE:**
It's important that's this component should be used right after gallery component, as it's initialize images based on previous sibling node in DOM.
Pasted images would be of the same size as they are styles within gallery node. 

### EXAMPLE OF USAGE

```html
<div class="gallery">
  <img src="./images/image-1" />
  <img src="./images/image-2" />
  <img src="./images/image-3" />
</div>
<image-paster />
```

